import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Box } from "@mui/material";
import * as yup from "yup";
import { H3 } from "components/Typography";
import { ProductForm } from "pages-sections/admin";
import VendorDashboardLayout from "components/layouts/vendor-dashboard";
import { useApi } from "contexts/AxiosContext";
import { useSnackbar } from "notistack";
import { parseISO } from "date-fns";

// =============================================================================
EditProduct.getLayout = function getLayout(page) {
  return <VendorDashboardLayout>{page}</VendorDashboardLayout>;
};
// =============================================================================

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
export default function EditProduct() {
  const { query } = useRouter();
  const { slug } = query;
  const [product, setProduct] = useState({});
  const { enqueueSnackbar } = useSnackbar();
  const { api } = useApi();

  useEffect(() => {    
    if(slug) {
      api.get(
        `/proyecto/${slug}`,
        ).then((response) => {
            const parsedProduct = {
                nombre: response.data.nombre,
                categoria: response.data.categoria,
                descripcion: response.data.descripcion,
                fecha_inicio: parseISO(response.data.fecha_inicio),
                fecha_fin: parseISO(response.data.fecha_fin),
              };
              setProduct(parsedProduct);
        })
        .catch((error) => {
            if (error.response) {
                enqueueSnackbar(error.response.data.message, { variant: 'error'})
            } else {
                enqueueSnackbar(error.message, { variant: 'error'})
            }
        })
    }
  }, [slug]);

  const handleFormSubmit = (values) => {

    if(slug) {
        api.put(
          `/actualizar_proyecto/${slug}`, values
          ).then((response) => {
            enqueueSnackbar(response.data.message, { variant: 'success'})
          })
          .catch((error) => {
              if (error.response) {
                  enqueueSnackbar(error.response.data.message, { variant: 'error'})
              } else {
                  enqueueSnackbar(error.message, { variant: 'error'})
              }
          })
      }
  }

  return (
    <Box py={4}>
      <H3 mb={2}>{product?.nombre}</H3>
        <ProductForm
          reinitialize
          shrink
          initialValues={product}
          validationSchema={validationSchema}
          handleFormSubmit={handleFormSubmit}
        />

      
    </Box>
  );
}
