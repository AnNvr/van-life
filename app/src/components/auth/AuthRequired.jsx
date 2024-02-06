import { Navigate, Outlet, useLocation } from "react-router-dom";

export default function AuthRequired() {
    const currentUser = localStorage.getItem("user")
    const location = useLocation()

    if (!currentUser) {
        return <Navigate to="/login" state={{ message: "You must log in first", from: location }} replace />
    } else {
        return <Outlet />
    }
}


