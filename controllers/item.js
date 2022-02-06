const itemService = require("../services/items");
const { default: jwtDecode } = require("jwt-decode");
const userService = require("../services/users");
const categoryService = require("../services/categories");
const itemTypeService = require("../services/itemType");
const reviewService = require("../services/reviews");
const tagService = require("../services/tags");
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
    const items = await itemService.getItems();

    res.render("items", {
      items: items,
    });

    const categories = await categoryService.getCategories();
  } catch (error) {
    res.status(404).json(error);
  }
};

const getRandomItems = async (req, res) => {
  try {
    const items = await itemService.getItems();
    console.log(items[Math.floor(Math.random() * items.length)]);
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

const getWishList = async (req, res) => {
  try {
    const currentUser = await getCurrentUser(req, res);
    const products = await itemService.getWishList(currentUser._id);

    res.render("wishList", {
      products: products,
    });
  } catch (error) {
    res.status(404).json(error);
  }
};

const getItemsByCategory = async (req, res) => {
  try {
    const category = await categoryService.getCategory(req.params.id);
    const products = await itemService.getItemsByCategory(req.params.id);
    console.log(products);
    res.render("searchCategory", {
      products: products,
      category: category,
    });
  } catch (error) {
    res.status(404).json(error);
  }
};

const getItemByName = async (req, res) => {
  try {
    const products = await itemService.getItemByName(req.params.name);
    const shops = await userService.getUserByName(req.params.name);
    res.render("searchName", {
      products: products,
      name: req.params.name,
      shops: shops,
    });
  } catch (error) {
    res.status(404).json(error);
  }
};

const getItem = async (req, res) => {
  try {
    const item = await itemService.getItem(req.params.id);
    const shop = await userService.getUser(item.shop._id);
    const category = await categoryService.getCategory(item.category._id);
    const itemType = await itemTypeService.getItemType(item.type._id);
    const reviews = await reviewService.getItemReviews(item);
    const tags = [];
    for (tag of item.tags) {
      tags.push(await tagService.getTag(tag));
    }

    const avgRating = await getAvgItemRating(req, res);
    await itemService.setItemRating(item._id, avgRating);

    res.render("item", {
      item: item,
      shop: shop,
      category: category,
      itemType: itemType,
      reviews: reviews,
      rating: item.avgRating,
      tags: tags,
    });
  } catch (error) {
    res.status(404).json(error);
  }
};

const getAvgItemRating = async (req, res) => {
  try {
    const item = await itemService.getItem(req.params.id);
    const reviews = await reviewService.getItemReviews(item);
    let avgRating = 0;
    for (i = 0; i < reviews.length; i++) {
      avgRating += reviews[i].rating;
    }
    if (reviews.length != 0) return avgRating / reviews.length;
    else return 0;
  } catch (error) {
    res.status(404).json(error);
  }
  return 0;
};

const addItem = async (req, res) => {
  try {
    const shop = await getCurrentUser(req, res);
    const data = req.files;
    const tagsData = req.body.tags;
    let tempTags = [];
    let tags = [];
    tempTags = tagsData.split(",");

    for (item of tempTags) {
      const tag = '{ "name":"' + item + '"}';
      await tagService.addTag(JSON.parse(tag));
      await tagService.getTagByName(item).then((data) => {
        tags.push(data._id);
      });
    }
    let imageUrls = [];
    data.forEach(function (item) {
      imageUrls.push(item.path);
    });
    let category = JSON.parse(req.body.category);
    let type = JSON.parse(req.body.type);
    const savedItem = await itemService.addItem({
      shop: shop._id,
      name: req.body.name,
      brand: req.body.brand,
      type: type._id,
      shortDesc: req.body.shortDesc,
      category: category._id,
      stock: req.body.stock,
      price: req.body.price,
      tags: tags,
      imageUrls: imageUrls,
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
  getRandomItems,
  addItem,
  getItemByName,
  getCurrentUser,
  getCatalogue,
  getItemsByCategory,
  getWishList,
};
