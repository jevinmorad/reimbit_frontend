import { Route, Routes } from "react-router-dom";
import EXP_CategoryListPage from "../pages/EXP_CategoryListPage";

export default function EXP_CategoryRoutes() {
    return (
        <Routes>
            <Route path="/" element={<EXP_CategoryListPage />} />
            <Route path="CategoryList" element={<EXP_CategoryListPage />} />
        </Routes>
    );
}
