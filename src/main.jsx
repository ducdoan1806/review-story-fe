import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import "./root.css";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./app/store.js";
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Router basename="">
      <Provider store={store}>
        <App />
      </Provider>
    </Router>
  </React.StrictMode>
);
