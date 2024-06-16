// Types were generated from the assingment json using quicktype vscode plugin

export interface MergeBoard {
    width: number;
    height: number;
    boardId: string;
    items: Array<Item | null>;
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
