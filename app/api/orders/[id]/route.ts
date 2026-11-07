import { NextRequest, NextResponse } from 'next/server';
import { getOrderById, updateOrderStatus, OrderStatus } from '@/src/lib/db';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const order = getOrderById(id);

    if (!order) {
      return NextResponse.json(
        { success: false, error: `Order #${id} not found` },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      order,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || 'Server error' },
      { status: 500 }
    );
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { status, message } = body as { status: OrderStatus; message?: string };

    const validStatuses: OrderStatus[] = ['placed', 'confirmed', 'processing', 'shipped', 'delivered'];
    if (!validStatuses.includes(status)) {
      return NextResponse.json(
        { success: false, error: `Invalid status '${status}'. Must be one of: ${validStatuses.join(', ')}` },
        { status: 400 }
      );
    }

    const updated = updateOrderStatus(id, status, message);
    if (!updated) {
      return NextResponse.json(
        { success: false, error: `Order #${id} not found` },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      order: updated,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || 'Server error' },
      { status: 500 }
    );
  }
}

