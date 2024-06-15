import React from "react";

import { MergeBoardVisualization } from "Components/MergeBoardVisualization";
import { CellEditor } from "Components/CellEditor";
import { MergeBoard } from "State/Types";
import { MergeBoardProvider } from "State/MergeBoardReducer";

import "./App.scss";

interface Props {
    initialData: MergeBoard;
}

export function App({ initialData }: Props) {
    return (
        <MergeBoardProvider initialData={initialData}>
            <div className="app">
                <MergeBoardVisualization />
                <CellEditor />
            </div>
        </MergeBoardProvider>
    );
}
