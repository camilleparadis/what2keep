const mongoose = require("mongoose");
const dotenv = require("dotenv");
const User = require('./User');
const Item = require('./Item');

dotenv.config();

mongoose.connect(process.env.MONGODB_URI).catch((error) => console.log(error));

async function testing() {
  return true;
}

// async function registerUser(user) {
//   return true;
// }

// ///
// async function loginUser(user) {
//   return true;
// }

// async function addItem() {
//   return true;
// }

// async function updateItem() {
//   return true;
// }

// async function deleteItem() {
//   return true;
// }

// async function addImage() {
//   return true;
// }

// async function updateImage() {
//   return true;
// }

// async function deleteImage() {
//   return true;
// }

exports.testing = testing;
