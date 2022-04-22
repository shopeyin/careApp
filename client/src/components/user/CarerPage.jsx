import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import { logOutUser } from "../../redux/user/user-action";
import axios from "axios";

function CarerPage({ currentUser, logOutUser }) {
  let navigate = useNavigate();

  useEffect(() => {
    // if (!localStorage.getItem("Authtoken")) {
    //   navigate("/signin");
    // }

    const fetchData = async () => {
      if (currentUser) {
        try {
          const loggedInUser = await axios.get(
            `http://127.0.0.1:1000/api/v1/carers/${currentUser._id}`
          );

          console.log(loggedInUser);
        } catch (error) {
          localStorage.removeItem("Authtoken");
        }
      }
    };

    fetchData();
  }, [currentUser]);

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
});

const mapStateToProps = (state) => {
  console.log(state);
  return {
    loading: state.carers.loading,
    currentUser: state.user.currentUser,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CarerPage);
