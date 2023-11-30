// models/AdminForm.js
const mongoose = require("mongoose");

const AdminSchema = new mongoose.Schema({
  comments: String,
  statusbutton: String,
  image: String,
});

const AdminModel = mongoose.model("adminforms", AdminSchema);

module.exports = AdminModel;
