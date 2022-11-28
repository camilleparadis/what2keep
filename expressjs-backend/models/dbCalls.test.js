// import {  } from "./index";
const myFunctions = require("./dbCalls");
const { MongoMemoryServer } = require("mongodb-memory-server");
const UserSchema = require("./User");
const mongoose = require("mongoose");

let mongoServer;
let conn;
let userModel;

var email;
var password;
var name;
var email2;
var password2;
var name2;
// beforeAll(() => {
//   email = "test@email.com";
//   password = "passphrase";
//   name = "Tim2";
//   email2 = "test2@email.com";
//   password2 = "secret";
//   name2 = "Tester2";
// });

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();

  const mongooseOpts = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };

  conn = await mongoose.createConnection(uri, mongooseOpts);

  userModel = conn.model("User", UserSchema);

  myFunctions.setConnection(conn);

  email = "test@email.com";
  password = "passphrase";
  name = "Tim2";
  email2 = "test2@email.com";
  password2 = "secret";
  name2 = "Tester2";
});

afterAll(async () => {
  await conn.dropDatabase();
  await conn.close();
  await mongoServer.stop();
});

// test("Testing portfolio -- create empty portfolio", () => {
//   expect(portfolio.currentPortfolio).toEqual({});
// });

// test("Testing testing", async () => {
//   const res = await myFunctions.testing();
//   expect(res).toBe(true);
// });

// test("Testing registration", async () => {
//   const res = await myFunctions.testing();
//   expect(res).toBe(true);
// });

// test("Testing login", async () => {
//   const res = await myFunctions.testing();
//   expect(res).toBe(true);
// });

test("Testing get all users when there are none", async () => {
  // R
  try {
    await myFunctions.getUsers();
  } catch (error) {
    expect(error).toEqual(new Error("NoUsersFoundException"));
  }
});

// User tests
test("Testing add an user", async () => {
  // C
  const result = await myFunctions.addUser(email, password, name);
  expect(result).toEqual(expect.objectContaining({ email, password, name }));
});

test("Testing add an user with failure", async () => {
  // C
  try {
    await myFunctions.addUser();
  } catch (error) {
    expect(error).toEqual(new Error("AddUserError"));
  }
});

test("Testing add user 2", async () => {
  // C
  // add the item
  const result = await myFunctions.addUser(email2, password2, name2);
  expect(result).toEqual(
    expect.objectContaining({
      email: email2,
      password: password2,
      name: name2,
    }),
  );
});

test("Testing get an user that exists by email", async () => {
  // R
  const res = await myFunctions.getUsers(undefined, email);
  expect(res).toEqual(expect.objectContaining({ email, password, name }));
});

test("Testing get a user that exists by id", async () => {
  // R
  const start = await myFunctions.getUsers(undefined, email2);
  const res = await myFunctions.getUsers(start._id, undefined);
  expect(res).toEqual(
    expect.objectContaining({
      email: email2,
      password: password2,
      name: name2,
    }),
  );
});

test("Testing get an user that DOESN'T exists by id", async () => {
  // R
  // async await way to test for exceptions
  try {
    await myFunctions.getUsers("xxfakeUserIdxx");
  } catch (error) {
    expect(error).toEqual(new Error("UserIdNotFoundException"));
  }
});

test("Testing get an user that DOESN'T exists by email", async () => {
  // R
  // async await way to test for exceptions
  try {
    await myFunctions.getUsers(undefined, "xxfakeUserIdxx");
  } catch (error) {
    expect(error).toEqual(new Error("UserEmailNotFoundException"));
  }
});

test("Testing get all users", async () => {
  // R
  const res = await myFunctions.getUsers();
  expect(res[0]).toEqual(expect.objectContaining({ email, password, name })); // TODO: make dynamic to always get the end one?
});

//TODO: test where there are no users

test("Testing update an user", async () => {
  // U
  // need to get the id first
  const start = await myFunctions.getUsers(undefined, email);
  const res = await myFunctions.updateUser(
    start._id,
    undefined,
    "password",
    undefined,
  );
  expect(res).toEqual(
    expect.objectContaining({
      acknowledged: true,
      matchedCount: 1,
      modifiedCount: 1,
    }),
  );
});

test("Testing update a user that DOESN'T exists", async () => {
  // U
  // async await way to test for exceptions
  try {
    await myFunctions.updateUser(
      "xxfakeUserIdxx",
      undefined,
      "password",
      undefined,
    );
  } catch (error) {
    expect(error).toEqual(new Error("BadUserUpdateException"));
  }
});

// -------------------------------------- ITEMS --------------------------------------

// C
test("Testing add an item", async () => {
  // add the item
  // need to get the id first
  const start = await myFunctions.getUsers(undefined, email);
  const res = await myFunctions.addItem(
    start._id,
    "cooking", //category
    "home", // location
    "frying pan", // info
    "stand in for image", // image
  );
  expect(res).toEqual(
    expect.objectContaining({
      userId: start.id,
      category: "cooking",
      location: "home",
      info: "frying pan",
      image: "stand in for image",
    }),
  );
});

