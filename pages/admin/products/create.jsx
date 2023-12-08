import { Box } from "@mui/material";
import * as yup from "yup";
import { useRouter } from "next/router";
import { H3 } from "components/Typography";
import { useSnackbar } from "notistack";
import { ProductForm } from "pages-sections/admin";
import VendorDashboardLayout from "components/layouts/vendor-dashboard";
import { useApi } from "contexts/AxiosContext";


// =============================================================================
CreateProduct.getLayout = function getLayout(page) {
  return <VendorDashboardLayout>{page}</VendorDashboardLayout>;
};
// =============================================================================

export default function CreateProduct() {
  const INITIAL_VALUES = {
    nombre: "",
    categoria: "",
    descripcion: "",
    fecha_inicio: "",
    fecha_fin: "",
  };
  const validationSchema = yup.object().shape({
  nombre: yup.string().required("required"),
  categoria: yup.string().required("required"),
    descripcion: yup.string().required("required"),
    fecha_inicio: yup.string().required("required"),
    fecha_fin: yup.string().required("required"),
  });
  const { api } = useApi();
  const { enqueueSnackbar } = useSnackbar();
  const router= useRouter();
  

  const handleFormSubmit = (values) => {
    api.post('/crear_proyecto', values)
      .then((response) => {
        router.push("/admin/products/");
      })
      .catch((error) => {
        if (error.response) {
            enqueueSnackbar(error.response.data.message, { variant: 'error'})
        } else {
            enqueueSnackbar(error.message, { variant: 'error'})
        }
    })

  };
  return (
    <Box py={4}>
      <H3 mb={2}>Crear un nuevo Proyecto</H3>

      <ProductForm
        initialValues={INITIAL_VALUES}
        validationSchema={validationSchema}
        handleFormSubmit={handleFormSubmit}
      />
    </Box>
  );
}
