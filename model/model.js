const mongoose = require("mongoose");

const dataSchema = new mongoose.Schema({
  task: String,
  createdOn: Date,
  completeBy: Date,
  description: String,
});

const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  mail: String,
  name: String,
  toDoList: [dataSchema],
});

const model = mongoose.model("users", userSchema);

module.exports = model;
