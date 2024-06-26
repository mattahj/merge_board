import React from "react";

import { MergeBoardContext } from "State/MergeBoardReducer";
import { MergeBoardCell } from "Components/MergeBoardCell";
import { useRequiredContext } from "Utils/useRequiredContext";

import "./MergeBoardVisualization.scss";

export function MergeBoardVisualization() {
    const mergeBoardState = useRequiredContext(MergeBoardContext);

    return (
        <div
            className="merge-board"
            style={{
                gridTemplateColumns: `repeat(${mergeBoardState.width}, 1fr)`,
                gridTemplateRows: `repeat(${mergeBoardState.height}, auto)`,
            }}
        >
            {mergeBoardState.items.map((item, cellIndex) => {
                return (
                    <MergeBoardCell
                        item={item}
                        cellIndex={cellIndex}
                        key={`${cellIndex}_${item ? item.itemId : "null"}`}
                    />
                );
            })}
        </div>
    );
}
