import React, { useCallback } from "react";

import { FormControlLabel, Select, MenuItem } from "@mui/material";

import { MergeBoardInspectorContext } from "State/MergeBoardInspectorReducer";
import {
    MergeBoardDispatch,
    MergeBoardContext,
    MergeBoardActionType,
} from "State/MergeBoardReducer";
import { Item } from "State/Types";
import { useRequiredContext } from "Utils/useRequiredContext";

interface ItemChainSelectProps {
    item: Item;
}

export function ItemChainSelect({ item }: ItemChainSelectProps) {
    const mergeBoardState = useRequiredContext(MergeBoardContext);
    const mergeBoardDispatch = useRequiredContext(MergeBoardDispatch);
    const inspectorState = useRequiredContext(MergeBoardInspectorContext);

    const handleItemChainChange = useCallback(
        (evt: React.ChangeEvent<HTMLInputElement>) => {
            if (inspectorState.selectedCellIndex !== null) {
                mergeBoardDispatch({
                    type: MergeBoardActionType.EditItem,
                    itemIndex: inspectorState.selectedCellIndex,
                    chainId: evt.target.value,
                });
            }
        },
        [mergeBoardDispatch, inspectorState]
    );

    return (
        <FormControlLabel
            label="Item Chain"
            control={
                <Select
                    size="small"
                    value={item?.chainId}
                    onChange={handleItemChainChange}
                >
                    {mergeBoardState?.availableItemChains.map((chainId) => (
                        <MenuItem value={chainId} key={chainId}>
                            {chainId}
                        </MenuItem>
                    ))}
                </Select>
            }
        />
    );
}