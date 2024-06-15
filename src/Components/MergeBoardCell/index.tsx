import React, { useCallback, useContext, useState } from "react";

import { Item } from "State/Types";

import "./MergeBoardCell.scss";
import {
    MergeBoardInspectorActionType,
    MergeBoardInspectorContext,
    MergeBoardInspectorDispatch,
} from "State/MergeBoardInspectorReducer";
import {
    MergeBoardActionType,
    MergeBoardDispatch,
} from "State/MergeBoardReducer";
import { classList } from "Utils/classList";

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

    const inspector = useContext(MergeBoardInspectorContext);
    if (inspector === null) {
        throw new Error(
            "MergeBoardCell must be used with MergeBoardInspectorContext.Provider"
        );
    }

    const mergeBoardDispatch = useContext(MergeBoardDispatch);
    if (mergeBoardDispatch === null) {
        throw new Error(
            "MergeBoardCell must be used with MergeBoardDispatch.Provider"
        );
    }

    const [dragging, setDragging] = useState(false);
    const [draggedOver, setDraggedOver] = useState(false);

    const handleClick = useCallback(
        (evt: React.MouseEvent<HTMLDivElement>) => {
            evt.stopPropagation();
            inspectorDispatch({
                type: MergeBoardInspectorActionType.SetCell,
                cellIndex,
            });
        },
        [inspectorDispatch, cellIndex]
    );

    const handleDrag = useCallback(
        (evt: React.DragEvent<HTMLDivElement>) => {
            if (item !== null) {
                evt.dataTransfer.setData("text/plain", cellIndex.toString());
                evt.dataTransfer.dropEffect = "move";
                setDragging(true);
            } else {
                evt.preventDefault();
            }
        },
        [cellIndex, item, setDragging]
    );

    const handleDrop = useCallback(
        (evt: React.DragEvent<HTMLDivElement>) => {
            const droppedItemIndex = parseInt(
                evt.dataTransfer.getData("text/plain"),
                10
            );
            if (!Number.isNaN(droppedItemIndex)) {
                inspectorDispatch({
                    type: MergeBoardInspectorActionType.SetCell,
                    cellIndex,
                });
                mergeBoardDispatch({
                    type: MergeBoardActionType.MoveItem,
                    itemIndex: droppedItemIndex,
                    destinationIndex: cellIndex,
                });
            }
        },
        [mergeBoardDispatch, inspectorDispatch, cellIndex]
    );

    const handleDragOver = useCallback(
        (evt: React.DragEvent<HTMLDivElement>) => {
            setDraggedOver(true);
            evt.preventDefault();
        },
        [setDraggedOver]
    );

    const handleDragLeave = useCallback(
        (evt: React.DragEvent<HTMLDivElement>) => {
            setDraggedOver(false);
        },
        [setDraggedOver]
    );

    const handleDragEnd = useCallback(() => {
        setDragging(false);
    }, [setDragging]);

    const isSelected = cellIndex === inspector.selectedCellIndex;
    const styles = item
        ? {
              backgroundImage: `url(public/images/${item.itemType}.webp)`,
          }
        : {};

    const conditionalClasses = classList({
        "merge-board-cell--drop-target": draggedOver,
        "merge-board-cell--dragging": dragging,
        "merge-board-cell--selected": isSelected,
    });

    return (
        <div
            className={`merge-board-cell ${conditionalClasses}`}
            onClick={handleClick}
            onDragStart={handleDrag}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDragEnd={handleDragEnd}
            style={styles}
            draggable
        >
            {item ? item.itemId : "empty"}
        </div>
    );
}
