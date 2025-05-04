import { useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogActions,
    DialogTitle,
    Button,
    Chip,
    InputLabel,
    OutlinedInput,
    Box,
    FormControl
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import DropZone from 'components/DropZone';
import { useApi } from 'contexts/AxiosContext';
import { useSnackbar } from 'notistack';

function CerrarDocumento({ budget }) {
  const [isOpen, setIsOpen] = useState(false);
  const [text, setText] = useState('');
  const [amount, setAmount] = useState(0);
  const [files, setFiles] = useState([]);
  const [referencia, setReferencia] = useState('');
  const [montoTransferencia, setMontoTransferencia] = useState('');
  const [banco, setBanco] = useState('');
  const [cuentaContable, setCuentaContable] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const { api } = useApi();
  const { enqueueSnackbar } = useSnackbar();
  const handleClickStatus = () => {
    if (budget.status !== 'finished') {
      setIsOpen(true);
    }
  };
  const handleCrearDoc = () => {
    setSubmitting(true);
    const formData = new FormData();
    formData.append('descripcion', text);

    // biome-ignore lint/complexity/noForEach: <explanation>
    files.forEach((file) => {
      formData.append('files', file);
    });
    formData.append('proyecto_id', budget.project_id.$oid);
    formData.append('monto', amount);
    formData.append('doc_id', budget._id.$oid);
    formData.append('description', budget.descripcion)
    formData.append('referencia', referencia);
    formData.append('monto_transferencia', montoTransferencia);
    formData.append('banco', banco);
    formData.append('cuenta_contable', cuentaContable);

    api.post('/documento_cerrar', formData).then((response) => {
      setIsOpen(false);
      enqueueSnackbar(response.data.mensaje, {variant: 'success' });
    }).catch((error) => {
      if (error.response) {
          enqueueSnackbar(error.response.data.mensaje, { variant: 'error'})
      } else {
          enqueueSnackbar(error.mensaje, { variant: 'error'})
      }
    }).finally(() => {
      setSubmitting(false);
    })
  };

  const fileList = files.map((file) => (
    <Box key={file.path}>
      {`${file.path}-${file.size}bytes`}
    </Box>
  ));

  return (
    <Box>
      <Chip color="primary" onClick={handleClickStatus} clickable variant="outlined" label="Asignar Monto"/>
      <Dialog open={isOpen}>
        <DialogTitle>
          Agrega la factura de {budget.descripcion}
        </DialogTitle>
        <DialogContent>
          <FormControl fullWidth variant="outlined" sx={{ mt: 2 }}>
            <InputLabel id="documentos">Descripcion</InputLabel>
            <OutlinedInput
              
              label="Descripción"
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
          </FormControl>
          <FormControl fullWidth type="number" variant="outlined" sx={{ mt: 2 }}>
            <InputLabel id="monto">Monto</InputLabel>
            <OutlinedInput
              
              label="Monto"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </FormControl>
          <Box display="flex" gap={2} mt={2}>
            <FormControl fullWidth>
              <InputLabel htmlFor="referencia">Referencia</InputLabel>
              <OutlinedInput
                id="referencia"
                label="Referencia"
                value={referencia}
                onChange={(e) => setReferencia(e.target.value)}
              />
            </FormControl>

            <FormControl sx={{ minWidth: '150px' }}>
              <InputLabel htmlFor="montoTransferencia">Monto Transferencia</InputLabel>
              <OutlinedInput
                id="montoTransferencia"
                label="Monto Transferencia"
                value={montoTransferencia}
                onChange={(e) => setMontoTransferencia(e.target.value)}
                type="number"
              />
            </FormControl>
          </Box>

          <FormControl fullWidth sx={{ mt: 2 }}>
            <InputLabel htmlFor="banco">Banco</InputLabel>
            <OutlinedInput
              id="banco"
              label="Banco"
              value={banco}
              onChange={(e) => setBanco(e.target.value)}
            />
          </FormControl>

          <FormControl fullWidth sx={{ mt: 2, mb: 2 }}>
            <InputLabel htmlFor="cuentaContable">Cuenta Contable</InputLabel>
            <OutlinedInput
              id="cuentaContable"
              label="Cuenta Contable"
              value={cuentaContable}
              onChange={(e) => setCuentaContable(e.target.value)}
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
          <LoadingButton
            variant="outlined"
            color="secondary"
            onClick={handleCrearDoc}
            loading={submitting}
          >
            Subir Presupuesto
          </LoadingButton>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default CerrarDocumento;
