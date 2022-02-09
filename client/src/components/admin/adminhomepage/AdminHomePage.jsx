import React from "react";
import { Link, Routes, Route } from "react-router-dom";
import ServiceUsers from "./../serviceuser/ServiceUsers";
import CreateServiceUser from "./../serviceuser/CreateServiceUser";
import UpdateServiceUser from "./../serviceuser/UpdateServiceUser";
import Carer from "./../carer/Carer";
import AddCarer from "./../carer/AddCarer";
import "./adminhomepage.style.scss";

function AdminHomePage() {
  return (
    <div className="adminHomepage container-fluid b">
      <div className="adminHomepage--box row r">
        <div className="col-sm-2 b">
          <div className="row">
            <Link to="serviceusers"> Service Users</Link>
          </div>
          <div className="row">
            {" "}
            <Link to="carers"> Carers</Link>
          </div>
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

            <Route path="carers" element={<Carer />} />
            <Route path="carers/add-carer" element={<AddCarer />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default AdminHomePage;
