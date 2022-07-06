const VisitInformation = require('../models/VisitInformation');
const mongoose = require('mongoose');
exports.createVisitInformation = async (req, res) => {
  try {
    const visitInfo = await VisitInformation.create(req.body);

    res.status(201).json({
      status: 'success',
      data: {
        visitInfo,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err.message,
    });
  }
};

exports.getVisit = async (req, res) => {
  try {
    const visit = await VisitInformation.find({
      visitId: req.params.id,
    });

    res.status(200).json({
      status: 'success',
      data: {
        visit,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};
