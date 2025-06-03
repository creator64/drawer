import React, { useEffect, useState } from 'react';
import { EDirent } from '@lib/types';
import { ExplorerEntry } from './entry';
import FolderBreadcrumbs from './folder-breadcrumbs';
import { useDrawingPath } from '../../context/drawing-path-context';
import { AddButtons } from './add-buttons';

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

  const loadEntries = () => {
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
  };

  useEffect(loadEntries, [currentPath]);

  const handleOnAddDirent = (type: 'file' | 'directory', name: string) => {
    if (type == 'directory')
      window.path.join(basePath, ...currentPath.map((e) => e.name), name).then((result) => {
        window.fs.createDirectory(result).then(loadEntries);
      });
  };

  return (
    <div className="explorer sidebar">
      {currentPath.length > 0 && (
        <FolderBreadcrumbs
          className="mb-4"
          currentPath={currentPath}
          onDirentClick={handleOnDirentNavigate}
        />
      )}
      <div className="explorer toolbar">
        <p style={{ color: 'hsl(204, 4%, 75%)' }}>Drawings</p>
        <AddButtons onAdd={handleOnAddDirent} />
      </div>
      {entries.map((e, index) => (
        <ExplorerEntry dirent={e} onDirentClick={handleOnDirentOpen} key={index} />
      ))}
    </div>
  );
};
