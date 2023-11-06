import { useState } from 'react';
import { Delete } from "@mui/icons-material";
import { 
  Avatar,
  Button,
  Dialog,
  DialogTitle,
  DialogActions
} from "@mui/material";
import { FlexBox } from "components/flex-box";
import { Paragraph } from "components/Typography";
import {
  StyledIconButton,
  StyledTableCell,
  StyledTableRow,
} from "./StyledComponents";


// ========================================================================

// ========================================================================

const CustomerRow = ({ customer }) => {
  const { email, nombre, avatar } = customer;
  const [open, setOpen] = useState(false);

  const handleDelete = (userId) => {
    // setUserIdToDelete(userId);
    setOpen(true);
  };

  const handleConfirmDelete = () => {
  // Elimina el usuario con el ID `userIdToDelete` y cierra el cuadro de diálogo.
    const data = {
      usuario_id: userIdToDelete,
    };
    api.patch('/eliminar_usuario_proyecto', data).then(() => {
    //   navigate(0);
    }).catch((error) => {
    //   openSnackbar(error.message, 'error');
    });
  };

  const handleCancelDelete = () => {
  // Cierra el cuadro de diálogo de confirmación.
    setOpen(false);
  };
  return (
    <StyledTableRow tabIndex={-1} role="checkbox">
      <StyledTableCell align="left">
        <FlexBox alignItems="center" gap={1.5}>
          <Avatar src={avatar} />
          <Paragraph>{nombre}</Paragraph>
        </FlexBox>
      </StyledTableCell>

      <StyledTableCell
        align="left"
        sx={{
          fontWeight: 400,
        }}
      >
        {email}
      </StyledTableCell>

      <StyledTableCell align="center">
        <StyledIconButton onClick={() => handleDelete(customer)}>
          <Delete />
        </StyledIconButton>
      </StyledTableCell>
      <Dialog open={open} onClose={handleCancelDelete}>
        <DialogTitle>¿Estás seguro de que quieres eliminar este usuario?</DialogTitle>
        <DialogActions>
          <Button color="error" onClick={handleCancelDelete}>Cancelar</Button>
          <Button color="secondary" onClick={handleConfirmDelete}>Eliminar</Button>
        </DialogActions>
      </Dialog>
    </StyledTableRow>
  );
};
export default CustomerRow;
