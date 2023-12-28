import { useState, useEffect } from 'react';
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TableContainer,
  Box,
  Paper,
  Stack,
  Pagination
} from '@mui/material';
import { useApi } from 'contexts/AxiosContext';
import { useSnackbar } from 'notistack';
import BudgetStatus from './budget/BudgetStatus';
import BudgetActions from './budget/BudgetActions';
import AddBudget from './actions/add/AddBudget';

function Documentos({ id }) {
  const [count, setCount] = useState(0);
  const [documentos, setDocumentos] = useState([]);
  const [pagination, setPagination] = useState(1);
  const { api } = useApi();
  const { enqueueSnackbar } = useSnackbar();

  const handlePagination = (_, value) => {
    setPagination(value);
  };

  useEffect(() => {
    api
      .get(`/proyecto/${id}/documentos?page=${pagination - 1}`)
      .then((response) => {
        setDocumentos(response.data.request_list);
        setCount(response.data.count);
      }).catch((error) => {
        if (error.response) {
            enqueueSnackbar(error.response.data.message, { variant: 'error'})
        } else {
            enqueueSnackbar(error.message, { variant: 'error'})
        }
    })
  }, [pagination]);

  return (
    <Box>
      <AddBudget id={id} />
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell>Descripcion</TableCell>
              <TableCell>Archivos</TableCell>
              <TableCell>Estado</TableCell>
              <TableCell>Acciones</TableCell>
            </TableRow>
          </TableHead>
          {documentos.length ? (
            <TableBody>
              { documentos.map((action) => (
                <TableRow
                  key={`${action._id.$oid}-row`}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 }, height: '50px' }}
                >
                  <TableCell key={`${action._id.$oid}-descripcion`} component="th" scope="row">
                    {action.descripcion}
                  </TableCell>
                  <TableCell key={`${action._id.$oid}-archivos-length`}>{action.archivos?.length}</TableCell>
                  <TableCell key={`${action._id.$oid}-status`}>
                    <BudgetStatus budget={action} />
                  </TableCell>
                  <TableCell key={`${action._id.$oid}-archivos-dialog`}>
                    <BudgetActions budget={action}/>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          ) : (
            <TableBody>
              <TableRow>
                <TableCell> No hay Documentos</TableCell>
              </TableRow>
            </TableBody>
          )}
        </Table>
      </TableContainer>
      <Stack spacing={2}>
        <Pagination
          count={count}
          onChange={handlePagination}
          variant="outlined"
          color="success"
        />
      </Stack>
    </Box>
  );
}

export default Documentos;
