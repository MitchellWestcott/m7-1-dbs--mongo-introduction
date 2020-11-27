const { MongoClient } = require("mongodb");

require("dotenv").config();
const { MONGO_URI } = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const getCollection = async (dbName) => {
  const client = await MongoClient(MONGO_URI, options);
  await client.connect();
  console.log("Connected");
  const db = client.db(dbName);
  const users = await db.collection("users").find().toArray();
  console.log({ usersfromex2: users });
  client.close();
  console.log("disconnected!");
};

getCollection("exercise_1");
