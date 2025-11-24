import React from "react";
import { createRoot } from "react-dom/client";
import DataPreviewRoutes from "./DataPreviewRoutes";

/**
 * PUBLIC_INTERFACE
 * Mount point for Data Preview router (optional usage).
 */
const el = document.getElementById("root");
if (el) {
  const root = createRoot(el);
  root.render(<DataPreviewRoutes />);
}
