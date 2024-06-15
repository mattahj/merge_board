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
    itemID: number;
    itemType?: string;
    chainId?: string;
    visibility?: Visibility;
    itemLevel?: number;
    isInsideBubble?: boolean;
}

export type MergeBoardMoveItemAction = {
    type: MergeBoardActionType.MoveItem;
    itemID: number;
}

export type MergeBoardAction = MergeBoardInitAction | MergeBoardEditItemAction | MergeBoardMoveItemAction;

export function mergeBoardReducer(boardState: MergeBoard, action: MergeBoardAction) {
    switch (action.type) {
        case MergeBoardActionType.Init: {
            return action.initialState;
        }
        case MergeBoardActionType.EditItem: {
            return {
                ...boardState,
            }
        }
        case MergeBoardActionType.MoveItem: {
            return {
                ...boardState,
            }
        }
    }
}