const { MongoClient } = require("mongodb");
const assert = require("assert");
require("dotenv").config();
const { MONGO_URI } = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const createGreeting = async (req, res) => {
  try {
    const client = await MongoClient(MONGO_URI, options);

    await client.connect();

    const db = client.db("exercise_1");

    const result = await db.collection("greetings").insertOne(req.body);
    assert.equal(1, result.insertedCount);

    if (result) {
      res.status(201).json({ status: 201, message: "bon" });
    }
  } catch (err) {
    console.log(err.stack);
    res.status(500).json({ status: 500, data: req.body, message: err.message });
  }
  client.close();
  console.log("disconnected!");
};

const getGreeting = async (req, res) => {
  const client = await MongoClient(MONGO_URI, options);
  await client.connect();
  const db = client.db("exercise_1");

  const _id = req.params._id;
  //   console.log(_id);

  db.collection("greetings").findOne({ _id }, (err, result) => {
    result
      ? res.status(200).json({ status: 200, _id, data: result })
      : res.status(404).json({ status: 404, _id, data: "Not Found" });
    client.close();
  });
};

const getGreetings = async (req, res) => {
  const client = await MongoClient(MONGO_URI, options);
  await client.connect();
  console.log("Connected");
  const db = client.db("exercise_1");
  const greetings = await db.collection("greetings").find().toArray();
  const params = req.query;
  const greetingLimit = Number(params.start) + Number(params.limit);

  twentyfiveGreetings = greetings.slice(params.start, greetingLimit);

  if (twentyfiveGreetings) {
    res.status(200).json({ status: 200, data: twentyfiveGreetings });
  } else {
    res.status(400).json({ status: 404, error: "Data not found" });
  }
  client.close();
  console.log("disconnected!");
};

const deleteGreeting = async (req, res) => {
  const { _id } = req.params;

  const client = await MongoClient(MONGO_URI, options);
  await client.connect();
  console.log("Connected");

  const db = client.db("exercise_1");

  try {
    const results = await db.collection("greetings").deleteOne({ _id: _id });
    res.status(200).json({ status: 200, data: _id });
  } catch {
    res.status(400).json({ status: 400, message: "unfound" });
  }
  client.close();
};

const updateGreeting = async (req, res) => {
  const { _id } = req.params;
  const { hello } = req.body;
  console.log({ idandhello: _id, hello });

  const client = await MongoClient(MONGO_URI, options);
  await client.connect();

  const db = client.db("exercise_1");

  if (!hello) {
    res
      .status(400)
      .json({ status: 400, data: req.body, message: "ONLY HELLO SORRY" });
    return;
  }

  try {
    await client.connect();
    const query = { _id };
    const newValue = { $set: { hello } };
    const result = await db.collection("greetings").updateOne(query, newValue);
    assert.equal(1, result.matchedCount);
    assert.equal(1, result.modifiedCount);
    res.status(200).json({ status: 200, _id });
  } catch (err) {
    console.log(err.stack);
    res.status(500).json({ status: 500, data: req.body, message: err.message });
  }
  client.close();
};

module.exports = {
  createGreeting,
  getGreeting,
  getGreetings,
  deleteGreeting,
  updateGreeting,
};
