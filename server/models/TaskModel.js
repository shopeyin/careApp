const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  nameOfTask: String,
  taskStatus: {
      type:Boolean,
      default:false
  },
 
});

module.exports = mongoose.model("Task", taskSchema);
