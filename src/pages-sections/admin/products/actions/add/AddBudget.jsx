import React from 'react';
import {
    Dialog, 
    DialogContent, 
    DialogActions, 
    DialogTitle,
    Button,
    OutlinedInput,
    InputLabel,
    Box,
    FormControl,
} from '@mui/material';
import DropZone from 'components/DropZone';
import { H3 } from 'components/Typography';
import { useApi } from 'contexts/AxiosContext';
import { useSnackbar } from 'notistack';

function AddBudget({ id }) {
  const [isOpen, setIsOpen] = React.useState(false);
  const [text, setText] = React.useState('');
  const [amount, setAmount] = React.useState(0);
  const [files, setFiles] = React.useState([]);
  const { api } = useApi();

  const { enqueueSnackbar } = useSnackbar();


  const handleCrearDoc = () => {
    const formData = new FormData();
    formData.append('descripcion', text);
    files.forEach((file) => {
      formData.append('files', file);
    });
    formData.append('proyecto_id', id);
    formData.append('monto', amount);

    api.post('/documento_crear', formData).then((response) => {
      setIsOpen(false);
      enqueueSnackbar(response.data.mensaje, { variant: 'success' });
    }).catch((error) => {
      if (error?.response?.data?.message) {
          enqueueSnackbar(error.response.data.message, { variant: 'error'})
      } else {
          enqueueSnackbar(error.message, { variant: 'error'})
      }
  })
  };

  const fileList = files.map((file) => (
    <Box key={file.path}>
      {`${file.path}-${file.size}bytes`}
    </Box>
  ));

  return (
    <Box>
      <Button variant="outlined" color="secondary" onClick={() => setIsOpen(true)}>
        Subir presupuestos
      </Button>
      <Dialog open={isOpen}>
        <DialogTitle><H3>Agrega un proceso de Documentacion</H3></DialogTitle>
        <DialogContent>
          <FormControl fullWidth variant="outlined" sx={{ marginTop: '20px', marginBottom: '20px' }}>
            <InputLabel id="documentos">Descripcion</InputLabel>
            <OutlinedInput
              labelId="documentos"
              label="Descripcion"
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
          </FormControl>
          <FormControl fullWidth variant="outlined" sx={{ marginTop: '20px', marginBottom: '20px' }}>
            <InputLabel id="monto">Monto</InputLabel>
            <OutlinedInput
              labelId="monto"
              label="Monto"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </FormControl>

          <DropZone onChange={(file) => { setFiles(file)}} />
          <aside>
            <h4>Files</h4>
            <ul>{fileList}</ul>
          </aside>
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" color="error" onClick={() => setIsOpen(false)}>
            Cancelar
          </Button>
          <Button variant="outlined" color="secondary" onClick={handleCrearDoc}>
            Subir Presupuestos
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default AddBudget;
