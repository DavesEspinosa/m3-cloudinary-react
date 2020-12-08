import React, { Component } from "react";
import axios from "axios";
import { withRouter } from "react-router";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import NavigationIcon from "@material-ui/icons/Navigation";
import Button from "@material-ui/core/Button";
import SaveIcon from "@material-ui/icons/Save";

class AddTask extends Component {
  state = {
    title: "",
    description: "",
    isShowing: false,
  };

  handleFormSubmit = (event) => {
    event.preventDefault();
    const { title, description } = this.state;
    const { id } = this.props.match.params; // made available by withRouter()

    // we need to know to which project the task belongs,
    // therefore we get project 'id'

    axios
      .post("http://localhost:5000/api/tasks", {
        title,
        description,
        projectId: id,
      })
      .then(() => {
        // after form submit, GET project again to display the updated task list
        this.props.getUpdatedProject();
        this.setState({ title: "", description: "" });
      })
      .catch((error) => console.log(error));
  };

  toggleForm = () => this.setState({ isShowing: !this.state.isShowing });

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  displayForm = () => {
    return (
      <div>
        <form>
          <input
            type="text"
            placeholder="Title"
            name="title"
            value={this.state.title}
            onChange={this.handleChange}
          />

          <input
            name="description"
            placeholder="Description"
            value={this.state.description}
            onChange={this.handleChange}
          />
          <div>
            <Button
              style={{ marginTop: "1em", backgroundColor:'green' }}
              type="submit"
              variant="contained"
              color="primary"
              size="small"
              startIcon={<SaveIcon />}
              onClick={this.handleFormSubmit}
            >
              Save
            </Button>
          </div>
        </form>
      </div>
    );
  };

  render() {
    return (
      <div>
        {this.state.isShowing ? (
          <Fab
            style={{ marginTop: "2em", marginBottom: "1em", }}
            onClick={this.toggleForm}
            variant="extended"
            size="small"
            color="primary"
            aria-label="add"
          >
            <NavigationIcon />
            Collapse
          </Fab>
        ) : (
          <Fab
            style={{ marginTop: "2em", marginBottom: "1em" }}
            onClick={this.toggleForm}
            color="primary"
            aria-label="add"
          >
            <AddIcon />
          </Fab>
        )}

        {!this.state.isShowing ? null : this.displayForm()}
      </div>
    );
  }
}

export default withRouter(AddTask);
