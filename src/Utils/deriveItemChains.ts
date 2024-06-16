import { Item, MergeBoard } from "State/Types";

export function deriveChainLevelRanges(mergeBoardState: MergeBoard) {
    return mergeBoardState.items.reduce(
        (
            accum: Record<string, { min: number; max: number }>,
            item: Item | null
        ) => {
            if (item) {
                if (!accum[item.chainId]) {
                    accum[item.chainId] = {
                        min: 1,
                        max: item.itemLevel,
                    };
                }
                if (accum[item.chainId].max < item.itemLevel) {
                    accum[item.chainId].max = item.itemLevel;
                }
            }
            return accum;
        },
        {}
    );
}

export function deriveAvailableItemChains(mergeBoardState: MergeBoard) {
    return mergeBoardState.items.reduce(
        (accum: string[], item: Item | null) => {
            if (item && !accum.includes(item.chainId)) {
                accum.push(item.chainId);
            }
            return accum;
        },
        []
    );
}
