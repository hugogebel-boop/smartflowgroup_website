import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";


function setHeaderOffsetFromDOM() {
    const nav = document.querySelector("header");
    const h = (nav as HTMLElement)?.offsetHeight ?? 72;
    document.documentElement.style.setProperty("--header-offset", `${h + 8}px`);
}


window.addEventListener("load", setHeaderOffsetFromDOM);
window.addEventListener("resize", setHeaderOffsetFromDOM);


ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);