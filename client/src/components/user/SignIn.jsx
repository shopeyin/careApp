import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../../redux/user/user-action";

import { connect } from "react-redux";

function SignIn({ login, currentUser }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  let navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("Authtoken")) {
      navigate("/");
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      email,
      password,
    };

    await login(data);
    navigate("/carer");
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
  
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
