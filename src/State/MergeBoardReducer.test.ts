import { MergeBoardActionType, MergeBoardInitAction, mergeBoardReducer } from "./MergeBoardReducer";
import { Item, MergeBoard, Visibility } from "./Types";

describe("Merge board reducer", () => {
    describe("init action", () => {
        it("should overwrite the whole state with what was passed in from the action", () => {
            const previousState: MergeBoard = {
                boardId: 'foo',
                height: 100,
                width: 200,
                items: [],
            };

            const newState: MergeBoard = {
                boardId: 'bar',
                height: 10,
                width: 20,
                items: [
                    {
                        chainId: '',
                        isInsideBubble: false,
                        itemId: 1,
                        itemLevel: 1,
                        itemType: '',
                        createdAt: new Date('2024-08-29T12:31:20.783Z'),
                        pausedUntil: new Date('2023-12-12T07:20:35.3010000Z'),
                        visibility: Visibility.Visible
                    }
                ],
            }

            const initAction: MergeBoardInitAction = { type: MergeBoardActionType.Init, initialState: newState };

            expect(
                mergeBoardReducer(previousState, initAction)
            ).toEqual(newState)
        });
    });

    const getInitialBoardState = (): MergeBoard => ({
        boardId: 'edit_tests_board',
        height: 3,
        width: 3,
        items: [
            {
                itemId: 1173,
                itemType: "BroomCabinet_04",
                chainId: "BroomCabinet",
                pausedUntil: new Date("2024-08-29T12:31:20.783Z"),
                createdAt: new Date("2023-12-07T09:48:41.2390000Z"),
                visibility: Visibility.Visible,
                itemLevel: 4,
                isInsideBubble: false
            },
            {
                itemId: 607,
                itemType: "Vase_08",
                chainId: "Vase",
                pausedUntil: null,
                createdAt: new Date("2023-12-12T07:20:35.3010000Z"),
                visibility: Visibility.Visible,
                itemLevel: 8,
                isInsideBubble: false
            },
            {
                itemId: 1354,
                itemType: "PlantedBush_05",
                chainId: "PlantedBush",
                pausedUntil: null,
                createdAt: new Date("2023-12-17T06:56:57.5560000Z"),
                visibility: Visibility.Visible,
                itemLevel: 5,
                isInsideBubble: false
            },
            {
                itemId: 7080,
                itemType: "LevelDownBoosterScissors_01",
                chainId: "LevelDownBoosterScissors",
                pausedUntil: null,
                createdAt: new Date("2023-12-12T18:32:55.9850000Z"),
                visibility: Visibility.Visible,
                itemLevel: 1,
                isInsideBubble: false
            },
        ],
    });

    describe("edit action", () => {

        let initialBoardState: MergeBoard;

        beforeEach(() => {
            initialBoardState = getInitialBoardState();
        });

        it("should allow editing the item type", () => {
            const desiredState = getInitialBoardState();
            const desiredItemState = desiredState.items[0] as Item;
            const desiredType = 'MaintenanceTools_10';
            desiredItemState.itemType = desiredType;

            expect(
                mergeBoardReducer(
                    initialBoardState,
                    {
                        type: MergeBoardActionType.EditItem,
                        itemId: desiredItemState.itemId,
                        itemType: desiredType
                    }
                )
            ).toStrictEqual(desiredState);
        });

        it("should allow editing the chain ID", () => {
            const desiredState = getInitialBoardState();
            const desiredItemState = desiredState.items[1] as Item;
            const desiredChainId = 'BroomCabinet';
            desiredItemState.chainId = desiredChainId;

            expect(
                mergeBoardReducer(
                    initialBoardState,
                    {
                        type: MergeBoardActionType.EditItem,
                        itemId: desiredItemState.itemId,
                        chainId: desiredChainId
                    }
                )
            ).toStrictEqual(desiredState);
        });

        it("should allow editing the visibility", () => {
            const desiredState = getInitialBoardState();
            const desiredItemState = desiredState.items[2] as Item;
            const desiredVisibility = Visibility.Hidden;
            desiredItemState.visibility = desiredVisibility;

            expect(
                mergeBoardReducer(
                    initialBoardState,
                    {
                        type: MergeBoardActionType.EditItem,
                        itemId: desiredItemState.itemId,
                        visibility: desiredVisibility
                    }
                )
            ).toStrictEqual(desiredState);
        });

        it("should allow editing the item level", () => {
            const desiredState = getInitialBoardState();
            const desiredItemState = desiredState.items[0] as Item;
            const desiredLevel = 999999;
            desiredItemState.itemLevel = desiredLevel;

            expect(
                mergeBoardReducer(
                    initialBoardState,
                    {
                        type: MergeBoardActionType.EditItem,
                        itemId: desiredItemState.itemId,
                        itemLevel: desiredLevel
                    }
                )
            ).toStrictEqual(desiredState);
        });

        it("should allow editing the bubble state", () => {
            const desiredState = getInitialBoardState();
            const desiredItemState = desiredState.items[3] as Item;
            const desiredBubbleState = true;
            desiredItemState.isInsideBubble = desiredBubbleState;

            expect(
                mergeBoardReducer(
                    initialBoardState,
                    {
                        type: MergeBoardActionType.EditItem,
                        itemId: desiredItemState.itemId,
                        isInsideBubble: desiredBubbleState
                    }
                )
            ).toStrictEqual(desiredState);
        });

        it("should allow editing multiple properties at once", () => {
            const desiredState = getInitialBoardState();
            const desiredItemState = desiredState.items[3] as Item;
            desiredItemState.itemType = 'Energy_05';
            desiredItemState.chainId = 'Energy';
            desiredItemState.visibility = Visibility.Hidden;
            desiredItemState.itemLevel = 100000;
            desiredItemState.isInsideBubble = true;

            expect(
                mergeBoardReducer(
                    initialBoardState,
                    {
                        type: MergeBoardActionType.EditItem,
                        itemId: desiredItemState.itemId,
                        itemType: desiredItemState.itemType,
                        chainId: desiredItemState.chainId,
                        visibility: desiredItemState.visibility,
                        itemLevel: desiredItemState.itemLevel,
                        isInsideBubble: desiredItemState.isInsideBubble
                    }
                )
            ).toStrictEqual(desiredState);
        });
    });

    describe("move action", () => {

        let initialBoardState: MergeBoard;

        beforeEach(() => {
            initialBoardState = getInitialBoardState();
        });

        it("should clear the previous cell if moving to an empty cell", () => {
            const sourceIndex = 3;
            const destIndex = 1;
            initialBoardState.items[destIndex] = null;
            const itemToMove = initialBoardState.items[sourceIndex] as Item;

            const desiredState = getInitialBoardState();
            desiredState.items[destIndex] = desiredState.items[sourceIndex];
            desiredState.items[sourceIndex] = null;

            expect(
                mergeBoardReducer(
                    initialBoardState,
                    {
                        type: MergeBoardActionType.MoveItem,
                        itemID: itemToMove.itemId,
                        destinationIndex: destIndex
                    }
                )
            ).toStrictEqual(desiredState);
        });

        it("should swap items if the destination cell is not empty", () => {
            const sourceIndex = 3;
            const destIndex = 1;
            const itemToMove = initialBoardState.items[sourceIndex] as Item;

            const desiredState = getInitialBoardState();
            const itemToSwap = desiredState.items[destIndex];
            desiredState.items[destIndex] = desiredState.items[sourceIndex];
            desiredState.items[sourceIndex] = itemToSwap;

            expect(
                mergeBoardReducer(
                    initialBoardState,
                    {
                        type: MergeBoardActionType.MoveItem,
                        itemID: itemToMove.itemId,
                        destinationIndex: destIndex
                    }
                )
            ).toStrictEqual(desiredState);
        });
    });

});