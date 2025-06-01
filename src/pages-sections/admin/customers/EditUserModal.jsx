import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Box,
} from "@mui/material";
import { useApi } from "contexts/AxiosContext";
import { useSnackbar } from "notistack";

const EditUserModal = ({ open, onClose, user, onSuccess }) => {
  const { api } = useApi();
  const { enqueueSnackbar } = useSnackbar();

  const [nombre, setNombre] = useState(user?.nombre || "");
  const [password, setPassword] = useState("");

  const handleUpdate = () => {
    const payload = {
      id_usuario: user._id.$oid,
      nombre,
    };

    if (user.is_admin && password.trim() !== "") {
      payload.password = password;
    }

    api
      .post("/editar_usuario", payload)
      .then((response) => {
        enqueueSnackbar(response.data.message, { variant: "success" });
        onSuccess();
        onClose();
      })
      .catch((error) => {
        if (error.response) {
          enqueueSnackbar(error.response.data.message, { variant: "error" });
        } else {
          enqueueSnackbar(error.message, { variant: "error" });
        }
      });
  };

  if (!user) return null;

  return (
    <Dialog open={open} onClose={onClose} fullWidth>
      <DialogTitle>Editar Usuario</DialogTitle>
      <DialogContent dividers>
        <Box mb={2}>
          <TextField
            label="Nombre"
            fullWidth
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
          />
        </Box>

        {user.is_admin && (
          <Box mb={2}>
            <TextField
              label="Nueva Contraseña (opcional)"
              fullWidth
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Box>
        )}
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose} color="secondary">
          Cancelar
        </Button>
        <Button onClick={handleUpdate} variant="contained" color="primary">
          Guardar Cambios
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditUserModal;