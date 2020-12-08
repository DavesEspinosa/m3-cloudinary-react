import React, { Component } from "react";
import axios from "axios";
import EditTask from "../components/EditTask";
import DeleteIcon from "@material-ui/icons/Delete";
import Button from "@material-ui/core/Button";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";


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
        <div style={{marginTop:'1em'}}>
        <Button
          onClick={this.deleteTask}
          variant="contained"
          color="secondary"
          startIcon={<DeleteIcon />}
        >
          {" "}
          Delete
        </Button>

        {/* To go back we use react-router-dom method `history.goBack()` available on `props` object */}
        <Button
        style={{marginLeft:'2em'}} 
            variant="contained"
            color="default"
            startIcon={<ArrowBackIosIcon />}
            onClick={this.props.history.goBack}
          >
            Go Back
          </Button>
          </div>
      </div>
    );
  }
}

export default TaskDetails;
