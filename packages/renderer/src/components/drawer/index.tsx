import { useLayoutEffect, useState } from 'react';
import { Drawing } from '../../lib/vault/types';
import { Vault } from '../../lib/vault';
import Editor from './editor';

export const Drawer = ({ drawingPath }: { drawingPath: string }) => {
  const [drawing, setDrawing] = useState<Drawing | null>(null);
  const vault = new Vault();

  useLayoutEffect(() => {
    vault.openDrawing(drawingPath).then(setDrawing);
  }, [drawingPath]);

  return drawing == null ? (
    <div>Kies een drawing</div>
  ) : (
    <Editor drawing={drawing} key={drawingPath} /> // TODO: Hier verder gaan, Editor stack verdwijnt niet
  );
};
