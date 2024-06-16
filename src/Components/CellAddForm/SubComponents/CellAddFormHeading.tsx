import React from "react";

import PostAddIcon from "@mui/icons-material/PostAdd";

export function CellAddFormHeading({ hardcodedItemChainToAdd }) {
    return (
        <>
            <div className="add-cell-heading">
                <PostAddIcon
                    sx={{
                        width: 48,
                        height: 48,
                    }}
                    className="add-cell-heading__icon"
                />
                <h3 style={{ margin: 0 }}>Add Item</h3>
            </div>
            <p>
                You can only add {hardcodedItemChainToAdd} items because the
                assignment explicitly said that it should be like this.
            </p>
            <p>
                It would be trivial to update this to allow adding any item type
                using MergeBoard::availableItemChains and a Select field!
            </p>
        </>
    );
}
