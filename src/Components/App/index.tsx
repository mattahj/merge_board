import React, { useCallback, useContext, useRef } from "react";

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
import { CssBaseline, createTheme } from "@mui/material";
import { ThemeProvider } from "@emotion/react";
import { useRequiredContext } from "Utils/useRequiredContext";

interface Props {
    initialData: MergeBoard;
    initialSelection?: number | null;
}

const darkTheme = createTheme({
    palette: {
        mode: "dark",
    },
});

export function App({ initialData, initialSelection = null }: Props) {
    return (
        <ThemeProvider theme={darkTheme}>
            <CssBaseline />
            <MergeBoardProvider initialData={initialData}>
                <MergeBoardInspectorProvider
                    initialSelection={initialSelection}
                >
                    <AppContent />
                </MergeBoardInspectorProvider>
            </MergeBoardProvider>
        </ThemeProvider>
    );
}

// Seperate private component for MergeBoardInspectorDispatch context access
// This is so current selection can be cleared when clicking outside of the grid
function AppContent() {
    const inspectorDispatch = useRequiredContext(MergeBoardInspectorDispatch);
    const appRef = useRef(null);
    const clearSelection = useCallback(
        (evt: React.MouseEvent<HTMLDivElement>) => {
            // Only clicks directly on the app background, not on form or whatever elements
            if (evt.target === appRef?.current) {
                inspectorDispatch({
                    type: MergeBoardInspectorActionType.ClearSelection,
                });
            }
        },
        [inspectorDispatch]
    );

    return (
        <div className="app" onMouseDown={clearSelection} ref={appRef}>
            <MergeBoardVisualization />
            <CellEditor />
        </div>
    );
}
