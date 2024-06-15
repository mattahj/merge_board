import { createRoot } from "react-dom/client";
import { MergeBoardVisualization } from "./Components/MergeBoardVisualization";

const rootElement = document.getElementById("root");
if (rootElement) {
    const reactRoot = createRoot(rootElement);
    reactRoot.render(MergeBoardVisualization());
}
