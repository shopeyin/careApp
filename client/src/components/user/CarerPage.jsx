import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import DatePicker from "react-datepicker";
import { format } from "date-fns";
import { connect } from "react-redux";
import { logOutUser, fetchUserData } from "../../redux/user/user-action";
import axios from "axios";
const BASE_URL = "http://127.0.0.1:1000/api/v1/visit";

function CarerPage({ currentUser, logOutUser, fetchUserData }) {
  const [serviceUsersVisit, setServiceUsersVisit] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);

  let navigate = useNavigate();
  useEffect(() => {
    if (!localStorage.getItem("Authtoken")) {
      navigate("/");
    }
    fetchUserData();
  }, [fetchUserData, navigate]);

  let data = {
    dateOfVisit: "2022-05-21T23:00:00.000+00:00",
  };
  let newSelectedDate = format(new Date(selectedDate), "yyyy-MM-dd");
  let concate = newSelectedDate + "T00:00:00.000+00:00";
  console.log(concate);
  console.log(format(new Date(selectedDate), "yyyy-MM-dd"));

  useEffect(() => {
    console.log("called  effectoo");
    if (currentUser) {
      const fetchVisit = async () => {
        try {
          console.log("called data");
          const visitData = await axios.post(`${BASE_URL}/${currentUser._id}`, {
            dateOfVisit:
              format(new Date(selectedDate), "yyyy-MM-dd") +
              "T00:00:00.000+00:00",
          });
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
  }, [currentUser, selectedDate]);

  const logOut = () => {
    localStorage.removeItem("Authtoken");
    logOutUser();
    navigate("/");
  };

  return (
    <div>
      {currentUser ? currentUser.name : ""} page
      <button onClick={logOut}>Logout</button>
      <h3>All Service User To Visit</h3>
      Date{" "}
      <DatePicker
        selected={selectedDate}
        onChange={(date) => setSelectedDate(date)}
        dateFormat="yyyy/MM/dd"
        minDate={new Date()}
        isClearable
        showYearDropdown
        scrollableMonthYearDropdown
      />
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
