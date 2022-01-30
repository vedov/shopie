const ItemType = require("../models/itemType");
const getItemTypes = async () => {
  try {
    return await ItemType.find();
  } catch (error) {
    throw { error: "Error while trying to fetch item Types!", details: error };
  }
};

const getItemType = async (id) => {
  try {
    const itemType = await ItemType.findById(id);
    if (!itemType) throw "ItemType does not exist!";
    return itemType.name;
  } catch (error) {
    throw { error: "Error while trying to fetch ItemType!", details: error };
  }
};

const doesItemTypeExist = async (name) => {
  try {
    return await ItemType.findOne({ name: name });
  } catch (error) {
    throw {
      error: "Error while trying to check if ItemType exists!",
      details: error,
    };
  }
};

const addItemType = async (type) => {
  try {
    const newItemType = new ItemType(type);
    const savedItemType = await newItemType.save();
    return savedItemType;
  } catch (err) {
    throw { error: "Error adding ItemType", details: error };
  }
};

/* const editItemType = async (id, fieldsForEdit) => {
  try {
    const updates = Object.keys(fieldsForEdit);
    const allowedUpdates = ["name"];

    const isValidOperation = updates.every((update) =>
      allowedUpdates.includes(update)
    );
    if (!isValidOperation)
      throw "Invalid field(s) for update! Allowed updates are: name.";

    const updatedTag = await Tag.findById(id);
    if (!updatedTag) throw "Tag does not exist!";

    updates.forEach((update) => {
      updatedTag[update] = fieldsForEdit[update];
    });
    return await updatedTag.save();
  } catch (error) {
    throw { error: "Error while trying to edit tag!", details: error };
  }
}; */

const deleteItemType = async (id) => {
  try {
    const removedItemType = await ItemType.findByIdAndDelete(id);
    if (!removedItemType) throw "ItemType does not exist!";
    return removedItemType;
  } catch (error) {
    throw { error: "Error while trying to delete ItemType!", details: error };
  }
};

module.exports = {
  getItemTypes,
  getItemType,
  doesItemTypeExist,
  addItemType,
  deleteItemType,
};
