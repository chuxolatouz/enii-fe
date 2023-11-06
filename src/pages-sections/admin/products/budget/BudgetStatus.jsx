import { Chip } from '@mui/material';

function BudgetStatus({budget}) {
    const { status } = budget;
    return ( status  === "finished" ? 
                    <Chip color="success" variant="outlined" label="completado"/> : 
                    <Chip color="primary" clickable variant="outlined" label="Asignar Monto"/>
    )
}

export default BudgetStatus;