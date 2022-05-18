const mongoose = require("mongoose");

const visitSchema = new mongoose.Schema({
  careruser: { type: mongoose.SchemaTypes.ObjectId, ref: "User" },

  serviceusersToVisit: [
    { type: mongoose.SchemaTypes.ObjectId, ref: "ServiceUser" },
  ],

  dateOfVisit: Date,
});

module.exports = mongoose.model("Visit", visitSchema);