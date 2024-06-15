import React, { useCallback, useContext } from "react";

import Button from "@mui/material/Button";

import { MergeBoardInspectorContext } from "State/MergeBoardInspectorReducer";
import {
    MergeBoardActionType,
    MergeBoardContext,
    MergeBoardDispatch,
} from "State/MergeBoardReducer";

import "./CellEditor.scss";

export function CellEditor() {
    const inspectorState = useContext(MergeBoardInspectorContext);
    if (inspectorState === null) {
        throw new Error(
            "CellEditor must be used with MergeBoardInspectorContext.Provider"
        );
    }

    const mergeBoardDispatch = useContext(MergeBoardDispatch);
    if (mergeBoardDispatch === null) {
        throw new Error(
            "CellEditor must be used with MergeBoardDispatch.Provider"
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

    const handleDelete = useCallback(() => {
        if (
            inspectorState.selectedCellIndex !== null &&
            mergeBoardState.items[inspectorState.selectedCellIndex] !== null
        ) {
            mergeBoardDispatch({
                type: MergeBoardActionType.RemoveItem,
                itemIndex: inspectorState.selectedCellIndex,
            });
        }
    }, [mergeBoardDispatch, inspectorState, mergeBoardState]);

    // TODO: edit cell form
    return (
        <div className="cell-editor">
            <div>Selected Cell index: {inspectorState.selectedCellIndex}</div>
            <div>Item ID: {item?.itemId}</div>
            <div>Item Type: {item?.itemType}</div>
            <div>Item Level: {item?.itemLevel}</div>
            <div>Move items by dragging them to a new position</div>
            {item ? <Button onClick={handleDelete}>Delete item</Button> : null}
        </div>
    );
}
