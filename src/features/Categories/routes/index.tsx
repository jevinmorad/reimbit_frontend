import { type RouteObject } from "react-router-dom";
import CategoryListPage from "../pages/CategoryListPage";

export const CategoryRoutes: RouteObject = {
    path: 'Categories',
    children: [{ element: <CategoryListPage />, index: true }],
};
