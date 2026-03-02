import { type RouteObject } from "react-router";
import EXP_ExpenseListPage from "../pages/EXP_ExpenseListPage";

export const EXP_ExpenseRoutes: RouteObject = {
    path: 'MyExpenses',
    children: [{ element: <EXP_ExpenseListPage />, index: true }],
};