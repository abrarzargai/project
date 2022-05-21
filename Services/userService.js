const userModel = require("../models/userModel");
const catchAsync = require("../utils/catchAsync");
const argon2 = require("argon2");
var jwt = require("jsonwebtoken");

//******Genrating token****/

const signToken = (user) => {
  const payload = {
    userdata: {
      id: user._id,
    },
  };
  return jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN * 24 * 60 * 60 * 1000,
  });
};
/***************Services************/

exports.SignUp = catchAsync(async (req, res, next) => {
  console.log("req.body",req.body)
  let gener1= req.body.Genre[0] ||''
  let gener2= req.body.Genre[1] || ''
  let gener3= req.body.Genre[2] || ''
  const User = await userModel.findOne({ Email: req.body.Email });
  console.log("User :", User);
  if (!User) {
    const Record = await userModel.create({ ...req.body,
      Gener1:gener1,
      Gener2:gener2,
      Gener3:gener3,
    });
    console.log("Record saved", Record);
    if (!Record) {
      throw new Error("Error! User cannot be created");
    } else {
      const token = signToken(Record);
      return res.status(201).json({
        success: true,
        message: "Account Created Successfully",
        User: Record,
        token
      });
    }
  } else {
    return next(new Error("Error! User with this Email already exist"));
  }
});

exports.Login = catchAsync(async (req, res, next) => {
  const User = await userModel.find({ Email: req.body.Email });
  console.log("user :", User[0]);
  if (User[0]) {
    if (await argon2.verify(User[0].Password, req.body.Password)) {
      const token = signToken(User[0]);
      return res.status(200).json({
        success: true,
        message: "Login Successfully",
        token,
        User,
      });
    } else {
      throw new Error("Error! Invalid Password");
    }
  } else {
    return next(new Error("User Not Found"));
  }
});

exports.UpdatePassword = catchAsync(async (req, res, next) => {
  const User = await userModel.find({ _id: req.jwt.userdata.id });
  console.log("user===>", User[0]);
  if (User[0]) {
    if (await argon2.verify(User[0].Password, req.body.OldPassword)) {
      const Record = await userModel.updateOne(
        { _id: req.jwt.userdata.id },
        { Password: req.body.NewPassword }
      );

      if (Record.nModified > 0) {
        return res.status(200).json({
          success: true,
          message: "Password Updated Successfully",
        });
      }
      return res.status(500).json({
        success: false,
        message: "Error!  Item Not-Updated Successfully",
      });
    } else {
      throw new Error("Error! Invalid Old Password");
    }
  } else {
    return next(new Error("User with this Email Not Found"));
  }
});

exports.update = catchAsync(async (req, res, next) => {
  const User = await userModel.find({ Email: req.body.Email });
  console.log("user===>", User[0]);
  if (User[0]) {
    const Record = await userModel.updateOne(
      { Email: req.body.Email },
      { ...req.body }
    );
    if (Record.nModified > 0) {
      return res.status(200).json({
        success: true,
        message: "User Updated Successfully",
      });
    } else {
      return next(new Error("User Not updated "));
    }
  } else {
    return next(new Error("User Not Found"));
  }
});

exports.getall = catchAsync(async (req, res, next) => {
  const User = await userModel.find();
  return res.status(200).json({
    User
  });
});

exports.getOne = catchAsync(async (req, res, next) => {
  console.log("getOne hit")
  const User = await userModel.findOne({ _id: req.jwt.userdata.id });
  console.log("User", User)
  if (User) {
    return res.status(200).json(User);
  } else {
    return next(new Error("User Not Found"));
  }
});

exports.delete = catchAsync(async (req, res, next) => {

  const Record = await userModel.deleteOne(
    { Email: req.body.Email },
    { ...req.body }
  );
  if (Record.deletedCount == 0) {
    return next(new Error('Error! user not found'))
  } else {
    return res.status(200).json({
      success: true, message: "user Deleted Successfully"
    })
  }

});