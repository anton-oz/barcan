import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { TaskProvider } from "./context/TaskContext";
import "./reset.css";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <TaskProvider>
      <App />
    </TaskProvider>
  </StrictMode>,
);
