import React, { useEffect, useState } from "react";
import { Grid, Typography } from "@mui/material";
import { useApi } from "contexts/AxiosContext";
import { useSnackbar } from "notistack";

export default function ProductReport() {
    const { api } = useApi();
    const { enqueueSnackbar } = useSnackbar();
    const [reportData, setReportData] = useState(null);
    
    // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
        useEffect(() => {
        api.get('/mostrar_reporte_productos')
            .then((response) => {
                // Aquí podrías manejar los datos del reporte si es necesario
                console.log(response.data);
                setReportData(response.data);
            })
            .catch((error) => {
                if (error.response) {
                    enqueueSnackbar(error.response.data.message, { variant: 'error' });
                } else {
                    enqueueSnackbar(error.message, { variant: 'error' });
                }
            });
    }
    , []);

  return (
      <Grid container spacing={3}>
        <Grid item md={4} xs={12}>
        <Typography variant="subtitle2">Fondos Recibidos:</Typography>
        <Typography variant="h6" color="success.main">$400.00</Typography>
        </Grid>
        <Grid item md={4} xs={12}>
        <Typography variant="subtitle2">Gastos Realizados:</Typography>
        <Typography variant="h6" color="error.main">$-407.00</Typography>
        </Grid>
        <Grid item md={4} xs={12}>
        <Typography variant="subtitle2">Transacciones:</Typography>
        <Typography variant="h6">12 movimientos</Typography>
        </Grid>
        <Grid item md={6} xs={12}>
        <Typography variant="subtitle2">Presupuestos Creados:</Typography>
        <Typography variant="h6">4</Typography>
        </Grid>
        <Grid item md={6} xs={12}>
        <Typography variant="subtitle2">Presupuestos Finalizados:</Typography>
        <Typography variant="h6">2</Typography>
        </Grid>
    </Grid>
  );
}