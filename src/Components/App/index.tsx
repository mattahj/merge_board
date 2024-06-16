import React from "react";

import { CssBaseline, createTheme } from "@mui/material";
import { ThemeProvider } from "@emotion/react";

import { MergeBoardVisualization } from "Components/MergeBoardVisualization";
import { CellEditor } from "Components/CellEditor";
import { MergeBoard } from "State/Types";
import { MergeBoardProvider } from "State/MergeBoardReducer";
import { MergeBoardInspectorProvider } from "State/MergeBoardInspectorReducer";
import { MergeChainVisualization } from "Components/MergeChainVisualization";

import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import "./App.scss";

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
                    <div className="app">
                        <CellEditor />
                        <MergeBoardVisualization />
                        <MergeChainVisualization />
                    </div>
                </MergeBoardInspectorProvider>
            </MergeBoardProvider>
        </ThemeProvider>
    );
}
