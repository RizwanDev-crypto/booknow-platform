import { NextResponse } from 'next/server';
import redis from '@/lib/redis';

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

    // 2. If not in Redis, fetch from "Database" (Mocking here)
    console.log('Cache MISS - Fetching from DB');
    const tours = [
      { id: 1, title: 'Beautiful Paris', price: 1200 },
      { id: 2, title: 'Sunny Dubai', price: 800 },
      { id: 3, title: 'Historic Rome', price: 950 },
    ];

    // Simulate DB delay
    await new Promise((resolve) => setTimeout(resolve, 500));

    // 3. Store in Redis for next time (Cache for 1 hour)
    await redis.set(CACHE_KEY, JSON.stringify(tours), 'EX', 3600);

    return NextResponse.json(tours, {
      headers: { 'X-Cache': 'MISS' },
    });
  } catch (error) {
    console.error('Redis error:', error);
    // Fallback to "DB" if Redis fails
    const tours = [
      { id: 1, title: 'Beautiful Paris', price: 1200 },
      { id: 2, title: 'Sunny Dubai', price: 800 },
      { id: 3, title: 'Historic Rome', price: 950 },
    ];
    return NextResponse.json(tours);
  }
}
