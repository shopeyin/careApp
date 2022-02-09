import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";

import { createNewServiceUser } from "../../../redux/serviceUser/serviceuser-action";

function CreateServiceUser({ createNewServiceUser }) {
  const [serviceUserName, setserviceUserName] = useState("");
  const [serviceUserAddress, setserviceUserAddress] = useState("");
  const [serviceUserPhoneNumber, setserviceUserPhoneNumber] = useState("");

  const navigate = useNavigate();

  const goToPreviousPage = () => {
    navigate(-1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      name: serviceUserName,
      address: serviceUserAddress,
      phoneNumber: serviceUserPhoneNumber,
    };

    createNewServiceUser(data);
    goToPreviousPage();
  };

  return (
    <div>
      <button onClick={goToPreviousPage}>Go back</button>
      <form onSubmit={handleSubmit}>
        {" "}
        <div className="form-group">
          <label htmlFor="exampleInputTitle">Service User Name</label>
          <input
            type="text"
            className="form-control"
            aria-describedby="TitleHelp"
            onChange={(e) => setserviceUserName(e.target.value)}
            value={serviceUserName}
          />
          <label htmlFor="exampleInputTitle">Address</label>
          <input
            type="text"
            className="form-control"
            onChange={(e) => setserviceUserAddress(e.target.value)}
            value={serviceUserAddress}
            aria-describedby="TitleHelp"
          />
          <label htmlFor="exampleInputTitle">Phone number</label>
          <input
            type="tel"
            className="form-control"
            onChange={(e) => setserviceUserPhoneNumber(e.target.value)}
            value={serviceUserPhoneNumber}
            aria-describedby="TitleHelp"
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
}

const mapDispatchToProps = (dispatch) => ({
  createNewServiceUser: (data) => dispatch(createNewServiceUser(data)),
});

export default connect(null, mapDispatchToProps)(CreateServiceUser);
