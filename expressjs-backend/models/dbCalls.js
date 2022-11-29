const mongoose = require("mongoose");
const dotenv = require("dotenv");
const UserSchema = require("./User");
const ItemSchema = require("./Item");

dotenv.config();

let dbConnection;

function setConnection(newConn) {
  dbConnection = newConn;
  return dbConnection;
}

// TODO: ASK BJ ABOUT HOW CAN COVER THIS IN TEST WHEN USING MEMORY FOR TESTING????
function getDbConnection() {
  if (!dbConnection) {
    dbConnection = mongoose.createConnection(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  }
  return dbConnection;
}

/// not 100% if we need this for production/ nontest environment?
// mongoose.connect(process.env.MONGODB_URI).catch((error) => console.log(error));

async function testing() {
  return true;
}

// C
async function addUser(email, password, name) {
  const userModel = getDbConnection().model("User", UserSchema);
  try {
    const userToAdd = new userModel({
      email,
      password,
      name,
    });
    const savedUser = await userModel.insertMany(userToAdd);
    return savedUser[0];
  } catch (error) {
    throw new Error("AddUserError");
  }
}

async function findUserById(userId) {
  const userModel = getDbConnection().model("User", UserSchema);
  return await userModel.find({ _id: userId });
}

async function findUserByEmail(email) {
  const userModel = getDbConnection().model("User", UserSchema);
  return await userModel.find({ email });
}

// R
async function getUsers(userId, email) {
  const userModel = getDbConnection().model("User", UserSchema);
  if (userId) {
    // get a particular user
    try {
      return (await findUserById(userId))[0];
    } catch (error) {
      throw new Error("UserIdNotFoundException");
    }
  } else if (email) {
    // get a particular user by email
    const res = (await findUserByEmail(email))[0];
    if (res != undefined) {
      return res;
    } else {
      throw new Error("UserEmailNotFoundException");
    }
  } else {
    // get every user
    const res = await userModel.find();
    if (res[0]) {
      return res;
    } else {
      throw new Error("NoUsersFoundException");
    }
  }
}

// U
async function updateUser(userId, email, password, name) {
  // should only make changes if given new email, password, and/or name
  const userModel = getDbConnection().model("User", UserSchema);
  try {
    return await userModel.updateOne(
      { _id: userId },
      {
        email: email ? email : userModel.find(userId).email,
        password: password ? password : userModel.find(userId).password,
        name: name ? name : userModel.find(userId).name,
      },
    );
  } catch (error) {
    throw new Error("BadUserUpdateException");
  }
}

// D
// TODO: would eventually want to have it delete every item associated with the user too
async function deleteUser(userId, email) {
  // deletes a user given the id or email
  const userModel = getDbConnection().model("User", UserSchema);
  if (userId) {
    try {
      return await userModel.deleteOne({ _id: userId });
    } catch (error) {
      throw new Error("DeleteUserException");
    }
  } else if (email) {
    const res = await userModel.deleteOne({ email });
    if (res.deletedCount > 0) {
      return res;
    } else {
      throw new Error("DeleteUserException");
    }
  }
}

// -- ITEM --

// C
// just create a 1 item
async function addItem(userId, category, location, info, image, name, usage) {
  const itemModel = getDbConnection().model("Item", ItemSchema);
  try {
    const itemToAdd = new itemModel({
      userId,
      category,
      location,
      info,
      image,
      name,
      usage,
    });
    const savedItem = await itemModel.insertMany(itemToAdd);
    return savedItem[0];
  } catch (error) {
    throw new Error("AddItemError");
  }
}

// R - must be only able to read if they are yours
// read a single item
// read all the items from a user
/// probably more later but those are core
async function getItem(userId, itemId) {
  const itemModel = getDbConnection().model("Item", ItemSchema);
  if (itemId) {
    // get a particular item
    try {
      // ensures only the correct user can access as well
      return (await itemModel.find({ _id: itemId, userId: userId }))[0];
    } catch (error) {
      throw new Error("ItemNotFoundException");
    }
  } else {
    // get every item for this user
    const res = await itemModel.find({ userId: userId });
    if (res[0]) {
      return res;
    } else {
      throw new Error("NoItemsFoundException");
    }
  }
}

// R
// specialized query returning all items with usage up to the given
async function queryItems(userId, usageUpTo) {
  const itemModel = getDbConnection().model("Item", ItemSchema);
  const res = await itemModel.find({
    userId: userId,
    usage: { $lte: usageUpTo },
  });
  if (res[0]) {
    return res;
  } else {
    throw new Error("QueryFailedException");
  }
}

// R
// specialized query returning all items in a given category
async function inCategoryItems(userId, category) {
  const itemModel = getDbConnection().model("Item", ItemSchema);
  const res = await itemModel.find({
    userId: userId,
    category: category,
  });
  if (res[0]) {
    return res;
  } else {
    throw new Error("CategoryNotFoundException");
  }
}

// U
// update a single item
async function updateItem(
  userId,
  itemId,
  category,
  location,
  info,
  image,
  name,
  usage,
) {
  const itemModel = getDbConnection().model("Item", ItemSchema);
  try {
    return await itemModel.updateOne(
      { _id: itemId, userId: userId },
      {
        category: category ? category : itemModel.find(itemId).category,
        location: location ? location : itemModel.find(itemId).location,
        info: info ? info : itemModel.find(itemId).info,
        image: image ? image : itemModel.find(itemId).image,
        name: name ? name : itemModel.find(itemId).name,
        usage: usage ? usage : itemModel.find(itemId).usage,
      },
    );
  } catch (error) {
    throw new Error("BadItemUpdateException");
  }
}

// D
// delete a single item based on itemId
async function deleteItem(userId, itemId) {
  const itemModel = getDbConnection().model("Item", ItemSchema);
  try {
    return await itemModel.deleteOne({ _id: itemId, userId: userId });
  } catch (error) {
    throw new Error("DeleteItemException");
  }
}

// async function registerUser(user) {
//   return true;
// }

//
// async function loginUser(user) {
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

async function dc() {
  mongoose.disconnect();
}

exports.queryItems = queryItems;
exports.inCategoryItems = inCategoryItems;
exports.addItem = addItem;
exports.getItem = getItem;
exports.updateItem = updateItem;
exports.deleteItem = deleteItem;
exports.setConnection = setConnection;
exports.getDbConnection = getDbConnection;
exports.dc = dc;
exports.updateUser = updateUser;
exports.deleteUser = deleteUser;
exports.addUser = addUser;
exports.getUsers = getUsers;
exports.testing = testing;
