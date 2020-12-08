import React from "react";
import "./App.css";
import { Switch, Route } from "react-router-dom";
import ProjectList from "./pages/ProjectList";
import ProjectDetails from "./pages/ProjectDetails";
import Navbar from "./components/Navbar";
import Home from './pages/Home'
import TaskDetails from "./pages/TaskDetails.jsx";
import Signup from "./pages/Signup";
import Login from "./pages/Login";

function App() {
  return (
    <div className="App">
      <Navbar></Navbar>
      <Switch>
        {" "}
        {/* ADD */}
        <Route exact path="/" component={Home} />
        <Route exact path="/signup" component={Signup} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/projects" component={ProjectList} />
        <Route exact path="/projects/:id" component={ProjectDetails} />
        <Route
          exact
          path="/projects/:id/tasks/:taskId"
          component={TaskDetails}
        />
      </Switch>
    </div>
  );
}

export default App;
