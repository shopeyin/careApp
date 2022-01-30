const mongoose = require('mongoose');

const serviceUserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'service user must have a name'],
    unique: true,
  },
  address: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: Number,
    required: [true, 'service user must have a phone number'],
  },
});

const ServiceUser = mongoose.model('ServiceUser', serviceUserSchema);

module.exports = ServiceUser;
