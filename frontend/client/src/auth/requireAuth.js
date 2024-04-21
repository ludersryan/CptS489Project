
import { Navigate, Outlet } from "react-router-dom";
import { useLocation } from "react-router-dom";
import UserContext from "./userContext";
import { useContext } from "react";


export function RequireAuth(){
    const { user } = useContext(UserContext);
    const location = useLocation();

    if (!user  || !user.id || !user.token) {
        return <Navigate to="/login" state= {{ from: location }} />
    }
    return <Outlet />
}


