import React from "react";

import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

interface CellAddFormLevelSliderProps {
    handlePendingItemLevelChange: (
        evt: React.ChangeEvent<HTMLInputElement>
    ) => void;
    pendingItemLevel: number;
}

export function CellAddFormLevelSelect({
    handlePendingItemLevelChange,
    pendingItemLevel,
}: CellAddFormLevelSliderProps) {
    const selectableLevels = new Array(10).fill(0).map((_, i) => i + 1);

    return (
        <FormControl>
            <InputLabel id="item-add-level">Item Level</InputLabel>
            <Select
                labelId="item-add-level"
                label="Item Level"
                onChange={handlePendingItemLevelChange}
                value={pendingItemLevel}
            >
                {selectableLevels.map((lvl) => (
                    <MenuItem value={lvl} key={lvl}>
                        {lvl}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
}
