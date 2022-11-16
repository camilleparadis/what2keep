// import {  } from "./index";
const myFunctions = require("./dbCalls");

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

test("Testing add an user", async () => {
  // add the item
  const email = "test@email.com";
  const password = "passphrase";
  const name = "Tim";
  const result = await myFunctions.addUser(email, password, name);
  expect(result).toEqual({ email, password, name });
  // TODO: delete user after so the test can be run again
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
