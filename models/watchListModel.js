const mongoose = require("mongoose");
const watchlistSchema = new mongoose.Schema(
  {
    movieId: {
        type: String,
        required: [true, "Please Enter Your movieId"],
      },
    image: {
      type: String,
      required: [true, "Please Enter Your image"],
    },
    title: {
      type: String,
      required: [true, "Please Enter Your title"],
    },
    description: {
      type: String,
      required: [true, "Please Enter Your description"],
    },
    user: {
        required: [true, "Please Enter User Id"],
        type: mongoose.Types.ObjectId,
        ref: 'User',
    },
  },
  {
    timestamps: true,
  }
);

const Watchlist = mongoose.model("Watchlist", watchlistSchema);
module.exports = Watchlist;
