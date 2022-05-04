import React, { useEffect } from "react";
import { BASE_URL } from "../../../redux/carer/carer-action";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
function CarerProfile() {
  const params = useParams();
  useEffect(() => {
    const getCarerData = async () => {
      let carerData = await axios.get(`${BASE_URL}/${params.id}`);
      const { data } = carerData;
      console.log(data);
    };

    getCarerData();
  }, [params.id]);
  return <div>CarerProfile</div>;
}

export default CarerProfile;
