import React from "react";
import { createContext, useReducer } from "react";
import { Item, MergeBoard, Visibility } from "State/Types";

export enum MergeBoardActionType {
    Init = "init",
    EditItem = "edit_item",
    MoveItem = "move_item",
    RemoveItem = "remove_item",
    AddItem = "add_item",
}

export interface MergeBoardInitAction {
    type: MergeBoardActionType.Init;
    initialState: MergeBoard;
}

export interface MergeBoardEditItemAction {
    type: MergeBoardActionType.EditItem;
    itemIndex: number;
    chainId?: string;
    visibility?: Visibility;
    itemLevel?: number;
    isInsideBubble?: boolean;
    pausedUntil?: string | null;
}

export interface MergeBoardMoveItemAction {
    type: MergeBoardActionType.MoveItem;
    itemIndex: number;
    destinationIndex: number;
}

export interface MergeBoardRemoveItemAction {
    type: MergeBoardActionType.RemoveItem;
    itemIndex: number;
}

export interface MergeBoardAddItemAction {
    type: MergeBoardActionType.AddItem;
    destinationIndex: number;
    item: Item;
}

export type MergeBoardAction =
    | MergeBoardInitAction
    | MergeBoardEditItemAction
    | MergeBoardMoveItemAction
    | MergeBoardRemoveItemAction
    | MergeBoardAddItemAction;

function deriveItemType(chainID: string, level: number) {
    if (chainID === "ProducerBooster") {
        return `ProducerBoosterActivated_${level.toString().padStart(2, "0")}`;
    }
    return `${chainID}_${level.toString().padStart(2, "0")}`;
}

function omitActionTypeAndIndex(action: MergeBoardAction) {
    return Object.fromEntries(
        Object.entries(action).filter(
            ([key, _]) => key != "type" && key !== "itemIndex"
        )
    );
}

function clamp(n: number, min: number, max: number) {
    return Math.min(Math.max(n, min), max);
}

export function mergeBoardReducer(
    boardState: MergeBoard,
    action: MergeBoardAction
) {
    switch (action.type) {
        case MergeBoardActionType.Init: {
            return action.initialState;
        }
        case MergeBoardActionType.EditItem: {
            return {
                ...boardState,
                items: boardState.items.map((item, index) => {
                    if (index === action.itemIndex) {
                        const editedItem = {
                            ...item,
                            ...omitActionTypeAndIndex(action),
                        };

                        const editingChainId =
                            typeof action.chainId !== "undefined";

                        if (
                            editingChainId &&
                            boardState?.itemChainLevelBounds[action.chainId]
                        ) {
                            const levelBounds =
                                boardState.itemChainLevelBounds[action.chainId];

                            editedItem.itemLevel = clamp(
                                editedItem.itemLevel,
                                levelBounds.min,
                                levelBounds.max
                            );
                        }

                        if (
                            editingChainId ||
                            typeof action.itemLevel !== "undefined"
                        ) {
                            editedItem.itemType = deriveItemType(
                                editedItem.chainId,
                                editedItem.itemLevel
                            );
                        }
                        return editedItem;
                    }
                    return item;
                }),
            };
        }
        case MergeBoardActionType.MoveItem: {
            let items = boardState.items;

            const itemToMove = boardState.items[action.itemIndex];
            const itemToSwap = boardState.items[action.destinationIndex];
            // We don't just swap in place here because React wants a new array
            // object so it can diff with the previous state easily
            items = items.map((item, index) => {
                if (index === action.itemIndex) {
                    return itemToSwap;
                } else if (index === action.destinationIndex) {
                    return itemToMove;
                }
                return item;
            });

            return {
                ...boardState,
                items,
            };
        }
        case MergeBoardActionType.RemoveItem: {
            return {
                ...boardState,
                items: boardState.items.map((item, index) =>
                    index === action.itemIndex ? null : item
                ),
            };
        }
        case MergeBoardActionType.AddItem: {
            return {
                ...boardState,
                items: boardState.items.map((item, index) =>
                    index === action.destinationIndex
                        ? {
                              ...action.item,
                          }
                        : item
                ),
            };
        }
    }
}

export const MergeBoardContext = createContext<MergeBoard | null>(null);
export const MergeBoardDispatch =
    createContext<React.Dispatch<MergeBoardAction> | null>(null);

interface MergeBoardProviderProps {
    initialData: MergeBoard;
    children: React.ReactNode;
}

export function MergeBoardProvider({
    initialData,
    children,
}: MergeBoardProviderProps) {
    const [mergeBoardState, dispatchMergeBoardAction] = useReducer(
        mergeBoardReducer,
        initialData
    );

    return (
        <MergeBoardContext.Provider value={mergeBoardState}>
            <MergeBoardDispatch.Provider value={dispatchMergeBoardAction}>
                {children}
            </MergeBoardDispatch.Provider>
        </MergeBoardContext.Provider>
    );
}
