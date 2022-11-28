const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dbCalls = require("./models/dbCalls");

const app = express();
const port = 5001;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Testing more ");
});

app.listen(process.env.PORT || port, () => {
  console.log("REST API is listening.");
});

// create an item for a given user
app.post("/user-items", async (req, res) => {
  const { userId, category, location, info, image } = req.body;
  if (userId === undefined) {
    // if there was an error and the user isn't signed in
    res.status(401).end(); /// may not be necessary
  } else {
    // user signed in so add the new item
    try {
      if (await dbCalls.addItem(userId, category, location, info, image)) {
        res.status(204).end();
      } else {
        // if it failed somewhere but not an error///
        res.status(400).end();
      }
    } catch (error) {
      res.status(400).end();
    }
  }
});

// post for making a user
app.post("/users", async (req, res) => {
  const { email, password, name } = req.body;
  // const bod = req.body;
  // const email = bod.email;
  // const password = bod.password;
  // const name = bod.name;
  // add new user
  try {
    const m = await dbCalls.addUser(email, password, name);
    // console.log(m);
    if (m) {
      res
        .send("testing2: " + email + " " + password + " " + name)
        .status(204)
        .end();
    } else {
      res.status(400).end();
    }
  } catch (error) {
    res.status(400).end();
  }
});

// read all the current users
app.get("/users", async (req, res) => {
  console.log("trying to get all users");
  const { userId } = req.body;
  try {
    const result = await dbCalls.getUsers(userId);
    res.send(result).status(200).end();
  } catch (error) {
    res.status(404).end();
  }
});

// read the items of a given user
app.get("/user-items", async (req, res) => {
  const { userId, itemId } = req.body;

  // reading a specific item OR all for a user depending on
  //  if itemId was supplied
  try {
    const result = await dbCalls.getItem(userId, itemId);
    res.send(result).status(200).end();
  } catch (error) {
    res.status(404).end();
  }
});

// // read a particular item
// app.get("/user-items", async (req, res) => {
//   const { itemId } = req.query;
//   const { userId } = req.query;
//   if (userId === undefined) {
//     // if there was an error and the user isn't signed in
//     res.status(401).end();
//   } else {
//     // user signed in so get the item
//     try {
//       await dbCalls.getItem(userId, itemId);
//       res.status(204).end();
//     } catch (error) {
//       res.status(400).end();
//     }
//   }
// });

// update a particular item
app.patch("/user-items", async (req, res) => {
  const { userId, itemId, category, location, info, image } = req.body;
  if (userId === undefined) {
    // if there was an error and the user isn't signed in
    res.status(401).end();
  } else {
    // user signed in so modify the item
    try {
      await dbCalls.updateItem(userId, itemId, category, location, info, image);
      res.status(204).end();
    } catch (error) {
      res.status(400).end();
    }
  }
});

// update a particular user
app.patch("/users", async (req, res) => {
  const { userId, email, password, name } = req.body;
  if (userId === undefined) {
    // need the userId
    res.status(401).end();
  } else {
    try {
      await dbCalls.updateUser({ _id: userId }, email, password, name);
      res.status(204).end();
    } catch (error) {
      res.status(400).end();
    }
  }
});

// delete a particular user
app.delete("/users", async (req, res) => {
  const { userId } = req.body;
  if (userId === undefined) {
    // need the userId
    res.status(401).end();
  } else {
    try {
      await dbCalls.deleteUser(userId);
      res.status(204).end();
    } catch (error) {
      res.status(400).end();
    }
  }
});

// delete a particular item
app.delete("/user-items", async (req, res) => {
  const { userId, itemId } = req.body;
  if (userId === undefined) {
    // if there was an error and the user isn't signed in
    res.status(401).end();
  } else {
    // user signed in so modify the item
    try {
      await dbCalls.deleteItem(userId, itemId);
      res.status(204).end();
    } catch (error) {
      res.status(400).end();
    }
  }
});
