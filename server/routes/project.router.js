//      routes/project-routes.js
const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();


const uploader = require("./../configs/cloudinary-setup");

const Project = require("./../models/project.model");
//const Task = require('./../models/task.model');

// include CLOUDINARY:
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
// GET '/api/projects'		 => to get all the projects
router.get("/projects", (req, res, next) => {
  Project.find()
    .populate("tasks")
    .then((allTheProjects) => {
      res.status(200).json(allTheProjects);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});
// GET '/api/projects/:id'		 => to get a specific projects
router.get("/projects/:id", (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    res
      .status(400) //  Bad Request
      .json({ message: "Specified id is not valid" });
    return;
  }

  Project.findById(id)
    .populate("tasks")
    .then((foundProject) => {
      res.status(200).json(foundProject); // OK
    })
    .catch((err) => {
      res.status(500).json(err); // Internal Server Error
    });
});
// PUT '/api/projects/:id' 		=> to update a specific project
router.put("/projects/:id", (req, res, next) => {
  const { id } = req.params;
  const { title, description } = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(400).json({ message: "Specified id is not valid" });
    return;
  }

  Project.findByIdAndUpdate(id, { title, description })
    .then(() => {
      res.status(200).send();
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});
// DELETE '/api/projects/:id'   => to delete a specific project
router.delete("/projects/:id", (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(400).json({ message: "Specified id is not valid" });
    return;
  }

  Project.findByIdAndRemove(id)
    .then(() => {
      res
        .status(202) //  Accepted
        .send(`Document ${id} was removed successfully.`);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

module.exports = router;
