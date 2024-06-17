import React from "react";

import { ItemIcon } from "Components/ItemIcon";
import { Item } from "State/Types";
import { Box, Divider, Typography } from "@mui/material";

export function CellEditFormHeading({ item }: { item: Item }) {
    const createdTime = new Date(item.createdAt);
    return (
        <Box className="cell-editor-heading">
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    marginBottom: 1,
                }}
            >
                <ItemIcon
                    itemType={item.itemType}
                    className="cell-editor-heading__item"
                />
                <Typography variant="h5">{item.itemType}</Typography>
            </Box>
            <Divider />

            <Box sx={{ padding: 1 }}>
                <Typography variant="subtitle1">
                    Created at {createdTime.toLocaleTimeString()} on{" "}
                    {createdTime.toLocaleDateString()}
                </Typography>
                <Typography variant="subtitle1">id: {item.itemId}</Typography>
            </Box>
        </Box>
    );
}
