import React, { useEffect, useState } from 'react';
import { EDirent } from '@lib/types';
import { ExplorerEntry } from './entry';
import FolderBreadcrumbs from './folder-breadcrumbs';
import { useDrawingPath } from '../../context/drawing-path-context';
import { AddButtons } from './add-buttons';
import { Vault } from '../../lib/vault';
import { Box, IconButton } from '@mui/material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

export const Explorer = () => {
  const basePath = import.meta.env.VITE_BASE_PATH;
  const [entries, setEntries] = useState<EDirent[]>([]);
  const [currentPath, setCurrentPath] = useState<EDirent[]>([]);
  const { setDrawingPath } = useDrawingPath();
  const [isOpen, setIsOpen] = useState(true);
  const vault = new Vault();

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
        window.fs
          .createDirectory(result)
          .then(loadEntries)
          .catch(() => {
            // TODO: Error handling
          });
      });
    if (type == 'file')
      window.path.join(basePath, ...currentPath.map((e) => e.name)).then((result) => {
        vault
          .createDrawing(result, name)
          .then(loadEntries)
          .catch((e) => {
            console.error(e); // TODO: Error handling
          });
      });
  };
  // TODO: Hier verder gaan met collapsen fixen
  return (
    <Box
      sx={{
        position: 'relative',
        height: '100%',
        transition: 'width 0.5s ease-in-out',
        width: isOpen ? '100%' : '12px',
        backgroundColor: 'hsl(0, 0%, 10%)',
        borderRight: '1px solid hsl(0, 0%, 20%)',
      }}
    >
      <IconButton
        onClick={() => setIsOpen(!isOpen)}
        sx={{
          position: 'absolute',
          right: '-16px',
          top: '8px',
          zIndex: 1,
          color: 'hsl(0, 0%, 70%)',
          bgcolor: 'hsl(0, 0%, 10%)',
          border: '1px solid hsl(0, 0%, 20%)',
          '&:hover': {
            bgcolor: 'hsl(0, 0%, 15%)',
          },
        }}
      >
        {isOpen ? <ChevronLeftIcon /> : <ChevronRightIcon />}
      </IconButton>

      <div className="explorer sidebar">
        <Box
          sx={{
            opacity: isOpen ? 1 : 0,
            transition: 'opacity 0.2s ease',
            visibility: isOpen ? 'visible' : 'hidden',
            height: '100%',
            overflow: 'auto',
          }}
        >
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
        </Box>
      </div>
    </Box>
  );
};
