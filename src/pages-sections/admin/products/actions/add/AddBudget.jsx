import React from 'react';
import {
    Dialog, 
    DialogContent, 
    DialogActions, 
    DialogTitle,
    Button,
    OutlinedInput,
    InputLabel,
    Select,
    MenuItem,
    Box,
    FormControl,
    FormHelperText,
    Switch,
} from '@mui/material';
import DropZone from 'components/DropZone';
import { Span } from 'components/Typography';
import { useApi } from 'contexts/AxiosContext';
import { useSnackbar } from 'notistack';

function AddBudget({ project }) {
  const [isOpen, setIsOpen] = React.useState(false);
  const [text, setText] = React.useState('');
  const [selectedObjective, setSelectedObjective] = React.useState('');
  const [objective, setObjective] = React.useState(false);
  const [amount, setAmount] = React.useState(0);
  const [files, setFiles] = React.useState([]);
  const { api } = useApi();

  const { enqueueSnackbar } = useSnackbar();


  const handleCrearDoc = () => {
    const formData = new FormData();
    formData.append('descripcion', text);
    for (const file of files) {
      formData.append('files', file);
    }
    formData.append('proyecto_id', project._id);
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
  console.log(project)
  return (
    <Box>
      <Button variant="outlined" color="secondary" onClick={() => setIsOpen(true)}>
        Subir presupuestos
      </Button>
      <Dialog open={isOpen}>
        <DialogTitle><Span>Agrega un proceso de Documentación</Span></DialogTitle>
        <DialogContent>
          <FormControl fullWidth variant="outlined" sx={{ marginTop: '20px', marginBottom: '20px' }}>
            <InputLabel id="documentos">Descripción</InputLabel>
            <OutlinedInput
              labelid="documentos"
              label="Descripción"
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
          </FormControl>

          {/* Renderizar objetivos específicos si existen */}
          {project.objetivos_especificos?.length > 0 && (
            <FormControl fullWidth variant="outlined" sx={{ marginTop: '20px', marginBottom: '20px' }}>
              <InputLabel id="objetivo">Seleccionar Objetivo Específico</InputLabel>
              <Select
                labelId="objetivo"
                value={selectedObjective}
                onChange={(e) => setSelectedObjective(e.target.value)}
                label="Seleccionar Objetivo Específico"
              >
                {project.objetivos_especificos.map((objective, index) => (
                  <MenuItem key={index+objective} value={objective}>
                    {objective} {/* Suponiendo que los objetivos tienen un campo "nombre" */}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          )}
          <FormControl fullWidth variant="outlined" sx={{ marginTop: '20px', marginBottom: '20px' }}>
            <InputLabel id="monto">Monto</InputLabel>
            <OutlinedInput
              labelid="monto"
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
