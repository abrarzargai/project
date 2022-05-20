const cinemaModel = require("../models/cinema");
const catchAsync = require("../utils/catchAsync");

const ImgBase = 'http://localhost:8080/images/'
/***************Services************/

exports.Add = catchAsync(async (req, res, next) => {
  console.log("add hit",req.body)
  console.log("add hit 1",req.files) 
  let imageUrl= ''
  if(req.files[0]){
    console.log("req.files[0]",req.files[0])
    imageUrl=ImgBase+req.files[0].filename
  }
  console.log("imageUrl",imageUrl)
  const isFound = await cinemaModel.findOne({ Name: req.body.Name});

  if (!isFound) {
    const Record = await cinemaModel.create({ ...req.body,Image:imageUrl});
    console.log("Record saved", Record);
    if (!Record) {
      throw new Error("Error! new Cinema cannot be added  at this time");
    } else {
      return res.status(201).json({
        success: true,
        message: "new Cinema added to Successfully",
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


exports.getall = catchAsync(async (req, res, next) => {
    const Record = await cinemaModel.find();
        return res.status(200).json({
            Record
        });
});


exports.Delete = catchAsync(async (req, res, next) => {
    try {
        const Record = await cinemaModel.deleteOne({ "_id": req.body.Id });
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
  const Record = await cinemaModel.findOne({"_id":req.body.Id});
  if(Record){
    return res.status(200).json({
      Record,success:true
  });
  }else{
    return res.status(500).json({
      Record:{},success:false
  });
  }
     
});
