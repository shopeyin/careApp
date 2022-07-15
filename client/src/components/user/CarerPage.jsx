import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import DatePicker from "react-datepicker";
import { format } from "date-fns";
import { connect } from "react-redux";
import { logOutUser, fetchUserData } from "../../redux/user/user-action";
import "./carerpage.style.scss";
import axios from "axios";
import haversine from "haversine-distance";
const BASE_URL = "http://127.0.0.1:1000/api/v1/visit";

function CarerPage({ currentUser, logOutUser, fetchUserData }) {
  const [serviceUsersVisit, setServiceUsersVisit] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());

  let navigate = useNavigate();

  const getCarerLocation = () => {
    const watchId = navigator.geolocation.getCurrentPosition(
      (position) => {
        console.log("LAT", position.coords.latitude);
        console.log("LONG", position.coords.longitude);

        // const a = {
        //   latitude: position.coords.latitude,
        //   longitude: position.coords.longitude,
        // };
        // const b = { latitude:55.92356, longitude: -3.289782 };
        // console.log("CALC", haversine(a, b));
      },
      (error) => {
        console.log(error.message);
      },
      {
        enableHighAccuracy: true,
      }
    );
    
  };

  useEffect(() => {
    //getCarerLocation();
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

  let itemsToRender;
  if (serviceUsersVisit) {
    itemsToRender = serviceUsersVisit.map((serviceUser) => {
      return (
        <div
          className="row mt-3 pl-4 pr-4 d-flex  justify-content-center"
          key={serviceUser._id}
        >
          <div className="col-8 col-sm-5 col-md-4 col-lg-3">
            <Link to={`activities/${serviceUser._id}`} className="link-color">
              <div className="card ">
                <div className="card-body ">
                  <h4 className="card-title link-color"> {serviceUser.name}</h4>
                  <h5 className="card-subtitle mb-2 text-muted link-color">
                    Visit 1 hour
                  </h5>
                  <h5 className="card-subtitle mb-2 text-muted link-color">
                    6:30-07:30
                  </h5>
                  <h6 className="card-text link-color ">
                    {serviceUser.address}
                  </h6>
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
      <div className="row  d-flex  justify-content-center mt-4 ">
        <div className="col-8 col-sm-4  text-center">
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
      </div>
      {serviceUsersVisit && serviceUsersVisit.length ? (
        itemsToRender
      ) : (
        <div className="row mt-3 d-flex  justify-content-center">
          <div className="col-8 col-sm-4 ">
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
