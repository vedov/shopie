const WishList = require("../models/wishList");
const getWishList = async (user) => {
  try {
    const wishList = await WishList.findOne({ user: user });
    return wishList;
  } catch (error) {
    throw { error: "Error while trying to fetch wishList!", details: error };
  }
};

const addToWishList = async (user, item) => {
  try {
    const wishList = await WishList.findOne({ user: user });
    const existing = wishList && wishList.items.includes(item._id);
    if (!wishList || wishList.length == 0) {
      const newWishList = new WishList({
        user: user._id,
        items: [item._id],
      });
      const savedWishList = await newWishList.save();
      return savedWishList;
    } else if (!existing) {
      wishList.items.push(item._id);
      wishList.save();
    }
  } catch (error) {
    throw { error: "Error while trying to add to Wish List!", details: error };
  }
};

const removeFromWishList = async (user, item) => {
  try {
    const wishList = await WishList.findOne({ user: user });
    const items = wishList.items;
    for (i = 0; i < items.length; i++) {
      if (JSON.stringify(items[i]) == JSON.stringify(item._id)) {
        items.splice(i, 1);
        break;
      }
    }
    wishList.items = wishList.items;
    wishList.save();
  } catch (error) {
    throw {
      error: "Error while trying to delete from Wish List!",
      details: error,
    };
  }
};

module.exports = {
  getWishList,
  addToWishList,
  removeFromWishList,
};
