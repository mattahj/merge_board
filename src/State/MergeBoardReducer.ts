import { MergeBoard } from "./Types";

export enum MergeBoardActionType {
    Init = 'init',
    Edit = 'edit',
}

export type MergeBoardInitAction = {
    type: MergeBoardActionType.Init;
    initialState: MergeBoard;
}

export type MergeBoardEditAction = {
    type: MergeBoardActionType.Edit;
    cellIndex: number;
}

export type MergeBoardAction = MergeBoardInitAction | MergeBoardEditAction;

export function mergeBoardReducer(boardState: MergeBoard, action: MergeBoardAction) {
    switch (action.type) {
        case MergeBoardActionType.Init: {
            return action.initialState;
        }
        case MergeBoardActionType.Edit: {
            return {
                ...boardState,
            }
        }
    }
}