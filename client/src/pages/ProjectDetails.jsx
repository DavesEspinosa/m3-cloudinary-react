import React, { Component } from "react";
//import axios from "axios";
import { Link } from "react-router-dom";
import EditProject from "./../components/EditProject";
import AddTask from "../components/AddTask";
import Button from "@material-ui/core/Button";
import DeleteIcon from "@material-ui/icons/Delete";
import service from "./../API/service";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Collapse from "@material-ui/core/Collapse";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

class ProjectDetails extends Component {
  state = {
    title: " ",
    description: " ",
    image: "",
    tasks: [],
    expanded: false,
  };

  componentDidMount() {
    this.getSingleProject();
  }

  handleExpandClick = () => {
    this.setState({
      expanded: !this.state.expanded,
    });
  };

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
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <h1>Project Details</h1>
          <Card style={{ maxWidth: "345px" }}>
            <CardHeader
              avatar={
                <Avatar aria-label="project" style={{ backgroundColor: "red" }}>
                  P
                </Avatar>
              }
              title={this.state.title}
              //subheader="September 14, 2016"
            />
            <CardMedia
              component="img"
              alt="Contemplative Reptile"
              height="140"
              image={this.state.image}
              title="Contemplative Reptile"
            />{" "}
            <CardActions disableSpacing>
              {this.state.expanded ? (
                <IconButton
                  className="expandOpen"
                  onClick={this.handleExpandClick}
                  aria-expanded={this.state.expanded}
                  aria-label="show more"
                >
                  <ExpandMoreIcon />
                </IconButton>
              ) : (
                <IconButton
                  className="expand"
                  onClick={this.handleExpandClick}
                  aria-expanded={this.state.expanded}
                  aria-label="show more"
                >
                  <ExpandMoreIcon />
                </IconButton>
              )}
            </CardActions>
            <Collapse in={this.state.expanded} timeout="auto" unmountOnExit>
              <CardContent>
                <Typography paragraph>{this.state.description}</Typography>
              </CardContent>
            </Collapse>
          </Card>
        </div>
        {/*    // <--- ADD       */}
        <Link to={"/projects"}>
          {" "}
          {/*    // <--- ADD       */}
          <Button
            style={{ marginBottom: "1em", marginTop: "3em" }}
            variant="contained"
            color="default"
            startIcon={<ArrowBackIosIcon />}
          >
            Go Back
          </Button>
        </Link>
        <EditProject getTheProject={this.getSingleProject} /> {/* ADD */}
        <Button
          style={{ marginTop: "1em" }}
          variant="contained"
          color="secondary"
          startIcon={<DeleteIcon />}
          onClick={this.deleteProject}
        >
          {" "}
          Delete
        </Button>
        <AddTask getUpdatedProject={this.getSingleProject}></AddTask>
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
