const cartService = require("../services/carts");
const itemService = require("../services/items");
const categoryService = require("../services/categories");
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
const getCart = async (req, res) => {
  try {
    const currentUser = await getCurrentUser(req, res);
    let cart = await cartService.getCart(currentUser._id);

    let cartProducts = [];
    if (cart != null) {
      for (item of cart.items) {
        let temp = await itemService.getItem(item);
        cartProducts.push(temp);
      }
      res.render("cart", {
        customer: currentUser._id,
        products: cartProducts,
        price: cart.price,
        coupon: "",
      });
    }
    res.render("cart", {
      customer: currentUser._id,
      products: "",
      price: "",
      coupon: "",
    });
  } catch (error) {
    res.status(404).json(error);
  }
};

const addToCart = async (req, res) => {
  try {
    const currentUser = await getCurrentUser(req, res);
    const item = await itemService.getItem(req.params.id);
    await cartService.addToCart(currentUser._id, item);
  } catch (error) {
    res.status(404).json(error);
  }
};

const removeFromCart = async (req, res) => {
  try {
    const currentUser = await getCurrentUser(req, res);
    const item = await itemService.getItem(req.params.id);
    await cartService.removeFromCart(currentUser._id, item);
    res.redirect("/user/cart");
  } catch (error) {
    res.status(404).json(error);
  }
};

const addCoupon = async (req, res) => {
  try {
    const currentUser = await getCurrentUser(req, res);
    const coupon = req.body.coupon;
    let discount = 1;
    switch (coupon) {
      case "SHOPI":
        discount = 0.8;
        break;
      case "VEDICA":
        discount = 0.7;
        break;
      case "VISOKDATUM":
        discount = 0.3;
        break;
      default:
        discount = 1;
        break;
    }
    const cart = await cartService.getCart(currentUser._id);
    let cartProducts = [];
    for (item of cart.items) {
      let temp = await itemService.getItem(item);
      cartProducts.push(temp);
    }

    newPrice = await cartService.addCoupon(currentUser._id, discount);
    res.render("cart", {
      customer: currentUser._id,
      products: cartProducts,
      price: newPrice,
      coupon: "readonly",
    });
  } catch (error) {
    res.status(404).json(error);
  }
};

module.exports = {
  getCart,
  addToCart,
  removeFromCart,
  addCoupon,
};
