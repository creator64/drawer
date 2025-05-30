import { throttle } from 'lodash';
import { useLayoutEffect, useMemo, useState } from 'react';
import { DefaultSpinner, Tldraw, createTLStore, getSnapshot, loadSnapshot } from 'tldraw';
import 'tldraw/tldraw.css';
import { useDrawingPath } from '../context/current-drawing-context';

const PERSISTENCE_KEY = 'example-3';

export default function Drawer() {
  const store = useMemo(() => createTLStore(), []);
  const { drawingPath } = useDrawingPath();

  const [loadingState, setLoadingState] = useState<
    { status: 'loading' } | { status: 'ready' } | { status: 'error'; error: string }
  >({
    status: 'loading',
  });

  const save = () => {
    const snapshot = getSnapshot(store);
    localStorage.setItem(PERSISTENCE_KEY, JSON.stringify(snapshot)); // TODO: Change
  };

  const handlePersistedSnapshot = (persistedSnapshot: string) => {
    if (persistedSnapshot) {
      try {
        const snapshot = JSON.parse(persistedSnapshot);
        loadSnapshot(store, snapshot);
        setLoadingState({ status: 'ready' });
      } catch (error: any) {
        setLoadingState({ status: 'error', error: error.message }); // Something went wrong
      }
    } else setLoadingState({ status: 'ready' }); // Nothing persisted, continue with the empty store
  };

  useLayoutEffect(() => {
    setLoadingState({ status: 'loading' });

    if (drawingPath == undefined) return;
    // Get persisted data from local storage
    window.fs
      .readFile(drawingPath)
      .then(handlePersistedSnapshot)
      .catch(() =>
        setLoadingState({ status: 'error', error: 'something went wrong with reading this file' })
      );

    // Each time the store changes, run the (debounced) persist function
    const cleanupFn = store.listen(throttle(save, 500));

    return () => {
      cleanupFn();
    };
  }, [store, drawingPath]);

  if (drawingPath == undefined) return <div>Kies een drawing</div>;

  if (loadingState.status === 'loading') {
    return (
      <div className="tldraw__editor">
        <h2>
          <DefaultSpinner />
        </h2>
      </div>
    );
  }

  if (loadingState.status === 'error') {
    return (
      <div className="tldraw__editor">
        <h2>Error!</h2>
        <p>{loadingState.error}</p>
      </div>
    );
  }

  return <Tldraw store={store} />;
}

// export default function Drawer() {
//   return (
//     <div style={{ position: 'fixed', inset: 0 }}>
//       <Tldraw />
//     </div>
//   );
// }
