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
    <div className="row d-flex align-items-center inneradminpage b">
      <div className="col-md-6">
        <h3>Service users</h3>
        <p>name: {serviceuser.name}</p> <p>address: {serviceuser.address}</p>
        <h4>List of Service user activities/Task</h4>
        <button onClick={taskToggle}>Add task</button>
        {hideTaskToggle ? (
          <Task
            serviceuserId={serviceuser._id}
            taskToggle={taskToggle}
            remountComponent={remountComponent}
          />
        ) : (
          ""
        )}
        <h3>All serviceUser task/activities</h3>
        {tasks.map((task) => {
          return (
            <div key={task._id}>
              {task.nameOfTask}{" "}
              <button
                onClick={() => {
                  handleDeleteTask(task._id);
                  remountComponent();
                }}
              >
                {" "}
                Delete
              </button>{" "}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default ServiceUserProfile;
