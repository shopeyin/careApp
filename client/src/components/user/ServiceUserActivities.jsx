import React, { useEffect, useState } from "react";
import { fetchAllTaskofaServiceUser } from "../admin/task/taskFunctions";
import { useParams, useNavigate } from "react-router-dom";
function ServiceUserActivities() {
  const [tasks, setTasks] = useState([]);
  const [visitNote, setVisitNote] = useState([]);
  const params = useParams();

  const navigate = useNavigate();

  const goToPreviousPage = () => {
    navigate(-1);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("submitted", visitNote);
  };
  useEffect(() => {
    const fetchTask = async () => {
      let data = await fetchAllTaskofaServiceUser(params.id);
      setTasks(data);
    };

    fetchTask();
  }, [params.id]);
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
            value={visitNote}
          />

          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </div>
      </form>
      {tasks.map((task) => {
        return <div key={task._id}>{task.nameOfTask}</div>;
      })}
    </div>
  );
}

export default ServiceUserActivities;
