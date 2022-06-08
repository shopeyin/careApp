import React, { useEffect } from "react";

import { Link } from "react-router-dom";
import { connect } from "react-redux";
import {
  fetchServiceUsers,
  BASE_URL,
} from "../../../redux/serviceUser/serviceuser-action";
import { reMount } from "../../../redux/remount/remount-action";
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
    console.log("serviceusers component");
  }, [reMountComponent]);

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
        
        <div
          className="card m-2"
          style={{ width: "30rem", height: "3.5rem" }}
          key={serviceuser._id}
        >
          <Link to={`profile/${serviceuser._id}`}> {serviceuser.name}</Link>
          <Link
            to={`edit/${serviceuser._id}`}
            style={{ position: "relative", top: "-2.5rem", left: "15rem" }}
          >
            <i class="fa-solid fa-pen"></i>
          </Link>
          <i
            className="fa-solid fa-trash-can mt-2"
            onClick={() => {
              handleDelete(serviceuser._id);
            }}
            style={{ position: "relative", top: "-5rem", left: "25rem" }}
          ></i>
        </div>
      );
    });
  } else {
    itemsToRender = "Loading...";
  }

  return (
    <div className="row d-flex align-items-center " style={{ height: "45%" }}>
      <div className="col-md-6 ">
        <Link to="add-serviceuser">Add Service User</Link>
        {itemsToRender}
      </div>
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
