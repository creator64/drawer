import * as React from 'react';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import FolderIcon from '@mui/icons-material/Folder';
import HomeIcon from '@mui/icons-material/Home';
import { EDirent } from '@lib/types';
import { Button } from '@mui/material';

interface FolderBreadcrumbsProps {
  currentPath: EDirent[];
  onDirentClick: (dirent: EDirent | 'home', position: number) => void;
  className?: string;
}

export default function FolderBreadcrumbs({
  currentPath,
  onDirentClick,
  className,
}: FolderBreadcrumbsProps) {
  return (
    <div role="presentation" className={`bg-[#3F3F3F] px-2 rounded-md ${className}`}>
      <Breadcrumbs aria-label="breadcrumb" sx={{ color: 'var(--text-color-light)' }}>
        <Button
          sx={{ color: 'var(--text-color-light)', minWidth: 0, paddingX: 0 }}
          onClick={() => onDirentClick('home', 0)}
        >
          <HomeIcon fontSize="inherit" />
        </Button>
        {currentPath.map((dirent, index) => (
          <Button
            sx={{
              color: 'var(--text-color-light)',
              minWidth: 0,
              textTransform: 'none',
              paddingX: 0,
            }}
            onClick={() => onDirentClick(dirent, index + 1)}
          >
            {dirent.isDirectory && <FolderIcon sx={{ mr: 0.5 }} fontSize="inherit" />}
            <p className="text-sm">{dirent.name}</p>
          </Button>
        ))}
      </Breadcrumbs>
    </div>
  );
}
