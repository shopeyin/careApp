const mongoose = require("mongoose");

const visitInformationSchema = new mongoose.Schema({
    visitNote: String,
    carerid: { type: mongoose.SchemaTypes.ObjectId, ref: "User" },
  
    serviceuserid: { type: mongoose.SchemaTypes.ObjectId, ref: "ServiceUser" },
    activities: {},
    createdAt: {
      type: Date,
      default: Date(),
    },
  });
  
  module.exports = mongoose.model("visitInformation", visitInformationSchema);