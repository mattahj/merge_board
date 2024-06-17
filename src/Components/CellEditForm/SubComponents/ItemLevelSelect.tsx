import React, { useCallback, useMemo } from "react";

import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

import { MergeBoardInspectorContext } from "State/MergeBoardInspectorReducer";
import {
    MergeBoardDispatch,
    MergeBoardContext,
    MergeBoardActionType,
} from "State/MergeBoardReducer";
import { Item } from "State/Types";
import { useRequiredContext } from "Utils/useRequiredContext";

interface ItemLevelSliderProps {
    item: Item;
}
export function ItemLevelSelect({ item }: ItemLevelSliderProps) {
    const mergeBoardState = useRequiredContext(MergeBoardContext);
    const mergeBoardDispatch = useRequiredContext(MergeBoardDispatch);
    const inspectorState = useRequiredContext(MergeBoardInspectorContext);

    const handleItemLevelChange = useCallback(
        (evt: React.ChangeEvent<HTMLInputElement>) => {
            const val = parseInt(evt.target.value);
            if (
                inspectorState.selectedCellIndex !== null &&
                !Number.isNaN(val)
            ) {
                mergeBoardDispatch({
                    type: MergeBoardActionType.EditItem,
                    itemIndex: inspectorState.selectedCellIndex,
                    itemLevel: parseInt(evt.target.value),
                });
            }
        },
        [mergeBoardDispatch, inspectorState]
    );

    const levelOptions = useMemo(() => {
        const levels = [];
        const { min, max } = mergeBoardState.itemChainLevelBounds[item.chainId];
        for (let lvl = min; lvl <= max; ++lvl) {
            levels.push(lvl);
        }
        return levels;
    }, [item]);

    return (
        <FormControl>
            <InputLabel id="item-level-edit">Item Level</InputLabel>
            <Select
                labelId="item-level-edit"
                label="Item Level"
                onChange={handleItemLevelChange}
                value={item.itemLevel}
            >
                {levelOptions.map((lvl) => (
                    <MenuItem value={lvl} key={lvl}>
                        {lvl}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
}
