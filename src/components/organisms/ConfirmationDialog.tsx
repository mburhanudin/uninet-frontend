// components/organisms/ConfirmationDialog.tsx
import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, IconButton, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

interface ConfirmationDialogProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const ConfirmationDialog: React.FC<ConfirmationDialogProps> = ({ open, onClose, onConfirm }) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>
        <IconButton edge="end" color="inherit" onClick={onClose} aria-label="close">
          <DeleteIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <Typography variant="h6" gutterBottom>
          Are you sure you want to delete this item?
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button onClick={onConfirm} color="primary" autoFocus>
          OK
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmationDialog;
