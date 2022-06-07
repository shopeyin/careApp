import React from "react";
import "./adminlogin.style.scss";
function AdminLogin() {
  const handleSubmit = () => {};
  return (
    <div className="container-fluid admin-login__container">
      <div className="row d-flex align-items-center justify-content-center admin-login__row">
        <div className="col-md-5 col-xl-3 g">
          <form onSubmit={handleSubmit}>
            {" "}
            <div className="form-group">
              <label htmlFor="exampleInputTitle">Username</label>
              <input
                className="form-control"
                value="username"
                aria-describedby="TitleHelp"
              />
              <label htmlFor="exampleInputTitle">Password</label>
              <input
                type="password"
                className="form-control"
                value
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

export default AdminLogin;
