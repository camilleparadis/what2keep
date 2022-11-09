const express = require('express');
// const mongoose = require('mongoose');
const cors = require('cors');
const userServices = require('./user_services');

const app = express();
// const port = 5000;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(process.env.PORT || port, () => {
  console.log("REST API is listening.");
});

// read
app.get('/user-items', async (req, res) => {
  const { userId } = req.query;
  if (userId === undefined) {
    // if there was an error and the user isn't signed in
    res.status(401).end();
  } else {
    // user signed in so send all their items
    try {
      const result = await userServices.getUserItems();
      res.send(result).status(200).end();
    } catch (error) {
      res.status(404).end();
    }
  }
});

// create
app.post('/user-items', async (req, res) => {
  const item = req.body;
  const { userId } = req.query;
  if (userId === undefined) {
    // if there was an error and the user isn't signed in
    res.status(401).end();
  } else {
    // user signed in so add the new item
    try {
      await userServices.addItem(userId, item);
      res.status(204).end();
    } catch (error) {
      res.status(400).end();
    }
  }
});
