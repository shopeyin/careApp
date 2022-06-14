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
                      to="/admin"
                      onClick={() => this.unCheck(i)}
                    >
                      <span>01</span>
                      Home
                    </NavLink>
                  </li>
                
                
                  <li className="navigation__item">
                    <Link
                      className="navigation__link"
                      onClick={() => this.unCheck(i)}
                      to="carers"
                    >
                      
                      Carers
                    </Link>
                  </li>
                  <li className="navigation__item">
                    <Link
                      className="navigation__link"
                      onClick={() => this.unCheck(i)}
                      to="serviceusers"
                    >
                     
                      Service Users
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
