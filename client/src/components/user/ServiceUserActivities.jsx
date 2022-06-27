import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { fetchAllTaskofaServiceUser } from "../admin/task/taskFunctions";
import { addVisitInfo } from "./utils";
import { useParams, useNavigate } from "react-router-dom";
function ServiceUserActivities({ currentUser }) {
  const [tasks, setTasks] = useState([]);
  const [visitNote, setVisitNote] = useState([]);
  const [activities, setActivities] = useState({});
  const [yesDisabled, setYesDisabled] = useState([]);
  const [noDisabled, setNoDisabled] = useState([]);

  const params = useParams();

  const navigate = useNavigate();

   

  const goToPreviousPage = () => {
    navigate(-1);
  };
  let visitId = localStorage.getItem("visitId");
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("submitted", visitNote);

    let visitId = localStorage.getItem("visitId");
    localStorage.setItem(
      `visitNoteDetails ${params.id} ${visitId} `,
      visitNote
    );

    addVisitInfo(data);
  };

  const getInitialVisitNote = () => {
    let note = localStorage.getItem(
      `visitNoteDetails ${params.id} ${visitId} `
    );
    console.log("Note ", params.id, visitId);
    console.log("Note here oo", note);
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
    localStorage.getItem("visitId");
    getInitialVisitNote();
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
    carerid: currentUser._id,
    serviceuserid: params.id,

    activities,
  };
  return (
    <div className="container">
      <div className="row  d-flex  justify-content-center mt-4">
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

              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
      <div className="row  d-flex  justify-content-center b">
        <div className="col-5 col-md-2 ">
          <button type="button" className="btn btn btn-success btn-block">
            Start{" "}
          </button>
        </div>
      </div>
      

      {/* <button onClick={goToPreviousPage}>Go back</button>
      ServiceUserActivities{" "} */}

      {tasks.map((task) => {
        return (
          <div
            key={task._id}
            className="row  d-flex  justify-content-center mt-2 b"
          >
            <div className="col-6 col-sm-7 r text-center">{task.nameOfTask}</div>
            <div className="col r">
              <button
                className="btn btn-primary btn-block"
                value="Yes"
              
                id={task._id}
                onClick={(e) => {
                  handleInput(e, `${task.nameOfTask}`);
                  // setDisabled(true);
                }}
                disabled={yesDisabled ? yesDisabled.includes(task._id) : ""}
              >
                {" "}
                Yes
              </button>
            </div>
            <div className="col r">
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

// ['6282097c87a56613c4d7040c', '62872ec23ddc0249a8401110'] yes ["6282097c87a56613c4d7040c","62872ec23ddc0249a8401110"]

// ['6282098687a56613c4d70411'] no
