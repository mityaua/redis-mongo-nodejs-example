const redis = require("redis");

const redisClient = redis.createClient({
  password: process.env.REDIS_PASSWORD,
  socket: {
    host: process.env.REDIS_HOSTNAME,
    port: process.env.REDIS_PORT,
  },
});

const redisConnection = async () => {
  try {
    await redisClient.connect();
  } catch (error) {
    console.error(`Redis connection error. Error message: ${error.message}`);
  }
};

module.exports = { redisConnection, redisClient };
