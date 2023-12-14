import { Chip } from '@mui/material';
import CompleteBudget from 'pages-sections/admin/products/actions/complete/CompleteBudget';

function BudgetStatus({budget}) {
    const { status } = budget;
    return ( status  === "finished" ? 
                    <Chip color="success" variant="outlined" label="completado"/> : 
                    <CompleteBudget budget={budget}/>
    )
}

export default BudgetStatus;