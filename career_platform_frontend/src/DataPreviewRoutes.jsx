import React from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import DataPreviewPage from "./pages/DataPreview";

function Home() {
  return (
    <div style={{ padding: 16 }}>
      <h1>Career Platform</h1>
      <p>Welcome.</p>
    </div>
  );
}

/**
 * PUBLIC_INTERFACE
 * DataPreviewRoutes
 * Provides a minimal router with a link to Data Preview page.
 */
export default function DataPreviewRoutes() {
  return (
    <BrowserRouter>
      <nav style={{ padding: 12, background: "#ffffff", borderBottom: "1px solid #eee" }}>
        <Link to="/" style={{ marginRight: 12 }}>
          Home
        </Link>
        <Link to="/data-preview">Data Preview</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/data-preview" element={<DataPreviewPage />} />
      </Routes>
    </BrowserRouter>
  );
}
