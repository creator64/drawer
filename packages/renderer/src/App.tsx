import Drawer from './components/drawer';
import { Explorer } from './components/explorer';
import './App.css';
import { DrawingPathProvider } from './context/current-drawing-context';

function App() {
  if (!window.fs)
    return (
      <div className={'text-center text-red-800 font-bold text-3xl'}>
        Deze applicatie wordt niet ondersteund in de browser
      </div>
    );

  return (
    <DrawingPathProvider>
      <div className="grid h-screen grid-cols-[20%_80%]">
        <div className="overflow-auto">
          <Explorer />
        </div>
        <div className="h-full">
          <Drawer />
        </div>
      </div>
    </DrawingPathProvider>
  );
}

export default App;
