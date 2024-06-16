import React from "react";

import { Item } from "State/Types";

export function CellEditFormHeading({ item }: { item: Item }) {
    return (
        <div className="cell-editor-heading">
            <div
                className="cell-editor-heading__item"
                style={{
                    backgroundImage: `url(public/images/${item.itemType}.webp)`,
                }}
            />
            <h3 style={{ margin: 0 }}>{item.itemType}</h3>
        </div>
    );
}
