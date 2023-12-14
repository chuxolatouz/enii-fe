import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Box } from "@mui/material";
// import * as yup from "yup";
import { H3 } from "components/Typography";
import { ProductDetails } from "pages-sections/admin";
import VendorDashboardLayout from "components/layouts/vendor-dashboard";
import { useApi } from "contexts/AxiosContext";

// =============================================================================
EditProduct.getLayout = function getLayout(page) {
  return <VendorDashboardLayout>{page}</VendorDashboardLayout>;
};
// =============================================================================

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
          setProduct(response.data);
        })
    }
  }, [slug]);

  return (
    <Box py={4}>
      <H3 mb={2}>{product.nombre}</H3>
        <ProductDetails
          product={product}
        />

      
    </Box>
  );
}
