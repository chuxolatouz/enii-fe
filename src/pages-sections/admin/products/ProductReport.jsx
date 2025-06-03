import { useEffect, useState } from 'react';
import { Card, Grid, Typography, Box } from '@mui/material';
import { 
    LineChart, 
    Line, 
    XAxis, 
    YAxis, 
    Tooltip, 
    ResponsiveContainer, 
    PieChart, 
    Pie, 
    Cell, 
    Legend,
} from 'recharts';
import { useApi } from 'contexts/AxiosContext';
import { useSnackbar } from 'notistack';
import { uniqueId } from 'lodash';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

export default function ProjectReport({ id }) {
  const [balanceHistory, setBalanceHistory] = useState([]);
  const [egresosPorTipo, setEgresosPorTipo] = useState([]);
  const [summary, setSummary] = useState({
    ingresos: 0,
    egresos: 0,
    presupuestos: 0,
    represupuestos: 0,
    miembros: 0
  });
  const { api } = useApi();
  const { enqueueSnackbar } = useSnackbar();

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    if (id) {

        api.get(`/proyecto/${id}/reporte`)
        .then((res) => {
            const { balanceHistory, egresosPorTipo, resumen } = res.data;
            setBalanceHistory(balanceHistory);
            setEgresosPorTipo(egresosPorTipo);
            setSummary(resumen);
        })
        .catch((err) => {
            enqueueSnackbar("Error al cargar el reporte", { variant: 'error' });
        });
    }
  }, [id]);

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={6}>
        <Card style={{ padding: 20 }}>
          <Typography variant="h6" gutterBottom>Evolución del Saldo</Typography>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={balanceHistory}>
              <XAxis dataKey="fecha" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="saldo" stroke="#8884d8" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </Card>
      </Grid>

      <Grid item xs={12} md={6}>
        <Card style={{ padding: 20 }}>
          <Typography variant="h6" gutterBottom>Egresos por Tipo</Typography>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie data={egresosPorTipo} dataKey="monto" nameKey="tipo" cx="50%" cy="50%" outerRadius={80} fill="#8884d8" label>
                {egresosPorTipo.map((entry, index) => (
                  <Cell key={`cell-${uniqueId()}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </Card>
      </Grid>

      <Grid item xs={12}>
        <Card style={{ padding: 20 }}>
          <Typography variant="h6" gutterBottom>Resumen del Proyecto</Typography>
          <Grid container spacing={2} justifyContent="center">
            {[
                { label: "Ingresos", value: `$${(summary.ingresos || 0).toFixed(2)}`, color: 'text.primary' },
                { label: "Egresos", value: `$${(summary.egresos || 0).toFixed(2)}`, color: 'error.main' },
                { label: "Presupuestos Finalizados", value: summary.presupuestos },
                { label: "Presupuestos Nuevos", value: summary.represupuestos },
                { label: "Miembros", value: summary.miembros }
            ].map((item, index) => (
                <Grid item xs={6} md={2.4} key={uniqueId()}>
                <Box display="flex" flexDirection="column" alignItems="center">
                    <Typography 
                    variant="subtitle2" 
                    align="center" 
                    sx={{ minHeight: 40 }} // <- fuerza altura uniforme
                    >
                    {item.label}
                    </Typography>
                    <Typography variant="h6" color={item.color || 'text.primary'}>
                    {item.value}
                    </Typography>
                </Box>
                </Grid>
            ))}
            </Grid>
        </Card>
      </Grid>
    </Grid>
  );
}
