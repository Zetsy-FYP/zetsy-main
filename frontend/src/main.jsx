// import React from "react";
import ReactDOM from "react-dom/client";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import "./index.css";
import React from "react";
import Router from "./utils/Router";
import AuthProvider from "./contexts/Auth";
import { StoreProvider } from "./contexts/Store";
import { StoreUsersProvider } from "./contexts/StoreUsers";

ReactDOM.createRoot(document.getElementById("root")).render(
  <>
    <AuthProvider>
      <StoreProvider>
        <StoreUsersProvider>
          <Router />
        </StoreUsersProvider>
      </StoreProvider>
    </AuthProvider>
    <ToastContainer />
  </>
);
