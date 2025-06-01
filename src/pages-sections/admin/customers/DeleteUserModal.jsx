import {
    Dialog,
    DialogTitle,
    DialogActions,
    Button,
  } from "@mui/material";
  
  const DeleteUserModal = ({ open, onClose, onConfirm }) => {
    return (
      <Dialog open={open} onClose={onClose}>
        <DialogTitle>
          ¿Estás seguro de que quieres eliminar este usuario?
        </DialogTitle>
        <DialogActions>
          <Button color="error" onClick={onClose}>
            Cancelar
          </Button>
          <Button color="secondary" onClick={onConfirm}>
            Eliminar
          </Button>
        </DialogActions>
      </Dialog>
    );
  };
  
  export default DeleteUserModal;
  