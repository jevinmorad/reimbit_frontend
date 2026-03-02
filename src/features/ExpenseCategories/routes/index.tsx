import { type RouteObject } from "react-router";
import CAT_CategoryListPage from "../pages/CAT_CategoryListPage";

export const CAT_CategoryRoutes: RouteObject = {
    path: 'ExpenseCategories',
    children: [{ element: <CAT_CategoryListPage />, index: true }],
};
