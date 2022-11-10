const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dbCalls = require('./models/dbCalls');

const app = express();
const port = 5001;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World!');
});

// app.listen(port, () => {
//   console.log(`Example app listening at http://localhost:${port}`);
// });

// create an item for a given user
app.post('/user-items', async (req, res) => {
  const item = req.body;
  const { userId } = req.query;
  if (userId === undefined) {
    // if there was an error and the user isn't signed in
    res.status(401).end();
  } else {
    // user signed in so add the new item
    try {
      await dbCalls.addItem(userId, item);
      res.status(204).end();
    } catch (error) {
      res.status(400).end();
    }
  }
});

// read the items of a given user
app.get('/user-items', async (req, res) => {
  const { userId } = req.query;
  if (userId === undefined) {
    // if there was an error and the user isn't signed in
    res.status(401).end();
  } else {
    // user signed in so send all their items
    try {
      const result = await dbCalls.getUserItems();
      res.send(result).status(200).end();
    } catch (error) {
      res.status(404).end();
    }
  }
});

// read a particular item
app.get('/user-items', async (req, res) => {
  const { itemId } = req.query;
  const { userId } = req.query;
  if (userId === undefined) {
    // if there was an error and the user isn't signed in
    res.status(401).end();
  } else {
    // user signed in so get the item
    try {
      await dbCalls.getItem(userId, itemId);
      res.status(204).end();
    } catch (error) {
      res.status(400).end();
    }
  }
});

// update a particular item
app.patch('/user-items', async (req, res) => {
  const { itemId } = req.query;
  const newItem = req.body;
  const { userId } = req.query;
  if (userId === undefined) {
    // if there was an error and the user isn't signed in
    res.status(401).end();
  } else {
    // user signed in so modify the item
    try {
      await dbCalls.updateItem(userId, itemId, newItem);
      res.status(204).end();
    } catch (error) {
      res.status(400).end();
    }
  }
});

// delete a particular item
app.patch('/user-items', async (req, res) => {
  const { itemId } = req.query;
  const { userId } = req.query;
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
