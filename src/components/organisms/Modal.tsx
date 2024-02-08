// components/organisms/Modal.tsx
import React, { useState, useEffect } from 'react';
import { Dialog, DialogTitle, DialogContent, TextField, Button } from '@mui/material';

interface ModalProps {
  open: boolean;
  onClose: () => void;
  onSave: (data: { title: string; description: string }) => void;
  title?: string;
  description?: string;
}

const Modal: React.FC<ModalProps> = ({ open, onClose, onSave, title: initialTitle = '', description: initialDescription = '' }) => {
  const [title, setTitle] = useState(initialTitle);
  const [description, setDescription] = useState(initialDescription);

  useEffect(() => {
    setTitle(initialTitle);
    setDescription(initialDescription);
  }, [open, initialTitle, initialDescription]);

  const handleSave = () => {
    onSave({ title, description });
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{initialTitle ? 'Edit Blog Entry' : 'Add New Blog Entry'}</DialogTitle>
      <DialogContent>
        <TextField
          label="Title"
          fullWidth
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          margin="normal"
        />
        <TextField
          label="Description"
          fullWidth
          multiline
          rows={4}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          margin="normal"
        />
        <Button variant="contained" color="primary" onClick={handleSave}>
          Save
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default Modal;
