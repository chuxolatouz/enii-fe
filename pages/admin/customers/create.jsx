import { Box } from "@mui/material";
import * as yup from "yup";
import { useRouter } from "next/router";
import { H3 } from "components/Typography";
import { useSnackbar } from "notistack";
import { CustomerForm } from "pages-sections/admin";
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
    email: "",
    password: ""
  };
  const validationSchema = yup.object().shape({
  nombre: yup.string().required("required"),
  email: yup.string().email().required("required"),
  password: yup.string().required("required"),
    
  });
  const { api } = useApi();
  const { enqueueSnackbar } = useSnackbar();
  const router= useRouter();
  

  const handleFormSubmit = (values) => {
    console.log(values)
    api.post('/registrar', values)
      .then((response) => {
        router.push("/admin/customers/");
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
      <H3 mb={2}>Crear un nuevo usuario</H3>

      <CustomerForm
        initialValues={INITIAL_VALUES}
        validationSchema={validationSchema}
        handleFormSubmit={handleFormSubmit}
      />
    </Box>
  );
}
