const cinemaMoviesModel = require("../models/cinemaMovies");
const catchAsync = require("../utils/catchAsync");
const ImgBase = 'http://localhost:8080/images/'
// const ObjectId = mongoose.Types.ObjectId;
/***************Services************/

exports.Add = catchAsync(async (req, res, next) => {
  let imageUrl= ''
  if(req.files[0]){
    imageUrl=ImgBase+req.files[0].filename
  }
  const isFound = await cinemaMoviesModel.findOne({ Name: req.body.Name,Cinema:req.body.Cinema});

  if (!isFound) {
    const Record = await cinemaMoviesModel.create({ ...req.body,Image:imageUrl});
    console.log("Record saved", Record);
    if (!Record) {
      throw new Error("Error! new record cannot be added  at this time");
    } else {
      return res.status(201).json({
        success: true,
        message: "new record added Successfully",
        Record,
      });
    }
  } else {
    return res.status(201).json({
      success: false,
      message: "Error! you have already added Cinema with this name",
    });
  }
});


exports.getAll = catchAsync(async (req, res, next) => {
    const Record = await cinemaMoviesModel.find({Cinema:req.body.Cinema});
        return res.status(200).json({
            Record
        });
});


exports.Delete = catchAsync(async (req, res, next) => {
    try {
        const Record = await cinemaMoviesModel.deleteOne({ "_id": req.body.Id });
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

exports.getOne = catchAsync(async (req, res, next) => {
  console.log("hit getOne")
  const Record = await cinemaMoviesModel.find({"Cinema":Object(req.body.Id)});
  console.log("Record",Record)
  if(Record.length > 0){
    return res.status(200).json({
      Record,success:true
  });
  }else{
    return res.status(500).json({
      Record:[],success:false
  });
  }
     
});

exports.getByGenre = catchAsync(async (req, res, next) => {
  console.log("hit getOne")
  const Record = await cinemaMoviesModel.aggregate([
    {
      $match: {
        Genre:req.body.Genre
      },
    },
    {
      $lookup: {
        from: "cinemas", // other table name
        localField: "Cinema", // name of users table field
        foreignField: "_id", // name of userinfo table field
        as: "Cinema", // alias for userinfo table
      },
    },
  ]);
  console.log("Record",Record)
  if(Record.length > 0){
    return res.status(200).json({
      Record,success:true
  });
  }else{
    return res.status(200).json({
      Record:[],success:false
  });
  }
     
});