import { Navigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { Outlet } from "react-router-dom";

const RequireAuth = (props) => {
  const { authed } = useAuth();
  const location = useLocation();

  return (
  authed ? < Outlet/> : <Navigate to="/login" replace state={{ path: location.pathname }}/>
)}

export default RequireAuth;
