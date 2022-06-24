import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import DatePicker from "react-datepicker";
import { format } from "date-fns";
import { connect } from "react-redux";
import { logOutUser, fetchUserData } from "../../redux/user/user-action";
import "./carerpage.style.scss";
import axios from "axios";
const BASE_URL = "http://127.0.0.1:1000/api/v1/visit";

function CarerPage({ currentUser, logOutUser, fetchUserData }) {
  const [serviceUsersVisit, setServiceUsersVisit] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());

  let navigate = useNavigate();

  useEffect(() => {
    let mounted = true;

    if (currentUser.role === "admin") {
      navigate("/admin");
    }
    let visitDate = {
      dateOfVisit:
        format(new Date(selectedDate), "yyyy-MM-dd") + "T00:00:00.000+00:00",
    };

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
        if (mounted) {
          localStorage.setItem("visitId", visit[0]._id);

          setServiceUsersVisit(visit[0].serviceusersToVisit);
        }
      } catch (err) {
        setServiceUsersVisit([]);
        console.log(err.message);
      }
    };

    fetchVisit();

    return () => {
      mounted = false;
    };
  }, [currentUser, navigate, selectedDate]);

  const logOut = () => {
    localStorage.removeItem("Authtoken");
    logOutUser();
    navigate("/");
  };
  let itemsToRender;
  if (serviceUsersVisit) {
    itemsToRender = serviceUsersVisit.map((serviceUser) => {
      return (
        <div
          className="row mt-3 pl-4 pr-4 d-flex  justify-content-center"
          key={serviceUser._id}
        >
          <div className="col-md-3 ">
            <Link to={`activities/${serviceUser._id}`}>
              <div className="card">
                <div className="card-body">
                  <h4 className="card-title"> {serviceUser.name}</h4>
                  <h5 className="card-subtitle mb-2 text-muted">
                    Visit 1 hour
                  </h5>
                  <h5 className="card-subtitle mb-2 text-muted">6:30-07:30</h5>
                  <h6 className="card-text">{serviceUser.address}</h6>
                </div>
              </div>
            </Link>{" "}
          </div>
        </div>
      );
    });
  }


  return (
    <div className="container-fluid p-0 ">
     
      <div className="row  d-flex  justify-content-center mt-4">
        <div className="col-md-2 ">
          {" "}
          <DatePicker
            selected={selectedDate}
            onChange={(date) => setSelectedDate(date)}
            dateFormat="yyyy/MM/dd"
            minDate={new Date()}
            showYearDropdown
            scrollableMonthYearDropdown
          />
        </div>
        <div className="col-md-2 ">
          <button onClick={logOut}>Logout</button>
        </div>
      </div>
      {serviceUsersVisit && serviceUsersVisit.length ? (
        itemsToRender
      ) : (
        <div className="row mt-3 d-flex  justify-content-center">
          <div className="col-md-3 ">
            <div className="card">
              <div className="card-body text-center">
                No visit on {format(new Date(selectedDate), "yyyy-MM-dd")}
              </div>
            </div>
          </div>
        </div>
      )}
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
