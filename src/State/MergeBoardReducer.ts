import { MergeBoard, Visibility } from "./Types";

export enum MergeBoardActionType {
    Init = 'init',
    EditItem = 'edit_item',
    MoveItem = 'move_item'
}

export type MergeBoardInitAction = {
    type: MergeBoardActionType.Init;
    initialState: MergeBoard;
}

export type MergeBoardEditItemAction = {
    type: MergeBoardActionType.EditItem;
    itemId: number;
    itemType?: string;
    chainId?: string;
    visibility?: Visibility;
    itemLevel?: number;
    isInsideBubble?: boolean;
}

export type MergeBoardMoveItemAction = {
    type: MergeBoardActionType.MoveItem;
    itemID: number;
    destinationIndex: number;
}

export type MergeBoardAction = MergeBoardInitAction | MergeBoardEditItemAction | MergeBoardMoveItemAction;

function omitActionType(action: MergeBoardAction) {
    return Object.fromEntries(
        Object.entries(action).filter(([key, _]) => key != 'type')
    );
}

export function mergeBoardReducer(boardState: MergeBoard, action: MergeBoardAction) {
    switch (action.type) {
        case MergeBoardActionType.Init: {
            return action.initialState;
        }
        case MergeBoardActionType.EditItem: {
            return {
                ...boardState,
                items: boardState.items.map(item =>
                    item?.itemId === action.itemId
                        ? { ...item, ...omitActionType(action) }
                        : item
                )
            }
        }
        case MergeBoardActionType.MoveItem: {
            const itemIndexToMove = boardState.items.findIndex((item) => item?.itemId === action.itemID);
            let items = boardState.items;

            if (itemIndexToMove !== -1) {
                const itemToMove = boardState.items[itemIndexToMove];
                const itemToSwap = boardState.items[action.destinationIndex];
                // We don't just swap in place here because React wants a new array
                // object so it can diff with the previous state easily
                items = items.map((item, index) => {
                    if (index === itemIndexToMove) {
                        return itemToSwap;
                    } else if (index === action.destinationIndex) {
                        return itemToMove;
                    }
                    return item;
                });
            }

            return {
                ...boardState,
                items,
            };
        }
    }
} 