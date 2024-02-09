import { useState } from 'react';
import { Box, Button, Dialog, DialogContent, DialogActions } from '@mui/material'
import { PictureAsPdfOutlined } from "@mui/icons-material";
import {
    StyledIconButton,
} from "pages-sections/admin";
import { PDFViewer } from '@react-pdf/renderer';
import { Paragraph } from "components/Typography";

import Acta from './StartPDF';

function DownloadStartPDF({ project }) {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => {
      setOpen(false);
    };


    return (
        <>
            <Paragraph>
                Descargar Acta de Inicio
            </Paragraph>
            <StyledIconButton onClick={handleOpen}>
                <PictureAsPdfOutlined />
            </StyledIconButton>
            <Dialog open={open} onClose={handleClose}>
                <DialogContent>
                    <PDFViewer width={450} height={700}>
                        <Acta project={project} />
                    </PDFViewer>
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

export default DownloadStartPDF;