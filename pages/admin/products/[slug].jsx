import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Box } from "@mui/material";
// import * as yup from "yup";
import { H3 } from "components/Typography";
import { ProductDetails } from "pages-sections/admin";
import VendorDashboardLayout from "components/layouts/vendor-dashboard";
import { useApi } from "contexts/AxiosContext";
// import api from "utils/__api__/products";

// =============================================================================
EditProduct.getLayout = function getLayout(page) {
  return <VendorDashboardLayout>{page}</VendorDashboardLayout>;
};
// =============================================================================

// const INITIAL_VALUES = {
//   name: "",
//   tags: "",
//   stock: "",
//   price: 0,
//   category: [],
//   sale_price: "",
//   description: "",
// };

// form field validation schema
// const validationSchema = yup.object().shape({
//   name: yup.string().required("required"),
//   category: yup.array().min(1).required("required"),
//   description: yup.string().required("required"),
//   stock: yup.number().required("required"),
//   price: yup.number().required("required"),
//   sale_price: yup.number().required("required"),
//   tags: yup.string().required("required"),
// });
export default function EditProduct() {
  const { query } = useRouter();
  const { slug } = query;
  const [product, setProduct] = useState({
  });
  const { api } = useApi();

  useEffect(() => {    
    if(slug) {
      api.get(
        `/proyecto/${slug}`,
        ).then((response) => {
          console.log(response);
          setProduct(response.data);
        })
    }
  }, [slug]);

  return (
    <Box py={4}>
      <H3 mb={2}>{product.nombre}</H3>
        <ProductDetails
          product={product}
          // validationSchema={validationSchema}
          // handleFormSubmit={handleFormSubmit}
        />

      
    </Box>
  );
}
