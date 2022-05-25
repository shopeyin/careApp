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
    console.log('hereoo', req.body.serviceusersToVisit);
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

exports.fetchCarerDayVisit = async (req, res) => {
  console.log(req.query.dateOfVisit);
  console.log('endpoint hit');
  try {
    const dayVisit = await Visit.find({
      careruser: req.params.id,
      dateOfVisit:'2022-05-21T23:00:00.000+00:00',
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
