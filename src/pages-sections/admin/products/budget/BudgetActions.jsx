import { Box, Tooltip } from "@mui/material"
import ShowBudgets from "../actions/show/ShowBudgets";
import DeleteBudget from "../actions/delete/DeleteBudget";
import { useApi } from "contexts/AxiosContext";

function BudgetActions({ budget }) {
    const { user } = useApi()
    return (
        <Box>
            <Tooltip title="Ver presupuestos">
                <ShowBudgets budgets={budget}/>
            </Tooltip>
        { budget?.status !== "finished" && user.role ==="admin" && 
            <Tooltip title="Eliminar presupuesto">
                <DeleteBudget budget={budget} />
            </Tooltip>
        }
        </Box>
    )
}
export default BudgetActions;