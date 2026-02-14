import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

// Global Error Logger for Debugging
window.addEventListener("error", (e) => {
    const errorDiv = document.createElement("div");
    errorDiv.style.position = "fixed";
    errorDiv.style.top = "0";
    errorDiv.style.left = "0";
    errorDiv.style.zIndex = "9999";
    errorDiv.style.background = "red";
    errorDiv.style.color = "white";
    errorDiv.style.padding = "20px";
    errorDiv.style.width = "100%";
    errorDiv.style.fontSize = "12px";
    errorDiv.style.fontFamily = "monospace";
    errorDiv.innerText = `[CRASH]: ${e.message} at ${e.filename}:${e.lineno}`;
    document.body.appendChild(errorDiv);
});

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
