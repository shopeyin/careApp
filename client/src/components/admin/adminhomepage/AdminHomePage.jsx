import React from "react";
import { Link, Routes, Route, useNavigate } from "react-router-dom";

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
  }, [fetchCarers, fetchServiceUsers]);
  return (
    <>
      <div className="container-fluid">
        <div className="row container-fluid__box b">
          <div className="col-sm-2 container-fluid__menu b ">
            <div className="row container-fluid__menu-adminName d-flex align-items-end justify-content-center b ">
              <h4>Admin name</h4>
            </div>

            <div className="row b d-flex align-items-end justify-content-center">
              {" "}
              <Link to="carers"> Carers</Link>
            </div>
            <div className="row b d-flex align-items-end justify-content-center">
              {" "}
              <Link to="serviceusers">Serviceusers</Link>
            </div>
            <div className="row align-items-end container-fluid__menu-logOutBtn b">
              Log Out
            </div>
          </div>
          <div className="col-sm-10  container-fluid__page  b">
            <div
              className="row b d-flex align-items-end justify-content-center"
              style={{ minHeight: "15%" }}
              id="homebar"
            >
              <div className="col">
                <button onClick={goToPreviousPage} className="m-1">
                  {" "}
                  Go back
                </button>
                <Link to=""> Home</Link>
              </div>
            </div>
            {/* <h1>Add background picture Admin homepage</h1> */}

            <Routes>
              <Route path="carers" element={<Carer />} />
              <Route path="carers/add-carer" element={<AddCarer />} />
              <Route path="carers/:carerId" element={<CarerProfile />} />

              <Route path="serviceusers" element={<ServiceUsers />} />
              <Route
                path="serviceusers/:serviceuserId"
                element={<ServiceUserProfile />}
              />
              <Route
                path="serviceusers/add-serviceuser"
                element={<CreateServiceUser />}
              />

              <Route
                path="serviceusers/edit/:id"
                element={<UpdateServiceUser />}
              />
            </Routes>
          </div>
        </div>
      </div>
    </>
  );
}
const mapDispatchToProps = (dispatch) => ({
  fetchCarers: () => dispatch(fetchCarers()),
  fetchServiceUsers: () => dispatch(fetchServiceUsers()),
});
export default connect(null, mapDispatchToProps)(AdminHomePage);
