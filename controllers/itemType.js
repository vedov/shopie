const itemTypeService = require("../services/itemType");

const getItemTypes = async (req, res) => {
  try {
    const itemTypes = await itemTypeService.getItemTypes();

    res.render("itemTypes", {
      itemTypes: itemTypes,
    });
  } catch (error) {
    res.status(404).json(error);
  }
};

const getItemType = async (req, res) => {
  try {
    const itemType = await itemTypeService.getItemType(req.params.id);
    res.status(200).json(tag);
  } catch (error) {
    res.status(404).json(error);
  }
};

const addItemType = async (req, res) => {
  try {
    if (await itemTypeService.doesItemTypeExist(req.body.name))
      throw { error: "ItemType already exists!" };
    const savedItemType = await itemTypeService.addItemType({
      name: req.body.name,
    });

    res.redirect("/itemtype");
  } catch (error) {
    res.status(400).json(error);
  }
};

/* const editTag = async (req, res) => {
  try {
    const updatedTag = await tagService.editTag(req.params.id, req.body);
    res.status(201).json(updatedTag);
  } catch (error) {
    if (error.details === "Tag does not exist!") res.status(404).json(error);
    res.status(400).json(error);
  }
}; */

const deleteItemType = async (req, res) => {
  try {
    const removedItemType = await itemTypeService.deleteItemType(req.params.id);
    console.log("Deleted:", req.params.id);

    /* res.status(200).json(removedUser); */
  } catch (error) {
    res.status(404).json(error);
  }
};

module.exports = {
  getItemType,
  getItemTypes,
  addItemType,
  deleteItemType,
};
