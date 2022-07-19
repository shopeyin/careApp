import React from "react";
import { Link, Routes, Route, useNavigate,  } from "react-router-dom";

import { connect } from "react-redux";
import ServiceUsers from "./../serviceuser/ServiceUsers";
import CreateServiceUser from "./../serviceuser/CreateServiceUser";
import UpdateServiceUser from "./../serviceuser/UpdateServiceUser";
import ServiceUserProfile from "./../serviceuser/ServiceUserProfile";
import Carer from "./../carer/Carer";
import AddCarer from "./../carer/AddCarer";
import CarerProfile from "./../carer/CarerProfile";
import { fetchCarers } from "../../../redux/carer/carer-action";
import { logOutUser } from "../../../redux/user/user-action";
import { fetchServiceUsers } from "../../../redux/serviceUser/serviceuser-action";
import "./adminhomepage.style.scss";

function AdminHomePage({
  fetchCarers,
  fetchServiceUsers,
 
  currentUser,
}) {
 
  const navigate = useNavigate();

  const goToPreviousPage = () => {
    navigate(-1);
  };

  React.useEffect(() => {
    let isMounted = true;
    if (isMounted) {
      fetchCarers();
      fetchServiceUsers();
    }
    return () => {
      isMounted = false;
    };
  }, [fetchCarers, fetchServiceUsers, navigate]);
  return (
    <div className="container-fluid navigation">
      <div className="row ">
        <div className="col-sm-2 navigation__sidebar">
          <div className="row">
            <div className="col">
              <Link to="carers" className="link-color">
                Carers
              </Link>
            </div>
          </div>
          <div className="row">
            <div className="col">
              <Link to="serviceusers" className="link-color">
                Serviceusers
              </Link>
            </div>
          </div>
        </div>
        <div className="col-sm-10 navigation__innerpage">
          <button
            type="button"
            onClick={goToPreviousPage}
            className="btn btn-dark m-1"
          >
            Back
          </button>
          <h1> Welcome {currentUser ? currentUser.name : ""}</h1>
          <Routes>
            <Route path="carers" index element={<Carer />} />
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
  );
}

const mapStateToProps = (state) => {
  
  return {
    loading: state.carers.loading,
    currentUser: state.user.currentUser,
  };
};
const mapDispatchToProps = (dispatch) => ({
  fetchCarers: () => dispatch(fetchCarers()),
  fetchServiceUsers: () => dispatch(fetchServiceUsers()),
  logOutUser: () => dispatch(logOutUser()),
});
export default connect(mapStateToProps, mapDispatchToProps)(AdminHomePage);
