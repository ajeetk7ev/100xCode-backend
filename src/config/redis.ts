import { Redis } from 'ioredis';
import env from './env.ts';
import logger from './logger.ts';

const redisConfig: any = {
  host: env.REDIS_HOST || "127.0.0.1",
  port:env.REDIS_PORT || "6379",
  maxRetriesPerRequest: null,
};

if (process.env.REDIS_PASSWORD) {
  redisConfig.password = env.REDIS_PASSWORD;
}

export const redis = new Redis(redisConfig)


redis.on("connecting", () => {
   logger.info("Redis connected");
})

redis.on("connect", () => {
   logger.info("Redis connected");
})

redis.on("error", (error) => {
    logger.info("Redis Error", error);
})

redis.on("ready", () => {
  logger.info("Redis is ready");
});