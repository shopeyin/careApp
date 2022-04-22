const User = require('../models/userModel');

exports.getPrivateData = async (req, res, next) => {
  const data = await User.findById(req.user.id);
  res.status(200).json({
    status: 'success',
    data,
  });
};
