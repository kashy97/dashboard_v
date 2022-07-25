import { Navigate, useRoutes } from "react-router-dom";
// layouts
import DashboardLayout from "./layouts/dashboard";
import LogoOnlyLayout from "./layouts/LogoOnlyLayout";
//
import Login from "./auth/login";
import DashBoard from "./pages/dashboard";
import Profile from "./pages/profile";
import Team from "./pages/team";
import IAdd from "./pages/Invoices/invoices_form";
import Orders from "./pages/Invoices/invoices";
import Vendors from "./pages/Vendors/vendors";
import VAdd from "./pages/Vendors/vendors_add";
import VUpdate from "./pages/Vendors/vendors_update";
import Branches from "./pages/Branches/branches";
import BAdd from "./pages/Branches/branches_add";
import BUpdate from "./pages/Branches/branches_update";
import IUpdate from "./pages/Invoices/invoices_update";
import ROrders from "./pages/release_orders";
import Register from "./auth/register";
import RequireAuth from "./routes/RequireAuth";
import ForgotPassword from "./auth/forgotpassword";
import Edition from "./pages/edition";
// import NotFound from "./pages/Page404";

// ----------------------------------------------------------------------

export default function Router() {
  return useRoutes([
    {
      path: "/dashboard",
      element: <DashboardLayout />,
      children: [
        {
          element:<RequireAuth />,
          children:[
            {
              path: "homepage",
              element: (
                  <DashBoard />
              ),
            },
            {
              path: "profile",
              element: (
                // <RequireAuth>
                  <Profile />
                // </RequireAuth>
              ),
            },
            {
              path: "profile/edit",
              element: (
                // <RequireAuth>
                  <Team />
                // </RequireAuth>
              ),
            },
            {
              path: "vendors",
              element: (
                // <RequireAuth>
                  <Vendors />
                // </RequireAuth>
              ),
            },
            {
              path: "vendors/add",
              element: (
                // <RequireAuth>
                  <VAdd />
                // </RequireAuth>
              ),
            },
            {
              path: "vendors/update/:id",
              element: (
                // <RequireAuth>
                    <VUpdate />
                // </RequireAuth>
              ),
            },
            {
              path: "branches",
              element: (
                // <RequireAuth>
                  <Branches />
                // </RequireAuth>
              ),
            },
            {
              path: "branches/add",
              element: (
                // <RequireAuth>
                  <BAdd />
                // </RequireAuth>
              ),
            },
            {
              path: "branches/update/:id",
              element: (
                // <RequireAuth>
                    <BUpdate />
                // </RequireAuth>
              ),
            },
            {
              path: "invoices",
              element: (
                // <RequireAuth>
                  <Orders />
                // </RequireAuth>
              ),
            },
            {
              path: "invoices/add",
              element: (
                // <RequireAuth>
                  <IAdd />
                // </RequireAuth>
              ),
            },
            {
              path: "invoices/update/:id",
              element: (
                // <RequireAuth>
                    <IUpdate />
                // </RequireAuth>
              ),
            },
            {
              path: "release_orders",
              element: (
                // <RequireAuth>
                  <ROrders />
                // </RequireAuth>
              ),
            },
            {
              path: "edition",
              element: (
                // <RequireAuth>
                  <Edition />
                // </RequireAuth>
              ),
            },
          ],
        }
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
