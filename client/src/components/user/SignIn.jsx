import React, { useState } from "react";
import { login } from "../../redux/user/user-action";

import { connect } from "react-redux";

function SignIn({ login }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = {
      email,
      password,
    };

    console.log(data);
    login(data);
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

export default connect(null, mapDispatchToProps)(SignIn);
