const tagService = require("../services/tags");

const getTags = async (req, res) => {
  try {
    const tags = await tagService.getTags();

    res.render("tags", {
      tags: tags,
    });
  } catch (error) {
    res.status(404).json(error);
  }
};

const getTag = async (req, res) => {
  try {
    const tag = await tagService.getTag(req.params.id);
    res.status(200).json(tag);
  } catch (error) {
    res.status(404).json(error);
  }
};

const addTag = async (req, res) => {
  try {
    if (await tagService.doesTagExist(req.body.name))
      throw { error: "Tag already exists!" };
    const savedTag = await tagService.addTag({
      name: req.body.name,
    });

    res.redirect("/tag");
  } catch (error) {
    res.status(400).json(error);
  }
};

const editTag = async (req, res) => {
  try {
    const updatedTag = await tagService.editTag(req.params.id, req.body);
    res.status(201).json(updatedTag);
  } catch (error) {
    if (error.details === "Tag does not exist!") res.status(404).json(error);
    res.status(400).json(error);
  }
};

const deleteTag = async (req, res) => {
  try {
    const removedTag = await tagService.deleteTag(req.params.id);
    console.log("Deleted:", req.params.id);

    /* res.status(200).json(removedUser); */
  } catch (error) {
    res.status(404).json(error);
  }
};

module.exports = {
  getTag,
  getTags,
  addTag,
  editTag,
  deleteTag,
};
