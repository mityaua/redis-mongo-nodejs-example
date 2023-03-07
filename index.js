require("dotenv").config();
const { mongoConnection, mongoClient } = require("./mongo");
const { redisConnection, redisClient } = require("./redis");

// Get contact from Redis, or Mongo (if contact not exist). TTL = 60 seconds
const getContact = async () => {
  try {
    const collection = mongoClient.db("db-contacts").collection("contacts");

    let contact = JSON.parse(await redisClient.get("contact"));

    if (!contact) {
      contact = await collection.findOne({ name: "Dima1" });
      await redisClient.set("contact", JSON.stringify(contact), { EX: 60 });
    }

    console.table(contact);

    mongoClient.close();
    redisClient.disconnect();
  } catch (error) {
    console.error(`Error message: ${error.message}`);
  }
};

// Start server
const server = async () => {
  try {
    await mongoConnection();
    await redisConnection();

    console.log("Server is up");

    await getContact();
  } catch (err) {
    console.log(`Server not running. Error message: ${err.message}`);
  }
};

server();
