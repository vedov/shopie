const wishListService = require("../services/wishLists");
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
const getWishList = async (req, res) => {
  try {
    const currentUser = await getCurrentUser(req, res);
    const products = await wishListService.getWishList(currentUser._id);

    let wishList = [];
    for (item of products.items) {
      const temp = await itemService.getItem(item);
      console.log(temp);
      wishList.push(temp);
    }

    res.render("wishList", {
      products: wishList,
    });
  } catch (error) {
    res.status(404).json(error);
  }
};

const addToWishList = async (req, res) => {
  try {
    const currentUser = await getCurrentUser(req, res);
    const item = await itemService.getItem(req.params.id);
    await wishListService.addToWishList(currentUser._id, item);
    res.redirect("/user/wishList");
  } catch (error) {
    res.status(404).json(error);
  }
};

module.exports = {
  getWishList,
  addToWishList,
};