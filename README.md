# Cloudinary Setup - Server and Client side with JSX



### 1. Create free Cloudinary account

Register for free here: https://cloudinary.com/users/register/free



# => SERVER SIDE



### 2. Install packages

Install the following 3 packages in your project folder:

- [cloudinary](https://www.npmjs.com/package/cloudinary)
- [multer-storage-cloudinary](https://www.npmjs.com/package/multer-storage-cloudinary)
- [multer](https://www.npmjs.com/package/multer) => like body-parser, Multer parses incoming bodies but also allows us to parse files (unlike body-parser that parses only data)

In your terminal ***Important install these exactly versions, if not the configuration prepared won't work***:

```
npm install cloudinary@1.21.0 multer-storage-cloudinary@2.2.1 multer@1.4.2 --save --save-exact
```



### 3. Add the Cloudinary keys to the `.env` file

Add the following fields to your `.env` and update the variable values.

You will find the example of the variable names you should create in the `.env.sample` file.

```
CLOUD_NAME=paste-your-cloudinary-cloud-name-here
API_KEY=paste-your-cloudinary-api-key-here
API_SECRET=paste-your-cloudinary-api-secret-here
```



Copy the variable values coming from your Cloudinary account Dashboard.

[![img](https://camo.githubusercontent.com/6ea785b11bde2f32f77c07456c8b5cf13525a68efc040838a3fc8e59d96ad87a/68747470733a2f2f692e696d6775722e636f6d2f6a7444587333522e706e67)](https://camo.githubusercontent.com/6ea785b11bde2f32f77c07456c8b5cf13525a68efc040838a3fc8e59d96ad87a/68747470733a2f2f692e696d6775722e636f6d2f6a7444587333522e706e67)



### 4. Configure Cloudinary & Multer

In your terminal, on the server folder:

```
mkdir config 
touch config/cloudinary-setup.js
```

##### `config/cloudinary-setup.js`

```javascript
const cloudinary = require('cloudinary');
const cloudinaryStorage = require('multer-storage-cloudinary');
const multer = require('multer');

require('dotenv').config();

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

var storage =  cloudinaryStorage({
    //A Cloudinary API object
  cloudinary,
  folder: "project-mg-gallery", // The name of the folder in cloudinary
  allowedFormats: ['jpg', 'png', 'jpeg', 'gif'],
  // params: { resource_type: 'raw' }, => this is in case you want to upload other type of files, not just images
    //you can preset some properties for the image
  transformation: [{ width: 120, height: 90, crop: 'fill' }],
    //public_id of the file on cloudinary
  filename: function (req, res, cb) {
    let fileName = res.originalname.split(".");
    cb(null, fileName[0]); // The file on cloudinary would have the same name as the original file name
  },
});

const uploader = multer({ storage });
module.exports = uploader;
```



### 4.1. Adapt the project model

##### `models/project.model.js`

```javascript
//      models/project.model.js
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const projectSchema = new Schema({
  title: String,
     //Insert the image property on the project sechema.
  image: String,
  description: String,
  tasks: [{ type: Schema.Types.ObjectId, ref: "Task" }],
  // The owner will be added later on
});

const Project = mongoose.model("Project", projectSchema);

module.exports = Project;

```



### 4.2 Include Cloudinary on the routes, and inject the parsing middleware into the route

In the router where we want to upload the image:

- Import the parsing middleware we created in `config/cloudinary.js`.
- Add it as a middleware (a second argument ) prior to the route handler function that handles the POST request.

##### `routes/project.router.js`

```javascript
//      routes/project-routes.js
const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();

//require uploader, already exported from cloudinary-setup.js
const uploader = require("./../configs/cloudinary-setup");

const Project = require("./../models/project.model");
const Task = require('./../models/task.model');

// include CLOUDINARY:
//upload a single image per once.
// ADD an horitzontal middleware
router.post("/upload", uploader.single("image"), (req, res, next) => {
  console.log("file is: ", req.file);

  if (!req.file) {
    next(new Error("No file uploaded!"));
    return;
  }
  // get secure_url from the file object and save it in the
  // variable 'secure_url', but this can be any name, just make sure you remember to use the same in frontend
  res.json({ secure_url: req.file.secure_url });
});

// POST '/api/projects'
//Insert the image property coming from the body, from the form
router.post("/projects", (req, res, next) => {
  const { title, description, image } = req.body;

  Project.create({ title, description, image, tasks: [] })
    .then((createdProject) => {
      res.status(201).json(createdProject);
    })
    .catch((err) => {
      res
        .status(500) // Internal Server Error
        .json(err);
    });
});

//	...

//	...


module.exports = router;

```





# => CLIENT SIDE



### 1. Install packages


### 2. Update the `AddProject` view 

##### `src/components/AddProject.jsx`

```jsx
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

```



### 2. Update the ProjectList view 

- `src/components/ProjectList.jsx`

```jsx
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
                <img
                  style={{ width: "150px", height: "100px" }}
                  src={project.image}
                  alt=""
                />
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


```



