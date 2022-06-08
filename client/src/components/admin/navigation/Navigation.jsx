import React from "react";
import "./navigation.style.scss";

import { Link, NavLink } from "react-router-dom";

class Navigation extends React.Component {
  constructor() {
    super();
    this.state = { value: "" };
  }

  unCheck(i) {
    let ref = "ref_" + i;
    this.refs[ref].checked = !this.refs[ref].checked;
  }

  render() {
    const { currentUser, signOutStart } = this.props;
    console.log(currentUser);
    return (
      <div className="navigation">
        {[1].map((item, i) => {
          return (
            <div key={i}>
              <input
                type="checkbox"
                className="navigation__checkbox"
                id="navi-toggle"
                ref={"ref_" + i}
              />
              <label htmlFor="navi-toggle" className="navigation__button">
                <span className="navigation__icon">&nbsp;</span>
              </label>
              <div className="navigation__background">&nbsp;</div>
              <nav className="navigation__nav">
                <ul className="navigation__list">
                  <li className="navigation__item">
                    <NavLink
                      className="navigation__link"
                      to="/"
                      onClick={() => this.unCheck(i)}
                    >
                      <span>01</span>
                      Home
                    </NavLink>
                  </li>
                  {currentUser ? (
                    <li className="navigation__item">
                      <Link
                        className="navigation__link"
                        to="/login"
                        onClick={() => {
                          this.unCheck(i);
                          signOutStart();
                        }}
                      >
                        <span>02</span>
                        LOGOUT <br />
                        {currentUser.displayName}
                      </Link>
                    </li>
                  ) : (
                    <div>
                      <li className="navigation__item">
                        <Link
                          className="navigation__link"
                          to="/login"
                          onClick={() => this.unCheck(i)}
                        >
                          <span>02</span>
                          LOGIN
                        </Link>
                      </li>

                      <li className="navigation__item">
                        <Link
                          className="navigation__link"
                          to="/signup"
                          onClick={() => this.unCheck(i)}
                        >
                          <span>03</span>
                          SIGNUP
                        </Link>
                      </li>
                    </div>
                  )}
                  <li className="navigation__item">
                    <Link
                      className="navigation__link"
                      onClick={() => this.unCheck(i)}
                      to="carers"
                    >
                      <span>04</span>
                      Carers
                    </Link>
                  </li>
                  <li className="navigation__item">
                    <Link
                      className="navigation__link"
                      onClick={() => this.unCheck(i)}
                      to="serviceusers"
                    >
                      <span>05</span>
                      Service Users
                    </Link>
                  </li>
                  <li className="navigation__item">
                    <Link
                      className="navigation__link"
                      onClick={() => this.unCheck(i)}
                      to=""
                    >
                      <span>06</span>
                      LOGOUT
                    </Link>
                  </li>
                </ul>
              </nav>
            </div>
          );
        })}
      </div>
    );
  }
}

export default Navigation;
