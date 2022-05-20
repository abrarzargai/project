const mongoose = require("mongoose");
const Schema = new mongoose.Schema(
  {
    Name: {
        type: String,
        required: [true, "Please Enter the cinema Name"],
      },
    Address: {
      type: String,
      required: [true, "Please Enter the address of cinema"],
    },
    PhoneNumber: {
      type: String,
      required: [true, "Please Enter phoneNumber of cinema"],
    },
    City: {
      type: String,
      required: [true, "Please Enter city of cinema"],
    },
    Image: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const Cinema = mongoose.model("Cinema", Schema);
module.exports = Cinema;
