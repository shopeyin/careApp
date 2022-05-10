import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchAllTaskofaServiceUser } from "../task/taskFunctions";
import Task from "../task/Task";
function ServiceUserProfile() {
  const [tasks, setTasks] = useState([]);
  const [hideTaskToggle, setHideTaskTooggle] = useState(false);
  const [reloadData, setReloadData] = useState(false);
  const params = useParams();

  useEffect(() => {
    const fetchTask = async () => {
      let data = await fetchAllTaskofaServiceUser(params.id);
      setTasks(data);

      console.log("fetchTaskcalled");
    };
    fetchTask();
  }, [params.id, reloadData]);

  let serviceuser;

  useSelector((state) => {
    const found = state.serviceUsers.serviceUsers.find(
      (element) => element._id === params.id
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
    <div>
      <h3>Service users</h3>
      <p>
        name: {serviceuser.name} {serviceuser._id}
      </p>{" "}
      <p>address: {serviceuser.address}</p>
      <h5>List of Service user activities/Task</h5>
      <button onClick={taskToggle}>Add task</button>
      {hideTaskToggle ? (
        <Task serviceuserId={serviceuser._id} taskToggle={taskToggle} remountComponent={remountComponent} />
      ) : (
        ""
      )}
      <h3>All serviceUser task/activities</h3>
      {tasks.map((task) => {
        return <div key={task._id}>{task.nameOfTask}</div>;
      })}
    </div>
  );
}

export default ServiceUserProfile;
