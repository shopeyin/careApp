const ServiceUser = require('../models/ServiceUserModel');
exports.CHECKID = (req, res, next, val) => {
  console.log('checking ID', val);
  next();
};

// exports.checkBody = (req, res, next) => {
//   if (!req.body.name || !req.body.address) {
//     return res.status(400).json({
//       status: 'fail',
//       message: 'Missing name or address',
//     });
//   }
//   next();
// };

exports.getAllServiceUsers = async (req, res) => {
  try {
    console.log(req.query)
    const serviceusers = await ServiceUser.find();
    res.status(200).json({
      status: 'success',
      results: serviceusers.length,
      data: {
        serviceusers,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};

exports.getServiceUser = async (req, res) => {
  try {
    const serviceUser = await ServiceUser.findById(req.params.id);
    res.status(200).json({
      status: 'success',

      data: {
        serviceUser,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};

exports.createServiceUser = async (req, res) => {
  try {
    const newServiceUser = await ServiceUser.create(req.body);
    res.status(201).json({
      status: 'success',
      data: {
        serviceusers: newServiceUser,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err.message,
    });
  }
};

exports.updateServiceUser = async (req, res) => {
  try {
    const serviceUser = await ServiceUser.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );
    res.status(200).json({
      status: 'success',

      data: {
        serviceUser,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};

exports.deleteServiceUser = async (req, res) => {
  try {
    await ServiceUser.findByIdAndDelete(req.params.id);
    res.status(204).json({
      status: 'success',

      data: null,
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};
