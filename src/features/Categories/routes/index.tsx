import { type RouteObject } from "react-router";
import EXP_CategoryListPage from "../pages/EXP_CategoryListPage";

export const EXP_CategoryRoutes: RouteObject = {
    path: 'Categories',
    children: [{ element: <EXP_CategoryListPage />, index: true }],
};
