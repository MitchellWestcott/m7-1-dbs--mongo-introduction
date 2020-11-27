const { MongoClient } = require("mongodb");
const assert = require("assert");
require("dotenv").config();
const { MONGO_URI } = process.env;
const fs = require("file-system");

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const greetings = JSON.parse(fs.readFileSync("data/greetings.json"));

const batchImport = async () => {
  //   console.log(greetings);
  try {
    const client = await MongoClient(MONGO_URI, options);
    await client.connect();

    const db = client.db("exercise_1");

    const result = await db.collection("greetings").insertMany(greetings);
    assert.equal(1, result.insertedCount);
    if (result) {
      console.log("success");
    }
  } catch (err) {
    console.log(err);
  }
  client.close();
  console.log("disconnected!");
};

batchImport();
