import React, { useCallback, useState } from "react";

import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFnsV3";
import { Alert, Box } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

import { MergeBoardInspectorContext } from "State/MergeBoardInspectorReducer";
import { MergeBoardContext } from "State/MergeBoardReducer";
import { useRequiredContext } from "Utils/useRequiredContext";
import { CellEditForm } from "Components/CellEditForm";

import "./CellEditor.scss";

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
    const mergeBoardState = useRequiredContext(MergeBoardContext);

    const item =
        inspectorState.selectedCellIndex !== null
            ? mergeBoardState.items[inspectorState.selectedCellIndex]
            : null;

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
                {item && <CellEditForm item={item} />}
            </Box>
        </LocalizationProvider>
    );
}
