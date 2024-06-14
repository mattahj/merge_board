import { MergeBoardActionType, MergeBoardInitAction, mergeBoardReducer } from "./MergeBoardReducer";
import { MergeBoard, Visibility } from "./Types";

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
});