import { type RouteObject } from "react-router";
import EXP_ExpenseListPage from "../pages/EXP_ExpenseListPage";

export const EXP_ExpenseRoutes: RouteObject = {
    path: 'my-expenses',
    children: [{ element: <EXP_ExpenseListPage />, index: true }],
};