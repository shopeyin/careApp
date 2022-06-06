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
  const [selectedDate, setSelectedDate] = useState(new Date());


  let navigate = useNavigate();
  useEffect(() => {
    if (!localStorage.getItem("Authtoken")) {
      navigate("/");
    }
    fetchUserData();
  }, [fetchUserData, navigate]);

  let visitDate = {
    dateOfVisit:
      format(new Date(selectedDate), "yyyy-MM-dd") + "T00:00:00.000+00:00",
  };

 

  useEffect(() => {
   
    if (currentUser) {
      const fetchVisit = async () => {
        try {
          
          const visitData = await axios.post(
            `${BASE_URL}/${currentUser._id}`,
            visitDate
          );
          const {
            data: {
              data: { visit },
            },
          } = visitData;
          console.log(visit[0]);
          console.log(visit[0]._id);
          localStorage.setItem('visitId',visit[0]._id )
          console.log("success calleddddddddd")

          setServiceUsersVisit(visit[0].serviceusersToVisit);
         
        } catch (err) {
          console.log("error called")
          setServiceUsersVisit([]);
          console.log(err);
        }
      };
      fetchVisit();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUser, selectedDate]);

  console.log(serviceUsersVisit);

  const logOut = () => {
    localStorage.removeItem("Authtoken");
    logOutUser();
    navigate("/");
  };
  let itemsToRender;
  if (serviceUsersVisit) {
    itemsToRender = serviceUsersVisit.map((serviceUser) => {
      return (
        <div key={serviceUser._id}>
          <Link to={`activities/${serviceUser._id}`}>
            {" "}
            {serviceUser.name} {serviceUser._id}
          </Link>{" "}
        </div>
      );
    });
  }

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
      {serviceUsersVisit &&  serviceUsersVisit.length  ? itemsToRender : "no vists"}
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
