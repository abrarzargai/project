const watchListModel = require("../models/watchListModel");
const catchAsync = require("../utils/catchAsync");
const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;


/***************Services************/

exports.Add = catchAsync(async (req, res, next) => {
  const isFound = await watchListModel.findOne({ movieId: req.body.movieId, user: req.jwt.userdata.id });
  if (!isFound) {
    const Record = await watchListModel.create({ ...req.body, user: req.jwt.userdata.id });
    console.log("Record saved", Record);
    if (!Record) {
      throw new Error("Error! movie cannot be added to watchlist at this time");
    } else {
      return res.status(201).json({
        success: true,
        message: "movie added to watchlist Successfully",
        Record,
      });
    }
  } else {
    return res.status(201).json({
      success: false,
      message: "Error! you have already added this movie to watch list",
    });
    // return next(new Error("Error! you have already added this movie to watch list"));
  }
});


exports.getOneUserWatchList = catchAsync(async (req, res, next) => {
  console.log(req.jwt.userdata.id)
  const Data = await watchListModel.aggregate([
    {
      $match: {
        user: ObjectId(req.jwt.userdata.id),
      },
    },
    {
      $lookup: {
        from: "users", // other table name
        localField: "user", // name of users table field
        foreignField: "_id", // name of userinfo table field
        as: "user", // alias for userinfo table
      },
    },
  ]);
  console.log(Data)

  return res.status(200).json({
    Data: Data || []
  })
});


exports.Delete = catchAsync(async (req, res, next) => {
  console.log(req.body)
  try {
    const Record = await watchListModel.deleteOne({ "_id": req.body._id });
    if (Record.deletedCount == 0) {
      return res.status(500).json({
        success: false, message: "Error!  Record Details Not found for this Id"
      })
    }

    return res.status(200).json({
      success: true, message: "Record Deleted Successfully"
    })


  } catch (error) {
    return res.status(500).json({
      success: false, message: "Error!  Record not found for this Id"
    })
  }
})