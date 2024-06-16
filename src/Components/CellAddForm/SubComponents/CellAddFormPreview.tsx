import React from "react";

import { ItemIcon } from "Components/ItemIcon";

export function CellAddFormPreview({ derivedItemType }) {
    return (
        <div className="add-cell-preview">
            <ItemIcon
                itemType={derivedItemType}
                className="add-cell-preview__image"
            />
            <p>{derivedItemType}</p>
        </div>
    );
}
