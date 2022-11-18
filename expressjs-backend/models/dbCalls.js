const mongoose = require("mongoose");
const dotenv = require("dotenv");
const User = require("./User");
const Item = require("./Item");

dotenv.config();

console.log("trying to connect to database");
console.log(process.env.MONGODB_URI);
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
    const savedUser = await User.insertMany(userToAdd); // await userToAdd.save();
    // console.log("savedUser: " + JSON.stringify(savedUser));
    return savedUser[0];
  } catch (error) {
    throw new Error("AddUserError");
    // console.log(error);
    // return false;
  }
}

// find user by id
async function findUserById(userId) {
  return await User.find({ _id: userId });
}

async function findUserByEmail(email) {
  return await User.find({ email });
}

// R
async function getUsers(userId, email) {
  if (userId) {
    // get a particular user
    try {
      return (await findUserById(userId))[0];
      // if (res != undefined) {
      //   return res;
      // } else {
      //   throw new Error("UserIdNotFoundException");
      // }
    } catch (error) {
      throw new Error("UserIdNotFoundException");
    }
    // const res = (await findUserById(userId))[0];
    // if (res != undefined) {
    //   return res;
    // } else {
    //   throw new Error("UserIdNotFoundException");
    // }
  } else if (email) {
    // get a particular user by email
    console.log("DETECTED EMAIL: " + email);
    const res = (await findUserByEmail(email))[0];
    if (res != undefined) {
      return res;
    } else {
      throw new Error("UserEmailNotFoundException");
    }
  } else {
    // get every user
    try {
      return await User.find();
    } catch (error) {
      throw new Error("NoUsersFoundException"); // TODO: make a test to hit here, probably need to setup the local memory version of testing to get here
    }
  }
}

// U
async function updateUser(userId, email, password, name) {
  // should only make changes if given new email, password, and/or name
  try {
    return await User.updateOne(
      { _id: userId },
      {
        email: email ? email : User.find(userId).email,
        password: password ? password : User.find(userId).password,
        name: name ? name : User.find(userId).name,
      },
    );
  } catch (error) {
    throw new Error("BadUpdateException");
    // console.log(error);
    // return false;
  }
}

// D
async function deleteUser(userId, email) {
  // deletes a user given the id
  if (userId) {
    try {
      return await User.deleteOne({ _id: userId });
    } catch (error) {
      throw new Error("DeleteUserException");
    }
    // const res = await User.deleteOne({ _id: userId });
    // if (res.deletedCount > 0) {
    //   return res;
    // } else {
    //   throw new Error("DeleteUserException");
    // }
  } else if (email) {
    const res = await User.deleteOne({ email });
    if (res.deletedCount > 0) {
      return res;
    } else {
      throw new Error("DeleteUserException");
    }
  }
}

// async function registerUser(user) {
//   return true;
// }

//
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

async function dc() {
  mongoose.disconnect();
}

exports.dc = dc;
exports.updateUser = updateUser;
exports.deleteUser = deleteUser;
exports.addUser = addUser;
exports.getUsers = getUsers;
exports.testing = testing;
