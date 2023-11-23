import { Box } from "@mui/material";
import * as yup from "yup";
import { H3 } from "components/Typography";
import { RequestForm } from "pages-sections/admin";
import { useApi } from "contexts/AxiosContext";
import { useRouter } from "next/router";
import { useSnackbar } from "notistack";

import VendorDashboardLayout from "components/layouts/vendor-dashboard";

// =============================================================================
CreateProduct.getLayout = function getLayout(page) {
  return <VendorDashboardLayout>{page}</VendorDashboardLayout>;
};
// =============================================================================

export default function CreateProduct() {
  const { api } = useApi();
  const { push } = useRouter();
  const { enqueueSnackbar } = useSnackbar();
  const validationSchema = yup.object().shape({
    name: yup.string().required("required"),
    items: yup.array().min(1).required("required"),
  });
  const handleFormSubmit = (values) => {
    api.post(
      '/crear_solicitud_regla_fija',
      values
      ).then(() => {
        push('/admin/request');
      })
      .catch((error) => {
        console.log(error)
        enqueueSnackbar(error.message, { variant: "error" })
    });
  };
  return (
    <Box py={4}>
      <H3 mb={2}>Crear Solicitud de Regla</H3>

      <RequestForm
        validationSchema={validationSchema}
        handleFormSubmit={handleFormSubmit}
      />
    </Box>
  );
}
