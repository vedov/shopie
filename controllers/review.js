const reviewService = require("../services/reviews");
const userService = require("../services/users");
const itemService = require("../services/items");
const { default: jwtDecode } = require("jwt-decode");

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
const getReviews = async (req, res) => {
  try {
    const reviews = await reviewService.getReviews();

    res.render("reviews", {
      reviews: reviews,
    });
  } catch (error) {
    res.status(404).json(error);
  }
};

const getItemReviews = async (req, res) => {
  try {
    const itemId = req.params.id;
    console.log(itemId);
    // const review = await reviewService.getItemReviews(req.params.id);
    res.status(200).json(tag);
  } catch (error) {
    res.status(404).json(error);
  }
};

const addReview = async (req, res) => {
  try {
    const item = await itemService.getItem(req.params.id);
    const currentUser = await getCurrentUser(req, res);
    const savedReview = await reviewService.addReview({
      user: currentUser._id,
      rating: req.body.rating,
      comment: req.body.comment,
      item: item._id,
    });
    
    res.redirect("/item/" + req.params.id);
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

/* const deleteItemType = async (req, res) => {
  try {
    const removedItemType = await itemTypeService.deleteItemType(req.params.id);
    console.log("Deleted:", req.params.id);

    res.status(200).json(removedUser); 
  } catch (error) {
    res.status(404).json(error);
  }
};
 */
module.exports = {
  getReviews,
  addReview,
  getItemReviews,
};
