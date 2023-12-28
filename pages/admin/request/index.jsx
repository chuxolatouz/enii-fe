import {useEffect, useState } from "react";
import { Box, Card, Stack, Table, TableContainer } from "@mui/material";
import TableBody from "@mui/material/TableBody";
import TableHeader from "components/data-table/TableHeader";
import TablePagination from "components/data-table/TablePagination";
import VendorDashboardLayout from "components/layouts/vendor-dashboard";
import { H3 } from "components/Typography";
import Scrollbar from "components/Scrollbar";
import { RequestRow } from "pages-sections/admin";
import { useSnackbar } from "notistack";
import { useApi } from 'contexts/AxiosContext';
// TABLE HEADING DATA LIST
const tableHeading = [
  {
    id: "nombre",
    label: "Nombre",
    align: "left",
  },
  {
    id: "reglas",
    label: "Reglas",
    align: "left",
  },
  {
    id: "status",
    label: "status",
    align: "left",
  },
  // {
  //   id: "categoria",
  //   label: "Categoria",
  //   align: "left",
  // },
  {
    id: "action",
    label: "Accion",
    align: "center",
  },
];

// =============================================================================
RequestList.getLayout = function getLayout(page) {
  return <VendorDashboardLayout>{page}</VendorDashboardLayout>;
};
// =============================================================================

// =============================================================================

export default function RequestList() {
  const [rules, setRules] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [pagination, setPagination] = useState({
    skip: 0,
    page: 0,
    limit: 10
  });

  const { api } = useApi();
  const { enqueueSnackbar } = useSnackbar();
  useEffect(() => {
    api.get(
      `/mostrar_solicitudes?page=${pagination.page}`,
    ).then((respon) => {
      setTotalCount(pagination.total);
      setRules(respon.data.request_list);
    }).catch((error) => {
      if (error.response) {
          enqueueSnackbar(error.response.data.message, { variant: 'error'})
      } else {
          enqueueSnackbar(error.message, { variant: 'error'})
      }
  })
  }, [pagination])

  const handleChangePage = (_, page) => {
    setPagination((prevPagination) => ({
      ...prevPagination,
      skip: page * prevPagination.limit,
      page: page
    }));
  };

  const handleChangeRowsPerPage = (event) => {
    const newLimit = parseInt(event.target.value, 10);
    setPagination((prevPagination) => ({
      ...prevPagination,
      skip: 0,
      page: 0,
      limit: newLimit
    }));
  };
  return (
    <Box py={4}>
      <H3 mb={2}>Lista de Solicitudes</H3>
      <Card>
        <Scrollbar autoHide={false}>
          <TableContainer
            sx={{
              minWidth: 900,
            }}
          >
            <Table>
              <TableHeader
                hideSelectBtn
                heading={tableHeading}
                rowCount={rules.length}                
              />

              <TableBody>
                {rules.map((rules, index) => (
                  <RequestRow request={rules} key={index} />
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
