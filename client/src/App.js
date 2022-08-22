import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";
import AdminHomePage from "./components/admin/adminhomepage/AdminHomePage";
import ProtectedRoute from "./ProtectedRoute";
import ServiceUserActivities from "./components/user/serviceuseractivities/ServiceUserActivities";
import CarerPage from "./components/user/carerhomepage/CarerHomePage";
import SignIn from "./components/user/SignIn";
import Navbar from "./components/admin/navigation/Navbar";
import "./App.scss";

export const BASE_URL = "http://127.0.0.1:1000/api/v1";

function App() {
  const currentUser = useSelector((state) => state.user.currentUser);

  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />

        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute isAllowed={!!currentUser} redirectPath="/signin">
                {" "}
                <CarerPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="activities/:id"
            element={
              <ProtectedRoute isAllowed={!!currentUser} redirectPath="/signin">
                {" "}
                <ServiceUserActivities />
              </ProtectedRoute>
            }
          />
          <Route
            path="admin/*"
            element={
              <ProtectedRoute
                isAllowed={!!currentUser && currentUser.role === "admin"}
                redirectPath="/signin"
              >
                {" "}
                <AdminHomePage />
              </ProtectedRoute>
            }
          />

          <Route path="signin" element={<SignIn />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
