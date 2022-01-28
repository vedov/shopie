const itemService = require("../services/items");
const { default: jwtDecode } = require("jwt-decode");
const userService = require("../services/users");

const getCurrentUser = async (req, res) => {
  try {
    const token = req.cookies.token;
    const jwt_decode = await jwtDecode(token);
    const currentUser = await userService.getUser(jwt_decode.user.id);
    return currentUser;
  } catch (error) {
    res.status(404).json(error);
  }
};

const getItems = async (req, res) => {
  try {
    const Items = await itemService.getItems();

    res.render("items", {
      items: Items,
    });
  } catch (error) {
    res.status(404).json(error);
  }
};

const getCatalogue = async (req, res) => {
  try {
    const currentUser = await getCurrentUser(req, res);
    const products = await itemService.getCatalogue(currentUser._id);

    res.render("catalogue", {
      products: products,
    });
  } catch (error) {
    res.status(404).json(error);
  }
};

const getItem = async (req, res) => {
  try {
    const item = await itemService.getItem(req.params.id);
    const shop = await userService.getUser(item.shop._id);
    res.render("item", { item: item, shop: shop });
  } catch (error) {
    res.status(404).json(error);
  }
};

const addItem = async (req, res) => {
  try {
    const shop = await getCurrentUser(req, res);
    const savedItem = await itemService.addItem({
      shop: shop._id,
      name: req.body.name,
      shortDesc: req.body.shortDesc,
    });

    res.redirect("/user/catalogue");
  } catch (error) {
    res.status(400).json(error);
  }
};
/*
const editItem = async (req, res) => {
  try {
    const updatedItem = await itemService.editItem(req.params.id, req.body);
    res.status(201).json(updatedItem);
  } catch (error) {
    if (error.details === "Item does not exist!") res.status(404).json(error);
    res.status(400).json(error);
  }
}; */

/* const deleteItem = async (req, res) => {
  try {
    const removedItem = await itemService.deleteItem(req.params.id);
    console.log("Deleted:", req.params.id);

    res.status(200).json(removedUser); 
  } catch (error) {
    res.status(404).json(error);
  }
}; */

module.exports = {
  getItem,
  getItems,
  addItem,
  getCurrentUser,
  getCatalogue,
};
