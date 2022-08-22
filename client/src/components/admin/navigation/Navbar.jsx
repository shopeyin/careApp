import React from "react";
import { useNavigate, NavLink, Link } from "react-router-dom";

import { connect } from "react-redux";
import { logOutUser } from "../../../redux/user/user-action";
import "./navigation.style.scss";
function Navbar({ logOutUser, currentUser }) {
  let navigate = useNavigate();

  const logOut = () => {
    localStorage.removeItem("Authtoken");
    logOutUser();
    navigate("/");
  };
  return (
    <nav className="navbar navbar-expand-sm navbar-light bg-light">
      <NavLink className="navbar-brand ml-2" to="/">
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
              <button onClick={logOut} className="btn btn-info">
                Logout{" "}
              </button>
            </li>
          ) : (
            ""
          )}

          <li className="nav-item">
            {currentUser && currentUser.role === "admin" ? (
              <div id="links">
                <Link
                  to="admin/carers"
                  // data-toggle="collapse"
                  data-target="#navbarNav"
                  className="link-color"
                >
                  {" "}
                  Carers
                </Link>
                <p>
                  {" "}
                  <Link
                    to="admin/serviceusers"
                    // data-toggle="collapse"
                    data-target="#navbarNav"
                    className="link-color"
                  >
                    {" "}
                    Serviceusers
                  </Link>
                </p>
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
  return {
    loading: state.carers.loading,
    currentUser: state.user.currentUser,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
