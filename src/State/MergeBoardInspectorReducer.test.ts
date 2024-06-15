import {
    MergeBoardInspector,
    MergeBoardInspectorActionType,
    mergeBoardInspectorReducer,
} from "./MergeBoardInspectorReducer";
import { getInitialBoardState } from "./MergeBoardReducer.test";
import { MergeBoard } from "./Types";

describe("Merge board inspect reducer", () => {
    let inspectorState: MergeBoardInspector;
    let mergeBoardState: MergeBoard;

    describe("set cell action", () => {
        beforeEach(() => {
            inspectorState = {
                selectedCellIndex: null,
            };
            mergeBoardState = getInitialBoardState();
        });

        it("should set the selected cell index to the value passed in the action", () => {
            const desiredCellIndex = 1;
            const desiredInspectorState: MergeBoardInspector = {
                selectedCellIndex: desiredCellIndex,
            };

            expect(
                mergeBoardInspectorReducer(inspectorState, {
                    type: MergeBoardInspectorActionType.SetCell,
                    cellIndex: desiredCellIndex,
                })
            ).toStrictEqual(desiredInspectorState);
        });
    });

    describe("clear cell action", () => {
        beforeEach(() => {
            inspectorState = {
                selectedCellIndex: 1,
            };
            mergeBoardState = getInitialBoardState();
        });

        it("should set the selected cell idnex to null", () => {
            const desiredInspectorState: MergeBoardInspector = {
                selectedCellIndex: null,
            };

            expect(
                mergeBoardInspectorReducer(inspectorState, {
                    type: MergeBoardInspectorActionType.ClearSelection,
                })
            ).toStrictEqual(desiredInspectorState);
        });
    });
});
