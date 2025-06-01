import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/router";
import { Box } from "@mui/material";
import { H3 } from "components/Typography";
import { ProductDetails } from "pages-sections/admin";
import VendorDashboardLayout from "components/layouts/vendor-dashboard";
import { useApi } from "contexts/AxiosContext";

EditProduct.getLayout = function getLayout(page) {
  return <VendorDashboardLayout>{page}</VendorDashboardLayout>;
};

export default function EditProduct() {
  const router = useRouter();
  const [product, setProduct] = useState({});
  const lastSlugRef = useRef(null);
  const { api } = useApi();

  const slug = router.query.slug ?? router.query.id; // fallback por si usas otro nombre

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    if (slug && slug !== lastSlugRef.current) {
      api.get(`/proyecto/${slug}`)
        .then((response) => {
          setProduct(response.data);
          lastSlugRef.current = slug; // ✅ Guarda el slug actual
        });
    }
  }, [slug]);

  return (
    <Box py={4}>
      <H3 mb={2}>{product.nombre}</H3>
      <ProductDetails product={product} />
    </Box>
  );
}
