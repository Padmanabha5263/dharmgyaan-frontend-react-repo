import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"
import { Auth } from "../../features/auth/page/Auth"

export const Routers = () => {
    return (<BrowserRouter>
        <Routes>
            <Route path="/" element={<Auth />} />

            {/* default / fallback */}
            <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
    </BrowserRouter>)
}