const { MongoClient, ServerApiVersion } = require("mongodb");
const URI = process.env.DB_HOST;

const mongoClient = new MongoClient(URI, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

const mongoConnection = async () => {
  try {
    await mongoClient.connect();
  } catch (error) {
    console.error(`Mongo connection error. Error message: ${error.message}`);
  }
};

// SIGINT (ctrl + C)
process.on("SIGINT", async () => {
  console.info("\x1b[36m%s\x1b[0m", "Connection for Mongo disconnected and app terminated");
  process.exit(1);
});

module.exports = { mongoConnection, mongoClient };
