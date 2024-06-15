import React, { useCallback, useContext } from "react";

import { MergeBoardVisualization } from "Components/MergeBoardVisualization";
import { CellEditor } from "Components/CellEditor";
import { MergeBoard } from "State/Types";
import { MergeBoardProvider } from "State/MergeBoardReducer";
import {
    MergeBoardInspectorActionType,
    MergeBoardInspectorDispatch,
    MergeBoardInspectorProvider,
} from "State/MergeBoardInspectorReducer";

import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import "./App.scss";

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
