import React from "react";
import { useNavigate, NavLink, Link } from "react-router-dom";

import { connect } from "react-redux";
import { logOutUser } from "../../../redux/user/user-action";
import "./navigation.style.scss";
function Navbar({ logOutUser, currentUser }) {
  console.log("NAVBAR", currentUser);
  let navigate = useNavigate();

  const logOut = () => {
    localStorage.removeItem("Authtoken");
    logOutUser();
    navigate("/");
  };
  return (
    <nav className="navbar navbar-expand-sm navbar-light bg-light b">
      <NavLink className="navbar-brand" to="/">
        Home
      </NavLink>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav">
          {currentUser ? (
            <li className="nav-item">
              <button onClick={logOut}>Logout {currentUser.role} </button>
            </li>
          ) : (
            ""
          )}

          <li className="nav-item">
            {currentUser && currentUser.role === "admin" ? (
              <div id="links">
                <Link
                  to="admin/carers"
                  data-toggle="collapse"
                  data-target="#navbarNav"
                >
                  {" "}
                  Carers
                </Link>
                <Link
                  to="admin/serviceusers"
                  data-toggle="collapse"
                  data-target="#navbarNav"
                >
                  {" "}
                  Serviceusers
                </Link>
              </div>
            ) : (
              ""
            )}
          </li>
        </ul>
      </div>
    </nav>
  );
}
const mapDispatchToProps = (dispatch) => ({
  logOutUser: () => dispatch(logOutUser()),
});

const mapStateToProps = (state) => {
  console.log(state);
  return {
    loading: state.carers.loading,
    currentUser: state.user.currentUser,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
