import React from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from '@mui/material';

interface CreateDialogProps {
  open: boolean;
  onClose: () => void;
  onConfirm: (name: string) => void;
  type: 'file' | 'directory';
}

export const CreateDialog = ({ open, onClose, onConfirm, type }: CreateDialogProps) => {
  const [name, setName] = React.useState('');

  const handleConfirm = () => {
    if (name.trim()) {
      onConfirm(name.trim());
      setName('');
      onClose();
    }
  };

  const handleClose = () => {
    setName('');
    onClose();
  };

  if (!type) return;
  return (
    <Dialog
      slotProps={{
        paper: {
          style: {
            backgroundColor: 'hsl(0, 0%, 10%)',
            color: 'hsl(0, 0%, 90%)',
            width: '40%',
            maxWidth: '40rem',
          },
        },
      }}
      open={open}
      onClose={handleClose}
    >
      <DialogTitle>Create new {type}</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="normal"
          label={`${type} name`}
          type="text"
          fullWidth
          value={name}
          onChange={(e) => setName(e.target.value)}
          sx={{
            '& .MuiInputLabel-root': { color: 'hsl(0, 0%, 70%)' },
            '& .MuiInputBase-input': { color: 'hsl(0, 0%, 90%)' },
            '& .MuiOutlinedInput-notchedOutline': { borderColor: 'hsl(0, 0%, 30%)' },
          }}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} sx={{ color: 'hsl(0, 0%, 70%)' }}>
          Cancel
        </Button>
        <Button onClick={handleConfirm} sx={{ color: 'hsl(0, 0%, 70%)' }}>
          Create
        </Button>
      </DialogActions>
    </Dialog>
  );
};
