import React, { useCallback, useState } from "react";

import Button from "@mui/material/Button";

import { MergeBoardInspectorContext } from "State/MergeBoardInspectorReducer";
import {
    MergeBoardActionType,
    MergeBoardContext,
    MergeBoardDispatch,
} from "State/MergeBoardReducer";
import { useRequiredContext } from "Utils/useRequiredContext";

import "./CellEditor.scss";
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
import { Visibility } from "State/Types";

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

    const [showClickTutorial, setShowClickTutorial] = useState(true);
    const onClickTutorialClosed = useCallback(() => {
        setShowClickTutorial(false);
    }, [setShowClickTutorial]);

    const [showMoveTutorial, setshowMoveTutorial] = useState(true);
    const onMoveTutorialClosed = useCallback(() => {
        setshowMoveTutorial(false);
    }, [setshowMoveTutorial]);

    return (
        <Box minWidth={450} alignItems={"flex-start"}>
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
                            <h3 style={{ margin: 0 }}>Edit Item Properties</h3>
                        )}
                        <Divider sx={{ marginY: 1 }} />
                        <FormGroup>
                            <FormControlLabel
                                label="ID"
                                className="cell-editor-form-row"
                                control={
                                    <Input required value={item?.itemId} />
                                }
                            />
                            <FormControlLabel
                                label="Type"
                                className="cell-editor-form-row"
                                control={
                                    <Select value={item?.itemType}>
                                        <MenuItem value={item?.itemType}>
                                            {item?.itemType}
                                        </MenuItem>
                                    </Select>
                                }
                            />
                            <FormControlLabel
                                label="Level"
                                className="cell-editor-form-row"
                                control={
                                    <Input required value={item?.itemLevel} />
                                }
                            />
                            <FormControlLabel
                                label="In Bubble"
                                className="cell-editor-form-row"
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
                                className="cell-editor-form-row"
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
                            <Divider sx={{ marginY: 1 }} />
                            <Button variant="outlined" onClick={handleDelete}>
                                Delete item
                            </Button>
                        </FormGroup>
                    </Box>
                </Paper>
            )}
        </Box>
    );
}
