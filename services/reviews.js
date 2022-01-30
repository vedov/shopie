const Review = require("../models/review");
const userService = require("../services/users");
//const Item = require("../models/item");
const getReviews = async () => {
  try {
    return await Review.find();
  } catch (error) {
    throw { error: "Error while trying to fetch reviews!", details: error };
  }
};

const getReview = async (id) => {
  try {
    const review = await Review.findById(id);
    if (!review) throw "Review does not exist!";
    return review;
  } catch (error) {
    throw { error: "Error while trying to fetch review!", details: error };
  }
};

const getReviewAuthor = async (id) => {
  try {
    const review = await Review.findById(id);
    if (!review) throw "Review does not exist!";
    const author = await userService.getUser(review.user);
    return author.fullName;
  } catch (error) {
    throw { error: "Error while trying to fetch review!", details: error };
  }
};

const getItemReviews = async (item) => {
  try {
    const reviews = await Review.find({ item: item });

    const newReviews = await Promise.all(
      reviews.map(async (obj) => {
        let author = await userService.getUser(obj._doc.user);
        obj._doc.user = author.fullName;
        return obj._doc;
      })
    );

    if (!reviews) throw "Reviews don't exist!";
    return newReviews;
  } catch (error) {
    throw { error: "Error while trying to fetch reviews!", details: error };
  }
};

const doesReviewExist = async (item) => {
  try {
    return await Review.findOne({ item: item });
  } catch (error) {
    throw {
      error: "Error while trying to check if review exists!",
      details: error,
    };
  }
};

const addReview = async (review) => {
  try {
    const newReview = new Review(review);
    const savedReview = await newReview.save();
    return savedReview;
  } catch (err) {
    throw { error: "Error adding review", details: error };
  }
};

const deleteReview = async (id) => {
  try {
    const removedReview = await Review.findByIdAndDelete(id);
    if (!removedReview) throw "Review does not exist!";
    return removedReview;
  } catch (error) {
    throw { error: "Error while trying to delete review!", details: error };
  }
};

module.exports = {
  getReviews,
  getReview,
  getReviewAuthor,
  getItemReviews,
  addReview,
  deleteReview,
  doesReviewExist,
};
