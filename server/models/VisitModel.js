const mongoose = require('mongoose');

const visitSchema = new mongoose.Schema({
  careruser: { type: mongoose.SchemaTypes.ObjectId, ref: 'User' },

  serviceusersToVisit: [
    { type: mongoose.SchemaTypes.ObjectId, ref: 'ServiceUser' },
  ],

  dateOfVisit: {
    type: Date,
    // required: true,
  },

  createdAt: {
    type: Date,
    default: Date.now(),
    select: false,
  },
});

module.exports = mongoose.model('Visit', visitSchema);
