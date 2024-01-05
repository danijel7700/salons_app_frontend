import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.js";
import "jquery/dist/jquery.js";
import "popper.js/dist/popper.js";
import "@fortawesome/fontawesome-free/css/fontawesome.min.css";
import AppRouting from "./components/AppRouting";
import HomePageNavbar from "./components/HomePageNavbar";
import { WebsocketProvider, socket } from "./contexts/WebsocketContext";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <WebsocketProvider value={socket}>
      <BrowserRouter>
        <AppRouting />
      </BrowserRouter>
    </WebsocketProvider>
  </React.StrictMode>
);

reportWebVitals();
