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
  },
  coverImgUrl: {
    type: String,
  },
  interests: [{ type: Schema.Types.ObjectId, ref: "Interest" }],
});

// code in the UserSchema.pre() is called pre-hook. Before user info is saved in db, this function will be called
UserSchema.pre("save", async function (next) {
  const user = this;

  if (!user.isModified("password")) {
    return next();
  }

  const hash = await bcrypt.hash(this.password, 10); // pw and salt round (higher salt round runs hashing for more iterations and is more secure)

  this.password = hash; // replace plain text pw with hash and then store it
  next(); // move to next middleware
});

// make sure that the user trying to log in has correct credentials
UserSchema.methods.isValidPassword = async function (password) {
  const user = this;
  const compare = await bcrypt.compare(password, user.password); // hash pw sent by user for login and check if it matches hashed pw stored in db

  return compare; // true or false
};

const User = mongoose.model("User", UserSchema);
module.exports = User;
