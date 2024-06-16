import { Item, MergeBoard, Visibility } from "./Types";

export function deriveItemType(chainID: string, level: number) {
    return `${chainID}_${level.toString().padStart(2, "0")}`;
}

export const getInitialBoardState = (): MergeBoard => ({
    boardId: "edit_tests_board",
    height: 3,
    width: 3,
    items: [
        {
            itemId: 1173,
            itemType: "BroomCabinet_04",
            chainId: "BroomCabinet",
            pausedUntil: "2024-08-29T12:31:20.783Z",
            createdAt: "2023-12-07T09:48:41.2390000Z",
            visibility: Visibility.Visible,
            itemLevel: 4,
            isInsideBubble: false,
        },
        {
            itemId: 607,
            itemType: "Vase_08",
            chainId: "Vase",
            pausedUntil: null,
            createdAt: "2023-12-12T07:20:35.3010000Z",
            visibility: Visibility.Visible,
            itemLevel: 8,
            isInsideBubble: false,
        },
        {
            itemId: 1354,
            itemType: "PlantedBush_05",
            chainId: "PlantedBush",
            pausedUntil: null,
            createdAt: "2023-12-17T06:56:57.5560000Z",
            visibility: Visibility.Visible,
            itemLevel: 5,
            isInsideBubble: false,
        },
        {
            itemId: 7080,
            itemType: "LevelDownBoosterScissors_01",
            chainId: "LevelDownBoosterScissors",
            pausedUntil: null,
            createdAt: "2023-12-12T18:32:55.9850000Z",
            visibility: Visibility.Visible,
            itemLevel: 1,
            isInsideBubble: false,
        },
    ],
    itemChainLevelBounds: {
        LevelDownBoosterScissors: {
            min: 1,
            max: 1,
        },
        PlantedBush: {
            min: 1,
            max: 5,
        },
        Vase: {
            min: 1,
            max: 8,
        },
        BroomCabinet: {
            min: 1,
            max: 4,
        },
    },
});
