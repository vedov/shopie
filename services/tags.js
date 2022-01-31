const Tag = require("../models/tag");
const getTags = async () => {
  try {
    return await Tag.find();
  } catch (error) {
    throw { error: "Error while trying to fetch tags!", details: error };
  }
};

const getTag = async (id) => {
  try {
    const tag = await Tag.findById(id);
    if (!tag) throw "Tag does not exist!";
    return tag.name;
  } catch (error) {
    throw { error: "Error while trying to fetch tag!", details: error };
  }
};

const getTagByName = async (name) => {
  try {
    const tag = await Tag.findOne({ name: name });
    if (!tag) throw "Tag does not exist!";
    return tag;
  } catch (error) {
    throw { error: "Error while trying to fetch tag!", details: error };
  }
};

const doesTagExist = async (name) => {
  try {
    return await Tag.findOne({ name: name });
  } catch (error) {
    throw {
      error: "Error while trying to check if tag exists!",
      details: error,
    };
  }
};

const addTag = async (tag) => {
  try {
    const newTag = new Tag(tag);
    const savedTag = await newTag.save();
    return savedTag;
  } catch (err) {
    throw { error: "Error adding tag", details: error };
  }
};

const editTag = async (id, fieldsForEdit) => {
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
};

const deleteTag = async (id) => {
  try {
    const removedTag = await Tag.findByIdAndDelete(id);
    if (!removedTag) throw "Tag does not exist!";
    return removedTag;
  } catch (error) {
    throw { error: "Error while trying to delete tag!", details: error };
  }
};

module.exports = {
  getTags,
  getTag,
  getTagByName,
  doesTagExist,
  addTag,
  editTag,
  deleteTag,
};
