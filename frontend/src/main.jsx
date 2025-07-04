import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import ResponsiveGuard from "./ResponsiveGuard";

import { Provider } from "react-redux";
import store from "./store";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ResponsiveGuard>
      <Provider store={store}>
        <App />
      </Provider>
    </ResponsiveGuard>
  </React.StrictMode>,
);
