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
