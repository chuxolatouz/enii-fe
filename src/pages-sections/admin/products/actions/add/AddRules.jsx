import { Button, Grid } from '@mui/material';
import { Typography } from '@mui/material';
import TodoList from 'components/icons/duotone/TodoList';

function AddRules() {
  return (
    <Grid container alignItems="center" gap={2}>
      <Grid item alignItems="center">
        <TodoList sx={{verticalAlign: 'middle'}}/>
      </Grid>
      <Grid item>
        <Button variant="text">
          <Typography fontSize="14px" color="grey.600">
            Reglas De Distribucion
          </Typography>
        </Button>
      </Grid>
    </Grid>
  );
}

export default AddRules;