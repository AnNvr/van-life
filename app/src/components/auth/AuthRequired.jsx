import { useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { Navigate, Outlet, useLocation } from "react-router-dom";

function useAuth () {
    const [currentUser, setCurrentUser] = useState(null)

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, user => {
            setCurrentUser(user ? user : null);
        });
        return unsubscribe;
    }, []);

    return currentUser
}

export default function AuthRequired() {
    const currentUser = useAuth()
    const location = useLocation()

    if (!currentUser) {
        return <Navigate to="/login" state={{ from: location }} replace />
    } else {
        return <Outlet />
    }
}


