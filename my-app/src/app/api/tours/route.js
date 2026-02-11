import { NextResponse } from 'next/server';
import redis from '@/lib/redis';
import { tours } from '@/app/tour-results/toursData';

export async function GET() {
  const CACHE_KEY = 'tours_data';

  try {
    // 1. Try to get data from Redis
    const cachedData = await redis.get(CACHE_KEY);

    if (cachedData) {
      console.log('Serving from Redis cache');
      return NextResponse.json(JSON.parse(cachedData), {
        headers: { 'X-Cache': 'HIT' },
      });
    }

    // 2. If not in Redis, use tours data
    console.log('Cache MISS - Fetching from Data');

    // Simulate slight delay (as if fetching from DB)
    await new Promise((resolve) => setTimeout(resolve, 200));

    // 3. Store in Redis for next time (Cache for 1 hour)
    await redis.set(CACHE_KEY, JSON.stringify(tours), 'EX', 3600);

    return NextResponse.json(tours, {
      headers: { 'X-Cache': 'MISS' },
    });
  } catch (error) {
    console.error('Redis error:', error);
    // Fallback to tours data if Redis fails
    return NextResponse.json(tours);
  }
}
