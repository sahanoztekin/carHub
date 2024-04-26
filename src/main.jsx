import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import "./index.css";
import FilterResultsPage from "./Pages/FilterResultsPage/FilterResultsPage";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/filter-results" element={<FilterResultsPage />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
