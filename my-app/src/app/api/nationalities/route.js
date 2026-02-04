import { NextResponse } from 'next/server';
import nationalities from '@/data/nationalities.json';

export async function GET() {
  return NextResponse.json(nationalities);
}
