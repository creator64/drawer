import React, { useCallback, useEffect, useState } from 'react';
import CreateNewFolderIcon from '@mui/icons-material/CreateNewFolder';
import AddIcon from '@mui/icons-material/Add';
import { Button, ButtonGroup } from '@mui/material';
import { CreateDialog } from './create-entry-dialog';

export const AddButtons = ({
  onAdd,
}: {
  onAdd: (type: 'file' | 'directory', name: string) => void;
}) => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogType, setDialogType] = useState<'file' | 'directory'>('file');

  const handleKeyPress = useCallback((event: KeyboardEvent) => {
    if (event.ctrlKey && event.shiftKey && event.key == 'N') {
      if (!dialogOpen) newDirectory();
    } else if (event.ctrlKey && event.key == 'n') if (!dialogOpen) newFile();
  }, []);

  useEffect(() => {
    document.addEventListener('keydown', handleKeyPress);

    return () => {
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, [handleKeyPress]);

  const handleCreate = (name: string) => {
    onAdd(dialogType, name);
  };

  const newDirectory = () => {
    setDialogType('directory');
    setDialogOpen(true);
  };

  const newFile = () => {
    setDialogType('file');
    setDialogOpen(true);
  };

  return (
    <>
      {/*@ts-ignore*/}
      <ButtonGroup color="#FFFFFF" variant="text">
        <Button onClick={newDirectory}>
          <CreateNewFolderIcon />
        </Button>
        <Button onClick={newFile}>
          <AddIcon />
        </Button>
      </ButtonGroup>
      <CreateDialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        onConfirm={handleCreate}
        type={dialogType}
      />
    </>
  );
};
