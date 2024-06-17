import React from "react";

import "./ItemIcon.scss";
import { Tooltip } from "@mui/material";

export function ItemIcon({ itemType, className = "" }) {
    return (
        <Tooltip title={itemType}>
            <div
                className={`item-icon ${className}`}
                style={{
                    backgroundImage: `url(public/images/${itemType}.webp)`,
                }}
            />
        </Tooltip>
    );
}
