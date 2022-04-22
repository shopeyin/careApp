import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AdminHomePage from "./components/admin/adminhomepage/AdminHomePage";
import SignIn from "./components/user/SignIn";
import HomePage from "./components/homepage/HomePage";
import CarerPage from "./components/user/CarerPage";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="admin/*" element={<AdminHomePage />} />
          <Route path="/" element={<HomePage />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/carer" element={<CarerPage />} />
        </Routes>
      </BrowserRouter>{" "}
    </div>
  );
}

export default App;
