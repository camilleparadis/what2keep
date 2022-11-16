const mongoose = require("mongoose");
const dotenv = require("dotenv");
const User = require("./User");
const Item = require("./Item");

dotenv.config();

mongoose.connect(process.env.MONGODB_URI).catch((error) => console.log(error));

async function testing() {
  return true;
}

// C
async function addUser(email, password, name) {
  try {
    const userToAdd = new User({
      email,
      password,
      name,
    });
    const savedUser = await userToAdd.save();
    return savedUser;
  } catch (error) {
    console.log(error);
    return false;
  }
}

// find user by id
async function findUser(userId) {
  return await User.findById(userId);
}

// R
async function getUsers(userId) {
  if (userId) {
    // get a particular user
    try {
      return await findUser(userId);
    } catch (error) {
      console.log(error);
      return false;
    }
  } else {
    // get every user
    try {
      return await User.find();
    } catch (error) {
      console.log(error);
      return false;
    }
  }
}

// U
async function updateUser(userId, email, password, name) {
  // should only make changes if given new email, password, and/or name
  try {
    // const doc = User.findUser(userId);
    return await User.updateOne(userId, {
      email: email ? email : User.find(userId).email,
      password: password ? password : User.find(userId).password,
      name: name ? name : User.find(userId).name,
    });
  } catch (error) {
    console.log(error);
    return false;
  }
}

// D
async function deleteUser(userId) {
  // deletes a user given the id
  try {
    return await User.deleteOne({ _id: userId });
  } catch (error) {
    console.log(error);
    return false;
  }
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

// unnecessary
// async function disconnectDB() {
//   await mongoose.connection.close();
//   await mongoose.disconnect();
// }

exports.updateUser = updateUser;
exports.deleteUser = deleteUser;
exports.addUser = addUser;
exports.getUsers = getUsers;
exports.testing = testing;
