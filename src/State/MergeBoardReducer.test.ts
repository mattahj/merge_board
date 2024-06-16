import {
    MergeBoardActionType,
    MergeBoardInitAction,
    mergeBoardReducer,
} from "./MergeBoardReducer";
import { deriveItemType, getInitialBoardState } from "./TestHelpers";
import { Item, MergeBoard, Visibility } from "./Types";

describe("Merge board reducer", () => {
    describe("init action", () => {
        it("should overwrite the whole state with what was passed in from the action", () => {
            const previousState: MergeBoard = {
                boardId: "foo",
                height: 100,
                width: 200,
                items: [],
            };

            const newState: MergeBoard = {
                boardId: "bar",
                height: 10,
                width: 20,
                items: [
                    {
                        chainId: "",
                        isInsideBubble: false,
                        itemId: 1,
                        itemLevel: 1,
                        itemType: "",
                        createdAt: "2024-08-29T12:31:20.783Z",
                        pausedUntil: "2023-12-12T07:20:35.3010000Z",
                        visibility: Visibility.Visible,
                    },
                ],
            };

            const initAction: MergeBoardInitAction = {
                type: MergeBoardActionType.Init,
                initialState: newState,
            };

            expect(mergeBoardReducer(previousState, initAction)).toEqual(
                newState
            );
        });
    });

    describe("edit item action", () => {
        let initialBoardState: MergeBoard;

        beforeEach(() => {
            initialBoardState = getInitialBoardState();
        });

        it("should allow editing the chain ID & derive the item type", () => {
            const desiredState = getInitialBoardState();
            const indexToEdit = 1;
            const desiredItemState = desiredState.items[indexToEdit] as Item;
            const desiredChainId = "BroomCabinet";
            desiredItemState.chainId = desiredChainId;
            desiredItemState.itemType = deriveItemType(
                desiredChainId,
                desiredItemState.itemLevel
            );

            expect(
                mergeBoardReducer(initialBoardState, {
                    type: MergeBoardActionType.EditItem,
                    itemIndex: indexToEdit,
                    chainId: desiredChainId,
                })
            ).toStrictEqual(desiredState);
        });

        it("should allow editing the visibility", () => {
            const desiredState = getInitialBoardState();
            const indexToEdit = 2;
            const desiredItemState = desiredState.items[indexToEdit] as Item;
            const desiredVisibility = Visibility.Hidden;
            desiredItemState.visibility = desiredVisibility;

            expect(
                mergeBoardReducer(initialBoardState, {
                    type: MergeBoardActionType.EditItem,
                    itemIndex: indexToEdit,
                    visibility: desiredVisibility,
                })
            ).toStrictEqual(desiredState);
        });

        it("should allow editing the item level", () => {
            const desiredState = getInitialBoardState();
            const indexToEdit = 0;
            const desiredItemState = desiredState.items[indexToEdit] as Item;
            const desiredLevel = 999999;
            desiredItemState.itemLevel = desiredLevel;
            desiredItemState.itemType = deriveItemType(
                desiredItemState.chainId,
                desiredItemState.itemLevel
            );

            expect(
                mergeBoardReducer(initialBoardState, {
                    type: MergeBoardActionType.EditItem,
                    itemIndex: indexToEdit,
                    itemLevel: desiredLevel,
                })
            ).toStrictEqual(desiredState);
        });

        it("should allow editing the bubble state", () => {
            const desiredState = getInitialBoardState();
            const indexToEdit = 3;
            const desiredItemState = desiredState.items[indexToEdit] as Item;
            const desiredBubbleState = true;
            desiredItemState.isInsideBubble = desiredBubbleState;

            expect(
                mergeBoardReducer(initialBoardState, {
                    type: MergeBoardActionType.EditItem,
                    itemIndex: indexToEdit,
                    isInsideBubble: desiredBubbleState,
                })
            ).toStrictEqual(desiredState);
        });

        it("should allow editing paused until", () => {
            const desiredState = getInitialBoardState();
            const indexToEdit = 0;
            const desiredItemState = desiredState.items[indexToEdit] as Item;
            const pauseTime = null;
            desiredItemState.pausedUntil = pauseTime;

            expect(
                mergeBoardReducer(initialBoardState, {
                    type: MergeBoardActionType.EditItem,
                    itemIndex: indexToEdit,
                    pausedUntil: pauseTime,
                })
            ).toStrictEqual(desiredState);
        });

        it("should allow editing multiple properties at once", () => {
            const desiredState = getInitialBoardState();
            const indexToEdit = 3;
            const desiredItemState = desiredState.items[indexToEdit] as Item;
            desiredItemState.itemType = "Energy_05";
            desiredItemState.chainId = "Energy";
            desiredItemState.visibility = Visibility.Hidden;
            desiredItemState.itemLevel = 100000;
            desiredItemState.isInsideBubble = true;
            desiredItemState.itemType = deriveItemType(
                desiredItemState.chainId,
                desiredItemState.itemLevel
            );

            expect(
                mergeBoardReducer(initialBoardState, {
                    type: MergeBoardActionType.EditItem,
                    itemIndex: indexToEdit,
                    chainId: desiredItemState.chainId,
                    visibility: desiredItemState.visibility,
                    itemLevel: desiredItemState.itemLevel,
                    isInsideBubble: desiredItemState.isInsideBubble,
                })
            ).toStrictEqual(desiredState);
        });
    });

    describe("move item action", () => {
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
                mergeBoardReducer(initialBoardState, {
                    type: MergeBoardActionType.MoveItem,
                    itemIndex: sourceIndex,
                    destinationIndex: destIndex,
                })
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
                mergeBoardReducer(initialBoardState, {
                    type: MergeBoardActionType.MoveItem,
                    itemIndex: sourceIndex,
                    destinationIndex: destIndex,
                })
            ).toStrictEqual(desiredState);
        });
    });

    describe("remove item action", () => {
        let initialBoardState: MergeBoard;

        beforeEach(() => {
            initialBoardState = getInitialBoardState();
        });

        it("should set the target cell to null", () => {
            const desiredState = getInitialBoardState();
            const indexToRemove = 2;
            const removedItem = desiredState.items[indexToRemove] as Item;
            desiredState.items[indexToRemove] = null;

            expect(
                mergeBoardReducer(initialBoardState, {
                    type: MergeBoardActionType.RemoveItem,
                    itemIndex: indexToRemove,
                })
            ).toStrictEqual(desiredState);
        });
    });

    describe("add item action", () => {
        let initialBoardState: MergeBoard;

        beforeEach(() => {
            initialBoardState = getInitialBoardState();
        });

        it("should replace whatever is in the cell with the new item", () => {
            const desiredState = getInitialBoardState();
            const itemToAdd: Item = {
                itemId: 129,
                itemType: "Flowerpot_10",
                chainId: "Flowerpot",
                pausedUntil: null,
                createdAt: "1970-01-01T00:00:00.0000000Z",
                visibility: Visibility.Hidden,
                itemLevel: 10,
                isInsideBubble: false,
            };
            const indexToAddAt = 2;
            desiredState.items[indexToAddAt] = itemToAdd;

            expect(
                mergeBoardReducer(initialBoardState, {
                    type: MergeBoardActionType.AddItem,
                    destinationIndex: indexToAddAt,
                    item: { ...itemToAdd },
                })
            ).toStrictEqual(desiredState);
        });
    });
});
