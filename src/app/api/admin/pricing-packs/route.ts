import { NextResponse } from 'next/server';

const API_URL = process.env.NEXT_PUBLIC_API_URL!;

export async function GET() {
  try {
    const res = await fetch(`${API_URL}/admin/pricing-packs`, {
      headers: { 'Accept': 'application/json' },
      cache: 'no-store',
    });
    
    const data = await res.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json({ error: 'Failed' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const res = await fetch(`${API_URL}/admin/pricing-packs`, {
      method: 'POST',
      headers: { 
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });
    
    const data = await res.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: 'Failed' }, { status: 500 });
  }
}