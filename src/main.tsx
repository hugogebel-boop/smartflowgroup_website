import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.css";

/* --- Ajuste la hauteur du header pour les scroll anchors --- */
function setHeaderOffsetFromDOM() {
    const nav = document.querySelector("header");
    const h = (nav as HTMLElement)?.offsetHeight ?? 72;
    document.documentElement.style.setProperty("--header-offset", `${h + 8}px`);
}

window.addEventListener("load", setHeaderOffsetFromDOM);
window.addEventListener("resize", setHeaderOffsetFromDOM);

/* --- Montée du Router + App --- */
ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </React.StrictMode>
);
