import { Delete } from "@mui/icons-material";
import { Box } from "@mui/material"
import { StyledIconButton } from "pages-sections/admin/StyledComponents";
import ShowBudgets from "../actions/show/ShowBudgets";

function BudgetActions({ budget }) {
    console.log(budget)
    return (
        <Box>
            <ShowBudgets budgets={budget}/>
        { budget?.status !== "finished" && <StyledIconButton>
            <Delete />
        </StyledIconButton>}
        </Box>
    )
}
export default BudgetActions;