import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import {
  fetchServiceUsers,
  BASE_URL,
} from "../../../redux/serviceUser/serviceuser-action";
import { reMount } from "../../../redux/remount/remount-action.type";
import axios from "axios";

function ServiceUsers({
  loading,
  serviceUsers,
  fetchServiceUsers,
  reMount,
  reMountComponent,
}) {
  useEffect(() => {
    fetchServiceUsers();
  }, [fetchServiceUsers, reMountComponent]);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${BASE_URL}/${id}`);
      reMount();
    } catch (error) {
      console.log(error);
    }
  };

  let itemsToRender;
  if (serviceUsers) {
    itemsToRender = serviceUsers.map((serviceuser) => {
      return (
        <div key={serviceuser._id}>
          <Link to={`profile/${serviceuser._id}`}>{serviceuser._id}</Link> ||{" "}
          {serviceuser.name} and {serviceuser.address}
          <Link to={`edit/${serviceuser._id}`}>Edit Service Users</Link>
          <button
            onClick={() => {
              handleDelete(serviceuser._id);
            }}
          >
            Delete
          </button>
        </div>
      );
    });
  } else {
    itemsToRender = "Loading...";
  }

  return (
    <div>
      {itemsToRender}
      <Link to="add-serviceuser">Add Service Users</Link>
    </div>
  );
}

const mapDispatchToProps = (dispatch) => ({
  fetchServiceUsers: () => dispatch(fetchServiceUsers()),
  reMount: () => dispatch(reMount()),
});

const mapStateToProps = (state) => ({
  loading: state.serviceUsers.loading,
  serviceUsers: state.serviceUsers.serviceUsers,
  hasErrors: state.serviceUsers.hasErrors,
  reMountComponent: state.remount.reload,
});
// Connect Redux to React
export default connect(mapStateToProps, mapDispatchToProps)(ServiceUsers);
