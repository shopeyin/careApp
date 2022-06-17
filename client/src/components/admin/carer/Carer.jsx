import React from "react";
import { connect } from "react-redux";
import { Link,  Outlet } from "react-router-dom";
import { fetchCarers } from "../../../redux/carer/carer-action";
import { reMount } from "../../../../src/redux/remount/remount-action";

function Carer({ carers }) {
  let itemsToRender;
  if (carers) {
    itemsToRender = carers.map((carer) => {
      return (
        <div key={carer._id} className="card m-2" style={{ width: "30rem" }}>
          <div className="card-body text-center">
            <Link to={`${carer._id}`}>{carer.name} </Link>
          </div>
        </div>
      );
    });
  } else {
    itemsToRender = "Loading...";
  }
  return (
    <div className="row d-flex align-items-center inneradminpage">
      <div className="col-md-6">
        <Link to="add-carer" className="ml-2 mt-1">
          Add Carer
        </Link>

        {itemsToRender}
        <Outlet />
      </div>
    </div>
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
