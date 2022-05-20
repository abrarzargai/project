const mongoose = require("mongoose");
const argon2 = require("argon2");
const userSchema = new mongoose.Schema(
  {
    FirstName: {
      type: String,
      required: [true, "Please Enter Your firstName"],
    },
    LastName: {
      type: String,
      required: [true, "Please Enter Your lastName"],
    },
    Email: {
      type: String,
      required: [true, "Please Enter your email"],
    },
    Password: {
      type: String,
      required: [true, "Please Enter your password"],
    },
    Gener1: {
      type: String,
      required: [true, "Please Enter your gener1"],
    },
    Gener2: {
      type: String,
      required: [true, "Please Enter your gener2"],
    },
    Gener3: {
      type: String,
      required: [true, "Please Enter your gener3"],
    },
    Age: {
      type: Number,
      required: [true, "Please Enter your Age"],
    },
    Role: {
      type: String,
      default: "user",
      enum: ["admin", "user"],
      required: [true, "Please Select Your Role as admin or user"],
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function (next) {
  this.Password = await argon2.hash(this.Password);
  next();
});
userSchema.pre("updateOne", async function (next) {
  if (this.getUpdate().Password) {
    this.getUpdate().Password = await argon2.hash(this.getUpdate().Password);
  }
  next();
});

const User = mongoose.model("User", userSchema);
module.exports = User;