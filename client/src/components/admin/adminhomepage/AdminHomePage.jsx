import React from "react";
import { Link, Routes, Route } from "react-router-dom";
import ServiceUsers from "./../serviceuser/ServiceUsers";
import CreateServiceUser from "./../serviceuser/CreateServiceUser";
import UpdateServiceUser from "./../serviceuser/UpdateServiceUser";
import ServiceUserProfile from "./../serviceuser/ServiceUserProfile";
import Carer from "./../carer/Carer";
import AddCarer from "./../carer/AddCarer";
import CarerProfile from "./../carer/CarerProfile";
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

            <Route path="serviceusers/add-serviceuser" element={<CreateServiceUser />} />

            <Route
              path="serviceusers/edit/:id"
              element={<UpdateServiceUser />}
            />
            <Route path="serviceusers/profile/:id" element={<ServiceUserProfile />} />

            <Route path="carers" element={<Carer />} />
            <Route path="carers/add-carer" element={<AddCarer />} />

            <Route path="carers/profile/:id" element={<CarerProfile />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default AdminHomePage;
