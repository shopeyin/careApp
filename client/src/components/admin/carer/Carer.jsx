import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { fetchCarers } from "../../../redux/carer/carer-action";
import { reMount } from "../../../../src/redux/remount/remount-action";

function Carer({ carers }) {
  let itemsToRender;
  if (carers) {
    itemsToRender = carers.map((carer) => {
      return (
        <div key={carer._id}>
          <Link to={`profile/${carer._id}`}>{carer.name} </Link> {carer._id}
          {carer.name}
        </div>
      );
    });
  } else {
    itemsToRender = "Loading...";
  }
  return (
    <div>
      {itemsToRender}
      <Link to="add-carer">Add Carer</Link>
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
