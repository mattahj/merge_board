import React, { useCallback, useState } from "react";
import { formatISO } from "date-fns";

import { Paper, Box, Divider, Button, FormGroup } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

import { useRequiredContext } from "Utils/useRequiredContext";
import { MergeBoardInspectorContext } from "State/MergeBoardInspectorReducer";
import {
    MergeBoardActionType,
    MergeBoardDispatch,
} from "State/MergeBoardReducer";
import { deriveItemType } from "State/TestHelpers";
import { Visibility } from "State/Types";
import { CellAddFormHeading } from "./SubComponents/CellAddFormHeading";
import { CellAddFormPreview } from "./SubComponents/CellAddFormPreview";
import { CellAddFormLevelSlider } from "./SubComponents/CellAddFormLevelSlider";

import "./CellAddForm.scss";

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
                <CellAddFormHeading
                    hardcodedItemChainToAdd={hardcodedItemChainToAdd}
                />
                <Divider sx={{ marginY: 1 }} />
                <FormGroup sx={{ padding: 1, gap: 2 }}>
                    <CellAddFormPreview derivedItemType={derivedItemType} />
                    <CellAddFormLevelSlider
                        handlePendingItemLevelChange={
                            handlePendingItemLevelChange
                        }
                        pendingItemLevel={pendingItemLevel}
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
