const { MongoClient } = require("mongodb");

require("dotenv").config();
const { MONGO_URI } = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const getUsers = async (req, res) => {
  const client = await MongoClient(MONGO_URI, options);
  await client.connect();
  console.log("Connected");
  const db = client.db("exercise_1");
  const users = await db.collection("users").find().toArray();

  if (users) {
    res.status(200).json({ status: 200, data: users });
  } else {
    res.status(400).json({ status: 404, error: "Data not found" });
  }
  client.close();
  console.log("disconnected!");
};

module.exports = { getUsers };
