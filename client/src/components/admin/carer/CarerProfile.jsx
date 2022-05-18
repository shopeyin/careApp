import React from "react";

import { useSelector } from "react-redux";
import Visit from "../visit/Visit";
import { useParams } from "react-router-dom";

function CarerProfile() {
  const params = useParams();

  let carer;

  useSelector((state) => {
    const found = state.carers.carers.find(
      (element) => element._id === params.id
    );

    carer = found;
  });
  
  return (
    <div>
      <h2>CarerProfile</h2>
      <p>{carer.name}</p>

      <Visit carerId={carer._id} />
      <h3>All carer VISITs</h3>
    </div>
  );
}

export default CarerProfile;
