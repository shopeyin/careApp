import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../../redux/user/user-action";

import { connect } from "react-redux";

import axios from "axios";

export const BASE_URL = "http://127.0.0.1:1000/api/v1/carers/login";

function SignIn({ login, currentUser }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  let navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("Authtoken")) {
      navigate("/");
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      email,
      password,
    };

    login(data);
    navigate("/carer");

    // try {
    //   const loggedInUser = await axios.post(BASE_URL, itemAuth);

    //   let { data } = loggedInUser;

    //   localStorage.setItem("Authtoken", data.token);
    //   navigate("/carer");
    // } catch (error) {
    //   console.log(error);
    // }
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6">
          <form onSubmit={handleSubmit}>
            {" "}
            <div className="form-group">
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

              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
const mapDispatchToProps = (dispatch) => ({
  login: (data) => dispatch(login(data)),
});

const mapStateToProps = (state) => {
  console.log(state);
  return {
    loading: state.carers.loading,
    currentUser: state.user.currentUser,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
