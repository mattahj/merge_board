import React, { useCallback } from "react";

import { FormControlLabel, Checkbox } from "@mui/material";

import { MergeBoardInspectorContext } from "State/MergeBoardInspectorReducer";
import {
    MergeBoardDispatch,
    MergeBoardActionType,
} from "State/MergeBoardReducer";
import { Item, Visibility } from "State/Types";
import { useRequiredContext } from "Utils/useRequiredContext";

interface HiddenCheckboxProps {
    item: Item;
}
export function HiddenCheckbox({ item }: HiddenCheckboxProps) {
    const mergeBoardDispatch = useRequiredContext(MergeBoardDispatch);
    const inspectorState = useRequiredContext(MergeBoardInspectorContext);

    const handleVisibilityChange = useCallback(
        (event: React.ChangeEvent<HTMLInputElement>) => {
            if (inspectorState.selectedCellIndex !== null) {
                mergeBoardDispatch({
                    type: MergeBoardActionType.EditItem,
                    itemIndex: inspectorState.selectedCellIndex,
                    visibility: event.target.checked
                        ? Visibility.Hidden
                        : Visibility.Visible,
                });
            }
        },
        [mergeBoardDispatch, inspectorState]
    );

    return (
        <FormControlLabel
            label="Hidden"
            control={
                <Checkbox
                    checked={item.visibility === Visibility.Hidden}
                    onChange={handleVisibilityChange}
                    style={{
                        marginLeft: -12,
                    }}
                />
            }
        />
    );
}
