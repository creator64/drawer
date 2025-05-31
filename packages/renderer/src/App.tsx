import Drawer from './components/drawer';
import { Explorer } from './components/explorer';
import './App.css';
import { VaultProvider } from './context/vault-context';

function App() {
  if (!window.fs)
    return (
      <div className={'text-center text-red-800 font-bold text-3xl'}>
        Deze applicatie wordt niet ondersteund in de browser
      </div>
    );

  return (
    <VaultProvider>
      <div className="grid h-screen grid-cols-[20%_80%]">
        <div className="overflow-auto">
          <Explorer />
        </div>
        <div className="h-full">
          <Drawer />
        </div>
      </div>
    </VaultProvider>
  );
}

export default App;
