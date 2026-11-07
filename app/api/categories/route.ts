import { NextResponse } from 'next/server';
import { categories } from '@/src/data/products';

export async function GET() {
  return NextResponse.json({
    success: true,
    total: categories.length,
    categories,
  });
}

