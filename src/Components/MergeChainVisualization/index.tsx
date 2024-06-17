import React, { useMemo } from "react";

import { Paper, Box, Divider } from "@mui/material";
import CallMergeIcon from "@mui/icons-material/CallMerge";

import { deriveItemType } from "State/TestHelpers";
import { MergeBoardContext } from "State/MergeBoardReducer";
import { useRequiredContext } from "Utils/useRequiredContext";
import { MergeBoardInspectorContext } from "State/MergeBoardInspectorReducer";

import { MergeChainEntry } from "./SubComponents/MergeChainEntry";

import "./MergeChainVisualization.scss";

const isValidChain = ({ min, max }) => max - min >= 1;

export function MergeChainVisualization() {
    const mergeBoardState = useRequiredContext(MergeBoardContext);
    const inspectorState = useRequiredContext(MergeBoardInspectorContext);

    let showVisualization =
        inspectorState.selectedCellIndex !== null &&
        mergeBoardState.items[inspectorState.selectedCellIndex] !== null;

    const item = mergeBoardState.items[inspectorState.selectedCellIndex];
    const chainId = item?.chainId;
    const focusedLevel = item?.itemLevel;

    if (
        !mergeBoardState.itemChainLevelBounds ||
        !mergeBoardState.itemChainLevelBounds[chainId] ||
        !isValidChain(mergeBoardState.itemChainLevelBounds[chainId])
    ) {
        showVisualization = false;
    }

    const mergeChainBounds = mergeBoardState.itemChainLevelBounds[chainId];

    const mergeChain = useMemo(() => {
        const chainSteps = [];
        if (mergeChainBounds) {
            for (
                let itemLevel = mergeChainBounds.min;
                itemLevel <= mergeChainBounds.max;
                ++itemLevel
            ) {
                chainSteps.push({
                    itemType: deriveItemType(chainId, itemLevel),
                    itemLevel,
                });
            }
        }
        return chainSteps;
        // itemChainLevelBounds in mergeBoardState is assumed to never change, so no mergeBoardState in deps here
    }, [chainId, focusedLevel, mergeChainBounds]);

    return (
        <Box width={460} alignItems={"flex-start"}>
            {chainId && (
                <Paper variant="outlined" className="merge-chain-vis">
                    <Box padding={2}>
                        <Box
                            sx={{
                                display: "flex",
                                flexDirection: "row",
                                alignItems: "center",
                                justifyContent: "flex-start",
                            }}
                        >
                            <CallMergeIcon
                                sx={{
                                    width: 48,
                                    height: 48,
                                }}
                            />
                            <h3 style={{ margin: 0 }}>
                                Merge chain for {chainId}
                            </h3>
                        </Box>
                        <p>
                            Hover items in the chain to see their item type ID.
                        </p>
                        <Divider sx={{ marginY: 1 }} />
                        <Box
                            sx={{
                                display: "flex",
                                flexDirection: "row",
                                gap: 1,
                                flexWrap: "wrap",
                                alignItems: "center",
                                justifyContent: "center",
                            }}
                        >
                            {showVisualization ? (
                                mergeChain.map(
                                    ({ itemType, itemLevel }, index) => (
                                        <MergeChainEntry
                                            focusedLevel={focusedLevel}
                                            index={index}
                                            itemLevel={itemLevel}
                                            itemType={itemType}
                                            mergeChain={mergeChain}
                                            key={itemType}
                                        />
                                    )
                                )
                            ) : (
                                <p>
                                    This item has no other items in its merge
                                    chain.
                                </p>
                            )}
                        </Box>
                    </Box>
                </Paper>
            )}
        </Box>
    );
}
