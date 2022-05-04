import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AdminHomePage from "./components/admin/adminhomepage/AdminHomePage";

import HomePage from "./components/homepage/HomePage";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="admin/*" element={<AdminHomePage />} />
          <Route path="/" element={<HomePage />} />
        </Routes>
      </BrowserRouter>{" "}
    </div>
  );
}

export default App;
