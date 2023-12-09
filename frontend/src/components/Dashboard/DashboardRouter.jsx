import React from "react";
import DHome from "../../pages/Dashboard/DHome";
import DOrders from "../../pages/Dashboard/DOrders";
import DProducts from "../../pages/Dashboard/DProducts";
import DUsers from "../../pages/Dashboard/DUsers";
import DPayments from "../../pages/Dashboard/DPayments";
import DSettings from "../../pages/Dashboard/DSettings";
import DCategory from "../../pages/Dashboard/DCategory";

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
    case "categories":
      return <Layout component={DCategory} />;
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
