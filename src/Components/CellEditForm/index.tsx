import React, { useCallback } from "react";

import { Paper, Box, Divider, FormGroup, Button } from "@mui/material";

import { MergeBoardInspectorContext } from "State/MergeBoardInspectorReducer";
import {
    MergeBoardDispatch,
    MergeBoardContext,
    MergeBoardActionType,
} from "State/MergeBoardReducer";
import { Item } from "State/Types";
import { useRequiredContext } from "Utils/useRequiredContext";

// private components only intended to be used in the cell editor are organised in to the SubComponents folder
import { ItemChainSelect } from "./SubComponents/ItemChainSelect";
import { ItemLevelSlider } from "./SubComponents/ItemLevelSlider";
import { InBubbleCheckbox } from "./SubComponents/InBubbleCheckbox";
import { HiddenCheckbox } from "./SubComponents/HiddenCheckbox";
import { PausedUntilDatePicker } from "./SubComponents/PausedUntilDatePicker";
import { CellEditFormHeading } from "./SubComponents/CellEditFormHeading";

import "./CellEditForm.scss";

interface CellEditFormProps {
    item: Item;
}

export function CellEditForm({ item }: CellEditFormProps) {
    const inspectorState = useRequiredContext(MergeBoardInspectorContext);
    const mergeBoardDispatch = useRequiredContext(MergeBoardDispatch);
    const mergeBoardState = useRequiredContext(MergeBoardContext);

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

    const chainLevelBounds = mergeBoardState.itemChainLevelBounds;

    // No need to make level editable if the chain the item is in only has 1 level
    const showLevelSlider = item
        ? chainLevelBounds[item.chainId].min <
          chainLevelBounds[item.chainId].max
        : false;

    return (
        <Paper variant="outlined">
            <Box padding={2}>
                {inspectorState.selectedCellIndex !== null && (
                    <CellEditFormHeading item={item} />
                )}
                <Divider sx={{ marginY: 1 }} />
                <FormGroup sx={{ padding: 1 }}>
                    <ItemChainSelect item={item} />
                    {showLevelSlider ? (
                        <ItemLevelSlider item={item} />
                    ) : (
                        <p>Level {item.itemLevel}</p>
                    )}
                    <InBubbleCheckbox item={item} />
                    <HiddenCheckbox item={item} />
                    <PausedUntilDatePicker item={item} />
                </FormGroup>

                <Divider sx={{ marginY: 1 }} />
                <Button variant="outlined" onClick={handleDelete}>
                    Delete item
                </Button>
            </Box>
        </Paper>
    );
}
