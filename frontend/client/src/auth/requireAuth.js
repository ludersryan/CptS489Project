
import { Navigate, Outlet } from "react-router-dom";
import { useLocation } from "react-router-dom";


export default function RequireAuth(){
    const token = localStorage.getItem('token');
    const id = localStorage.getItem('id');

    const location = useLocation();
    if (!token || !id) {
        return <Navigate to="/login" state= {{ from: location }} />
    }
    return <Outlet />
}