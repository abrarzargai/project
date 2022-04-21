const searchHistoryModel = require("../models/searchHistoryModel");
const catchAsync = require("../utils/catchAsync");


/***************Services************/

exports.Add = catchAsync(async (req, res, next) => {

    const Record = await searchHistoryModel.create({ ...req.body });
    console.log("Record saved", Record);
    if (!Record) {
      throw new Error("Error! cannot be added at this time");
    } else {
      return res.status(201).json({
        success: true,
        message: "add Successfully",
        Record,
      });
    }

});

exports.getOneUserSearchHistory = async (user) => {
    const Data = await searchHistoryModel.aggregate([
        {
            $match: {
              user: ObjectId(req.body.user),
            },
          },
        {$group : {_id:"$gener", count:{$sum:1}}}
    ])
      console.log(Data)

        return {
            Data:Data || []
        }
  }