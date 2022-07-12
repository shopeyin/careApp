import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { fetchAllTaskofaServiceUser } from "../admin/task/taskFunctions";
import { format } from "date-fns";
import { addVisitInfo } from "./utils";
import { useParams, useNavigate } from "react-router-dom";
import StartVisit from "./StartVisit";
import EndVisit from "./EndVisit";
function ServiceUserActivities({ currentUser }) {
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

  const params = useParams();

  // const changeAllBtnStatus = () => {
  //   setAllBtnStatus(false);
  //   //localStorage.setItem(`allBtnStatus`, !allBtnStatus);
  // };
  const navigate = useNavigate();

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
    localStorage.removeItem(`yesDISABLED ${params.id} ${visitId}`)

    console.log("deleting");
  };

  const goToPreviousPage = () => {
    navigate(-1);
  };

  const startTimeFunction = () => {
    const date = new Date();
    let formattedDate = format(date, "HH:mm");
    setStartTime(formattedDate);
    localStorage.setItem(`startTime ${params.id}${visitId}`, formattedDate);
    localStorage.setItem(`visitStartedStatus ${params.id}${visitId}`, true);
    localStorage.setItem(`startEndButton ${params.id}${visitId}`, true);
    setVisitStartedStatus(true);
    setStartEndButton(true);
  };

  const endTimeFunction = () => {
    const date = new Date();
    let formattedDate = format(date, "HH:mm");
    setEndTime(format(date, "HH:mm"));
    localStorage.setItem(`endTime ${params.id}${visitId}`, formattedDate);
    localStorage.setItem(`visitStartedStatus ${params.id}${visitId}`, false);
    localStorage.setItem(
      `startEndButton ${params.id}${visitId}`,
      !visitStartedStatus
    );
    localStorage.setItem(`disableBtn ${params.id}${visitId}`, disableBtn);
    setVisitStartedStatus(false);
    setDisableBtn(true);

    setTimeout(deleteLocalStorageItems, 5000);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("submitted", visitNote);

    localStorage.setItem(
      `visitNoteDetails ${params.id} ${visitId} `,
      visitNote
    );

    addVisitInfo(data);
  };

  const getInitialVisitValues = () => {
    let note = localStorage.getItem(
      `visitNoteDetails ${params.id} ${visitId} `
    );

    let timeStart = localStorage.getItem(`startTime ${params.id}${visitId}`);
    let timeEnd = localStorage.getItem(`endTime ${params.id}${visitId}`);
    let visitStartedStatus = localStorage.getItem(
      `visitStartedStatus ${params.id}${visitId}`
    );
    let startEndButton = localStorage.getItem(
      `startEndButton ${params.id}${visitId}`
    );
    let disableBtn = localStorage.getItem(`disableBtn ${params.id}${visitId}`);

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
    console.log("component mounting");
    let x = localStorage.getItem(
      `yesDISABLED 62c58d74b3a50324f46f42b1 62cd34583cabb10c74c8d217`
    );
    console.log(x);
    getInitialVisitValues();
    getBtnStatus();
    const fetchTask = async () => {
      let data = await fetchAllTaskofaServiceUser(params.id);
      setTasks(data);
    };

    fetchTask();

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
  };

  let data = {
    visitNote: visitNote,
    visitId: visitId,
    carerId: currentUser._id,
    serviceuserId: params.id,

    activities,
  };
  // localStorage.setItem("START", startTime);
  console.log(visitStartedStatus);
  console.log(startEndButton);
  return (
    <div className="container">
      <i className="fa-solid fa-arrow-left mt-2" onClick={goToPreviousPage}></i>
      <span>{startTime ? `${startTime} -` : ""}</span>{" "}
      <span>{endTime ? endTime : ""}</span>
      <div className="row  d-flex  justify-content-center mt-4 ">
        <div className="col-md-5">
          <form onSubmit={handleSubmit}>
            {" "}
            <div className="form-group">
              <label htmlFor="exampleInputTitle">Visit note</label>
              <input
                type="text"
                className="form-control"
                aria-describedby="TitleHelp"
                onChange={(e) => setVisitNote(e.target.value)}
                defaultValue={visitNote}
              />

              <button
                type="submit"
                className="btn btn-primary mt-1"
                disabled={!visitStartedStatus}
              >
                Submit
              </button>
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
                  yes
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
  console.log(state);
  return {
    loading: state.carers.loading,
    currentUser: state.user.currentUser,
  };
};

export default connect(mapStateToProps)(ServiceUserActivities);
