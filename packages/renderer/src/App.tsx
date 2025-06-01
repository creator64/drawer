import { Explorer } from './components/explorer';
import './App.css';
import { useDrawingPath } from './context/drawing-path-context';
import { Drawer } from './components/drawer';

function App() {
  if (!window.fs)
    return (
      <div className={'text-center text-red-800 font-bold text-3xl'}>
        Deze applicatie wordt niet ondersteund in de browser
      </div>
    );
  const { drawingPath } = useDrawingPath();

  return (
    <div className="grid h-screen grid-cols-[20%_80%]">
      <div className="overflow-auto">
        <Explorer />
      </div>
      <div className="h-full">
        {drawingPath == undefined ? (
          <div>Kies een drawing</div>
        ) : (
          <Drawer drawingPath={drawingPath} />
        )}
      </div>
    </div>
  );
}

export default App;
