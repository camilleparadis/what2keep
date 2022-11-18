const mongoose = require("mongoose");
const dotenv = require("dotenv");
const UserSchema = require("./User");
const Item = require("./Item");

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
    throw new Error("BadUpdateException");
  }
}

// D
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

async function dc() {
  mongoose.disconnect();
}

exports.setConnection = setConnection;
exports.getDbConnection = getDbConnection;
exports.dc = dc;
exports.updateUser = updateUser;
exports.deleteUser = deleteUser;
exports.addUser = addUser;
exports.getUsers = getUsers;
exports.testing = testing;
