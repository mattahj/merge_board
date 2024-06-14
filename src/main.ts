import { createRoot } from 'react-dom/client';
import { MergeBoard } from './Components/MergeBoard';

const rootElement = document.getElementById('root');
if (rootElement) {
    const reactRoot = createRoot(rootElement);
    reactRoot.render(MergeBoard());
}
