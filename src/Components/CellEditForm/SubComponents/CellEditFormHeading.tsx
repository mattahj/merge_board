import React from "react";

import { ItemIcon } from "Components/ItemIcon";
import { Item } from "State/Types";

export function CellEditFormHeading({ item }: { item: Item }) {
    return (
        <div className="cell-editor-heading">
            <ItemIcon
                itemType={item.itemType}
                className="cell-editor-heading__item"
            />
            <h3 style={{ margin: 0 }}>{item.itemType}</h3>
        </div>
    );
}
