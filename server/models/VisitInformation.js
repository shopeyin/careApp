const mongoose = require('mongoose');

const visitInformationSchema = new mongoose.Schema({
  visitNote: String,
  visitId: { type: mongoose.SchemaTypes.ObjectId, ref: 'Visit' },
  carerId:  { type: mongoose.SchemaTypes.ObjectId, ref: 'User' },

  serviceuserId: { type: mongoose.SchemaTypes.ObjectId, ref: 'ServiceUser' },
  activities: {},
  createdAt: {
    type: Date,
    default: Date(),
  },
});

module.exports = mongoose.model('visitInformation', visitInformationSchema);
