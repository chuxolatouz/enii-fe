import { Box, Tooltip } from "@mui/material"
import ShowBudgets from "../actions/show/ShowBudgets";
import DeleteBudget from "../actions/delete/DeleteBudget";

function BudgetActions({ budget }) {
    return (
        <Box>
            <Tooltip title="Ver presupuestos">
                <ShowBudgets budgets={budget}/>
            </Tooltip>
        { budget?.status !== "finished" && 
            <Tooltip title="Eliminar presupuesto">
                <DeleteBudget budget={budget} />
            </Tooltip>
        }
        </Box>
    )
}
export default BudgetActions;