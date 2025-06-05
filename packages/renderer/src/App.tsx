import { Explorer } from './components/explorer';
import './App.css';
import { useDrawingPath } from './context/drawing-path-context';
import { Drawer } from './components/drawer';
import { ExplorerOpenProvider } from './context/explorer-open-context';

function App() {
  if (!window.fs)
    return (
      <div className={'text-center text-red-800 font-bold text-3xl'}>
        Deze applicatie wordt niet ondersteund in de browser
      </div>
    );
  const { drawingPath } = useDrawingPath();

  return (
    <ExplorerOpenProvider>
      <div className="flex flex-row h-screen">
        <Explorer />
        <div className="w-full h-full">
          {drawingPath == undefined ? (
            <div>Kies een drawing</div>
          ) : (
            <Drawer drawingPath={drawingPath} key={drawingPath} />
          )}
        </div>
      </div>
    </ExplorerOpenProvider>
  );
}

export default App;
