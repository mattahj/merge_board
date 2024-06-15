import React, { useReducer } from "react";
import { createContext } from "react";

export enum MergeBoardInspectorActionType {
    SetCell = "set_cell",
    ClearSelection = "clear_selection",
}

export interface MergeBoardInspectorSetCellAction {
    type: MergeBoardInspectorActionType.SetCell;
    cellIndex: number;
}

export interface MergeBoardInspectorClearSelectionAction {
    type: MergeBoardInspectorActionType.ClearSelection;
}

export type MergeBoardInspectorAction =
    | MergeBoardInspectorSetCellAction
    | MergeBoardInspectorClearSelectionAction;

export interface MergeBoardInspector {
    selectedCellIndex: number | null;
}

export function mergeBoardInspectorReducer(
    inspectorState: MergeBoardInspector,
    action: MergeBoardInspectorAction
) {
    switch (action.type) {
        case MergeBoardInspectorActionType.SetCell: {
            return {
                ...inspectorState,
                selectedCellIndex: action.cellIndex,
            };
        }
        case MergeBoardInspectorActionType.ClearSelection: {
            return {
                ...inspectorState,
                selectedCellIndex: null,
            };
        }
    }
}

export const MergeBoardInspectorContext =
    createContext<MergeBoardInspector | null>(null);
export const MergeBoardInspectorDispatch =
    createContext<React.Dispatch<MergeBoardInspectorAction> | null>(null);

interface MergeBoardInspectorProps {
    initialSelection: number | null;
    children: React.ReactNode;
}

export function MergeBoardInspectorProvider({
    initialSelection = null,
    children,
}: MergeBoardInspectorProps) {
    const [inspectorState, dispatchInspectorAction] = useReducer(
        mergeBoardInspectorReducer,
        { selectedCellIndex: initialSelection }
    );

    return (
        <MergeBoardInspectorContext.Provider value={inspectorState}>
            <MergeBoardInspectorDispatch.Provider
                value={dispatchInspectorAction}
            >
                {children}
            </MergeBoardInspectorDispatch.Provider>
        </MergeBoardInspectorContext.Provider>
    );
}
