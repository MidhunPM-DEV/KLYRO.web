import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

function getOrdersFilePath() {
  // Check root data/orders.json
  const rootPath = path.resolve(process.cwd(), '..', 'data', 'orders.json');
  if (fs.existsSync(rootPath)) return rootPath;
  const directPath = path.resolve(process.cwd(), 'data', 'orders.json');
  return directPath;
}

export async function GET() {
  try {
    const filePath = getOrdersFilePath();
    if (!fs.existsSync(filePath)) {
      return NextResponse.json({ success: true, orders: [] });
    }
    const raw = fs.readFileSync(filePath, 'utf8');
    const orders = JSON.parse(raw);
    return NextResponse.json({
      success: true,
      total: orders.length,
      orders,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to fetch orders' },
      { status: 500 }
    );
  }
}

