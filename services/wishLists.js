const WishList = require("../models/wishList");
const getWishList = async (user) => {
  try {
    const wishList = await WishList.findOne({ user: user });
    return wishList;
  } catch (error) {
    throw { error: "Error while trying to fetch interests!", details: error };
  }
};

const addToWishList = async (user, item) => {
  try {
    const wishList = await WishList.findOne({ user: user });
    const existing = wishList.items.includes(item._id);
    if (wishList.length == 0) {
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

module.exports = {
  getWishList,
  addToWishList,
};
