import { useState } from 'react';
import { Box, Button, Dialog, DialogContent, DialogActions, CircularProgress } from '@mui/material'
import { PictureAsPdfOutlined } from "@mui/icons-material";
import {
    StyledIconButton,
} from "pages-sections/admin";
import { PDFViewer } from '@react-pdf/renderer';
import { Paragraph } from "components/Typography";
import { useApi } from "contexts/AxiosContext";
import { useSnackbar } from 'notistack';

import ActaFin from './EndPDF';

function DownloadEndPDF({ project }) {
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [movements, setMovements] = useState([]);
    const [logs, setLogs] = useState([]);
    const [budgets, setBudgets] = useState([]);
    const { api } = useApi();
    const { enqueueSnackbar } = useSnackbar();

    const handleOpen = () => {
        setOpen(true)
        setLoading(true);
        api.get(`/proyecto/${project._id}/fin`)
        .then((response) => {
            setLogs(response.data.logs);
            setBudgets(response.data.documentos);
            setMovements(response.data.movimientos);
            setLoading(false);
        })
        .catch((error) => {
            if (error.response) {
                enqueueSnackbar(error.response.data.message, { variant: 'error'})
            } else {
                enqueueSnackbar(error.message, { variant: 'error'})
            }
          })
    };
    const handleClose = () => {
      setOpen(false);
      setLoading(false);
    };
    
    return (
        <>
            <Paragraph>
                Descargar Acta de Finalizacion
            </Paragraph>
            <StyledIconButton onClick={handleOpen}>
                <PictureAsPdfOutlined />
            </StyledIconButton>
            <Dialog open={open} onClose={handleClose}>
                <DialogContent>
                    {loading &&  <CircularProgress color="success" />}
                    {!loading && <PDFViewer width={450} height={700}>
                        <ActaFin project={project} movements={movements} logs={logs} budgets={budgets}/>
                    </PDFViewer>}
                </DialogContent>
                <DialogActions sx={{ paddingBottom: '50px' }}>
                <Box sx={{ position: 'absolute', bottom: '16px', right: '16px' }}>
                    <Button color="error" onClick={handleClose}>
                    Cerrar
                    </Button>
                </Box>
                </DialogActions>
            </Dialog>
        </>        
    )
}

export default DownloadEndPDF;