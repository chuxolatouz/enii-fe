import { useState } from 'react';
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';

const DashboardFilter = ({ onChange }) => {
  const [range, setRange] = useState('6m');

  const handleChange = (event) => {
    const value = event.target.value;
    setRange(value);
    onChange(value); // notifica al padre
  };

  return (
    <FormControl fullWidth variant="outlined" size="small" sx={{ mb: 2 }}>
      <InputLabel>Rango de tiempo</InputLabel>
      <Select value={range} label="Rango de tiempo" onChange={handleChange}>
        <MenuItem value="1m">Último mes</MenuItem>
        <MenuItem value="6m">Últimos 6 meses</MenuItem>
        <MenuItem value="1y">Último año</MenuItem>
        <MenuItem value="all">Desde el inicio</MenuItem>
      </Select>
    </FormControl>
  );
};

export default DashboardFilter;