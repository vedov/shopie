const categoryService = require("../services/categories");

const getCategories = async (req, res) => {
  try {
    const categories = await categoryService.getCategories();

    res.render("categories", {
      categories: categories,
    });
  } catch (error) {
    res.status(404).json(error);
  }
};

const getCategory = async (req, res) => {
  try {
    const category = await categoryService.getCategory(req.params.id);
    res.status(200).json(user);
  } catch (error) {
    res.status(404).json(error);
  }
};

const addCategory = async (req, res) => {
  try {
    if (await categoryService.doesCategoryExist(req.body.name))
      throw { error: "Category already exists!" };
    const savedCategory = await categoryService.addCategory({
      name: req.body.name,
    });
    console.log("added", req.body.name);
    res.redirect("/category");
  } catch (error) {
    res.status(400).json(error);
  }
};

const editCategory = async (req, res) => {
  try {
    const updatedCategory = await categoryService.editCategory(
      req.params.id,
      req.body
    );
    res.status(201).json(updatedCategory);
  } catch (error) {
    if (error.details === "Category does not exist!")
      res.status(404).json(error);
    res.status(400).json(error);
  }
};

const deleteCategory = async (req, res) => {
  try {
    const removedCategory = await categoryService.deleteCategory(req.params.id);
    console.log("Deleted:", req.params.id);
    res.redirect("back");
    /* res.status(200).json(removedUser); */
  } catch (error) {
    res.status(404).json(error);
  }
};

module.exports = {
  getCategory,
  getCategories,
  addCategory,
  editCategory,
  deleteCategory,
};