// C
test("Testing add an item failure", async () => {
  try {
    // add the item
    // need to get the id first
    const start = await myFunctions.getUsers(undefined, email);
    await myFunctions.addItem(start._id);
  } catch (error) {
    expect(error).toEqual(new Error("AddItemError"));
  }
});

// R
test("Testing read all items from user 1", async () => {
  // read the item
  // need to get the id first
  const start = await myFunctions.getUsers(undefined, email);
  const res = await myFunctions.getItem(start._id, undefined);
  expect(res[0]).toEqual(
    expect.objectContaining({
      userId: start.id,
      category: "cooking",
      location: "home",
      info: "frying pan",
      image: "stand in for image",
    }),
  );
});

// R
test("Testing read all items from user 2 which has none so fails", async () => {
  try {
    // read the item
    // need to get the id first
    const start = await myFunctions.getUsers(undefined, email2);
    await myFunctions.getItem(start._id, undefined);
  } catch (error) {
    expect(error).toEqual(new Error("NoItemsFoundException"));
  }
});

// R
test("Testing read a nonexistant item", async () => {
  try {
    // read the item
    // need to get the id first
    const start = await myFunctions.getUsers(undefined, email);
    await myFunctions.getItem(start._id, "unrealItem5");
  } catch (error) {
    expect(error).toEqual(new Error("ItemNotFoundException"));
  }
});

// R
test("Testing read a specific item", async () => {
  // update the item
  // to get a specific item need the itemId, and the way to get that is to have the item
  //  the way to do this is to get all the items and use that to get an id to then check from there
  //  (this should be the way it is executed in the app)
  const start = await myFunctions.getUsers(undefined, email);
  const item = (await myFunctions.getItem(start._id, undefined))[0];
  const res = await myFunctions.getItem(start._id, item._id);
  expect(res).toEqual(item);
});

// U
test("Testing update an item", async () => {
  // update the item
  // also need the item id (see test reading a specific item)
  const start = await myFunctions.getUsers(undefined, email);
  const item = (await myFunctions.getItem(start._id, undefined))[0];
  const res = await myFunctions.updateItem(
    start._id,
    item._id,
    "kitchen",
    undefined,
    undefined,
    "testing another change",
  );

  expect(res).toEqual(
    expect.objectContaining({
      acknowledged: true,
      matchedCount: 1,
      modifiedCount: 1,
      upsertedCount: 0,
      upsertedId: null,
    }),
  );
});

// U
test("Testing update a nonexistant item", async () => {
  try {
    // need to get the id first
    const start = await myFunctions.getUsers(undefined, email);
    const item = (await myFunctions.getItem(start._id, undefined))[0];
    const res = await myFunctions.updateItem(start._id, "unrealItem5");
  } catch (error) {
    expect(error).toEqual(new Error("BadItemUpdateException"));
  }
});

// D
test("Testing deleting a nonexistant item", async () => {
  try {
    // need to get the id first
    const start = await myFunctions.getUsers(undefined, email);
    const res = await myFunctions.deleteItem(start._id, "unrealItem5");
  } catch (error) {
    expect(error).toEqual(new Error("DeleteItemException"));
  }
});

// D
test("Testing delete an item", async () => {
  // delete the item
  // also need the item id (see test reading a specific item)
  const start = await myFunctions.getUsers(undefined, email);
  const item = (await myFunctions.getItem(start._id, undefined))[0];
  const res = await myFunctions.deleteItem(start._id, item._id);
  expect(res).toEqual(
    expect.objectContaining({
      acknowledged: true,
      deletedCount: 1,
    }),
  );
});

// -----------------------------------------------------------------------------------

test("Testing delete an user by email", async () => {
  // D
  const res = await myFunctions.deleteUser(undefined, email);
  expect(res).toEqual(
    expect.objectContaining({
      acknowledged: true,
      deletedCount: 1,
    }),
  );
});

test("Testing delete an user by email that DOESN'T EXIST", async () => {
  // D
  // async await way to test for exceptions
  try {
    await myFunctions.deleteUser(undefined, email);
  } catch (error) {
    expect(error).toEqual(new Error("DeleteUserException"));
  }
});

test("Testing delete a user by id", async () => {
  // U
  // need to get the id first
  const start = await myFunctions.getUsers(undefined, email2);
  const res = await myFunctions.deleteUser(start._id, undefined);
  expect(res).toEqual(
    expect.objectContaining({
      acknowledged: true,
      deletedCount: 1,
    }),
  );
});

test("Testing delete an user by id that DOESN'T EXIST", async () => {
  // D
  // async await way to test for exceptions
  try {
    await myFunctions.deleteUser("undefined", undefined);
  } catch (error) {
    expect(error).toEqual(new Error("DeleteUserException"));
  }
});

test("Testing add an IMAGE", async () => {
  // upload the image

  // get the image
  const res = await myFunctions.testing();
  expect(res).toBe(true);
});

test("Testing update an IMAGE", async () => {
  // change the image

  // get the changed image
  const res = await myFunctions.testing();
  expect(res).toBe(true);
});

test("Testing delete an IMAGE", async () => {
  // delete the image

  // try to get the image (and fail)
  const res = await myFunctions.testing();
  expect(res).toBe(true);
});

afterAll(() => {
  return myFunctions.dc();
});
