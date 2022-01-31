const Item = require("../models/Item");
const getItems = async () => {
  try {
    return await Item.find();
  } catch (error) {
    throw { error: "Error while trying to fetch Items!", details: error };
  }
};

const getCatalogue = async (shop) => {
  try {
    return await Item.find({ shop: shop });
  } catch (error) {
    throw {
      error: "Error while trying to get Catalogue!",
      details: error,
    };
  }
};

const getItemsByCategory = async (category) => {
  try {
    return await Item.find({ category: category });
  } catch (error) {
    throw {
      error: "Error while trying to get Category!",
      details: error,
    };
  }
};

const getItemByName = async (name) => {
  try {
    return await Item.find({ name: { $regex: name } });
  } catch (error) {
    throw {
      error: "Error while trying to get Item!",
      details: error,
    };
  }
};

const getItem = async (id) => {
  try {
    const item = await Item.findById(id);
    if (!item) throw "Item does not exist!";
    return item;
  } catch (error) {
    throw { error: "Error while trying to fetch Item!", details: error };
  }
};

const doesItemExist = async (name) => {
  try {
    return await Item.findOne({ name: name });
  } catch (error) {
    throw {
      error: "Error while trying to check if Item exists!",
      details: error,
    };
  }
};

const addItem = async (item) => {
  try {
    const newItem = new Item(item);
    const savedItem = await newItem.save();
    return savedItem;
  } catch (err) {
    throw { error: "Error adding Item", details: error };
  }
};

/*
const editItem = async (id, fieldsForEdit) => {
  try {
    const updates = Object.keys(fieldsForEdit);
    const allowedUpdates = ["name"];

    const isValidOperation = updates.every((update) =>
      allowedUpdates.includes(update)
    );
    if (!isValidOperation)
      throw "Invalid field(s) for update! Allowed updates are: name.";

    const updatedItem = await Item.findById(id);
    if (!updatedItem) throw "Item does not exist!";

    updates.forEach((update) => {
      updatedItem[update] = fieldsForEdit[update];
    });
    return await updatedItem.save();
  } catch (error) {
    throw { error: "Error while trying to edit Item!", details: error };
  }
};

const deleteItem = async (id) => {
  try {
    const removedItem = await Item.findByIdAndDelete(id);
    if (!removedItem) throw "Item does not exist!";
    return removedItem;
  } catch (error) {
    throw { error: "Error while trying to delete Item!", details: error };
  }
}; */

module.exports = {
  getItems,
  getItem,
  getItemByName,
  addItem,
  doesItemExist,
  getCatalogue,
  getItemsByCategory,
};
