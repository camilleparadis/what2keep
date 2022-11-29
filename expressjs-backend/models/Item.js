const mongoose = require("mongoose");

const ItemSchema = new mongoose.Schema(
  {
    userId: {
      type: String, // not 100% if it is a string
      required: true,
      trim: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
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
    usage: {
      type: Number,
      required: true,
    },
  },
  { collection: "Item" },
);
module.exports = ItemSchema;
//const Item = mongoose.model("Item", ItemSchema);

//module.exports = Item;
