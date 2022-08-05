import React, { useEffect, useState } from "react";
import { connect, useSelector } from "react-redux";
import haversine from "haversine-distance";
import { fetchAllTaskofaServiceUser } from "../../admin/task/taskFunctions";
import { fetchServiceUsers } from "../../../redux/serviceUser/serviceuser-action";
import { format } from "date-fns";
import { addVisitInfo } from "../utils";
import { useParams, useNavigate } from "react-router-dom";
import StartVisit from "./StartVisit";
import EndVisit from "./EndVisit";

function ServiceUserActivities({ currentUser, fetchServiceUsers }) {
  const [tasks, setTasks] = useState([]);
  const [visitNote, setVisitNote] = useState([]);
  const [activities, setActivities] = useState({});
  const [yesDisabled, setYesDisabled] = useState([]);
  const [noDisabled, setNoDisabled] = useState([]);
  const [startTime, setStartTime] = useState();
  const [endTime, setEndTime] = useState();
  const [startEndButton, setStartEndButton] = useState(false);
  const [disableBtn, setDisableBtn] = useState(false);
  const [visitStartedStatus, setVisitStartedStatus] = useState(false);

  const [locationPermissionError, setLocationPermissionError] = useState(false);
  const [lengthOfActivities, setLengthOfActivities] = useState();
  const [endVisitError, setEndVisitError] = useState(false);

  const params = useParams();
  const navigate = useNavigate();

  let serviceUser;

  useSelector((state) => {
    const found = state.serviceUsers.serviceUsers.find(
      (element) => element._id === params.id
    );

    serviceUser = found;
  });

  let visitId = localStorage.getItem("visitId");

  const deleteLocalStorageItems = () => {
    let visitId = localStorage.getItem("visitId");

    localStorage.removeItem(`visitNoteDetails ${params.id} ${visitId} `);
    localStorage.removeItem(`startTime ${params.id}${visitId}`);
    localStorage.removeItem(`endTime ${params.id}${visitId}`);
    localStorage.removeItem(`visitStartedStatus ${params.id}${visitId}`);
    localStorage.removeItem(`startEndButton ${params.id}${visitId}`);
    localStorage.removeItem(`disableBtn ${params.id}${visitId}`);
    localStorage.removeItem("visitId");

    localStorage.removeItem(`noDISABLED ${params.id} ${visitId}`);
    localStorage.removeItem(`yesDISABLED ${params.id} ${visitId}`);

    console.log("deleted");
  };



  const goToPreviousPage = () => {
    navigate(-1);
  };

  const startTimeFunction = async () => {
    const location = navigator.geolocation.getCurrentPosition(
      (pos) => {
        const date = new Date();
        let formattedDate = format(date, "HH:mm");
        setStartTime(formattedDate);
        localStorage.setItem(`startTime ${params.id}${visitId}`, formattedDate);
        localStorage.setItem(`visitStartedStatus ${params.id}${visitId}`, true);
        localStorage.setItem(`startEndButton ${params.id}${visitId}`, true);

        setVisitStartedStatus(true);
        setStartEndButton(true);
      },
      (error) => {
        console.log(error.message);
        setLocationPermissionError(true);
        setTimeout(() => {
          setLocationPermissionError(false);
        }, 5000);
      },
      {
        enableHighAccuracy: true,
      }
    );
    return location;
  };

  const endTimeFunction = () => {
    if (tasks.length !== lengthOfActivities || !visitNote) {
      setEndVisitError(true);
      setTimeout(() => {
        setEndVisitError(false);
      }, 5000);

      return;
    }

    const location = navigator.geolocation.getCurrentPosition(
      (position) => {
        const a = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        };
        const b = {
          latitude: serviceUser.latitude,
          longitude: serviceUser.longitude,
        };

        console.log("CALC", haversine(a, b));

        const date = new Date();
        let formattedDate = format(date, "HH:mm");
        setEndTime(format(date, "HH:mm"));

        localStorage.setItem(`endTime ${params.id}${visitId}`, formattedDate);
        localStorage.setItem(
          `visitStartedStatus ${params.id}${visitId}`,
          false
        );
        localStorage.setItem(
          `startEndButton ${params.id}${visitId}`,
          !visitStartedStatus
        );
        localStorage.setItem(`disableBtn ${params.id}${visitId}`, disableBtn);
        setVisitStartedStatus(false);
        setDisableBtn(true);

        handleSubmit(haversine(a, b));
        setTimeout(deleteLocalStorageItems, 604800000);
      },
      (error) => {
        console.log(error.message);
        setLocationPermissionError(true);
        setTimeout(() => {
          setLocationPermissionError(false);
        }, 5000);
      },
      {
        enableHighAccuracy: true,
      }
    );
    return location;
  };

  const handleSubmit = (diffInDistance) => {
    const date = new Date();
    if (!visitNote || !visitId || !startTime || !activities) return;
    let data = {
      time: `${startTime}-${format(date, "HH:mm")}`,
      visitNote: visitNote,
      visitId: visitId,
      carerId: currentUser._id,
      serviceuserId: params.id,
      diffInDistance,
      activities,
      serviceUserName: serviceUser.name,
    };

    addVisitInfo(data);
    console.log("submitted", data);

    localStorage.setItem(
      `visitNoteDetails ${params.id} ${visitId} `,
      visitNote
    );
  };

  const getInitialVisitValues = () => {
    let note = localStorage.getItem(
      `visitNoteDetails ${params.id} ${visitId} `
    );

    let timeStart = localStorage.getItem(`startTime ${params.id}${visitId}`);
    let timeEnd = localStorage.getItem(`endTime ${params.id}${visitId}`);
    let visitStartedStatus = JSON.parse(
      localStorage.getItem(`visitStartedStatus ${params.id}${visitId}`)
    );
    let startEndButton = localStorage.getItem(
      `startEndButton ${params.id}${visitId}`
    );

    let disableBtn = localStorage.getItem(`disableBtn ${params.id}${visitId}`);
    let activitiesLength = JSON.parse(
      localStorage.getItem(`activitiesLength ${params.id}${visitId}`)
    );

    setLengthOfActivities(activitiesLength);
    setDisableBtn(disableBtn);
    setStartEndButton(startEndButton);
    setVisitStartedStatus(visitStartedStatus);
    setStartTime(timeStart);
    setEndTime(timeEnd);
    setVisitNote(note);
  };

  const getBtnStatus = () => {
    let yesBtn = JSON.parse(
      localStorage.getItem(`yesDISABLED ${params.id} ${visitId}`)
    );
    let noBtn = JSON.parse(
      localStorage.getItem(`noDISABLED ${params.id} ${visitId}`)
    );
    if (yesBtn || noBtn) {
      setYesDisabled(yesBtn);
      setNoDisabled(noBtn);
    }
  };

  useEffect(() => {

    getInitialVisitValues();
    getBtnStatus();
    const fetchTask = async () => {
      let data = await fetchAllTaskofaServiceUser(params.id);
      setTasks(data);
    };

    fetchTask();
    fetchServiceUsers();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.id]);
  const handleInput = (e, key) => {
    if (e.target.value === "Yes") {
      let results = noDisabled.filter((id) => id !== e.target.id);

      setNoDisabled(results);

      localStorage.setItem(
        `noDISABLED ${params.id} ${visitId}`,
        JSON.stringify(results)
      );

      setYesDisabled([...yesDisabled, e.target.id]);

      localStorage.setItem(
        `yesDISABLED ${params.id} ${visitId}`,
        JSON.stringify([...yesDisabled, e.target.id])
      );
    } else {
      let results = yesDisabled.filter((id) => id !== e.target.id);

      setYesDisabled(results);

      localStorage.setItem(
        `yesDISABLED ${params.id} ${visitId}`,
        JSON.stringify(results)
      );

      setNoDisabled([...noDisabled, e.target.id]);

      localStorage.setItem(
        `noDISABLED ${params.id} ${visitId}`,
        JSON.stringify([...noDisabled, e.target.id])
      );
    }

    setActivities({ ...activities, [key]: e.target.value });
    setLengthOfActivities(
      Object.keys({ ...activities, [key]: e.target.value }).length
    );
    localStorage.setItem(
      `activitiesLength ${params.id}${visitId}`,
      Object.keys({ ...activities, [key]: e.target.value }).length
    );
  };
  return (
    <div className="container">
      <i className="fa-solid fa-arrow-left mt-2" onClick={goToPreviousPage}></i>
      <span>{startTime ? `${startTime} -` : ""}</span>{" "}
      <span>{endTime ? endTime : ""}</span>{" "}
      <span style={{ color: "red" }}>
        {" "}
        {locationPermissionError
          ? "accept location permission before starting visit"
          : ""}
      </span>
      <span style={{ color: "red" }}>
        {endVisitError ? "complete all fields or tasks" : ""}{" "}
      </span>
      <div className="row  d-flex  justify-content-center mt-4 ">
        <div className="col-md-5">
          <form onSubmit={handleSubmit}>
            {" "}
            <div className="form-group">
              <label htmlFor="exampleInputTitle">Visit note </label>
              <input
                type="text"
                className="form-control"
                aria-describedby="TitleHelp"
                onChange={(e) => setVisitNote(e.target.value)}
                defaultValue={visitNote}
              />
            </div>
          </form>
        </div>
      </div>
      <div className="row  d-flex  justify-content-center b">
        <div className="col-5 col-md-2 ">
          {startEndButton ? (
            <EndVisit
              endTimeFunction={endTimeFunction}
              disableBtn={disableBtn}
            />
          ) : (
            <StartVisit startTimeFunction={startTimeFunction} />
          )}
        </div>
      </div>
      {tasks.map((task) => {
        return (
          <div
            key={task._id}
            className="row  d-flex  justify-content-center mt-2 b"
          >
            <div className="col-6 col-sm-7  text-center">{task.nameOfTask}</div>
            <div className="col ">
              {visitStartedStatus ? (
                <button
                  className="btn btn-primary btn-block"
                  value="Yes"
                  id={task._id}
                  onClick={(e) => {
                    handleInput(e, `${task.nameOfTask}`);
                  }}
                  disabled={yesDisabled ? yesDisabled.includes(task._id) : ""}
                >
                  {" "}
                  Yes
                </button>
              ) : (
                <button
                  className="btn btn-primary btn-block"
                  value="Yes"
                  id={task._id}
                  onClick={(e) => {
                    handleInput(e, `${task.nameOfTask}`);
                  }}
                  disabled={true}
                >
                  {" "}
                  Yes
                </button>
              )}
            </div>
            <div className="col ">
              {visitStartedStatus ? (
                <button
                  className="btn btn-secondary btn-block"
                  id={task._id}
                  value="No"
                  onClick={(e) => handleInput(e, `${task.nameOfTask}`)}
                  disabled={noDisabled ? noDisabled.includes(task._id) : ""}
                >
                  {" "}
                  NO
                </button>
              ) : (
                <button
                  className="btn btn-secondary btn-block"
                  id={task._id}
                  value="No"
                  onClick={(e) => handleInput(e, `${task.nameOfTask}`)}
                  disabled={true}
                >
                  {" "}
                  NO
                </button>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
const mapStateToProps = (state) => {
 
  return {
    currentUser: state.user.currentUser,
    serviceUsers: state.serviceUsers.serviceUsers,
  };
};

const mapDispatchToProps = (dispatch) => ({
  fetchServiceUsers: () => dispatch(fetchServiceUsers()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ServiceUserActivities);

