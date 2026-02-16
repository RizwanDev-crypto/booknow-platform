import { NextResponse } from 'next/server';
import { tours } from '@/app/tour-results/toursData';

export async function GET() {
  try {
    // Return tours data directly, bypassing Redis
    return NextResponse.json(tours);
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json(tours); // Fallback
  }
}
