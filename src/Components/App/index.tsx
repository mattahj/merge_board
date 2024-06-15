import React, { useCallback, useContext } from "react";

import { MergeBoardVisualization } from "Components/MergeBoardVisualization";
import { CellEditor } from "Components/CellEditor";
import { MergeBoard } from "State/Types";
import { MergeBoardProvider } from "State/MergeBoardReducer";

import "./App.scss";
import {
    MergeBoardInspectorActionType,
    MergeBoardInspectorDispatch,
    MergeBoardInspectorProvider,
} from "State/MergeBoardInspectorReducer";

interface Props {
    initialData: MergeBoard;
    initialSelection?: number | null;
}

function AppContent() {
    const inspectorDispatch = useContext(MergeBoardInspectorDispatch);
    const clearSelection = useCallback(
        () =>
            inspectorDispatch({
                type: MergeBoardInspectorActionType.ClearSelection,
            }),
        [inspectorDispatch]
    );

    return (
        <div className="app" onClick={clearSelection}>
            <MergeBoardVisualization />
            <CellEditor />
        </div>
    );
}

export function App({ initialData, initialSelection = null }: Props) {
    return (
        <MergeBoardProvider initialData={initialData}>
            <MergeBoardInspectorProvider initialSelection={initialSelection}>
                <AppContent />
            </MergeBoardInspectorProvider>
        </MergeBoardProvider>
    );
}
