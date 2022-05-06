import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { BASE_URL } from "../../../redux/carer/carer-action";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
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
      <button>Add visit</button>
      <h3>All carer VISITs</h3>
    </div>
  );
}

export default CarerProfile;
