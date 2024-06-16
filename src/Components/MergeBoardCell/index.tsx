import React, { useCallback, useState } from "react";

import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import PauseCircleOutlineIcon from "@mui/icons-material/PauseCircleOutline";

import { Item, Visibility } from "State/Types";
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
import { useRequiredContext } from "Utils/useRequiredContext";
import { ItemIcon } from "Components/ItemIcon";

import "./MergeBoardCell.scss";

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

    const conditionalClasses = classList({
        "merge-board-cell--drop-target": draggedOver,
        "merge-board-cell--dragging": dragging,
        "merge-board-cell--odd": cellIndex % 2 !== 0,
    });

    const backgroundConditionalClasses = classList({
        "merge-board-cell__background--odd": cellIndex % 2 !== 0,
    });

    const isHidden = item?.visibility === Visibility.Hidden;
    const itemConditionalClasses = classList({
        "merge-board-cell__item--hidden": isHidden,
        "merge-board-cell__item--bubble": item?.isInsideBubble,
    });

    const isSelected = cellIndex === inspector.selectedCellIndex;

    return (
        <div
            className={`merge-board-cell ${conditionalClasses}`}
            onClick={handleClick}
            onDragStart={handleDrag}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDragEnd={handleDragEnd}
            draggable
        >
            <div
                className={`merge-board-cell__background ${backgroundConditionalClasses}`}
            />
            {item && (
                <ItemIcon
                    className={`merge-board-cell__item ${itemConditionalClasses}`}
                    itemType={item.itemType}
                />
            )}
            {item?.isInsideBubble && (
                <div className="merge-board-cell__bubble" />
            )}
            {isSelected && (
                <div className="merge-board-cell__selection-indicator">
                    <div className="merge-board-cell__selection-indicator__tl" />
                    <div className="merge-board-cell__selection-indicator__tr" />
                    <div className="merge-board-cell__selection-indicator__bl" />
                    <div className="merge-board-cell__selection-indicator__br" />
                </div>
            )}
            <div className="merge-board-cell__icons">
                {isHidden && (
                    <VisibilityOffIcon className="merge-board-cell__icons__icon" />
                )}
                {item && item.pausedUntil !== null && (
                    <PauseCircleOutlineIcon className="merge-board-cell__icons__icon" />
                )}
            </div>
        </div>
    );
}
