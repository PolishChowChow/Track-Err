import { createClient } from "redis";

const redisClient = createClient({
  username: "default",
  password: process.env.REDIS_PASSWORD,
  socket: {
    host: process.env.REDIS_HOST,
    port: 17082,
  },
});
await redisClient.connect();
redisClient.on("error", (err) => console.error("Redis Client Error", err));

export default redisClient;
