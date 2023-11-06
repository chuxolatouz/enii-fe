import { useEffect, useState } from 'react';
import {
  Table,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Pagination,
  Stack,
  Box,
  Paper
} from '@mui/material';
import AddBalance from './actions/add/AddBalance';
import { useApi } from 'contexts/AxiosContext';
import { useSnackbar } from 'notistack';

function Movimientos({ id }) {
  const [pagination, setPagination] = useState(1);
  const [actions, setActions] = useState([]);
  const [count, setCount] = useState(0);
  const { api } = useApi();
  const { enqueueSnackbar } = useSnackbar();

  const handlePagination = (_, value) => {
    setPagination(value);
  };
  const fixMonto = (monto) => {
    if (parseFloat(monto) > 0) {
      return <span style={{ color: '#11cb5f', fontStyle: 'bold' }}>{monto}</span>;
    }
    return <span style={{ color: '#d32f2f', fontStyle: 'bold' }}>{monto}</span>;
  };

  useEffect(() => {
    api
      .get(`/proyecto/${id}/acciones?page=${pagination - 1}`)
      .then((response) => {
        setActions(response.data.request_list);
        setCount(response.data.count);
      })
      .catch((error) => {
        enqueueSnackbar(error.message, 'error');
      });
  }, [pagination]);

  return (
    <Box>
      <AddBalance id={id} />
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell>-</TableCell>
              <TableCell>Persona</TableCell>
              <TableCell>monto</TableCell>
              <TableCell>saldo</TableCell>
            </TableRow>
          </TableHead>
          {actions.length ? (
            <TableBody>
              { actions.map((action) => (
                <TableRow
                  key={action._id.id}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 }, height: '50px' }}
                >
                  <TableCell component="th" scope="row">
                    {action.type}
                  </TableCell>
                  <TableCell>{action.user}</TableCell>
                  <TableCell>{fixMonto(action.amount)}</TableCell>
                  <TableCell>{action.total_amount}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          ) : (
            <TableBody>
              <TableRow>
                <TableCell> No hay movimientos</TableCell>
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

export default Movimientos;
