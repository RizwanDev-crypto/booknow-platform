import Redis from 'ioredis';

const redisClientSingleton = () => {
  return new Redis(process.env.REDIS_URL || 'redis://localhost:6379');
};

const globalForRedis = globalThis;

const redis = globalForRedis.redis ?? redisClientSingleton();

export default redis;

if (process.env.NODE_ENV !== 'production') globalForRedis.redis = redis;
