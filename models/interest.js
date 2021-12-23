const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const InterestSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
});

const Interest = mongoose.model("Interest", InterestSchema);

module.exports = Interest;
