const interestService = require("../services/interests");

const getInterests = async (req, res) => {
  try {
    const interests = await interestService.getInterests();
    res.render("interests", {
      interests: interests,
    });
  } catch (error) {
    res.status(404).json(error);
  }
};

const getInterest = async (req, res) => {
  try {
    const interest = await interestService.getInterest(req.params.id);
    return interest.name;
  } catch (error) {
    res.status(404).json(error);
  }
};

const addInterest = async (req, res) => {
  try {
    if (await interestService.doesInterestExist(req.body.name))
      throw { error: "Interest already exists!" };
    const savedInterest = await interestService.addInterest({
      name: req.body.name,
      imgUrl: req.body.imgUrl,
    });
    console.log("added", req.body.name);
    res.redirect("/interest");
  } catch (error) {
    res.status(400).json(error);
  }
};

const editInterest = async (req, res) => {
  try {
    const updatedInterest = await interestService.editInterest(
      req.params.id,
      req.body
    );
    res.status(201).json(updatedInterest);
  } catch (error) {
    if (error.details === "Interest does not exist!")
      res.status(404).json(error);
    res.status(400).json(error);
  }
};

const deleteInterest = async (req, res) => {
  try {
    const removedInterest = await interestService.deleteInterest(req.params.id);
    console.log("Deleted:", req.params.id);

    /* res.status(200).json(removedUser); */
  } catch (error) {
    res.status(404).json(error);
  }
};

module.exports = {
  getInterest,
  getInterests,
  addInterest,
  editInterest,
  deleteInterest,
};
