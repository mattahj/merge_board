import React from "react";

import { Item } from "State/Types";

import "./MergeBoardCell.scss";

interface Props {
    item: Item;
}

export function MergeBoardCell({ item }: Props) {
    return <div className="merge-board-cell">{item.itemId}</div>;
}
