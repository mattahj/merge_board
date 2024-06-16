import React, { useCallback } from "react";

import { FormControlLabel, Checkbox } from "@mui/material";

import { MergeBoardInspectorContext } from "State/MergeBoardInspectorReducer";
import {
    MergeBoardDispatch,
    MergeBoardActionType,
} from "State/MergeBoardReducer";
import { Item } from "State/Types";
import { useRequiredContext } from "Utils/useRequiredContext";

interface InBubbleCheckboxProps {
    item: Item;
}
export function InBubbleCheckbox({ item }: InBubbleCheckboxProps) {
    const mergeBoardDispatch = useRequiredContext(MergeBoardDispatch);
    const inspectorState = useRequiredContext(MergeBoardInspectorContext);

    const handleBubbleChange = useCallback(
        (event: React.ChangeEvent<HTMLInputElement>) => {
            if (inspectorState.selectedCellIndex !== null) {
                mergeBoardDispatch({
                    type: MergeBoardActionType.EditItem,
                    itemIndex: inspectorState.selectedCellIndex,
                    isInsideBubble: event.target.checked,
                });
            }
        },
        [mergeBoardDispatch, inspectorState]
    );

    return (
        <FormControlLabel
            label="In Bubble"
            control={
                <Checkbox
                    checked={item?.isInsideBubble}
                    onChange={handleBubbleChange}
                    style={{
                        marginLeft: -12,
                    }}
                />
            }
        />
    );
}
