import { useEffect, useState } from 'react';
// import moment from 'moment';
import { format } from 'date-fns';
import {
  Table,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Box,
  Paper,
  Stack,
  Pagination,
} from '@mui/material';
import { useApi } from 'contexts/AxiosContext';
import { useSnackbar } from 'notistack';


function Logs({ id }) {
  const fixDate = (date) => format(new Date(date.$date), "dd/MM/yyyy")  
  const [pagination, setPagination] = useState(1);
  const [actions, setActions] = useState([]);
  const [count, setCount] = useState(0);
  const { api } = useApi();
  const { enqueueSnackbar } = useSnackbar();

  const handlePagination = (_, value) => {
    setPagination(value);
  };

  useEffect(() => {
    api
      .get(`/proyecto/${id}/logs?page=${pagination - 1}`)
      .then((response) => {
        setActions(response.data.request_list);
        setCount(response.data.count);
      })
      .catch((error) => {
        if (error.response) {
            enqueueSnackbar(error.response.data.message, { variant: 'error'})
        } else {
            enqueueSnackbar(error.message, { variant: 'error'})
        }
    })
  }, [pagination]);
  console.log(id, actions)
  return (
    <Box>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell>Fecha</TableCell>
              <TableCell>registro</TableCell>
            </TableRow>
          </TableHead>
          {actions.length ? (
            <TableBody>
              { actions.map((action) => (
                <TableRow
                  key={action._id.$oid}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 }, height: '50px' }}
                >
                  <TableCell component="th" scope="row">
                    {fixDate(action.fecha_creacion)}
                  </TableCell>
                  <TableCell>{action.mensaje}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          ) : (
            <TableBody>
              <TableRow>
                <TableCell> No hay logs</TableCell>
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

export default Logs;
