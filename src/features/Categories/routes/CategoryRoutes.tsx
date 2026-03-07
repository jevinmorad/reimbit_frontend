import { Route, Routes } from "react-router-dom";
import CategoryListPage from "../pages/CategoryListPage";

export default function CategoryRoutes() {
    return (
        <Routes>
            <Route path="/" element={<CategoryListPage />} />
            <Route path="CategoryList" element={<CategoryListPage />} />
        </Routes>
    );
}
