import React, { useEffect, useState } from "react";
import { addVisitInfo } from "./utils";
function ServiceUserTasks({ tasks, paramsId, visitNote, data }) {
  console.log(data);
  const [yesDisabled, setYesDisabled] = useState([]);
  const [noDisabled, setNoDisabled] = useState([]);
  const [activities, setActivities] = useState({});

  let visitId = localStorage.getItem("visitId");

  useEffect(() => {
    const getBtnStatus = () => {
      let yesBtn = JSON.parse(
        localStorage.getItem(`yesDISABLED ${paramsId} ${visitId}`)
      );
      let noBtn = JSON.parse(
        localStorage.getItem(`noDISABLED ${paramsId} ${visitId}`)
      );
      if (yesBtn || noBtn) {
        setYesDisabled(yesBtn);
        setNoDisabled(noBtn);
      }
    };

    getBtnStatus();
  }, [paramsId, visitId]);

  //   const handleSubmit = (e) => {
  //     e.preventDefault();
  //     console.log("submitted", visitNote);

  //     //  let visitId = localStorage.getItem("visitId");
  //     localStorage.setItem(`visitNoteDetails ${paramsId} ${visitId} `, visitNote);
  //     data["activities"] = activities;
  //     addVisitInfo(data);
  //   };

  const handleInput = (e, key) => {
    if (e.target.value === "Yes") {
      let results = noDisabled.filter((id) => id !== e.target.id);

      setNoDisabled(results);

      localStorage.setItem(
        `noDISABLED ${paramsId} ${visitId}`,
        JSON.stringify(results)
      );

      setYesDisabled([...yesDisabled, e.target.id]);

      localStorage.setItem(
        `yesDISABLED ${paramsId} ${visitId}`,
        JSON.stringify([...yesDisabled, e.target.id])
      );
    } else {
      let results = yesDisabled.filter((id) => id !== e.target.id);

      setYesDisabled(results);

      localStorage.setItem(
        `yesDISABLED ${paramsId} ${visitId}`,
        JSON.stringify(results)
      );

      setNoDisabled([...noDisabled, e.target.id]);

      localStorage.setItem(
        `noDISABLED ${paramsId} ${visitId}`,
        JSON.stringify([...noDisabled, e.target.id])
      );
    }

    setActivities({ ...activities, [key]: e.target.value });
  };
  return (
    <>
      {" "}
      {tasks.map((task) => {
        return (
          <div
            key={task._id}
            className="row  d-flex  justify-content-center mt-2 b"
          >
            <div className="col-6 col-sm-7  text-center">{task.nameOfTask}</div>
            <div className="col ">
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
            <div className="col ">
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
    </>
  );
}

export default ServiceUserTasks;
