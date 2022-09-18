import { createRoot } from 'react-dom/client';
import { MainPage } from './MainPage'

import './index.css';

function App() {
  return (
    <MainPage/>
  );
}

const container = document.getElementById('root') as Element;
const root = createRoot(container);
root.render(<App />);
