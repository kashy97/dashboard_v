import { Navigate, useRoutes } from "react-router-dom";
// layouts
import DashboardLayout from "./layouts/dashboard";
import LogoOnlyLayout from "./layouts/LogoOnlyLayout";
//
import Login from "./auth/login";
// import RequireAuth from "./routes/RequireAuth";
import DashBoard from "./pages/dashboard";
import Profile from "./pages/profile";
import Team from "./pages/team";
import IAdd from "./pages/invoices_form";
import Orders from "./pages/invoices";
import Vendors from "./pages/vendors";
import VAdd from "./pages/vendors_add";
import ROrders from "./pages/release_orders";
import Register from "./auth/register";
import RequireAuth from "./routes/RequireAuth";
import ForgotPassword from "./auth/forgotpassword";
// import NotFound from "./pages/Page404";

// ----------------------------------------------------------------------

export default function Router() {
  return useRoutes([
    {
      path: "/dashboard",
      element: <DashboardLayout />,
      children: [
        {
          path: "homepage",
          element: (
            <RequireAuth>
              <DashBoard />
            </RequireAuth>
          ),
        },
        {
          path: "profile",
          element: (
            <RequireAuth>
              <Profile />
            </RequireAuth>
          ),
        },
        {
          path: "profile/edit",
          element: (
            <RequireAuth>
              <Team />
            </RequireAuth>
          ),
        },
        {
          path: "vendors",
          element: (
            <RequireAuth>
              <Vendors />
            </RequireAuth>
          ),
        },
        {
          path: "vendors/add",
          element: (
            <RequireAuth>
              <VAdd />
            </RequireAuth>
          ),
        },
        {
          path: "invoices",
          element: (
            <RequireAuth>
              <Orders />
            </RequireAuth>
          ),
        },
        {
          path: "invoices/add",
          element: (
            <RequireAuth>
              <IAdd />
            </RequireAuth>
          ),
        },
        {
          path: "release_orders",
          element: (
            <RequireAuth>
              <ROrders />
            </RequireAuth>
          ),
        },
      ],
    },
    {
      path: "/",
      element: <LogoOnlyLayout />,
      children: [
        { path: "/", element: <Navigate to="/dashboard/homepage" /> },
        { path: "/login", element: <Login /> },
        { path: "/register", element: <Register /> },
        { path: "/forgot_password", element: <ForgotPassword/>},
        // { path: "404", element: <NotFound /> },
        // { path: "*", element: <Navigate to="/404" /> },
      ],
    },
    // { path: "*", element: <Navigate to="/404" replace /> },
  ]);
}
