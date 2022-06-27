import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { connect } from "react-redux";
import AdminHomePage from "./components/admin/adminhomepage/AdminHomePage";
import ProtectedRoute from "./components/user/ProtectedRoute";
import ServiceUserActivities from "./components/user/ServiceUserActivities";
import CarerPage from "./components/user/CarerPage";
import SignIn from "./components/user/SignIn";
import Navbar from "./components/admin/navigation/Navbar";

import "./App.scss";
function App({ currentUser }) {
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
const mapStateToProps = (state) => {
  console.log(state);
  return {
    loading: state.carers.loading,
    currentUser: state.user.currentUser,
  };
};
export default connect(mapStateToProps)(App);
