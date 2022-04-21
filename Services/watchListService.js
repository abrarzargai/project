const watchListModel = require("../models/watchListModel");
const catchAsync = require("../utils/catchAsync");


/***************Services************/

exports.Add = catchAsync(async (req, res, next) => {
  const isFound = await watchListModel.findOne({ movieId: req.body.movieId,user:req.body.user });
  if (!isFound) {
    const Record = await watchListModel.create({ ...req.body });
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
    return next(new Error("Error! you have already added this movie to watch list"));
  }
});


exports.getOneUserWatchList = catchAsync(async (req, res, next) => {
    console.log(req.body)
    const Data = await watchListModel.aggregate([
        {
            $match: {
              user: ObjectId(req.body.user),
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
            Data:Data || []
        })
  });


  exports.Delete = catchAsync(async (req, res, next) => {
    try {
        const Record = await watchListModel.deleteOne({ "_id": req.body.Id });
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