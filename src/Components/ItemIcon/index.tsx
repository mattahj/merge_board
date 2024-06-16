import React from "react";

import "./ItemIcon.scss";

export function ItemIcon({ itemType, className = "" }) {
    return (
        <div
            className={`item-icon ${className}`}
            style={{
                backgroundImage: `url(public/images/${itemType}.webp)`,
            }}
        />
    );
}
