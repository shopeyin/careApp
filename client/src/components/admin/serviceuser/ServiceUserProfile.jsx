import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  fetchAllTaskofaServiceUser,
  handleDeleteTask,
} from "../task/taskFunctions";
import Task from "../task/Task";
function ServiceUserProfile() {
  const [tasks, setTasks] = useState([]);
  const [hideTaskToggle, setHideTaskTooggle] = useState(false);
  const [reloadData, setReloadData] = useState(false);

  const params = useParams();

  useEffect(() => {
    const fetchTask = async () => {
      let data = await fetchAllTaskofaServiceUser(params.serviceuserId);
      setTasks(data);

      console.log("fetchTaskcalled");
    };
    console.log("fetch task compoonent");
    fetchTask();
  }, [params.serviceuserId, reloadData]);

  let serviceuser;

  useSelector((state) => {
    const found = state.serviceUsers.serviceUsers.find(
      (element) => element._id === params.serviceuserId
    );

    serviceuser = found;
  });

  const taskToggle = () => {
    setHideTaskTooggle(!hideTaskToggle);
  };
  const remountComponent = () => {
    setReloadData(!reloadData);
  };

  return (
    <>
      {" "}
      <div className="row">
        <div className="col-md-6">ServiceUser</div>
      </div>
      <div className="row">
        <div className="col-md-6"> {serviceuser.name}</div>
      </div>
      <div className="row">
        <div className="col-md-6"> {serviceuser.address}</div>
      </div>
      <div className="row">
        <div className="col-md-6">
          {" "}
          <h4>List of Service user activities/Task</h4>
        </div>
      </div>
      <div className="row">
        <div className="col-md-6">
          <button onClick={taskToggle} className='btn btn-info'>Add task</button>
        </div>
      </div>
      {hideTaskToggle ? (
        <div className="row">
          <div className="col-md-6">
            {" "}
            <Task
              serviceuserId={serviceuser._id}
              taskToggle={taskToggle}
              remountComponent={remountComponent}
            />
          </div>
        </div>
      ) : (
        ""
      )}
      <div className="row">
        <div className="col-md-6">
          <h3>All serviceUser task/activities</h3>
        </div>
      </div>
      {tasks.map((task) => {
        return (
          <div key={task._id} className="row mt-2">
            <div className="col-5 col-md-3">
              <h4> {task.nameOfTask} </h4>
            </div>
            <div className="col-1 col-md-1">
              <i
                className="fa-solid fa-trash-can mt-2"
                onClick={() => {
                  handleDeleteTask(task._id);
                  remountComponent();
                }}
              ></i>
            </div>
          </div>
        );
      })}
    </>
  );
}

export default ServiceUserProfile;
