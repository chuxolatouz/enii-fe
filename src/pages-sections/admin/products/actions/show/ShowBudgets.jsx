import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Button,
} from '@mui/material';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import { StyledIconButton } from "pages-sections/admin/StyledComponents";

export default function ShowDocument({ budgets }) {
  const [isOpen, setIsOpen] = React.useState(false);

  const handleDownload = (ruta) => {
    window.open(ruta, '_blank');
  };

  return (
    <>
      <StyledIconButton onClick={() => setIsOpen(true)}>
        <RemoveRedEyeIcon />
      </StyledIconButton>
      <Dialog open={isOpen} fullWidth>
        <DialogTitle>
          Archivos
        </DialogTitle>
        <DialogContent>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Nombre</TableCell>
                <TableCell>Acciones</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {budgets.map((archivo) => (
                <TableRow key={archivo.nombre}>
                  <TableCell>{archivo.nombre}</TableCell>
                  <TableCell>
                    <Button onClick={() => handleDownload(archivo.ruta)}>Descargar</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" color="error" onClick={() => setIsOpen(false)}>Cerrar</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
