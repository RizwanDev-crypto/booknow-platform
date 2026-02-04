import { NextResponse } from 'next/server';
import headerData from '@/data/headerData.json';

export async function GET() {
  try {
    return NextResponse.json(headerData);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch header data' }, { status: 500 });
  }
}
