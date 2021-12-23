const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");
const LocationSchema = require("./Location").LocationSchema;

const UserSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  fullName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  location: LocationSchema,
  phoneNumber: String,
  userType: {
    type: Schema.Types.ObjectId,
    ref: "UserType",
    required: true,
  },
  dateJoined: {
    type: Date,
    default: Date.now,
  },
  profileImgUrl: {
    type: String,
    unique: true,
  },
  coverImgUrl: {
    type: String,
    unique: true,
  },
  interests: [{ type: Schema.Types.ObjectId, ref: "Interest" }],
});
const User = mongoose.model("User", UserSchema);

module.exports = User;
