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
  Box,
  Divider
} from '@mui/material';
import { H3, H5, Span } from "components/Typography";
import { FlexBox } from "components/flex-box";
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import { StyledIconButton } from "pages-sections/admin/StyledComponents";
import { currency } from 'lib';

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
          <H3> Archivos del presupuesto {budgets.descripcion} </H3>
        </DialogTitle>
        <DialogContent>
          <Box>
            <FlexBox alignItems="left" gap={4}>
              <Span gap={4} color="grey.600">Monto presupuestado:</Span>                                   
              <H3 mt={0} mb={2}>
                {currency(budgets.monto)}
              </H3>
            </FlexBox>
            {budgets.status === "finished" &&
            <FlexBox alignItems="left" gap={4}>
              <Span gap={4} color="grey.600">Monto asignado:</Span>
              <H3 mt={0} mb={2}>
                {currency(budgets.monto_aprobado)}
              </H3>
            </FlexBox>
            }
          </Box>
          <Divider />
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Nombre</TableCell>
                <TableCell>Acciones</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {budgets?.archivos?.map((archivo) => (
                <TableRow key={archivo.nombre}>
                  <TableCell>{archivo.nombre}</TableCell>
                  <TableCell>
                    <Button variant="outlined" onClick={() => handleDownload(archivo.ruta)}>Descargar</Button>
                  </TableCell>                  
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <Divider />
          { budgets.status === "finished" && <Box>
            <H3>Justificantes:</H3>
            <Table>
            <TableHead>
              <TableRow>
                <TableCell>Nombre</TableCell>
                <TableCell>Acciones</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {budgets?.archivos_aprobado?.map((archivo) => (
                <TableRow key={archivo.nombre}>
                  <TableCell>{archivo.nombre}</TableCell>
                  <TableCell>
                    <Button variant="outlined" onClick={() => handleDownload(archivo.ruta)}>Descargar</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          </Box>}
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" color="error" onClick={() => setIsOpen(false)}>Cerrar</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
