import { NextRequest, NextResponse } from 'next/server';
import { createOrder, getOrders } from '@/src/lib/db';
import { CustomerDetails, Product } from '@/src/types';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { customer, items } = body as {
      customer: CustomerDetails;
      items: {
        product: Product;
        quantity: number;
        selectedVariant?: string;
      }[];
    };

    // Validation
    if (!customer || !customer.fullName?.trim() || !customer.mobileNumber?.trim()) {
      return NextResponse.json(
        { success: false, error: 'Full name and mobile number are required' },
        { status: 400 }
      );
    }

    if (!customer.houseBuilding?.trim() || !customer.streetLocality?.trim() || !customer.city?.trim() || !customer.pinCode?.trim()) {
      return NextResponse.json(
        { success: false, error: 'Complete delivery address is required' },
        { status: 400 }
      );
    }

    if (!items || !Array.isArray(items) || items.length === 0) {
      return NextResponse.json(
        { success: false, error: 'Order must contain at least one product' },
        { status: 400 }
      );
    }

    // Create and persist order
    const { order, whatsappUrl } = createOrder({ customer, items });

    return NextResponse.json({
      success: true,
      orderId: order.id,
      order,
      whatsappUrl,
      message: `Order #${order.id} registered successfully`,
    });
  } catch (error: any) {
    console.error('Error creating order:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to create order' },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const orders = getOrders();
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

