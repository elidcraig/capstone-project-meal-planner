import React from "react";
import ReactDOM from "react-dom/client";
import { Provider as JotaiProvider } from "jotai";
import JotaiDebugger from "./JotaiDebugger";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <JotaiProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
    <JotaiDebugger />
  </JotaiProvider>
);
