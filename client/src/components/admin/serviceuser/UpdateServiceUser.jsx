import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../../../App";

function UpdateServiceUser() {
  const [serviceUserName, setserviceUserName] = useState("");
  const [serviceUserAddress, setserviceUserAddress] = useState("");
  const [serviceUserPhoneNumber, setserviceUserPhoneNumber] = useState("");

  const params = useParams();
  const navigate = useNavigate();

  const goToPreviousPage = () => {
    navigate(-1);
  };

  useEffect(() => {
    async function getServiceUserData() {
      let serviceUserData = await axios.get(`${BASE_URL}/serviceusers/${params.id}`);
      const { data } = serviceUserData;

      setserviceUserName(data.data.serviceUser.name);
      setserviceUserAddress(data.data.serviceUser.address);
      setserviceUserPhoneNumber(data.data.serviceUser.phoneNumber);
    }
    getServiceUserData();
  }, [params.id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      name: serviceUserName,
      address: serviceUserAddress,
      phoneNumber: serviceUserPhoneNumber,
    };

    try {
      await axios.patch(`${BASE_URL}/serviceusers/${params.id}`, data);
      goToPreviousPage();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="row d-flex align-items-center inneradminpage">
      <div className="col-md-4 ">
       <h3><b>Update Service User{" "}</b></h3>
        <form onSubmit={handleSubmit}>
          {" "}
          <div className="form-group">
            <label htmlFor="exampleInputTitle">Service User Name</label>
            <input
              type="text"
              className="form-control"
              aria-describedby="TitleHelp"
              value={serviceUserName}
              onChange={(e) => setserviceUserName(e.target.value)}
            />
            <label htmlFor="exampleInputTitle">Address</label>
            <input
              type="text"
              className="form-control"
              value={serviceUserAddress}
              aria-describedby="TitleHelp"
              onChange={(e) => setserviceUserAddress(e.target.value)}
            />
            <label htmlFor="exampleInputTitle">Phone number</label>
            <input
              type="tel"
              className="form-control"
              value={serviceUserPhoneNumber}
              aria-describedby="TitleHelp"
              onChange={(e) => setserviceUserPhoneNumber(e.target.value)}
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default UpdateServiceUser;
