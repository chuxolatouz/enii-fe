import { useState } from 'react';
import { Delete, RemoveRedEye } from "@mui/icons-material";
import { Button, Dialog, DialogTitle, DialogActions, DialogContent, Grid, Typography, Divider } from "@mui/material";

import {
  StatusWrapper,
  StyledIconButton,
  StyledTableCell,
  StyledTableRow,
} from "../StyledComponents";
import { H3 } from 'components/Typography';
import { currency } from "lib"


// ========================================================================

// ========================================================================

const RequestRow = ({ request }) => {
  const { nombre, reglas, status } = request;
  const [ open, setOpen] = useState(false)

  const handleModal = () => {
    setOpen(true);
  };
  const handleCloseModal = () => {
    setOpen(false)
  }
  const handleAccept = () => {
    console.log('accept')
  }
  const handleReject = () => {
    console.log('reject')
  }
  return (
    <StyledTableRow tabIndex={-1} role="checkbox">
      <StyledTableCell
        align="left"
        sx={{
          fontWeight: 400,
        }}
      >
        {nombre}
      </StyledTableCell>

      <StyledTableCell
        align="left"
        sx={{
          fontWeight: 400,
        }}
      >
        {reglas.length}
      </StyledTableCell>

      <StyledTableCell
        align="left"
        sx={{
          fontWeight: 400,
        }}
      >
        <StatusWrapper status={status}>{status}</StatusWrapper>
      </StyledTableCell>

      
        {
            status === "new" ? (
            <StyledTableCell align="center">
                <Button variant="outlined" color="success" onClick={handleAccept}>
                    Aceptar
                </Button>
                <Button variant="outlined" color="error" onClick={handleReject}>
                    Rechazar
                </Button>
                <StyledIconButton >
                    <RemoveRedEye onClick={handleModal}/>
                </StyledIconButton>                
                <StyledIconButton>
                    <Delete />
                </StyledIconButton>
            </StyledTableCell>
            ):(                
            <StyledTableCell align="center">
                <StyledIconButton >
                    <RemoveRedEye onClick={handleModal}/>
                </StyledIconButton>
            </StyledTableCell>
            )

            
        }
      <Dialog open={open} onClose={handleModal}>
        <DialogTitle><H3> Reglas de {nombre} </H3>
        
        </DialogTitle>
        <DialogContent>
            {reglas.map((regla, index) => (
                <Grid container key={regla.nombre+index}>                        
                        <Grid item sm={12}>
                          <Typography  paddingRight={4}> {" "}{regla.nombre_regla}</Typography>                                                
                          <Typography color="grey.600" paddingRight={4}>
                          {currency(regla.monto)}
                          </Typography>
                          <Divider sx={{ my: 4, }}/>
                        </Grid>
                </Grid>
            ))}
        </DialogContent>
        <DialogActions>
          <Button color="error" onClick={handleCloseModal}>Cerrar</Button>          
        </DialogActions>
      </Dialog>
    </StyledTableRow>
  );
};
export default RequestRow;
