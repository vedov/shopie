const itemService = require("../services/items");
const categoryService = require("../services/categories");
const reviewService = require("../services/reviews");
const userService = require("../services/users");
const interestService = require("../services/interests");
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

const getLanding = async (req, res) => {
  const categories = await categoryService.getCategories(req, res);
  const randomItems = await getRandomItems(req, res);
  const bestItems = await getBestItems(req, res);
  const interestItems = await getInterestItems(req, res);
  res.render("landing", {
    randomItems: randomItems,
    bestItems: bestItems,
    interestItems: interestItems,
    categories: categories,
  });
};

const getRandomItems = async () => {
  try {
    const items = await itemService.getItems();
    const randomItems = [];
    for (i = 0; i < 8; i++) {
      randomItems.push(items[Math.floor(Math.random() * items.length)]);
    }

    return randomItems;
  } catch (error) {
    res.status(404).json(error);
  }
};

const getBestItems = async (req, res) => {
  try {
    const items = await itemService.getItems();
    let bestItems = [];
    for (product of items) {
      const avgRating = await getAvgItemRating(product);
      product.avgRating = avgRating;
    }
    items.sort((a, b) => (a.avgRating > b.avgRating ? -1 : 1));
    for (i = 0; i < 4; i++) {
      bestItems.push(items[i]);
    }

    return bestItems;
  } catch (error) {
    res.status(404).json(error);
  }
};

const getInterestItems = async (req, res) => {
  try {
    const user = await getCurrentUser(req, res);
    const items = await itemService.getItems();

    const userInterestsIds = await userService.getUserInterests(user._id);
    const userInterests = [];
    for (interest of userInterestsIds) {
      const temp = await interestService.getInterest(interest);
      userInterests.push(temp);
    }
    let interestItems = [];
    for (product of items) {
      for (interest of userInterests) {
        const category = await categoryService.getCategory(product.category);
        if (category == interest) {
          interestItems.push(product);
        }
      }
    }

    const randomInterests = [];
    for (i = 0; i < 8; i++) {
      randomInterests.push(
        interestItems[Math.floor(Math.random() * interestItems.length)]
      );
    }

    return randomInterests;
  } catch (error) {
    res.status(404).json(error);
  }
};

const getAvgItemRating = async (item) => {
  try {
    const reviews = await reviewService.getItemReviews(item);
    let avgRating = 0;
    for (i = 0; i < reviews.length; i++) {
      avgRating += reviews[i].rating;
    }
    return avgRating / reviews.length;
  } catch (error) {
    res.status(404).json(error);
  }
};

/* exports.postRegister = async (req, res, next) => {
  passport.authenticate(
    "register",
    { session: false },
    async (err, user, info) => {
      try {
        const { fullName, email, password, password2 } = req.body;
        let errors = validationResult(req);
        let errorMessages = [];

        errors.array().map((error) => {
          errorMessages.push(error.msg);
        });

        if (errorMessages.length > 0) {
          return res.render("register", {
            errors: errorMessages,
            fullName: fullName,
            email: email,
            password: password,
            password2: password2,
          });
        }

        if (err) {
          return next(err);
        }

        if (!user) {
          errorMessages.push(info.msg);

          return res.render("register", {
            errors: errorMessages,
            fullName: fullName,
            email: email,
            password: password,
            password2: password2,
          });
        }

        req.flash("success_msg", info.msg);
        return res.redirect("/");
      } catch (err) {
        return next(err);
      }
    }
  )(req, res, next);
}; */
module.exports = {
  getLanding,
  getBestItems,
  getAvgItemRating,
  getInterestItems,
};
