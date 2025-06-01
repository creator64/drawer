import { throttle } from 'lodash';
import { useLayoutEffect, useMemo, useState } from 'react';
import { DefaultSpinner, Tldraw, createTLStore, getSnapshot, loadSnapshot } from 'tldraw';
import 'tldraw/tldraw.css';
import { Drawing, InvalidDrawing } from '../../lib/vault/types';
import { Vault } from '../../lib/vault';

export default function Editor({ drawing }: { drawing: Drawing }) {
  const store = useMemo(() => createTLStore(), []);
  const vault = new Vault();

  const [loadingState, setLoadingState] = useState<
    { status: 'loading' } | { status: 'ready' } | { status: 'error'; error: string }
  >({
    status: 'loading',
  });

  const save = () => {
    if (drawing == null) return;
    const snapshot = getSnapshot(store);
    vault.saveDrawing(drawing, snapshot).catch(() => {}); // TODO: Error handling
  };

  const onOpenDrawing = (drawing: Drawing | null) => {
    setLoadingState({ status: 'loading' });
    if (drawing == null) return;
    if (drawing.isValid()) {
      try {
        loadSnapshot(store, drawing.snapshot);
      } catch (error: any) {
        setLoadingState({ status: 'error', error: error.message }); // Something went wrong
      }
    }
    // setDrawing(drawing);
    setLoadingState({ status: 'ready' });
  };

  useLayoutEffect(() => {
    setLoadingState({ status: 'loading' });
    if (drawing.isValid()) {
      try {
        loadSnapshot(store, drawing.snapshot);
      } catch (error: any) {
        setLoadingState({ status: 'error', error: error.message }); // Something went wrong
      }
    }
    // setDrawing(drawing);
    // const unsubscribe = vault.subscribe(onOpenDrawing);
    const cleanupFn = store.listen(throttle(save, 500));

    setLoadingState({ status: 'ready' });

    return () => {
      // unsubscribe();
      cleanupFn();
    };
  }, [store, drawing]);

  // useLayoutEffect(() => {
  //   setLoadingState({ status: 'loading' });
  //
  //   if (drawingPath == undefined) return;
  //   openDrawing(drawingPath).then(setDrawing);
  //   // Get persisted data from local storage
  //   // window.fs
  //   //   .readFile(drawingPath)
  //   //   .then(handlePersistedSnapshot)
  //   //   .catch(() =>
  //   //     setLoadingState({ status: 'error', error: 'something went wrong with reading this file' })
  //   //   );
  //
  //   // Each time the store changes, run the (debounced) persist function
  //   const cleanupFn = store.listen(throttle(save, 500));
  //
  //   return () => {
  //     cleanupFn();
  //   };
  // }, [store, drawingPath]);

  if (drawing == null) return <div>Kies een drawing</div>;

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

  if (!drawing.isValid()) {
    return (
      <div className="tldraw__editor">
        <h2>Error!</h2>
        <p>{(drawing as InvalidDrawing).reason}</p>
        <p>{(drawing as InvalidDrawing)?.error}</p>
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
