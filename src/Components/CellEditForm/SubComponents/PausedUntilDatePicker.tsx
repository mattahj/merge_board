import React, { useCallback } from "react";

import { formatISO } from "date-fns";

import { FormControlLabel } from "@mui/material";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";

import { MergeBoardInspectorContext } from "State/MergeBoardInspectorReducer";
import {
    MergeBoardDispatch,
    MergeBoardActionType,
} from "State/MergeBoardReducer";
import { Item } from "State/Types";
import { useRequiredContext } from "Utils/useRequiredContext";

interface PausedUntilDatePickerProps {
    item: Item;
}
export function PausedUntilDatePicker({ item }: PausedUntilDatePickerProps) {
    const mergeBoardDispatch = useRequiredContext(MergeBoardDispatch);
    const inspectorState = useRequiredContext(MergeBoardInspectorContext);

    const handlePauseTimeChange = useCallback(
        (newDateValue) => {
            mergeBoardDispatch({
                type: MergeBoardActionType.EditItem,
                itemIndex: inspectorState.selectedCellIndex,
                pausedUntil:
                    newDateValue !== null
                        ? formatISO(newDateValue)
                        : newDateValue,
            });
        },
        [mergeBoardDispatch, inspectorState]
    );

    return (
        <FormControlLabel
            label="Paused Until"
            control={
                <DateTimePicker
                    slotProps={{
                        actionBar: {
                            actions: ["clear"],
                        },
                    }}
                    value={
                        item.pausedUntil !== null
                            ? new Date(item.pausedUntil)
                            : null
                    }
                    onChange={handlePauseTimeChange}
                />
            }
        />
    );
}