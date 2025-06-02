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
    const snapshot = getSnapshot(store);
    vault.saveDrawing(drawing, snapshot).catch((e) => console.error(e)); // TODO: Error handling
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
    const cleanupFn = store.listen(throttle(save, 500));

    setLoadingState({ status: 'ready' });

    return () => {
      cleanupFn();
    };
  }, [store, drawing]);

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
