import React from "react";

import { FormControlLabel, Slider } from "@mui/material";

interface CellAddFormLevelSliderProps {
    handlePendingItemLevelChange: (
        evt: React.ChangeEvent<HTMLInputElement>
    ) => void;
    pendingItemLevel: number;
}

export function CellAddFormLevelSlider({
    handlePendingItemLevelChange,
    pendingItemLevel,
}: CellAddFormLevelSliderProps) {
    return (
        <FormControlLabel
            label="Level"
            labelPlacement="top"
            onChange={handlePendingItemLevelChange}
            sx={{
                alignItems: "flex-start",
                margin: 0,
            }}
            control={
                <Slider
                    marks
                    valueLabelDisplay="auto"
                    min={1}
                    max={10}
                    step={1}
                    value={pendingItemLevel}
                />
            }
        />
    );
}
