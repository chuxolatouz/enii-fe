import { useState } from "react"; 
import { useRouter } from "next/router";
import { Delete, Edit, RemoveRedEye } from "@mui/icons-material";
import { Box, Dialog, DialogTitle, DialogActions, Button } from "@mui/material";
import { FlexBox } from "components/flex-box";
import { Paragraph } from "components/Typography";
import { currency } from "lib";
import { format } from "date-fns";
import {
  StyledTableRow,
  CategoryWrapper,
  StyledTableCell,
  StyledIconButton,
} from "../StyledComponents";

// ========================================================================

// ========================================================================

const ProductRow = ({ product }) => {
  const [open, setOpen] = useState(false);
  const { nombre, balance, fecha_inicio, fecha_fin, _id } = product;
  const handleDelete = (userId) => {
    setUserIdToDelete(userId);
    setOpen(true);
  };

  const handleConfirmDelete = () => {
  
    const data = {
      proyecto_id: id,
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
  const router = useRouter();
  // const [productPulish, setProductPublish] = useState(published);
  return (
    <StyledTableRow tabIndex={-1} role="checkbox">
      <StyledTableCell align="left">
        <FlexBox alignItems="center" gap={1.5}>
          {/* <Avatar
            src={image}
            sx={{
              borderRadius: "8px",
            }}
          /> */}
          <Box>
            <Paragraph>{nombre}</Paragraph>
            {/* <Small color="grey.600">#{id.split("-")[0]}</Small> */}
          </Box>
        </FlexBox>
      </StyledTableCell>
      <StyledTableCell>
        <Paragraph>{format(new Date(fecha_inicio), "dd/MM/yyyy")}</Paragraph>
      </StyledTableCell>
      <StyledTableCell>
        <Paragraph>{format(new Date(fecha_fin), "dd/MM/yyyy")}</Paragraph>
      </StyledTableCell>

      {/* <StyledTableCell align="left">
        {categorias.map((categoria) => {
          <CategoryWrapper>{categoria.value}</CategoryWrapper>
        })}
      </StyledTableCell> */}

      {/* <StyledTableCell align="left">
        <Avatar
          src={brand}
          sx={{
            width: 55,
            height: "auto",
            borderRadius: 0,
          }}
        />
      </StyledTableCell> */}

      <StyledTableCell align="left">{currency(balance)}</StyledTableCell>

      {/* <StyledTableCell align="left">
        <BazaarSwitch
          color="info"
          checked={productPulish}
          onChange={() => setProductPublish((state) => !state)}
        />
      </StyledTableCell> */}

      <StyledTableCell align="center">
        <StyledIconButton
          onClick={() => router.push(`/admin/products/edit/${_id.$oid}`)}
        >
          <Edit />
        </StyledIconButton>

        <StyledIconButton>
          <RemoveRedEye onClick={() => router.push(`/admin/products/${_id.$oid}`)}/>
        </StyledIconButton>

        <StyledIconButton color="error">
          <Delete  />
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
export default ProductRow;
