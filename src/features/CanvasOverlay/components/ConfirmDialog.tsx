import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import React, { FC } from "react";

type ConfirmDialogProps = {
  isOpen: boolean;
  handleClose: () => void;
  handleConfirm: () => void;
};

const ConfirmDialog: FC<ConfirmDialogProps> = ({ isOpen, handleClose, handleConfirm }) => {
  return (
    <Dialog
      open={isOpen}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">Remove all objects?</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          This will remove all the objects on your PDF and cannot be undone!
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button variant="text" color="inherit" onClick={handleClose}>
          Cancel
        </Button>
        <Button variant="outlined" color="error" onClick={handleConfirm} autoFocus>
          Continue
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmDialog;
