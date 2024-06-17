import React from "react";

import { useTheme } from "@mui/material";

import { ItemIcon } from "Components/ItemIcon";
import { classList } from "Utils/classList";

export function MergeChainEntry({
    itemLevel,
    itemType,
    focusedLevel,
    index,
    mergeChain,
}) {
    const theme = useTheme();

    const conditionalClasses = classList({
        "merge-chain-vis__item--focused": itemLevel === focusedLevel,
    });
    const className = `merge-chain-vis__item ${conditionalClasses}`;
    const hideArrow = index === mergeChain.length - 1 || (index + 1) % 5 === 0;

    return (
        <>
            <ItemIcon itemType={itemType} className={className} />
            {!hideArrow && (
                <div
                    className="merge-chain-vis__arrow"
                    style={{
                        borderLeftColor: theme.palette.primary.main,
                    }}
                />
            )}
        </>
    );
}
