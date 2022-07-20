import { Navigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { Route } from "react-router-dom";
// import useAuth from "../hooks/useAuth";

const RequireAuth = (children, ...rest) => {
  // const { authed } = useAuth();
  const access =localStorage.getItem('refresh_token');
  const location = useLocation();

  return (
  <Route {...rest}>
  {access 
  ? children 
  : 
  <Navigate to="/login" replace state={{ path: location.pathname }}/>}
  </Route>
)}

export default RequireAuth;
