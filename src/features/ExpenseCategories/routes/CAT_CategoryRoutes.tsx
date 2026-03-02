import { Route, Routes } from "react-router-dom";
import CAT_CategoryListPage from "../pages/CAT_CategoryListPage";

export default function CAT_CategoryRoutes() {
    return (
        <Routes>
            <Route path="/" element={<CAT_CategoryListPage />} />
            <Route path="CategoryList" element={<CAT_CategoryListPage />} />
        </Routes>
    );
}
