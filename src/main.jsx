import * as React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Landing from "./pages/Landing";
import Layout from "./components/Layout";
import "./index.css";
import Themes from "./pages/Themes";
import Login from "./pages/Authentication/Login";
import Register from "./pages/Authentication/Register";
import AccountRecovery from "./pages/Authentication/AccountRecovery";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")).render(
  <>
  <Router>
    <Switch>
      <Route path="/">
        <Layout>
          <Landing/>
        </Layout>
        </Route>
    </Switch>
  </Router>
  </>
);
