import React, { Component } from "react";
import axios from "axios";
import { withRouter } from "react-router";
import Button from "@material-ui/core/Button";
import SaveIcon from "@material-ui/icons/Save";

export class EditTask extends Component {
  state = {
    title: "",
    description: "",
  };
  handleFormSubmit = (event) => {
    event.preventDefault();
    const { title, description } = this.state;
    console.log("this.props :>> ", this.props);
    const { id, taskId } = this.props.match.params; // made available by withRouter()

    axios
      .put(`http://localhost:5000/api/tasks/${taskId}`, { title, description })
      .then(() => {
        this.props.getTheTask();
        this.props.history.push(`/projects/${id}`);
        // after submitting the form, we could also redirect to '/projects'
      })
      .catch((err) => console.log(err));
  };

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
    //                ▲  Assign value to property using "object bracket notataion"
    //  https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Property_accessors
  };

  render() {
    return (
      <div>
        <form onSubmit={this.handleFormSubmit}>
          <label>Title:</label>
          <input
            type="text"
            name="title"
            value={this.state.title}
            onChange={this.handleChange}
          />

          <label>Description:</label>
          <textarea
            name="description"
            value={this.state.description}
            onChange={this.handleChange}
          />
          <div>
            <Button
              style={{ marginTop: "1em" }}
              type="submit"
              variant="contained"
              color="primary"
              size="small"
              startIcon={<SaveIcon />}
            >
              Save
            </Button>
          </div>
        </form>
      </div>
    );
  }
}

export default withRouter(EditTask);
