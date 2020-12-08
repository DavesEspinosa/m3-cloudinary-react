import React from "react";
import axios from "axios";
import { Component } from "react";
const { Consumer, Provider } = React.createContext();

class AuthProvider extends React.Component {
  state = {
    //flags
    isLoggedIn: false,
    isLoading: true,
    user: null,
  };

  componentDidMount() {
    axios
      //to check on this route if the user is loggedIn
      //withcredentials true, send also the cookies, in case there is some.
      .get("http://localhost:5000/auth/me", { withCredentials: true })
      .then((response) => {
        const user = response.data;
        this.setState({ isLoggedIn: true, user: user, isLoading: false });
      })
      .catch((err) => {
        this.setState({ isLoading: false, user: null, isLoggedIn: false });
      });
  }

  signup = (username, password) => {
    axios
      .post(
        "http://localhost:5000/auth/signup",
        { username, password },
        { withCredentials: true }
      )
      .then((response) => {
        const user = response.data;
        console.log('response.data :>> ', response.data);
        this.setState({ isLoggedIn: true, user: user });
      })
      .catch((err) => {
        this.setState({ user: null, isLoggedIn: false });
      });
  };

  login = (username, password) => {
    axios
      .post(
        "http://localhost:5000/auth/login",
        { username, password },
        { withCredentials: true }
      )
      .then((response) => {
        const user = response.data;
        this.setState({ isLoggedIn: true, user: user });
      })
      .catch((err) => {
        this.setState({ user: null, isLoggedIn: false });
      });
  };

  logout = () => {
    axios
      .get("http://localhost:5000/auth/logout", { withCredentials: true })
      .then((data) => {
        this.setState({ isLoggedIn: false, user: null });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  render() {
    const { isLoading, isLoggedIn, user } = this.state;
    const { signup, login, logout } = this;
    return (
      <Provider value={{ isLoggedIn, isLoading, user, signup, login, logout }}>
        {this.props.children}
      </Provider>
    );
  }
}

//HOC that converts regular component into a Consumer
const withAuth = (WrappedComponent) => {
  return class extends Component {
    render() {
      return (
        <Consumer>
          {/* the value on this function is the value coming from the provider */}
          {({ login, signup, user, logout, isLoggedIn, isLoading }) => {
            return (
              <WrappedComponent
                isLoading={isLoading}
                login={login}
                signup={signup}
                user={user}
                logout={logout}
                isLoggedIn={isLoggedIn}
                {...this.props}
              />
            );
          }}
        </Consumer>
      );
    }
  };
};

export { AuthProvider, withAuth };
