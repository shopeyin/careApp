import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { fetchAllTaskofaServiceUser } from "../admin/task/taskFunctions";
import { addVisitInfo } from "./utils";
import { useParams, useNavigate } from "react-router-dom";
function ServiceUserActivities({ currentUser }) {
  console.log(currentUser);
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

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("submitted", visitNote);
    localStorage.setItem(`visitNote ${params.id}`, visitNote);

    addVisitInfo(data);
  };

  const getInitialVisitNote = () => {
    let note = localStorage.getItem(`visitNote ${params.id}`);

    setVisitNote(note);
  };

  const getBtnStatus = () => {
    let yesBtn = JSON.parse(localStorage.getItem("yesDISABLED"));
    let noBtn = JSON.parse(localStorage.getItem("noDISABLED"));
    if (yesBtn || noBtn) {
      setYesDisabled(yesBtn);
      setNoDisabled(noBtn);
    }
  };

  useEffect(() => {
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
      //   console.log(typeof noDisabled);
      //   console.log(Array.isArray(noDisabled));
      let results = noDisabled.filter((id) => id !== e.target.id);

      setNoDisabled(results);

      localStorage.setItem("noDISABLED", JSON.stringify(results));

      setYesDisabled([...yesDisabled, e.target.id]);

      localStorage.setItem(
        "yesDISABLED",
        JSON.stringify([...yesDisabled, e.target.id])
      );
    } else {
      console.log(Array.isArray(yesDisabled));
      let results = yesDisabled.filter((id) => id !== e.target.id);

      setYesDisabled(results);

      localStorage.setItem("yesDISABLED", JSON.stringify(results));

      setNoDisabled([...noDisabled, e.target.id]);

      localStorage.setItem(
        "noDISABLED",
        JSON.stringify([...noDisabled, e.target.id])
      );
    }

    setActivities({ ...activities, [key]: e.target.value });
  };

  let data = {
    visitNote: visitNote,
    carerid: currentUser._id,
    serviceuserid: params.id,
    activities: {
      activities,
    },
  };

  return (
    <div>
      <button onClick={goToPreviousPage}>Go back</button>
      ServiceUserActivities{" "}
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
      {tasks.map((task) => {
        return (
          <div key={task._id}>
            {task.nameOfTask}
            <button
              value="Yes"
              //   onClick={(e) => {handleInput(e, `${task.nameOfTask}`)}; setDisabled(true)}
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
            <button
              id={task._id}
              value="No"
              onClick={(e) => handleInput(e, `${task.nameOfTask}`)}
              disabled={noDisabled ? noDisabled.includes(task._id) : ""}
            >
              {" "}
              NO
            </button>
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
