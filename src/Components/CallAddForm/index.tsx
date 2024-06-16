import React, { useCallback, useState } from "react";

import {
    Paper,
    Box,
    Divider,
    FormControlLabel,
    MenuItem,
    Select,
    Slider,
    Button,
    FormGroup,
} from "@mui/material";

import PostAddIcon from "@mui/icons-material/PostAdd";
import AddIcon from "@mui/icons-material/Add";

import { useRequiredContext } from "Utils/useRequiredContext";
import { MergeBoardInspectorContext } from "State/MergeBoardInspectorReducer";

import "./CellAddForm.scss";
import {
    MergeBoardActionType,
    MergeBoardDispatch,
} from "State/MergeBoardReducer";
import { deriveItemType } from "State/TestHelpers";
import { formatISO } from "date-fns";
import { Visibility } from "State/Types";

let idCount = 0;

// I'm not sure what item ID actually represents in the data, so just creating sequencial ids going backwards from INT_MAX.
// the item ID is not used for anything in the code, so not super important for this assingment.
function generateItemID() {
    return Number.MAX_SAFE_INTEGER - idCount--;
}

export function CellAddForm() {
    const inspectorState = useRequiredContext(MergeBoardInspectorContext);
    const mergeBoardDispatch = useRequiredContext(MergeBoardDispatch);
    const [pendingItemLevel, setPendingItemLevel] = useState(1);

    const handlePendingItemLevelChange = useCallback(
        (evt: React.ChangeEvent<HTMLInputElement>) => {
            const val = parseInt(evt.target.value);
            if (!Number.isNaN(val)) {
                setPendingItemLevel(val);
            }
        },
        [setPendingItemLevel]
    );

    const hardcodedItemChainToAdd = "BroomCabinet";
    const derivedItemType = deriveItemType(
        hardcodedItemChainToAdd,
        pendingItemLevel
    );

    const addItemHandler = useCallback(() => {
        mergeBoardDispatch({
            type: MergeBoardActionType.AddItem,
            destinationIndex: inspectorState.selectedCellIndex,
            item: {
                chainId: hardcodedItemChainToAdd,
                isInsideBubble: false,
                itemLevel: pendingItemLevel,
                itemType: derivedItemType,
                createdAt: formatISO(Date.now()),
                pausedUntil: null,
                visibility: Visibility.Visible,
                itemId: generateItemID(),
            },
        });
    }, [inspectorState, mergeBoardDispatch, pendingItemLevel, derivedItemType]);

    return (
        <Paper variant="outlined">
            <Box padding={2}>
                <div className="add-cell-heading">
                    <PostAddIcon
                        className="add-cell-heading__icon"
                        sx={{
                            width: 48,
                            height: 48,
                        }}
                    />
                    <h3 style={{ margin: 0 }}>Add Item</h3>
                </div>
                <p>
                    You can only add {hardcodedItemChainToAdd} items. It would
                    be trivial to update this to allow adding any item type
                    using MergeBoard::availableItemChains and a Select field!
                </p>
                <Divider sx={{ marginY: 1 }} />
                <FormGroup>
                    <div className="add-cell-preview">
                        <div
                            className="add-cell-preview__image"
                            style={{
                                backgroundImage: `url(public/images/${derivedItemType}.webp)`,
                            }}
                        />
                        <p>{derivedItemType}</p>
                    </div>
                    <FormControlLabel
                        label="Level"
                        onChange={handlePendingItemLevelChange}
                        control={
                            <Slider
                                marks
                                valueLabelDisplay="on"
                                size="small"
                                min={1}
                                max={10}
                                step={1}
                                value={pendingItemLevel}
                            />
                        }
                    />
                </FormGroup>
                <Divider sx={{ marginY: 1 }} />
                <Button
                    variant="outlined"
                    startIcon={<AddIcon />}
                    onClick={addItemHandler}
                >
                    Add
                </Button>
            </Box>
        </Paper>
    );
}
