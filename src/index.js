import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { HashRouter } from "react-router-dom";
import { AuthContextProvider } from "./context/AuthContext";
import reportWebVitals from "./reportWebVitals";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <HashRouter>
    <AuthContextProvider>
      <App />
    </AuthContextProvider>
  </HashRouter>
);

reportWebVitals();
