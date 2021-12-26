const User = require("../models/user");
const UserType = require("../models/userType");
const getUsers = async () => {
  try {
    return await User.find();
  } catch (error) {
    throw { error: "Error while trying to fetch users!", details: error };
  }
};

const getUser = async (id) => {
  try {
    const user = await User.findById(id);
    if (!user) throw "User does not exist!";
    return user;
  } catch (error) {
    throw { error: "Error while trying to fetch user!", details: error };
  }
};

const doesUserExist = async (login) => {
  try {
    return await await User.findOne({
      $or: [{ email: login }, { username: login }],
    });
  } catch (error) {
    throw {
      error: "Error while trying to check if user exists!",
      details: error,
    };
  }
};

const getUserByUsername = async (username) => {
  try {
    const user = await User.findOne({ username });
    if (!user) throw "User does not exist!";
    return user;
  } catch (error) {
    throw { error: "Error while trying to fetch user!", details: error };
  }
};

const getUserByEmail = async (email) => {
  try {
    const user = await User.findOne({ email });
    if (!user) throw "User does not exist!";
    return user;
  } catch (error) {
    throw { error: "Error while trying to fetch user!", details: error };
  }
};

const addUser = async (user) => {
  try {
    const newUser = new User(user);
    const savedUser = await newUser.save();
    return savedUser;
  } catch (err) {
    throw { error: "Erro", details: error };
  }
};

const getUserType = async (name) => {
  try {
    const userType = await UserType.findOne({ name: name });
    return userType;
  } catch (error) {
    throw { error: "Error while trying to find a user type", details: error };
  }
};

const editUser = async (id, fieldsForEdit) => {
  try {
    const updates = Object.keys(fieldsForEdit);
    const allowedUpdates = ["email", "password"];

    const isValidOperation = updates.every((update) =>
      allowedUpdates.includes(update)
    );
    if (!isValidOperation)
      throw "Invalid field(s) for update! Allowed updates are: email, and password.";

    const updatedUser = await User.findById(id);
    if (!updatedUser) throw "User does not exist!";

    updates.forEach((update) => {
      updatedUser[update] = fieldsForEdit[update];
    });
    return await updatedUser.save();
  } catch (error) {
    throw { error: "Error while trying to edit user!", details: error };
  }
};

const deleteUser = async (id) => {
  try {
    const removedUser = await User.findByIdAndDelete(id);
    if (!removedUser) throw "User does not exist!";
    return removedUser;
  } catch (error) {
    throw { error: "Error while trying to delete user!", details: error };
  }
};

module.exports = {
  getUsers,
  getUser,
  addUser,
  editUser,
  deleteUser,
  getUserByEmail,
  getUserByUsername,
  doesUserExist,
  getUserType,
};
