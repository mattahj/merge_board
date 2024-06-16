import React, { useCallback, useContext, useState } from "react";

import { Item } from "State/Types";

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

import "./MergeBoardCell.scss";
import { useRequiredContext } from "Utils/useRequiredContext";

interface Props {
    item: Item | null;
    cellIndex: number;
}

export function MergeBoardCell({ item, cellIndex }: Props) {
    const inspectorDispatch = useRequiredContext(MergeBoardInspectorDispatch);
    const inspector = useRequiredContext(MergeBoardInspectorContext);
    const mergeBoardDispatch = useRequiredContext(MergeBoardDispatch);

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
                inspectorDispatch({
                    type: MergeBoardInspectorActionType.SetCell,
                    cellIndex,
                });
            } else {
                evt.preventDefault();
            }
        },
        [cellIndex, item, setDragging, inspectorDispatch]
    );

    const handleDrop = useCallback(
        (evt: React.DragEvent<HTMLDivElement>) => {
            const droppedItemIndex = parseInt(
                evt.dataTransfer.getData("text/plain"),
                10
            );
            if (!Number.isNaN(droppedItemIndex)) {
                mergeBoardDispatch({
                    type: MergeBoardActionType.MoveItem,
                    itemIndex: droppedItemIndex,
                    destinationIndex: cellIndex,
                });
                inspectorDispatch({
                    type: MergeBoardInspectorActionType.SetCell,
                    cellIndex,
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
        "merge-board-cell--odd": cellIndex % 2 !== 0,
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
            {item?.isInsideBubble && (
                <div className="merge-board-cell__bubble" />
            )}
            {isSelected && (
                <div className="merge-board-cell__selection-indicator" />
            )}
        </div>
    );
}
