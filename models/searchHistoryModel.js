const mongoose = require("mongoose");
const searchHistorySchema = new mongoose.Schema(
  {
    gener: {
      type: String,
      required: [true, "Please Enter gener type"],
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

const searchHistory = mongoose.model("searchHistory", searchHistorySchema);
module.exports = searchHistory;
