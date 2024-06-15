import React, { useContext, useId } from "react";

import { MergeBoardContext } from "State/MergeBoardReducer";
import { MergeBoardCell } from "Components/MergeBoardCell";

import "./MergeBoardVisualization.scss";

export function MergeBoardVisualization() {
    const mergeBoardState = useContext(MergeBoardContext);

    if (mergeBoardState === null) {
        throw new Error(
            "MergeBoardVisualization must be used with MergeBoardContext.Provider"
        );
    }

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
