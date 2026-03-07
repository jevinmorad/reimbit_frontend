import { type RouteObject } from "react-router-dom";
import ExpenseListPage from "../pages/ExpenseListPage";

export const ExpenseRoutes: RouteObject = {
    path: 'MyExpenses',
    children: [{ element: <ExpenseListPage />, index: true }],
};