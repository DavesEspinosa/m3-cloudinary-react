import React, { Component } from "react";
import axios from "axios";

class AddProject extends Component {
  constructor(props) {
    super(props);
    this.state = { image: "", title: "", description: "" };
  }

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handleFormSubmit = (event) => {
    event.preventDefault();
    const { title, description, image } = this.state;

    axios
      .post("http://localhost:5000/api/projects", { title, description, image })
      .then(() => {
        this.props.getData();
        this.setState({ title: "", description: "", image: "" });
      })
      .catch((err) => console.log(err));
  };

  handleFileUpload = (e) => {
    console.log("The file to be uploaded is: ", e.target.files);
    const file = e.target.files[0];

    const uploadData = new FormData();
    // image => this name has to be the same as in the model since we pass
    // req.body to .create() method when creating a new project in '/api/projects' POST route
    uploadData.append("image", file);

    axios
      .post("http://localhost:5000/api/upload", uploadData, {
        withCredentials: true,
      })
      .then((response) => {
        console.log("response is: ", response);
        // after the console.log we can see that response carries 'secure_url' which we can use to update the state
        this.setState({ image: response.data.secure_url });
      })
      .catch((err) => {
        console.log("Error while uploading the file: ", err);
      });
  };

  render() {
    return (
      <div>
        <form onSubmit={this.handleFormSubmit}>
          <label>Image</label>
          <input
            name="image"
            type="file"
            onChange={this.handleFileUpload}
          ></input>
          <span>
            <img
              style={{ width: "100px" }}
              src={this.state.image && this.state.image}
              alt=""
            ></img>
          </span>
          <label>Title:</label>
          <input
            type="text"
            name="title"
            value={this.state.title}
            onChange={(e) => this.handleChange(e)}
          />

          <label>Description:</label>
          <textarea
            name="description"
            value={this.state.description}
            onChange={(e) => this.handleChange(e)}
          />

          <input type="submit" value="Submit" />
        </form>
      </div>
    );
  }
}

export default AddProject;
