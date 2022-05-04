import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import SignIn from "../user/SignIn";
import CarerPage from "../user/CarerPage";
function HomePage({ currentUser }) {
  const [tokenLoaded, setTokenloaded] = useState(false);

  let navigate = useNavigate();

  useEffect(() => {
    setTokenloaded(true);
  }, [navigate]);
  let homePage;

  if (!localStorage.getItem("Authtoken") && tokenLoaded) {
    homePage = <SignIn />;
  } else if (localStorage.getItem("Authtoken") && tokenLoaded) {
    homePage = <CarerPage />;
  }

  return <div>{homePage}</div>;
}

const mapStateToProps = (state) => {
  console.log(state);
  return {
    loading: state.carers.loading,
    currentUser: state.user.currentUser,
  };
};

export default connect(mapStateToProps)(HomePage);
