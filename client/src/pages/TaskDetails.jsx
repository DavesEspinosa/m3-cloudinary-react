import React, { Component } from "react";
import axios from "axios";
import EditTask from "../components/EditTask";

class TaskDetails extends Component {
  state = {};

  componentDidMount() {
    this.getTheTask();
  }

  getTheTask = () => {
    const { taskId } = this.props.match.params;
    axios
      /* it should eliminate projects/id from the url to match the route from backend */
      .get(`http://localhost:5000/api/tasks/${taskId}`)
      .then((apiResponse) => {
        const theTask = apiResponse.data;
        console.log("theTask :>> ", theTask);
        this.setState(theTask);
      })
      .catch((err) => console.log(err));
  };

  deleteTask = () => {
    // <== CREATE METHOD
    const { id, taskId } = this.props.match.params;

    axios
      .delete(`http://localhost:5000/api/tasks/${taskId}`)
      .then(() => this.props.history.push(`/projects/${id}`)) // causes Router URL change
      .catch((err) => console.log(err));
  };

  render() {
    return (
      <div>
        <h3>TASK DETAILS</h3>
        <h2>{this.state.title}</h2>
        <p>{this.state.description}</p>
        <EditTask getTheTask={this.getTheTask}></EditTask>

        <button onClick={this.deleteTask}>Delete Task</button>

        {/* To go back we use react-router-dom method `history.goBack()` available on `props` object */}
        <button onClick={this.props.history.goBack}>Go Back</button>
      </div>
    );
  }
}

export default TaskDetails;
