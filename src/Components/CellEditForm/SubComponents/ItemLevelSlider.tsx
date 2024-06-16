import React, { useCallback } from "react";

import { FormControlLabel, Slider } from "@mui/material";

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
export function ItemLevelSlider({ item }: ItemLevelSliderProps) {
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

    return (
        <FormControlLabel
            label="Level"
            onChange={handleItemLevelChange}
            control={
                <Slider
                    marks
                    valueLabelDisplay="on"
                    size="small"
                    min={mergeBoardState.itemChainLevelBounds[item.chainId].min}
                    max={mergeBoardState.itemChainLevelBounds[item.chainId].max}
                    step={1}
                    value={item.itemLevel}
                />
            }
        />
    );
}
