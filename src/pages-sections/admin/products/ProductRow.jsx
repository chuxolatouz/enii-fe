import { useRouter } from "next/router";
import { Edit, RemoveRedEye } from "@mui/icons-material";
import { Box } from "@mui/material";
import { FlexBox } from "components/flex-box";
import { Paragraph } from "components/Typography";
import { currency } from "lib";
import { format } from "date-fns";
import {
  StyledTableRow,
  StyledTableCell,
  StyledIconButton,
} from "../StyledComponents";

import DeleteProduct from 'pages-sections/admin/products/actions/delete/DeleteProduct';

import CircularProgress from "components/circular-progress/CircularProgress";

// ========================================================================

// ========================================================================

const ProductRow = ({ product, fetchProducts }) => {
  
  const { nombre, balance, fecha_inicio, fecha_fin, _id, status } = product;

  const router = useRouter();

  return (
    <StyledTableRow tabIndex={-1} role="checkbox">
      <StyledTableCell align="left">
        <FlexBox alignItems="center" gap={1.5}>
          {/* <Avatar
            src={image}
            sx={{
              borderRadius: "8px",
            }}
          /> */}
          <Box>
            <Paragraph>{nombre}</Paragraph>
            {/* <Small color="grey.600">#{id.split("-")[0]}</Small> */}
          </Box>
        </FlexBox>
      </StyledTableCell>
      <StyledTableCell>
        <Paragraph>{format(new Date(fecha_inicio), "dd/MM/yyyy")}</Paragraph>
      </StyledTableCell>
      <StyledTableCell>
        <Paragraph>{format(new Date(fecha_fin), "dd/MM/yyyy")}</Paragraph>
      </StyledTableCell>


      {/* <StyledTableCell align="left">
        <Avatar
          src={brand}
          sx={{
            width: 55,
            height: "auto",
            borderRadius: 0,
          }}
        />
      </StyledTableCell> */}

      <StyledTableCell align="left">{currency(balance)}</StyledTableCell>

      {/* <StyledTableCell align="left">
        <BazaarSwitch
          color="info"
          checked={productPulish}
          onChange={() => setProductPublish((state) => !state)}
        />
      </StyledTableCell> */}

      <StyledTableCell align="left">
        <CircularProgress status={status} />
      </StyledTableCell>

      <StyledTableCell align="center">
        <StyledIconButton
          onClick={() => router.push(`/admin/products/edit/${_id.$oid}`)}
        >
          <Edit />
        </StyledIconButton>

        <StyledIconButton 
          onClick={() => router.push(`/admin/products/${_id.$oid}`)}
        >
          <RemoveRedEye />
        </StyledIconButton>

        <DeleteProduct product={product} fetchProducts={fetchProducts} />
      </StyledTableCell>
      
    </StyledTableRow>
  );
};
export default ProductRow;
