import { useState } from 'react';
import { Delete } from "@mui/icons-material";
import { 
  Button,
  Dialog,
  DialogTitle,
  DialogActions
} from "@mui/material";
import {
    StyledIconButton,
} from "../StyledComponents";
import { useApi } from "contexts/AxiosContext";
import Router from "next/router";
import { useSnackbar } from "notistack";


const DeleteRule = ({ id }) => {
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
        console.log(id)
        api.post(`/eliminar_solicitud_regla_fija/${id.$oid}`)
            .then(() => {
                Router.reload();
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
          <Delete />
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