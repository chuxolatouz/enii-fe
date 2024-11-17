import { useState } from 'react';
import { 
    Button,
    Dialog,
    DialogTitle,
    DialogActions,
    DialogContent,
    Grid,
    Typography,
    Divider,
    Tooltip
} from "@mui/material";
import { RemoveRedEye } from "@mui/icons-material";
import { H3 } from 'components/Typography';
import {
    StyledIconButton,
} from "../StyledComponents";
import { currency } from "lib"

const ShowRules = ({reglas, nombre}) => {
    const [ open, setOpen] = useState(false)
    const handleModal = () => {
        setOpen(true);
      };
      const handleCloseModal = () => {
        setOpen(false)
      }
    return(
        <>
            <StyledIconButton onClick={handleModal}>
                <Tooltip title="Ver detalles de la regla">
                    <RemoveRedEye />

                </Tooltip>
            </StyledIconButton>
            <Dialog open={open} onClose={handleModal}>
                <DialogTitle><H3> Reglas de {nombre} </H3>
                
                </DialogTitle>
                <DialogContent>
                    {reglas.map((regla, index) => (
                        <Grid container key={`${regla.nombre}_${index}_regla`}>
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
        </>
    )
}

export default ShowRules;