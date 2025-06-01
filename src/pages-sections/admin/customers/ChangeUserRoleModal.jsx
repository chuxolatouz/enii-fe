import {
    Dialog,
    DialogTitle,
    DialogActions,
    DialogContent,
    Button,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
  } from "@mui/material";
  import { useState } from "react";
  import { useApi } from "contexts/AxiosContext";
  import { useSnackbar } from "notistack";
  
  const ChangeRoleUserModal = ({ open, onClose, user, onSuccess }) => {
    const [selectedRole, setSelectedRole] = useState(user?.is_admin ? "admin" : "user");
    const { api } = useApi();
    const { enqueueSnackbar } = useSnackbar();
  
    const handleChangeRole = () => {
      const data = {
        id_usuario: user._id.$oid,
        nuevo_rol: selectedRole === "admin",
      };
  
      api.post("/cambiar_rol_usuario", data)
        .then((res) => {
          enqueueSnackbar(res.data.message, { variant: "success" });
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
  
    return (
      <Dialog open={open} onClose={onClose}>
        <DialogTitle>Cambiar rol del usuario</DialogTitle>
        <DialogContent>
          <FormControl fullWidth sx={{ mt: 2 }}>
            <InputLabel id="role-label">Rol</InputLabel>
            <Select
              labelId="role-label"
              value={selectedRole}
              label="Rol"
              onChange={(e) => setSelectedRole(e.target.value)}
            >
              <MenuItem value="user">Usuario</MenuItem>
              <MenuItem value="admin">Administrador</MenuItem>
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} variant="outlined" color="error">Cancelar</Button>
          <Button onClick={handleChangeRole} variant="outlined" color="success">Guardar Cambios</Button>
        </DialogActions>
      </Dialog>
    );
  };
  
  export default ChangeRoleUserModal;
  