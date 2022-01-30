const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ItemTypeSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
});

const ItemType = mongoose.model("ItemType", ItemTypeSchema);

module.exports = ItemType;
