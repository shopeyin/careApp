import React from "react";
import { Link, Routes, Route } from "react-router-dom";
import ServiceUsers from "../ServiceUsers";
import CreateServiceUser from "./../CreateServiceUser";
import UpdateServiceUser from "../UpdateServiceUser";
import "./adminhomepage.style.scss";

function AdminHomePage() {
  return (
    <div className="adminHomepage container-fluid b">
      <div className="adminHomepage--box row r">
        <div className="col-sm-2 b">
          <div className="row">
            <Link to="serviceusers"> Service Users</Link>
            <Link to="Carers"> Carers</Link>
          </div>
          <div className="row">A</div>
          <div className="row">A</div>
        </div>
        <div className="col-sm r">
          <Routes>
            <Route path="serviceusers" element={<ServiceUsers />} />

            <Route path="serviceusers/add" element={<CreateServiceUser />} />

            <Route
              path="/serviceusers/edit/:id"
              element={<UpdateServiceUser />}
            />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default AdminHomePage;


