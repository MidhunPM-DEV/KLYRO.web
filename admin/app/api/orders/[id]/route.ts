import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

function getOrdersFilePath() {
  const rootPath = path.resolve(process.cwd(), '..', 'data', 'orders.json');
  if (fs.existsSync(rootPath)) return rootPath;
  const directPath = path.resolve(process.cwd(), 'data', 'orders.json');
  return directPath;
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const filePath = getOrdersFilePath();
    if (!fs.existsSync(filePath)) {
      return NextResponse.json({ success: false, error: 'Order not found' }, { status: 404 });
    }
    const orders = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    const order = orders.find((o: any) => o.id.toUpperCase() === id.toUpperCase());
    if (!order) {
      return NextResponse.json({ success: false, error: 'Order not found' }, { status: 404 });
    }
    return NextResponse.json({ success: true, order });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { status, message } = body;

    const filePath = getOrdersFilePath();
    if (!fs.existsSync(filePath)) {
      return NextResponse.json({ success: false, error: 'Order not found' }, { status: 404 });
    }

    const orders = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    const order = orders.find((o: any) => o.id.toUpperCase() === id.toUpperCase());
    if (!order) {
      return NextResponse.json({ success: false, error: 'Order not found' }, { status: 404 });
    }

    order.status = status;
    if (!order.statusHistory) order.statusHistory = [];
    order.statusHistory.push({
      status,
      timestamp: new Date().toISOString(),
      message: message || `Status updated to ${status}`,
    });

    fs.writeFileSync(filePath, JSON.stringify(orders, null, 2));

    return NextResponse.json({ success: true, order });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

