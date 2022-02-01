const Cart = require("../models/cart");
const getCart = async (user) => {
  try {
    const cart = await Cart.findOne({ user: user });
    return cart;
  } catch (error) {
    throw { error: "Error while trying to fetch cart!", details: error };
  }
};

const addToCart = async (user, item) => {
  try {
    const cart = await Cart.findOne({ user: user });
    if (!cart || cart.length == 0) {
      const newCart = new Cart({
        user: user._id,
        items: [item._id],
        price: item.price,
      });
      const savedCart = await newCart.save();
      return savedCart;
    }
    cart.items.push(item._id);
    cart.price += item.price;
    cart.save();
  } catch (error) {
    throw { error: "Error while trying to add to Cart!", details: error };
  }
};

const removeFromCart = async (user, item) => {
  try {
    const cart = await Cart.findOne({ user: user });
    const items = cart.items;
    for (i = 0; i < items.length; i++) {
      if (JSON.stringify(items[i]) == JSON.stringify(item._id)) {
        items.splice(i, 1);
        break;
      }
    }
    cart.items = cart.items;
    cart.price -= item.price;
    cart.save();
  } catch (error) {
    throw { error: "Error while trying to delete from Cart!", details: error };
  }
};

const addCoupon = async (user, discount) => {
  try {
    const cart = await Cart.findOne({ user: user });
    cart.price *= discount;
    return cart.price;
  } catch (error) {
    throw { error: "Error adding Coupon!", details: error };
  }
};

module.exports = {
  getCart,
  addToCart,
  removeFromCart,
  addCoupon,
};
