const Interest = require("../models/interest");
const getInterests = async () => {
  try {
    return await Interest.find();
  } catch (error) {
    throw { error: "Error while trying to fetch interests!", details: error };
  }
};

const getInterest = async (id) => {
  try {
    const interest = await Interest.findById(id);
    if (!interest) throw "Interest does not exist!";
    return interest.name;
  } catch (error) {
    throw { error: "Error while trying to fetch interest!", details: error };
  }
};

const doesInterestExist = async (name) => {
  try {
    return await Interest.findOne({ name: name });
  } catch (error) {
    throw {
      error: "Error while trying to check if interest exists!",
      details: error,
    };
  }
};

const addInterest = async (interest) => {
  try {
    const newInterest = new Interest(interest);
    const savedInterest = await newInterest.save();
    return savedInterest;
  } catch (err) {
    throw { error: "Error adding interest", details: error };
  }
};

const editInterest = async (id, fieldsForEdit) => {
  try {
    const updates = Object.keys(fieldsForEdit);
    const allowedUpdates = ["name"];

    const isValidOperation = updates.every((update) =>
      allowedUpdates.includes(update)
    );
    if (!isValidOperation)
      throw "Invalid field(s) for update! Allowed updates are: name.";

    const updatedInterest = await Interest.findById(id);
    if (!updatedInterest) throw "Interest does not exist!";

    updates.forEach((update) => {
      updatedInterest[update] = fieldsForEdit[update];
    });
    return await updatedInterest.save();
  } catch (error) {
    throw { error: "Error while trying to edit interest!", details: error };
  }
};

const deleteInterest = async (id) => {
  try {
    const removedInterest = await Interest.findByIdAndDelete(id);
    if (!removedInterest) throw "Interest does not exist!";
    return removedInterest;
  } catch (error) {
    throw { error: "Error while trying to delete interest!", details: error };
  }
};

module.exports = {
  getInterests,
  getInterest,
  doesInterestExist,
  addInterest,
  editInterest,
  deleteInterest,
};
