import { useEffect, useState } from 'react';
import { EDirent } from '@lib/types';
import { ExplorerEntry } from './entry';
import FolderBreadcrumbs from './navigator';
import { useDrawingPath } from '../../context/drawing-path-context';

export const Explorer = () => {
  const basePath = import.meta.env.VITE_BASE_PATH;
  const [entries, setEntries] = useState<EDirent[]>([]);
  const [currentPath, setCurrentPath] = useState<EDirent[]>([]);
  const { setDrawingPath } = useDrawingPath();

  const handleOnDirentOpen = (dirent: EDirent) => {
    if (dirent.isDirectory) setCurrentPath((currentPath) => [...currentPath, dirent]);
    else window.path.join(dirent.path, dirent.name).then(setDrawingPath);
  };

  const handleOnDirentNavigate = (dirent: EDirent | 'home', position: number) => {
    if (dirent == 'home') setCurrentPath([]);
    else setCurrentPath((currentPath) => currentPath.slice(0, position));
  };

  useEffect(() => {
    window.path.join(basePath, ...currentPath.map((e) => e.name)).then((result) =>
      window.fs
        .readDirectory(result)
        .then((entries) => {
          const sortedEntries = entries.sort((e1, e2) => {
            if (e1.isDirectory && !e2.isDirectory) return -1;
            if (e2.isDirectory && !e1.isDirectory) return 1;
            return 0;
          });
          setEntries(sortedEntries);
        })
        .catch(() => {
          // TODO: Error handling
        })
    );
  }, [currentPath]);

  return (
    <div>
      <FolderBreadcrumbs currentPath={currentPath} onDirentClick={handleOnDirentNavigate} />
      {entries.map((e, index) => (
        <ExplorerEntry dirent={e} onDirentClick={handleOnDirentOpen} key={index} />
      ))}
    </div>
  );
};
