const Category = require("../models/category");
const getCategories = async () => {
  try {
    return await Category.find();
  } catch (error) {
    throw { error: "Error while trying to fetch categories!", details: error };
  }
};

const getCategory = async (id) => {
  try {
    const category = await Category.findById(id);
    if (!category) throw "Category does not exist!";
    return category.name;
  } catch (error) {
    throw { error: "Error while trying to fetch category!", details: error };
  }
};

const doesCategoryExist = async (name) => {
  try {
    return await Category.findOne({ name: name });
  } catch (error) {
    throw {
      error: "Error while trying to check if category exists!",
      details: error,
    };
  }
};

const addCategory = async (category) => {
  try {
    const newCategory = new Category(category);
    const savedCategory = await newCategory.save();
    return savedCategory;
  } catch (err) {
    throw { error: "Error adding category", details: error };
  }
};

const editCategory = async (id, fieldsForEdit) => {
  try {
    const updates = Object.keys(fieldsForEdit);
    const allowedUpdates = ["name"];

    const isValidOperation = updates.every((update) =>
      allowedUpdates.includes(update)
    );
    if (!isValidOperation)
      throw "Invalid field(s) for update! Allowed updates are: name.";

    const updatedCategory = await Category.findById(id);
    if (!updatedCategory) throw "Category does not exist!";

    updates.forEach((update) => {
      updatedCategory[update] = fieldsForEdit[update];
    });
    return await updatedCategory.save();
  } catch (error) {
    throw { error: "Error while trying to edit category!", details: error };
  }
};

const deleteCategory = async (id) => {
  try {
    const removedCategory = await Category.findByIdAndDelete(id);
    if (!removedCategory) throw "Category does not exist!";
    return removedCategory;
  } catch (error) {
    throw { error: "Error while trying to delete category!", details: error };
  }
};

module.exports = {
  getCategories,
  getCategory,
  doesCategoryExist,
  addCategory,
  editCategory,
  deleteCategory,
};
