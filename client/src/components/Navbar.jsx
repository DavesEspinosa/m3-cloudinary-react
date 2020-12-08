import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { withAuth } from "./../context/auth-context.js";
import "./Navbar.css";

class Navbar extends Component {
  state = {
    username: "User's name",
  };

  render() {
    return (
      <nav id="navbar">
        <ul>
          <NavLink activeClassName="selected-link" exact to="/">
            Home
          </NavLink>
          <NavLink activeClassName="selected-link" exact to="/projects">
            Projects
          </NavLink>
          {this.props.isLoggedIn ? (
            <>
              <NavLink
                onClick={this.props.logout}
                activeClassName="selected-link"
                exact
                to="/"
              >
                Logout: {this.props.user && this.props.user.username}
              </NavLink>
            </>
          ) : (
            <>
              <NavLink activeClassName="selected-link" exact to="/signup">
                Signup
              </NavLink>
              <NavLink activeClassName="selected-link" exact to="/login">
                Login
              </NavLink>
            </>
          )}
        </ul>
      </nav>
    );
  }
}

export default withAuth(Navbar);
