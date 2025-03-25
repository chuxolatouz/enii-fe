import { Button } from "@mui/material";
import { useSnackbar } from "notistack";
import { useApi } from "contexts/AxiosContext";
import {
  StatusWrapper,
  StyledTableCell,
  StyledTableRow,
} from "../StyledComponents";
import ShowRules from './ShowRules';
import DeleteRule from './DeleteRule'


// ========================================================================

// ========================================================================

const RequestRow = ({ request, fetchRequest }) => {
  const { nombre, reglas, status, _id } = request;
  const { api, user } = useApi();
  const { enqueueSnackbar } = useSnackbar();

  const handleRequest = (resolution) => {
    let resol = ''    
    if (resolution === 'accept') {
      resol =  'completed'
    } else {
      resol = 'Rejected'
    }
    const value = { resolution: resol }
    api.post(`/completar_solicitud_regla_fija/${_id.$oid}`,
      value
    ).then((response) => {
      enqueueSnackbar(response.data.message, { variant: "success" });
      fetchRequest();
    }).catch((error) => {
      console.log(error)
      enqueueSnackbar(error.message, { variant: "error" })
    })
  }
  return (
    <StyledTableRow tabIndex={-1} role="checkbox">
      <StyledTableCell
        align="left"
        sx={{
          fontWeight: 400,
        }}
      >
        {nombre}
      </StyledTableCell>

      <StyledTableCell
        align="left"
        sx={{
          fontWeight: 400,
        }}
      >
        {reglas.length}
      </StyledTableCell>

      <StyledTableCell
        align="left"
        sx={{
          fontWeight: 400,
        }}
      >
        <StatusWrapper status={status}>{status}</StatusWrapper>
      </StyledTableCell>

      
            <StyledTableCell align="center">
              {
                status === "new" && user.role === "admin" && (
                  <>
                  <Button variant="outlined" color="success" onClick={() => handleRequest('accept')}>
                    Aceptar
                  </Button>
                  <Button variant="outlined" color="error" onClick={() => handleRequest('cancel')}>
                    Rechazar
                  </Button>
                  </>
                )
              }
              <ShowRules nombre={nombre} reglas={reglas}/>
              {
                status != "assigned" && user.role ==="admin" && (
                  <DeleteRule id={_id} fetchRequest={fetchRequest}/>
                )
              }
            </StyledTableCell>
    </StyledTableRow>
  );
};
export default RequestRow;
