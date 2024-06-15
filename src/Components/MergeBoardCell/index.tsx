import React, { useCallback, useContext } from "react";

import { Item } from "State/Types";

import "./MergeBoardCell.scss";
import {
    MergeBoardInspectorActionType,
    MergeBoardInspectorDispatch,
} from "State/MergeBoardInspectorReducer";

interface Props {
    item: Item | null;
    cellIndex: number;
}

export function MergeBoardCell({ item, cellIndex }: Props) {
    const inspectorDispatch = useContext(MergeBoardInspectorDispatch);

    if (inspectorDispatch === null) {
        throw new Error(
            "MergeBoardCell must be used with MergeBoardInspectorDispatch.Provider"
        );
    }

    const handleClick = useCallback(
        (evt: React.MouseEvent<HTMLDivElement>) => {
            evt.stopPropagation();
            inspectorDispatch({
                type: MergeBoardInspectorActionType.SetCell,
                cellIndex,
            });
        },
        [inspectorDispatch]
    );

    return (
        <div className="merge-board-cell" onClick={handleClick}>
            {item ? item.itemId : "empty"}
        </div>
    );
}
