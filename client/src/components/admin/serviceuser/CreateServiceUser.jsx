import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import axios from "axios";
import { createNewServiceUser } from "../../../redux/serviceUser/serviceuser-action";

function CreateServiceUser({ createNewServiceUser }) {
  const [serviceUserName, setserviceUserName] = useState("");
  const [serviceUserAddress, setserviceUserAddress] = useState("");
  const [serviceUserPhoneNumber, setserviceUserPhoneNumber] = useState("");
  const [postCode, setPostCode] = useState("");
  const [serviceUserInformation, setServiceUserInformation] = useState("");
  const [err, setErr] = useState(false);
  const [postCodeErr, setPostCodeErr] = useState(false);

  const navigate = useNavigate();

  const goToPreviousPage = () => {
    navigate(-1);
  };

  useEffect(() => {
    if (postCode.length) {
      const fetchAddress = async () => {
       
        try {
          let address = await axios.get(
            `https://api.postcodes.io/postcodes/${postCode}`
          );

          const {
            data: { result },
          } = address;

          setServiceUserInformation(result);

          setPostCodeErr(false);
        } catch (err) {
          setPostCodeErr(true);
        }
      };
      fetchAddress();
    }
  }, [postCode]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !serviceUserName ||
      !serviceUserAddress ||
      !serviceUserPhoneNumber ||
      !serviceUserInformation ||
      postCodeErr
    ) {
      setErr(true);
      setTimeout(() => {
        setErr(false);
      }, 5000);
      return;
    }

    const data = {
      name: serviceUserName,
      houseAddress: serviceUserAddress,
      phoneNumber: serviceUserPhoneNumber,
      postCode: serviceUserInformation.postcode,
      latitude: serviceUserInformation.latitude,
      longitude: serviceUserInformation.longitude,
    };

   
    createNewServiceUser(data);
    goToPreviousPage();
  };

  return (
    <div className="col-md-5">
      <form onSubmit={handleSubmit}>
        {" "}
        <p style={{ color: "red" }}> {err ? "Input all fields " : ""}</p>
        <div className="form-group">
          <label htmlFor="exampleInputTitle">Service User Name</label>
          <input
            type="text"
            className="form-control"
            aria-describedby="TitleHelp"
            onChange={(e) => setserviceUserName(e.target.value)}
            value={serviceUserName}
          />
          <label htmlFor="exampleInputTitle">House number / name</label>

          <input
            type="text"
            className="form-control"
            aria-describedby="TitleHelp"
            onChange={(e) => setserviceUserAddress(e.target.value)}
            value={serviceUserAddress}
          />
          <label htmlFor="exampleInputTitle">
            Post code{" "}
            <span style={{ color: "red" }}>
              {" "}
              {postCodeErr ? "postcode not valid" : ""}
            </span>
          </label>

          <input
            type="text"
            className="form-control"
            onChange={(e) => setPostCode(e.target.value)}
            value={postCode}
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
