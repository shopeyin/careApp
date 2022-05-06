import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Task from "../task/Task";
function ServiceUserProfile() {
  const [hideTaskToggle, setHideTaskTooggle] = useState(false);

  const params = useParams();

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

  return (
    <div>
      <h3>Service users</h3>
      <p>name: {serviceuser.name}</p> <p>address: {serviceuser.address}</p>
      <h5>List of Service user activities/Task</h5>
      <button onClick={taskToggle}>Add task</button>
      {hideTaskToggle ? <Task /> : ""}

      <h3>All serviceUser task/activities</h3>
    </div>
  );
}

export default ServiceUserProfile;
