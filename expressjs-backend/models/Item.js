const mongoose = require("mongoose");

const ItemSchema = new mongoose.Schema(
  {
    category: {
      type: String,
      required: true,
      trim: true,
    },
    location: {
      type: String,
      trim: true,
    },
    info: {
      type: String,
      trim: true,
    },
    image: {
      type: String,
      default: "",
    },
  },
  { collection: "Item" },
);

const Item = mongoose.model("Item", ItemSchema);

module.exports = Item;
