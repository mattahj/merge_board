import React, { useContext, useId } from "react";

import { MergeBoardContext } from "State/MergeBoardReducer";
import { MergeBoardCell } from "Components/MergeBoardCell";

import "./MergeBoardVisualization.scss";
import { useRequiredContext } from "Utils/useRequiredContext";

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
