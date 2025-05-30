import Drawer from './components/drawer';
import { Explorer } from './components/explorer';
import './App.css';

function App() {
  if (!window.fs)
    return (
      <div className={'text-center text-red-800 font-bold text-3xl'}>
        Deze applicatie wordt niet ondersteund in de browser
      </div>
    );

  return (
    <>
      {/*<Drawer />*/}
      <Explorer />
    </>
  );
}

export default App;
