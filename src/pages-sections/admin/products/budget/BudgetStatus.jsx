import { Chip } from '@mui/material';
import { useApi } from 'contexts/AxiosContext';
import CompleteBudget from 'pages-sections/admin/products/actions/complete/CompleteBudget';

function BudgetStatus({budget}) {
    const { user } = useApi();
    const { status } = budget;
    return ( status  === "finished"  ? 
                    <Chip color="success" variant="outlined" label="completado"/> : 
                    user.role === "admin" ?  <CompleteBudget budget={budget}/> : <Chip color="warning" variant="outlined" label="Pendiente  "/>
    )
}

export default BudgetStatus;