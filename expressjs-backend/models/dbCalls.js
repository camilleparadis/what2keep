const User = require('./User');
const Item = require('./Item');
const { MongoClient, ServerApiVersion } = require('mongodb');


const uri = "mongodb+srv://What2Keep:<password>@cluster0.vasn2wv.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
client.connect(err => {
  const collection = client.db("test").collection("devices");
  // perform actions on the collection object
  client.close();
});

async function testing() {
  return true;
}

// async function registerUser(user) {
//   return true;
// }

// ///
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

exports.testing = testing;
