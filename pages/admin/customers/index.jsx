import { useEffect, useState } from 'react';
import { Box, Card, Stack, Table, TableContainer } from "@mui/material";
import TableBody from "@mui/material/TableBody";
import { H3 } from "components/Typography";
import Scrollbar from "components/Scrollbar";
import TableHeader from "components/data-table/TableHeader";
import TablePagination from "components/data-table/TablePagination";
import VendorDashboardLayout from "components/layouts/vendor-dashboard";
import { CustomerRow } from "pages-sections/admin";
import { useApi } from 'contexts/AxiosContext';
import { useSnackbar } from 'notistack';

// table column list
const tableHeading = [
  {
    id: "nombre",
    label: "Nombre",
    align: "left",
  },
  {
    id: "email",
    label: "Email",
    align: "left",
  },
  {
    id: "action",
    label: "Acción",
    align: "center",
  },
];

// =============================================================================
CustomerList.getLayout = function getLayout(page) {
  return <VendorDashboardLayout>{page}</VendorDashboardLayout>;
};
// =============================================================================

// =============================================================================

export default function CustomerList() {
  const [data, setData] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [pagination, setPagination] = useState({
    skip: 0,
    page: 0,
    limit: 10
  });
  const { enqueueSnackbar } = useSnackbar();

  const { api } = useApi();
  const fetchUsers = () => api.get(
    `/mostrar_usuarios?page=${pagination.page}`,
  ).then((respon) => {
    setTotalCount(pagination.total);
    setData(respon.data.request_list);
  }).catch((error) => {
    if (error.response) {
        enqueueSnackbar(error.response.data.message, { variant: 'error'})
    } else {
        enqueueSnackbar(error.message, { variant: 'error'})
    }
});

  useEffect(() => {
    fetchUsers()
  }, [pagination])

  const handleChangePage = (_, page) => {
    setPagination((prevPagination) => ({
      ...prevPagination,
      skip: page * prevPagination.limit,
      page: page
    }));
  };

  const handleChangeRowsPerPage = (event) => {
    const newLimit = Number.parseInt(event.target.value, 10);
    setPagination((prevPagination) => ({
      ...prevPagination,
      skip: 0,
      page: 0,
      limit: newLimit
    }));
  };

  return (
    <Box py={4}>
      <H3 mb={2}>Usuarios</H3>

      <Card>
        <Scrollbar>
          <TableContainer
            sx={{
              minWidth: 900,
            }}
          >
            <Table>
              <TableHeader
                hideSelectBtn
                heading={tableHeading}
              />

              <TableBody>
                { data.map((customer) => (
                  <CustomerRow customer={customer} key={customer._id.$oid} fetchUsers={fetchUsers} />
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Scrollbar>

        <Stack alignItems="center" my={4}>
        <TablePagination
            onPageChange={handleChangePage}
            page={pagination.page}
            onRowsPerPageChange={handleChangeRowsPerPage}
            rowsPerPage={pagination.limit}
            count={totalCount || 0}
          />
        </Stack>
      </Card>
    </Box>
  );
}
