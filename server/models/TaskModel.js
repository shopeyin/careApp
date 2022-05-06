const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  nameOfTask: String,
  taskStatus: {
      type:Boolean,
      default:false
  },
  serviceuser: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "ServiceUser",
    
  },
});

module.exports = mongoose.model("Task", taskSchema);
