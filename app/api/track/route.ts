import { NextRequest, NextResponse } from 'next/server';
import { getOrderById, getOrdersByPhone } from '@/src/lib/db';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('query')?.trim();

    if (!query) {
      return NextResponse.json(
        { success: false, error: 'Query parameter (Order ID or Mobile Number) is required' },
        { status: 400 }
      );
    }

    // Try finding by Order ID first
    const orderById = getOrderById(query);
    if (orderById) {
      return NextResponse.json({
        success: true,
        matchType: 'order_id',
        orders: [orderById],
      });
    }

    // Try finding by Phone Number
    const ordersByPhone = getOrdersByPhone(query);
    if (ordersByPhone.length > 0) {
      return NextResponse.json({
        success: true,
        matchType: 'phone',
        orders: ordersByPhone,
      });
    }

    return NextResponse.json(
      { success: false, error: `No active orders found matching "${query}". Please check your Order ID or phone number.` },
      { status: 404 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || 'Server error' },
      { status: 500 }
    );
  }
}

