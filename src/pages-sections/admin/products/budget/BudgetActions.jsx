import { Delete } from "@mui/icons-material";
import { Box } from "@mui/material"
import { StyledIconButton } from "pages-sections/admin/StyledComponents";
import ShowBudgets from "../actions/show/ShowBudgets";
import DeleteBudget from "../actions/delete/DeleteBudget";

function BudgetActions({ budget }) {
    return (
        <Box>
            <ShowBudgets budgets={budget}/>
        { budget?.status !== "finished" && 
            <DeleteBudget budget={budget} />
        }
        </Box>
    )
}
export default BudgetActions;