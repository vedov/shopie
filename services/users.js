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

const getUserTypeById = async (id) => {
  try {
    const userType = await UserType.findById(id);
    const result = userType.name;

    return result;
  } catch (error) {
    throw { error: "Error while trying to find a user type", details: error };
  }
};

const editUser = async (id, fieldsForEdit) => {
  try {
    const updates = Object.keys(fieldsForEdit);
    console.log(updates);
    const allowedUpdates = ["email", "password", "interests"];

    const isValidOperation = updates.every((update) =>
      allowedUpdates.includes(update)
    );

    if (!isValidOperation)
      throw "Invalid field(s) for update! Allowed updates are: email, and password, interests.";

    const updatedUser = await User.findById(id);
    if (!updatedUser) throw "User does not exist!";
    console.log(updatedUser);
    updates.forEach((update) => {
      console.log(update);
      updatedUser[update] = fieldsForEdit[update];
    });
    return await updatedUser.save();
  } catch (error) {
    console.log(error);
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

const addToUserRevenue = async (id, revenue) => {
  const user = await User.findById(id);
  user.revenue = revenue;
  user.save();
};

const addToUserInterests = async (id, interests) => {
  const user = await User.findById(id);
  user.interests = interests;
  user.save();
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
  getUserTypeById,
  addToUserRevenue,
  addToUserInterests,
};
