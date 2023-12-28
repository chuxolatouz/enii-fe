import { useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogActions,
    DialogTitle,
    Tooltip,
    Button,
    Chip,
    InputLabel,
    OutlinedInput,
    Box,
    FormControl
} from '@mui/material';
import DropZone from 'components/DropZone';
import { useApi } from 'contexts/AxiosContext';
import { useSnackbar } from 'notistack';

function CerrarDocumento({ budget }) {
  const [isOpen, setIsOpen] = useState(false);
  const [text, setText] = useState('');
  const [amount, setAmount] = useState(0);
  const [files, setFiles] = useState([]);
  const { api } = useApi();
//   const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const handleClickStatus = () => {
    if (budget.status !== 'finished') {
      setIsOpen(true);
    }
  };
  const handleCrearDoc = () => {

    const formData = new FormData();
    formData.append('descripcion', text);
    files.forEach((file) => {
      formData.append('files', file);
    });
    formData.append('proyecto_id', budget.project_id.$oid);
    formData.append('monto', amount);
    formData.append('doc_id', budget._id.$oid);
    formData.append('description', budget.descripcion)

    api.post('/documento_cerrar', formData).then((response) => {
      setIsOpen(false);
      enqueueSnackbar(response.data.message, {variant: 'success' });
    }).catch((error) => {
      if (error.response) {
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
    console.log(budget)
  return (
    <Box>
      <Tooltip title={status}>
      <Chip color="primary" onClick={handleClickStatus} clickable variant="outlined" label="Asignar Monto"/>
      </Tooltip>
      <Dialog open={isOpen}>
        <DialogTitle>Agrega la factura de {budget.descripcion}</DialogTitle>
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
          <FormControl fullWidth type="number" variant="outlined" sx={{ marginTop: '20px', marginBottom: '20px' }}>
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
            Cerrar Presupuestos
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default CerrarDocumento;
