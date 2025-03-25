import {useEffect, useState } from "react";
import { Box, Card, Stack, Table, TableContainer } from "@mui/material";
import TableBody from "@mui/material/TableBody";
import TableHeader from "components/data-table/TableHeader";
import TablePagination from "components/data-table/TablePagination";
import VendorDashboardLayout from "components/layouts/vendor-dashboard";
import { H3 } from "components/Typography";
import Scrollbar from "components/Scrollbar";
import { ProductRow } from "pages-sections/admin";
import { useApi } from 'contexts/AxiosContext';
// TABLE HEADING DATA LIST
const tableHeading = [
  {
    id: "nombre",
    label: "Nombre",
    align: "left",
  },
  {
    id: "fecha_inicio",
    label: "Fecha Inicio",
    align: "left",
  },
  {
    id: "fecha_fin",
    label: "Fecha Fin",
    align: "left",
  },
  {
    id: "balance",
    label: "Balance",
    align: "left",
  },
  {
    id: "status",
    label: "Estado",
    align: "left",
  },
  {
    id: "action",
    label: "Acción",
    align: "center",
  },
];

// =============================================================================
ProductList.getLayout = function getLayout(page) {
  return <VendorDashboardLayout>{page}</VendorDashboardLayout>;
};
// =============================================================================

// =============================================================================

export default function ProductList() {
  const [projects, setProjects] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [pagination, setPagination] = useState({
    skip: 0,
    page: 0,
    limit: 10
  });

  const { api } = useApi();
  
  const fetchProducts = () => api.get(
    `/mostrar_proyectos?page=${pagination.page}`,
  ).then((respon) => {
    setTotalCount(pagination.total);
    setProjects(respon.data.request_list);
  });

  useEffect(() => {
    fetchProducts()
  }, [pagination])

  const handleChangePage = (_, page) => {
    setPagination((prevPagination) => ({
      ...prevPagination,
      skip: page * prevPagination.limit,
      page: page
    }));
  };

  return (
    <Box py={4}>
      <H3 mb={2}>Lista de Proyectos</H3>
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
                rowCount={projects.length}                
              />

              <TableBody>
                {projects.map((product, index) => (
                  <ProductRow product={product} key={index} fetchProducts={fetchProducts}/>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Scrollbar>

        <Stack alignItems="center" my={4}>
          <TablePagination
              onChange={handleChangePage}
              page={pagination.page}              
              count={totalCount || 0}
            />
        </Stack>
      </Card>
    </Box>
  );
}
