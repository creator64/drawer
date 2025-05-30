import * as React from 'react';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import FolderIcon from '@mui/icons-material/Folder';
import HomeIcon from '@mui/icons-material/Home';
import { EDirent } from '@lib/types';
import { Button } from '@mui/material';

interface FolderBreadcrumbsProps {
  currentPath: EDirent[];
  onDirentClick: (dirent: EDirent | 'home', position: number) => void;
}

export default function FolderBreadcrumbs({ currentPath, onDirentClick }: FolderBreadcrumbsProps) {
  return (
    <div role="presentation">
      <Breadcrumbs aria-label="breadcrumb">
        <Button onClick={() => onDirentClick('home', 0)}>
          <HomeIcon sx={{ mr: 0.5 }} fontSize="inherit" />
        </Button>
        {currentPath.map((dirent, index) => (
          <Button onClick={() => onDirentClick(dirent, index + 1)}>
            {dirent.isDirectory && <FolderIcon sx={{ mr: 0.5 }} fontSize="inherit" />}
            {dirent.name}
          </Button>
        ))}
      </Breadcrumbs>
    </div>
  );
}
