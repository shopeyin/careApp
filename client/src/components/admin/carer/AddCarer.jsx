import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createNewCarer, fetchCarers } from "../../../redux/carer/carer-action";

import { connect } from "react-redux";

function AddCarer({ createNewCarer, fetchCarers }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

 
  const navigate = useNavigate();
  const goToPreviousPage = () => {
    navigate(-1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = {
      name,
      email,
      password,
      confirmPassword,
    };

    createNewCarer(data, fetchCarers);

    goToPreviousPage();
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        {" "}
        <div className="form-group">
          <label htmlFor="exampleInputTitle"> Name</label>
          <input
            type="text"
            className="form-control"
            aria-describedby="TitleHelp"
            onChange={(e) => {
              setName(e.target.value);
            }}
            value={name}
          />
          <label htmlFor="exampleInputTitle">Email</label>
          <input
            type="email"
            className="form-control"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            value={email}
            aria-describedby="TitleHelp"
          />
          <label htmlFor="exampleInputTitle">Password</label>
          <input
            type="password"
            className="form-control"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            value={password}
            aria-describedby="TitleHelp"
          />
          <label htmlFor="exampleInputTitle">Confirm Password</label>
          <input
            type="password"
            className="form-control"
            onChange={(e) => {
              setConfirmPassword(e.target.value);
            }}
            value={confirmPassword}
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
  createNewCarer: (data, callBack) => dispatch(createNewCarer(data, callBack)),
  fetchCarers: () => dispatch(fetchCarers()),
});

export default connect(null, mapDispatchToProps)(AddCarer);
