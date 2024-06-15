import React, { useContext } from "react";

import "./CellEditor.scss";
import { MergeBoardInspectorContext } from "State/MergeBoardInspectorReducer";
import { MergeBoardContext } from "State/MergeBoardReducer";

export function CellEditor() {
    const inspectorState = useContext(MergeBoardInspectorContext);

    if (inspectorState === null) {
        throw new Error(
            "CellEditor must be used with MergeBoardInspectorContext.Provider"
        );
    }

    const mergeBoardState = useContext(MergeBoardContext);

    if (mergeBoardState === null) {
        throw new Error(
            "CellEditor must be used with MergeBoardContext.Provider"
        );
    }

    const item =
        inspectorState.selectedCellIndex !== null
            ? mergeBoardState.items[inspectorState.selectedCellIndex]
            : null;

    return (
        <div className="cell-editor">
            <div>Selected Cell index: {inspectorState.selectedCellIndex}</div>
            <div>Item ID: {item?.itemId}</div>
            <div>Item Type: {item?.itemType}</div>
            <div>Item Level: {item?.itemLevel}</div>
            <div>Move items by dragging them to a new position</div>
        </div>
    );
}
