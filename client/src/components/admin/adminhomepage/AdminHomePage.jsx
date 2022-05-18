import React from "react";
import { Link, Routes, Route } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import ServiceUsers from "./../serviceuser/ServiceUsers";
import CreateServiceUser from "./../serviceuser/CreateServiceUser";
import UpdateServiceUser from "./../serviceuser/UpdateServiceUser";
import ServiceUserProfile from "./../serviceuser/ServiceUserProfile";
import Carer from "./../carer/Carer";
import AddCarer from "./../carer/AddCarer";
import CarerProfile from "./../carer/CarerProfile";
import { fetchCarers } from "../../../redux/carer/carer-action";
import { fetchServiceUsers } from "../../../redux/serviceUser/serviceuser-action";
import "./adminhomepage.style.scss";

function AdminHomePage({ fetchCarers, fetchServiceUsers }) {
  const navigate = useNavigate();

  const goToPreviousPage = () => {
    navigate(-1);
  };

  React.useEffect(() => {
    fetchCarers();
    fetchServiceUsers();
    console.log("mounting");
  }, [fetchCarers, fetchServiceUsers]);
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
          <div className="row">
            {" "}
            <button onClick={goToPreviousPage}>Go back</button>
          </div>
        </div>
        <div className="col-sm r">
          <Routes>
            <Route path="serviceusers" element={<ServiceUsers />} />

            <Route
              path="serviceusers/add-serviceuser"
              element={<CreateServiceUser />}
            />

            <Route
              path="serviceusers/edit/:id"
              element={<UpdateServiceUser />}
            />
            <Route
              path="serviceusers/profile/:id"
              element={<ServiceUserProfile />}
            />

            <Route path="carers" element={<Carer />} />
            <Route path="carers/add-carer" element={<AddCarer />} />

            <Route path="carers/profile/:id" element={<CarerProfile />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}
const mapDispatchToProps = (dispatch) => ({
  fetchCarers: () => dispatch(fetchCarers()),
  fetchServiceUsers: () => dispatch(fetchServiceUsers()),
});
export default connect(null, mapDispatchToProps)(AdminHomePage);
