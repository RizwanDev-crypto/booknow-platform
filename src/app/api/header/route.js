import { NextResponse } from 'next/server';

const headerData = {
  "languages": [
    "English",
    "Arabic",
    "Turkish",
    "Russian",
    "French",
    "Chinese",
    "Germany"
  ],
  "currencies": [
    { "code": "USD", "name": "United States" },
    { "code": "GBP", "name": "United Kingdom" },
    { "code": "SAR", "name": "Saudi Arabia" },
    { "code": "EUR", "name": "European Union" },
    { "code": "NGN", "name": "Nigeria" }
  ]
};

export async function GET() {
  try {
    return NextResponse.json(headerData);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch header data' }, { status: 500 });
  }
}
