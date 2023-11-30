const mongoose = require("mongoose");

const TicketSchema = new mongoose.Schema({
  name: String,
  ticketid: String,
  date: String,
  projects: String,
  comments: String,
  status: String,
  category: String,
  priority: String,
  assigned: String,
  starttime:String,
  endtime:String,
});

const TicketModel = mongoose.model("ticketform", TicketSchema);

module.exports = TicketModel;
