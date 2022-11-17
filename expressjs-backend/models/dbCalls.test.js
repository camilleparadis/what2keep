// import {  } from "./index";
const myFunctions = require("./dbCalls");

var email;
var password;
var name;
var email2;
var password2;
var name2;
beforeAll(() => {
  email = "test@email.com";
  password = "passphrase";
  name = "Tim2";
  email2 = "test2@email.com";
  password2 = "secret";
  name2 = "Tester2";
});

// test("Testing portfolio -- create empty portfolio", () => {
//   expect(portfolio.currentPortfolio).toEqual({});
// });

test("Testing testing", async () => {
  const res = await myFunctions.testing();
  expect(res).toBe(true);
});

test("Testing registration", async () => {
  const res = await myFunctions.testing();
  expect(res).toBe(true);
});

test("Testing login", async () => {
  const res = await myFunctions.testing();
  expect(res).toBe(true);
});

// User tests
test("Testing add an user", async () => {
  // C
  const result = await myFunctions.addUser(email, password, name);
  expect(result).toEqual(expect.objectContaining({ email, password, name }));
});

test("Testing add an user with failure", async () => {
  // C
  // const result = await myFunctions.addUser();
  // expect(result).toEqual(expect.objectContaining({ email, password, name }));
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
  // const res = await myFunctions.getUsers("xxfakeUserIdxx");
  // expect(res).toEqual(false);

  // expect(async () => {
  //   await myFunctions.getUsers("xxfakeUserIdxx");
  // }).toThrow();

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
  expect(res[4]).toEqual(expect.objectContaining({ email, password, name })); // TODO: make dynamic to always get the end one?
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
    expect(error).toEqual(new Error("BadUpdateException"));
  }
});

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

test("Testing add an item", async () => {
  // add the item

  // then get it
  const res = await myFunctions.testing();
  expect(res).toBe(true);
});

test("Testing update an item", async () => {
  // update the item

  // get the item
  const res = await myFunctions.testing();
  expect(res).toBe(true);
});

test("Testing delete an item", async () => {
  // delete the item

  // try to get the item (and fail)
  const res = await myFunctions.testing();
  expect(res).toBe(true);
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
