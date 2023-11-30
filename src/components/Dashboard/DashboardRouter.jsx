import React from "react";
import DHome from "./pages/DHome";
import DOrders from "./pages/DOrders";
import DProducts from "./pages/DProducts";
import DUsers from "./pages/DUsers";
import DPayments from "./pages/DPayments";
import DSettings from "./pages/DSettings";

export default function DashboardRouter({ activePage }) {
  const Layout = ({ component: Component }) => {
    return (
      <div className="p-5">
        <Component />
      </div>
    );
  };
  switch (activePage) {
    case "home":
      return <Layout component={DHome} />;
    case "orders":
      return <Layout component={DOrders} />;
    case "products":
      return <Layout component={DProducts} />;
    case "users":
      return <Layout component={DUsers} />;
    case "payments":
      return <Layout component={DPayments} />;
    case "settings":
      return <Layout component={DSettings} />;
    default:
      return <Layout component={DHome} />;
  }
}
