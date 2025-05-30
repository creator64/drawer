import { throttle } from 'lodash';
import { useLayoutEffect, useMemo, useState } from 'react';
import { DefaultSpinner, Tldraw, createTLStore, getSnapshot, loadSnapshot } from 'tldraw';
import 'tldraw/tldraw.css';

const PERSISTENCE_KEY = 'example-3';

export default function Drawer() {
  const store = useMemo(() => createTLStore(), []);
  const [loadingState, setLoadingState] = useState<
    { status: 'loading' } | { status: 'ready' } | { status: 'error'; error: string }
  >({
    status: 'loading',
  });

  useLayoutEffect(() => {
    setLoadingState({ status: 'loading' });

    // Get persisted data from local storage
    const persistedSnapshot = localStorage.getItem(PERSISTENCE_KEY);

    if (persistedSnapshot) {
      try {
        const snapshot = JSON.parse(persistedSnapshot);
        loadSnapshot(store, snapshot);
        setLoadingState({ status: 'ready' });
      } catch (error: any) {
        setLoadingState({ status: 'error', error: error.message }); // Something went wrong
      }
    } else {
      setLoadingState({ status: 'ready' }); // Nothing persisted, continue with the empty store
    }

    // Each time the store changes, run the (debounced) persist function
    const cleanupFn = store.listen(
      throttle(() => {
        const snapshot = getSnapshot(store);
        localStorage.setItem(PERSISTENCE_KEY, JSON.stringify(snapshot));
      }, 500)
    );

    return () => {
      cleanupFn();
    };
  }, [store]);

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

  return (
    <div className="tldraw__editor">
      <Tldraw store={store} />
    </div>
  );
}

// export default function Drawer() {
//   return (
//     <div style={{ position: 'fixed', inset: 0 }}>
//       <Tldraw />
//     </div>
//   );
// }
