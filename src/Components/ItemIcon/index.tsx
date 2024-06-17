import React from "react";

import { Tooltip } from "@mui/material";

import "./ItemIcon.scss";

export function ItemIcon({ itemType, className = "", tooltip = true }) {
    const content = (
        <div
            className={`item-icon ${className}`}
            style={{
                backgroundImage: `url(public/images/${itemType}.webp)`,
            }}
        />
    );
    return tooltip ? <Tooltip title={itemType}>{content}</Tooltip> : content;
}
