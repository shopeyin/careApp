const mongoose = require('mongoose');

const serviceUserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'service user must have a name'],
    unique: true,
  },
  houseAddress: {
    type: String,
    required: true,
  },
  postCode: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: Number,
    required: [true, 'service user must have a phone number'],
  },
  longitude: {
    type: Number,
    required: [true, 'longitude must be available'],
  },
  latitude: {
    type: Number,
    required: [true, 'latitude must be available'],
  },
  createdAt: {
    type: Date,
    default: Date.now(),
    select: false,
  },

  tasks: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Task' }],
});

const ServiceUser = mongoose.model('ServiceUser', serviceUserSchema);

module.exports = ServiceUser;
