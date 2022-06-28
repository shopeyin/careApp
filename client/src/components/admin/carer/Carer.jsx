import React from "react";
import { connect } from "react-redux";
import { Link, Outlet } from "react-router-dom";
import { fetchCarers } from "../../../redux/carer/carer-action";
import { reMount } from "../../../../src/redux/remount/remount-action";

function Carer({ carers }) {
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
            <i className="fa-solid fa-trash-can mt-2"></i>
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
