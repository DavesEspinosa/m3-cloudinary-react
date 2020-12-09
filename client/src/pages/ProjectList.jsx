// src/pages/ProjectList/ProjectList.js

import React, { Component } from "react";

import { Link } from "react-router-dom";
import axios from "axios";

import AddProject from "./../components/AddProject";

class ProjectList extends Component {
  state = {
    listOfProjects: [],
  };

  getAllProjects = () => {
    axios.get(`http://localhost:5000/api/projects`).then((apiResponse) => {
      this.setState({ listOfProjects: apiResponse.data });
    });
  };

  componentDidMount() {
    this.getAllProjects();
    //  fetch the data from API after the initial render, and save it in the state
  }

  render() {
    const { listOfProjects } = this.state;

    return (
      <div id="project-list">
        <AddProject getData={this.getAllProjects} />

        <div>
          {listOfProjects.map((project) => (
            <div key={project._id} className="project">
              <Link to={`/projects/${project._id}`}>
                <h3>{project.title}</h3>
                <p>{project.description} </p>
              </Link>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default ProjectList;
