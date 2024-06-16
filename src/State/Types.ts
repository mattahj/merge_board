export interface MergeBoard {
    width: number;
    height: number;
    boardId: string;
    items: Array<Item | null>;
    itemChainLevelBounds?: Record<string, { min: number; max: number }>;
    availableItemChains?: string[];
}

export interface Item {
    itemId: number;
    itemType: string;
    chainId: string;
    pausedUntil: string | null;
    createdAt: string;
    visibility: Visibility;
    itemLevel: number;
    isInsideBubble: boolean;
}

export enum Visibility {
    Hidden = "hidden",
    Visible = "visible",
}
