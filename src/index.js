import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SightingPreviewList from "./components/SightingPreviewList";
import Sighting from "./components/Sighting";
import SightingFiltered from "./components/SightingFiltered";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<SightingPreviewList />} />
        <Route path="sightings/:sightingIndex" element={<Sighting />} />
        <Route path="filter/" element={<SightingFiltered />} />
        <Route path="*" element={"Nothing here!"} />
      </Route>
    </Routes>
  </BrowserRouter>
);
