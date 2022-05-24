import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { connect } from "react-redux";
import { logOutUser, fetchUserData } from "../../redux/user/user-action";
import axios from "axios";
const BASE_URL = "http://127.0.0.1:1000/api/v1/visit";

function CarerPage({ currentUser, logOutUser, fetchUserData }) {
  console.log("HERE", currentUser);
  const [serviceUsersVisit, setServiceUsersVisit] = useState([]);

  let navigate = useNavigate();
  useEffect(() => {
    if (!localStorage.getItem("Authtoken")) {
      navigate("/");
    }
    fetchUserData();
  }, [fetchUserData, navigate]);

  useEffect(() => {
    if (currentUser) {
      const fetchVisit = async () => {
        try {
          const visitData = await axios.get(`${BASE_URL}/${currentUser._id}`);
          const {
            data: {
              data: { visit },
            },
          } = visitData;
          console.log(visit[0].serviceusersToVisit);
          setServiceUsersVisit(visit[0].serviceusersToVisit);
        } catch (err) {
          console.log(err);
        }
      };
      fetchVisit();
    }
  }, [currentUser]);

  const logOut = () => {
    localStorage.removeItem("Authtoken");
    logOutUser();
    navigate("/");
  };

  console.log(serviceUsersVisit);
  return (
    <div>
      {currentUser ? currentUser.name : ""} page
      <button onClick={logOut}>Logout</button>
      <h3>All Service User To Visit</h3>
      {serviceUsersVisit.map((serviceUser) => {
        return (
          <div key={serviceUser._id}>
            <Link to={`activities/${serviceUser._id}`}>
              {" "}
              {serviceUser.name} {serviceUser._id}
            </Link>{" "}
          </div>
        );
      })}
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
