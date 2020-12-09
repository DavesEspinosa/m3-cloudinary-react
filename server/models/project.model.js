//      models/project.model.js
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const projectSchema = new Schema({
  title: String,
 //Here
  description: String,
  tasks: [{ type: Schema.Types.ObjectId, ref: "Task" }],
  
});

const Project = mongoose.model("Project", projectSchema);

module.exports = Project;
