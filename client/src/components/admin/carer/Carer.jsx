import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { fetchCarers } from "../../../redux/carer/carer-action";
import { reMount } from "../../../redux/remount/remount-action.type";

function Carer({ fetchCarers, carers }) {
  console.log(carers);
  React.useEffect(() => {
    fetchCarers();
    console.log("carer component remounting");
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  let itemsToRender;
  if (carers) {
    itemsToRender = carers.map((carer) => {
      return (
        <div key={carer._id}>
          {carer._id} || {carer.name}
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

const mapStateToProps = (state) => ({
  loading: state.carers.loading,
  carers: state.carers.carers,
  hasErrors: state.carers.hasErrors,
  reMountComponent: state.remount.reload,
});
// Connect Redux to React
export default connect(mapStateToProps, mapDispatchToProps)(Carer);
