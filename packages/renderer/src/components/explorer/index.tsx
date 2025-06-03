import React, { useEffect, useState } from 'react';
import { EDirent } from '@lib/types';
import { ExplorerEntry } from './entry';
import FolderBreadcrumbs from './folder-breadcrumbs';
import { useDrawingPath } from '../../context/drawing-path-context';
import CreateNewFolderIcon from '@mui/icons-material/CreateNewFolder';
import AddIcon from '@mui/icons-material/Add';
import { Button, ButtonGroup } from '@mui/material';

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
    <div className="explorer sidebar">
      {currentPath.length > 0 ? (
        <FolderBreadcrumbs
          className="mb-4"
          currentPath={currentPath}
          onDirentClick={handleOnDirentNavigate}
        />
      ) : (
        <p className="mb-4">{basePath}</p>
      )}
      <div className="flex w-full justify-between flex-row items-center">
        <p style={{ color: 'hsl(204, 4%, 75%)' }}>Drawings</p>
        {/*// @ts-ignore*/}
        <ButtonGroup color={'#FFFFFF'} variant={'text'}>
          <Button>
            <CreateNewFolderIcon />
          </Button>
          <Button>
            <AddIcon />
          </Button>
        </ButtonGroup>
      </div>
      {entries.map((e, index) => (
        <ExplorerEntry dirent={e} onDirentClick={handleOnDirentOpen} key={index} />
      ))}
    </div>
  );
};
