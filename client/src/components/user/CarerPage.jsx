import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import { logOutUser, fetchUserData } from "../../redux/user/user-action";
import axios from "axios";

function CarerPage({ currentUser, logOutUser, fetchUserData }) {
  let navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("Authtoken")) {
      navigate("/signin");
    }


    fetchUserData();
  }, [fetchUserData, navigate]);

  const logOut = () => {
    localStorage.removeItem("Authtoken");
    logOutUser();
    navigate("/signin");
  };

  return (
    <div>
      {currentUser ? currentUser.name : ""} page
      <button onClick={logOut}>Logout</button>
    </div>
  );
}

const mapDispatchToProps = (dispatch) => ({
  logOutUser: () => dispatch(logOutUser()),
  fetchUserData: () => dispatch(fetchUserData()),
});

const mapStateToProps = (state) => {
  console.log(state);
  return {
    loading: state.carers.loading,
    currentUser: state.user.currentUser,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CarerPage);
