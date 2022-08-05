const Visit = require('../models/VisitModel');
const mongoose = require('mongoose');
exports.createVisit = async (req, res) => {
  try {
    const visit = await Visit.create(req.body);

    res.status(201).json({
      status: 'success',
      data: {
        visit,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err.message,
    });
  }
};

exports.addServiceUserToVisit = async (req, res) => {
  
  try {
    const serviceUserToAdd = await Visit.findByIdAndUpdate(req.params.id, {
      $addToSet: { serviceusersToVisit: req.body.serviceusersToVisit },

      dateOfVisit: req.body.dateOfVisit,
    });

    res.status(201).json({
      status: 'success',
      data: {
        visit: serviceUserToAdd,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err.message,
    });
  }
};

exports.deleteServiceUserFromVisit = async (req, res) => {

  
  try {
    await Visit.findByIdAndUpdate(req.params.id, {
      $pull: { serviceusersToVisit: req.body.serviceusersToVisit },
    });

    res.status(204).json({
      status: 'success',

      data: null,
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err.message,
    });
  }
};

exports.fetchCarerDayVisit = async (req, res) => {
  try {
    const dayVisit = await Visit.find({
      careruser: req.params.id,
      dateOfVisit: req.body.dateOfVisit,
    })
      .populate('serviceusersToVisit')
      .exec();

    res.status(200).json({
      status: 'success',
      data: {
        visit: dayVisit,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err.message,
    });
  }
};

exports.fetchAllCarerVisit = async (req, res) => {
  try {
    const carerVisit = await Visit.find({
      careruser: req.params.id,
    });

    res.status(200).json({
      status: 'success',
      data: {
        visit: carerVisit,
        visitLength: carerVisit.length,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err.message,
    });
  }
};

exports.deleteCarerVisit = async (req, res) => {
  try {
    await Visit.findByIdAndDelete(req.params.id);
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

// const fetchAllCarerDayVisit = async () => {
//   const allVisit = await Visit.find({
//     careruser: "62820291ff33bb693a17052d",
//     dateOfVisit: "2022-05-18",
//   })
//     .populate("serviceusersToVisit")
//     .exec();

//   console.log("--------");
//   // console.log("%j", allVisit[0].serviceusersToVisit[0].tasks[0]);
//   console.log("%j", allVisit);
//   // let id = allVisit[0].serviceusersToVisit[0].tasks[1];
//   // updateTask(id);
//   //console.log("%j", allVisit[0]);
//   //console.log(allVisit);
// };
