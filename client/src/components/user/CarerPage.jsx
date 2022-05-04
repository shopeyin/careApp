import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import { logOutUser, fetchUserData } from "../../redux/user/user-action";

function CarerPage({ currentUser, logOutUser, fetchUserData }) {
  let navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("Authtoken")) {
      navigate("/");
    }

    fetchUserData();
  }, [fetchUserData, navigate]);

  const logOut = () => {
    localStorage.removeItem("Authtoken");
    logOutUser();
    navigate("/");
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
