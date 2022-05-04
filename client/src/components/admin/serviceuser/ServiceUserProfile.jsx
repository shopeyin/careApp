import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
function ServiceUserProfile() {
  const params = useParams();

  let serviceuser;

  useSelector((state) => {
    const found = state.serviceUsers.serviceUsers.find(
      (element) => element._id === params.id
    );

    serviceuser = found;
  });

  return (
    <div>
      <h3>Service users</h3>
      <p>name: {serviceuser.name}</p> <p>address: {serviceuser.address}</p>
      <h5>List of Service user activities/Task</h5>
      <button>Add task</button>
    </div>
  );
}

export default ServiceUserProfile;
