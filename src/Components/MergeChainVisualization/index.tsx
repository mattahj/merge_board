import React, { useMemo } from "react";

import { Paper, Box, Divider, useTheme } from "@mui/material";
import CallMergeIcon from "@mui/icons-material/CallMerge";

import { deriveItemType } from "State/TestHelpers";
import { MergeBoardContext } from "State/MergeBoardReducer";
import { useRequiredContext } from "Utils/useRequiredContext";
import { ItemIcon } from "Components/ItemIcon";
import { classList } from "Utils/classList";
import { MergeBoardInspectorContext } from "State/MergeBoardInspectorReducer";

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

    const theme = useTheme();

    return (
        <Box width={460} alignItems={"flex-start"}>
            {showVisualization && (
                <Paper variant="outlined" className="merge-chain-vis">
                    <Box padding={2}>
                        <div className="merge-chain-vis__title">
                            <CallMergeIcon
                                sx={{
                                    width: 48,
                                    height: 48,
                                }}
                                className="merge-chain-vis__title__icon"
                            />
                            <h3 style={{ margin: 0 }}>
                                Merge chain for {chainId}
                            </h3>
                        </div>
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
                            {mergeChain.map(
                                ({ itemType, itemLevel }, index) => {
                                    const conditionalClasses = classList({
                                        "merge-chain-vis__item--focused":
                                            itemLevel === focusedLevel,
                                    });
                                    const className = `merge-chain-vis__item ${conditionalClasses}`;
                                    const hideArrow =
                                        index === mergeChain.length - 1 ||
                                        (index + 1) % 5 === 0;

                                    return (
                                        <>
                                            <ItemIcon
                                                itemType={itemType}
                                                className={className}
                                            />
                                            {!hideArrow && (
                                                <div
                                                    className="merge-chain-vis__arrow"
                                                    style={{
                                                        borderLeftColor:
                                                            theme.palette
                                                                .primary.main,
                                                    }}
                                                />
                                            )}
                                        </>
                                    );
                                }
                            )}
                        </Box>
                    </Box>
                </Paper>
            )}
        </Box>
    );
}
