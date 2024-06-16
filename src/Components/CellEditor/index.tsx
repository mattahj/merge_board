import React, { useCallback, useMemo, useState } from "react";

import { formatISO } from "date-fns";

import Button from "@mui/material/Button";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFnsV3";
import {
    Alert,
    Box,
    Checkbox,
    Divider,
    FormControlLabel,
    FormGroup,
    Input,
    MenuItem,
    Paper,
    Select,
} from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

import { MergeBoardInspectorContext } from "State/MergeBoardInspectorReducer";
import {
    MergeBoardActionType,
    MergeBoardContext,
    MergeBoardDispatch,
} from "State/MergeBoardReducer";
import { useRequiredContext } from "Utils/useRequiredContext";

import "./CellEditor.scss";

import { Item, Visibility } from "State/Types";

// Cell Editor is responsible for showing information about a cell in
// the merge board and letting the user edit it.
// When editing an item the user can only edit the following fields:
//
// - chainID
// - itemLevel
// - pausedUntil
// - visibility
// - isInsideBubble
//
// itemType is not editable because the item type is derived from the
// combination of chainID and itemLevel.
//
// createdAt is not editable because it seems like it should be only able to set when creating items.
//
// itemId is not editable because it is automatically generated when creating items.
// (note: there were duplicates in the data for itemID, so none of the code in
// this app actually cares about it. Not sure if it's meant to be a UID for
// each item or points to something external (e.g. entity archetype used to spawn the item?))
export function CellEditor() {
    const inspectorState = useRequiredContext(MergeBoardInspectorContext);
    const mergeBoardDispatch = useRequiredContext(MergeBoardDispatch);
    const mergeBoardState = useRequiredContext(MergeBoardContext);

    const item =
        inspectorState.selectedCellIndex !== null
            ? mergeBoardState.items[inspectorState.selectedCellIndex]
            : null;

    const handleDelete = useCallback(() => {
        if (
            inspectorState.selectedCellIndex !== null &&
            mergeBoardState.items[inspectorState.selectedCellIndex] !== null
        ) {
            mergeBoardDispatch({
                type: MergeBoardActionType.RemoveItem,
                itemIndex: inspectorState.selectedCellIndex,
            });
        }
    }, [mergeBoardDispatch, inspectorState, mergeBoardState]);

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

    const availableItemChains = useMemo(
        () => {
            console.log("deriving item types");
            return mergeBoardState.items.reduce(
                (accum: string[], item: Item | null) => {
                    if (item && !accum.includes(item.chainId)) {
                        accum.push(item.chainId);
                    }
                    return accum;
                },
                []
            );
        },
        // Intentionally empty because the items chains should only be derived once at startup.
        // In a real app I would assume we can query available item chains from some endpoint
        []
    );

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

    const [showClickTutorial, setShowClickTutorial] = useState(true);
    const onClickTutorialClosed = useCallback(() => {
        setShowClickTutorial(false);
    }, [setShowClickTutorial]);

    const [showMoveTutorial, setshowMoveTutorial] = useState(true);
    const onMoveTutorialClosed = useCallback(() => {
        setshowMoveTutorial(false);
    }, [setshowMoveTutorial]);

    return (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
            <Box minWidth={460} alignItems={"flex-start"}>
                {showClickTutorial && (
                    <Alert
                        severity="info"
                        className="cell-editor-tutorial"
                        onClose={onClickTutorialClosed}
                    >
                        Click on a cell to select
                    </Alert>
                )}
                {showMoveTutorial && (
                    <Alert
                        severity="info"
                        className="cell-editor-tutorial"
                        onClose={onMoveTutorialClosed}
                    >
                        Click and drag to move items
                    </Alert>
                )}

                {item && (
                    <Paper variant="outlined">
                        <Box padding={2}>
                            {inspectorState.selectedCellIndex !== null && (
                                <div className="cell-editor-heading">
                                    <div
                                        className="cell-editor-heading__item"
                                        style={{
                                            backgroundImage: `url(public/images/${item.itemType}.webp)`,
                                        }}
                                    />
                                    <h3 style={{ margin: 0 }}>
                                        {item.itemType}
                                    </h3>
                                </div>
                            )}
                            <Divider sx={{ marginY: 1 }} />

                            <FormGroup>
                                <FormControlLabel
                                    label="Item Chain"
                                    control={
                                        <Select
                                            size="small"
                                            value={item?.chainId}
                                            onChange={handleItemChainChange}
                                        >
                                            {availableItemChains.map(
                                                (chainId) => (
                                                    <MenuItem
                                                        value={chainId}
                                                        key={chainId}
                                                    >
                                                        {chainId}
                                                    </MenuItem>
                                                )
                                            )}
                                        </Select>
                                    }
                                />
                                <FormControlLabel
                                    label="Level"
                                    onChange={handleItemLevelChange}
                                    control={
                                        <Input
                                            required
                                            value={item?.itemLevel}
                                        />
                                    }
                                />
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
                                <FormControlLabel
                                    label="Hidden"
                                    control={
                                        <Checkbox
                                            checked={
                                                item?.visibility ===
                                                Visibility.Hidden
                                            }
                                            onChange={handleVisibilityChange}
                                            style={{
                                                marginLeft: -12,
                                            }}
                                        />
                                    }
                                />
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
                            </FormGroup>

                            <Divider sx={{ marginY: 1 }} />
                            <Button variant="outlined" onClick={handleDelete}>
                                Delete item
                            </Button>
                        </Box>
                    </Paper>
                )}
            </Box>
        </LocalizationProvider>
    );
}
