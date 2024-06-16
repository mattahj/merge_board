import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { App } from "Components/App";
import { MergeBoard } from "State/Types";
import {
    deriveAvailableItemChains,
    deriveChainLevelRanges,
} from "Utils/deriveItemChains";

async function main() {
    try {
        const initialDataUrl = "public/assigment.json";
        const initialDataResponse = await fetch(initialDataUrl);
        const initialData: MergeBoard = await initialDataResponse.json();
        initialData.itemChainLevelBounds = deriveChainLevelRanges(initialData);
        initialData.availableItemChains =
            deriveAvailableItemChains(initialData);

        const rootElement = document.getElementById("root");
        if (rootElement) {
            const reactRoot = createRoot(rootElement);
            reactRoot.render(
                <StrictMode>
                    <App initialData={initialData} />
                </StrictMode>
            );
        } else {
            throw new Error("Root element for react application was not found");
        }
    } catch (error) {
        // Could handle different kinds of errors here
        // e.g. failed to fetch file, failed to parse JSON, etc
        // but for the purposes of this assingment it's not worth doing that
        console.error(error);
    }
}

main();
