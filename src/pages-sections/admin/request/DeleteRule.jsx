import { useState } from 'react';
import { Delete } from "@mui/icons-material";
import { 
  Button,
  Dialog,
  DialogTitle,
  DialogActions,
  Tooltip
} from "@mui/material";
import {
    StyledIconButton,
} from "../StyledComponents";
import { useApi } from "contexts/AxiosContext";
import { useSnackbar } from "notistack";


const DeleteRule = ({ id, fetchRequest }) => {
    const [open, setOpen] = useState(false);
    const { api } = useApi();
    const { enqueueSnackbar } = useSnackbar();
    const handleModal = () => {
      setOpen(true);
    };
    const handleCancelDelete = () => {
        setOpen(false);
    }
    const handleCancel = () => {
        api.post(`/eliminar_solicitud_regla_fija/${id.$oid}`)
            .then((response) => {
                enqueueSnackbar(response.data.message, { variant: "success" })
                fetchRequest();
            }).catch((error) => {
                if (error.response) {
                    enqueueSnackbar(error.response.data.message, { variant: 'error'})
                } else {
                    enqueueSnackbar(error.message, { variant: 'error'})
                }
            })
    }
    return(
        <>
        <StyledIconButton onClick={handleModal}>
            <Tooltip title="Eliminar Solicitud">
                <Delete />
            </Tooltip>
        </StyledIconButton>      
        <Dialog open={open} onClose={handleCancelDelete}>
            <DialogTitle>¿Estás seguro de que quieres eliminar esta solicitud?</DialogTitle>
            <DialogActions>
            <Button color="error" onClick={handleCancelDelete}>Cancelar</Button>
            <Button color="secondary" onClick={handleCancel}>Eliminar</Button>
            </DialogActions>
        </Dialog>
        </>
    )
}

export default DeleteRule;