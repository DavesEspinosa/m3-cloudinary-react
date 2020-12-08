import React, { Component } from "react";
//import axios from "axios";
import { Link } from "react-router-dom";
import EditProject from "./../components/EditProject";
import AddTask from "./../components/AddTask";
import service from "./../lib/service";

class ProjectDetails extends Component {
  state = {
    title: " ",
    description: " ",
    image: "",
    tasks: [],
  };

  componentDidMount() {
    this.getSingleProject();
  }

  getSingleProject = () => {
    const { id } = this.props.match.params;

    service
      .singleProject(id)
      .then((apiResponse) => {
        const theProject = apiResponse;
        //we added the _id to pass it to the taskdetails
        const { title, description, tasks, _id, image } = theProject;
        this.setState({ title, description, tasks, image, _id });
      })
      .catch((err) => console.log(err));
  };

  deleteProject = () => {
    // <== CREATE METHOD
    const { id } = this.props.match.params;

    service
      .projectDelete(id)
      .then(() => this.props.history.push("/projects")) // causes Router URL change
      .catch((err) => console.log(err));
  };

  render() {
    return (
      <div>
        <h1>Project Details</h1>
        <img alt="" src={this.state.image} style={{ width: "100px" }}></img>
        <h2>{this.state.title}</h2>
        <h4>{this.state.description}</h4>

        <Link to={"/projects"}>
          <button>Back</button>
        </Link>

        <EditProject getTheProject={this.getSingleProject} />

        <button onClick={this.deleteProject}>Delete project</button>

        <AddTask getUpdatedProject={this.getSingleProject} />

        {this.state.tasks.length === 0 ? (
          <h2>NO TASKS TO DISPLAY</h2>
        ) : (
          this.state.tasks.map((task) => {
            return (
              <Link
                key={task._id}
                to={`/projects/${this.state._id}/tasks/${task._id}`}
              >
                <div className="task">
                  <h2>{task.title}</h2>
                </div>
              </Link>
            );
          })
        )}
      </div>
    );
  }
}

export default ProjectDetails;
