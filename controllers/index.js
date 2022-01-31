const itemService = require("../services/items");
const reviewService = require("../services/reviews");
const getLanding = async (req, res) => {
  const randomItems = await getRandomItems(req, res);
  const bestItems = await getBestItems(req, res);
  res.render("landing", { randomItems: randomItems, bestItems: bestItems });
};

const getRandomItems = async () => {
  try {
    const items = await itemService.getItems();
    const randomItems = [];
    for (i = 0; i < 6; i++) {
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
    for (product of items) {
      const avgRating = await getAvgItemRating(product);
      product.avgRating = avgRating;
    }

    return items.sort((a, b) => (a.avgRating > b.avgRating ? -1 : 1));
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
};
