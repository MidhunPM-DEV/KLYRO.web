import { NextRequest, NextResponse } from 'next/server';

const BACKEND = 'http://localhost:5001';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const qs = searchParams.toString();
    const res = await fetch(`${BACKEND}/api/products${qs ? `?${qs}` : ''}`, {
      cache: 'no-store',
    });
    const data = await res.json();
    return NextResponse.json(data, { status: res.status });
  } catch {
    // Fallback to static data if backend is offline
    const { products } = await import('@/src/data/products');
    const { searchParams } = new URL(request.url);
    let result = [...products];
    const category = searchParams.get('category');
    const limit = searchParams.get('limit');
    if (category && category !== 'all') {
      result = result.filter((p) => p.categorySlug === category);
    }
    if (limit) {
      const l = parseInt(limit, 10);
      if (!isNaN(l)) result = result.slice(0, l);
    }
    return NextResponse.json({ success: true, total: result.length, products: result });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const res = await fetch(`${BACKEND}/api/products`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
    const data = await res.json();
    return NextResponse.json(data, { status: res.status });
  } catch (e: any) {
    return NextResponse.json({ success: false, error: e.message }, { status: 500 });
  }
}
