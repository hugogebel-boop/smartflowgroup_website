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

// Throttle + rAF pour éviter les reflows répétés
let __resizeTick: number | null = null;
let __resizeScheduled = false;
const onResize = () => {
    if (__resizeScheduled) return;
    __resizeScheduled = true;
    if (__resizeTick) cancelAnimationFrame(__resizeTick);
    __resizeTick = requestAnimationFrame(() => {
        __resizeScheduled = false;
        setHeaderOffsetFromDOM();
    });
};

window.addEventListener("load", setHeaderOffsetFromDOM, { passive: true } as any);
window.addEventListener("resize", onResize, { passive: true } as any);

/* --- Mont�e du Router + App --- */
ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </React.StrictMode>
);

// Enregistrement du Service Worker
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js').catch(() => {});
    });
}
