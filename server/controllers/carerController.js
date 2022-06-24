const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const AppError = require('../utils/appError');

exports.getAllCarers = async (req, res) => {
  try {
    const users = await User.find();

    res.status(200).json({
      status: 'success',
      results: users.length,
      data: {
        users,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};

exports.getCarer = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    res.status(200).json({
      status: 'success',
      data: {
        user,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};

exports.createCarer = async (req, res) => {
  try {
    let newUser = await User.create({
      name: req.body.name,
      email: req.body.email,
      role: req.body.role,
      barePassword: req.body.barePassword,
      password: req.body.password,
      confirmPassword: req.body.confirmPassword,
    });

    // res.status(201).json({
    //   status: 'success',

    //   data: {
    //     user: newUser,
    //   },
    // });

    sendToken(newUser, 201, res);
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err.message,
    });
  }
};

exports.updateCarer = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    res.status(200).json({
      status: 'success',
      data: {
        user,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};

exports.deleteCarer = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
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

exports.loginCarer = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    console.log('send  1');
    return res.status(400).json({
      status: 'fail',
      error: 'Please provide email or password',
    });
  }

  try {
    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      return res
        .status(401)
        .json({ status: 'fail', error: 'User or Email not found' });
    }
    const isMatch = await user.matchPasswords(password);
    if (!isMatch) {
      return res.status(401).json({ status: 'fail', error: 'invalid details' });
    }

    return sendToken(user, 200, res);
  } catch (err) {
    res.status(500).json({
      status: 'fail',
      message: err,
    });
  }
};

const sendToken = (user, statusCode, res) => {
  const token = user.getSignedToken();

  return res.status(statusCode).json({
    status: 'success oo',
    token,
    user,
  });
};
