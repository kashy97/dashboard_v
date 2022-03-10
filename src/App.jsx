import React from "react";
// import "./App.css";
// import { Routes, Route } from "react-router-dom";
// import Login from "./auth/login";
// import RequireAuth from "./routes/RequireAuth";
// import DashBoard from "./pages/dashboard";
// import Profile from "./pages/profile";
// import NavBar from "./layouts/dashboard/Navbar";
// import Sidebar from "./layouts/dashboard/Sidebar";
// import Team from "./pages/team";
// import IAdd from "./pages/invoices_form";
// import Orders from "./pages/invoices";
// import Vendors from "./pages/vendors";
// import VAdd from "./pages/vendors_add";
// import ROrders from "./pages/release_orders";
// import Footer from "./components/Footer";
// import Register from "./auth/register";
import ThemeConfig from "./theme";
import GlobalStyles from "./theme/globalStyles";
import Router from "./routes";
import ScrollToTop from "./components/ScrollToTop";

function App() {
  return (
    <ThemeConfig>
      <ScrollToTop />
      <GlobalStyles />
      <Router />
    </ThemeConfig>
  );
}

export default App;
