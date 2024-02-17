import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "./AuthProvider";

export default function AuthRequired() {
    const { currentUser } = useAuth()
    const location = useLocation()

    if (!currentUser) {
        // redirect to login and pass the current location in state
        return <Navigate to="/login" state={{ message: "You must log in first", from: location }} replace />
    } else {
        return <Outlet />
    }
}


