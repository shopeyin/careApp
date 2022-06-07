import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AdminHomePage from "./components/admin/adminhomepage/AdminHomePage";
import AdminLogin from "./components/admin/adminlogin/AdminLogin";
import HomePage from "./components/homepage/HomePage";
import ServiceUserActivities from "./components/user/ServiceUserActivities";
import "./App.scss";
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="admin/*" element={<AdminHomePage />} />
          <Route path="/" element={<HomePage />} />
          <Route path="activities/:id" element={<ServiceUserActivities />} />
          <Route path="admin/login" element={<AdminLogin />} />
        </Routes>
      </BrowserRouter>{" "}
    </div>
  );
}

export default App;
