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

// C
// create an item for a given user
app.post("/user-items", async (req, res) => {
  const { userId, category, location, info, image, name, usage } = req.body;
  if (userId === undefined) {
    // if there was an error and the user isn't signed in
    res.status(401).end(); /// may not be necessary
  } else {
    // user signed in so add the new item
    try {
      if (
        await dbCalls.addItem(
          userId,
          category,
          location,
          info,
          image,
          name,
          usage,
        )
      ) {
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

// C
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
      res.send(m._id).status(204).end();
    } else {
      res.status(400).end();
    }
  } catch (error) {
    res.status(400).end();
  }
});

// R
// read from the current users
app.get("/users/:email", async (req, res) => {
  // console.log("trying to get all users");
  // const { userId } = req.body;
  const email = req.params["email"];
  try {
    const result = await dbCalls.getUsers(undefined, email);
    res.send(result._id).status(200).end();
  } catch (error) {
    res.status(404).end();
  }
});

// R
// read the items of a given user (or all )
app.get(
  "/user-items/:userId/:itemId?/:usageUpTo?/:category?",
  async (req, res) => {
    // const { userId, itemId } = req.body;
    const userId = req.params["userId"];
    const itemId = req.params["itemId"];
    const usageUpTo = req.params["usageUpTo"];
    const category = req.params["category"];
    // console.log("userId: " + userId);
    // console.log("itemId: " + itemId);
    // console.log("usageUpTo: " + usageUpTo);
    // console.log("category: " + category);

    if (usageUpTo != undefined && usageUpTo != "undefined") {
      // console.log("usage query");
      // if querying based on useage
      try {
        const result = await dbCalls.queryItems(userId, usageUpTo);
        res.send(result).status(200).end();
      } catch (error) {
        res.status(404).end();
      }
    } else if (category != undefined && category != "undefined") {
      // console.log("category query");
      // if getting all items from a category
      try {
        const result = await dbCalls.inCategoryItems(userId, category);
        res.send(result).status(200).end();
      } catch (error) {
        res.status(404).end();
      }
    } else {
      // reading a specific item OR all for a user depending on
      //  if itemId was supplied
      try {
        const result = await dbCalls.getItem(userId, itemId);
        res.send(result).status(200).end();
      } catch (error) {
        res.status(404).end();
      }
    }
  },
);

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

// U
// update a particular item
app.patch("/user-items", async (req, res) => {
  const { userId, itemId, category, location, info, image, name, usage } =
    req.body;
  if (userId === undefined) {
    // if there was an error and the user isn't signed in
    res.status(401).end();
  } else {
    // user signed in so modify the item
    try {
      await dbCalls.updateItem(
        userId,
        itemId,
        category,
        location,
        info,
        image,
        name,
        usage,
      );
      res.status(204).end();
    } catch (error) {
      res.status(400).end();
    }
  }
});

// U
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

// D
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

// D
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
