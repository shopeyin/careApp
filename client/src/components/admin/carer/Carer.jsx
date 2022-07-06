import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { fetchCarers } from "../../../redux/carer/carer-action";
import { reMount } from "../../../../src/redux/remount/remount-action";

import axios from "axios";

const BASE_URL = "http://127.0.0.1:1000/api/v1/carers";

function Carer({ carers, reMount, reMountComponent, fetchCarers }) {
 
  React.useEffect(() => {
    fetchCarers();
   
  }, [fetchCarers, reMountComponent]);

  const handleDeleteCarer = async (id) => {
    try {
      await axios.delete(`${BASE_URL}/${id}`);
      reMount();
    } catch (error) {
      console.log(error);
    }
  };

  let itemsToRender;
  if (carers) {
    itemsToRender = carers.map((carer) => {
      return (
        <div className="row" key={carer._id}>
          <div className="col-7 col-sm-5 col-md-3   m-1 ">
            <Link to={`${carer._id}`} className="link-color">
              <div className="card" style={{ width: "100%" }}>
                <div className="card-body">
                  <h4 className="card-title"> {carer.name}</h4>
                </div>
              </div>
            </Link>{" "}
          </div>
          <div className="col-1 col-sm-1 mt-4 ">
            <i
              className="fa-solid fa-trash-can mt-2"
              onClick={() => {
                handleDeleteCarer(carer._id);
              }}
            ></i>
          </div>
        </div>
      );
    });
  } else {
    itemsToRender = "Loading...";
  }
  // style={{ minHeight: "50rem" }} inneradminpage
  return (
    <>
      <div className="row ">
        <div className="col-11 col-sm-5 m-3 ">
          <Link to="add-carer" className="link-color">
            Add Carer
          </Link>
        </div>
      </div>
      {itemsToRender}
    </>
  );
}

const mapDispatchToProps = (dispatch) => ({
  fetchCarers: () => dispatch(fetchCarers()),
  reMount: () => dispatch(reMount()),
});

const mapStateToProps = (state) => {
  return {
    loading: state.carers.loading,
    carers: state.carers.carers,
    hasErrors: state.carers.hasErrors,
    reMountComponent: state.remount.reload,
  };
};
// Connect Redux to React
export default connect(mapStateToProps, mapDispatchToProps)(Carer);
