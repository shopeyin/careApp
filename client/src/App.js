import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AdminHomePage from "./components/admin/adminhomepage/AdminHomePage";

import HomePage from "./components/homepage/HomePage";
import ServiceUserActivities from "./components/user/ServiceUserActivities";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="admin/*" element={<AdminHomePage />} />
          <Route path="/" element={<HomePage />} />
          <Route path="activities/:id" element={<ServiceUserActivities />} />
        </Routes>
      </BrowserRouter>{" "}
    </div>
  );
}

export default App;
