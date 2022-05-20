const mongoose = require("mongoose");
const Schema = new mongoose.Schema(
  {
    Name: {
        type: String,
        required: [true, "Please Enter the cinema movie"],
      },
    Genre: {
      type: String,
      required: [true, "Please Enter the Genre of cinema"],
    },
    Time: {
      type: String,
      required: [true, "Please Enter Time of movie"],
    },
    Date: {
      type: String,
      required: [true, "Please Enter Day of movie"],
    },
    Image: {
      type: String,
    },
    Cinema: {
        required: [true, "Please Enter cinema Id"],
        type: mongoose.Types.ObjectId,
        ref: 'Cinema',
    },
  },
  {
    timestamps: true,
  }
);

const CinemaMovie = mongoose.model("CinemaMovie", Schema);
module.exports = CinemaMovie;
