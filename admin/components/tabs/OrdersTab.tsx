'use client';

import { Order, OrderStatus } from '@/src/lib/db';
import OrdersTable from '../OrdersTable';

interface Props {
  orders: Order[];
  onStatusUpdate: (id: string, status: OrderStatus, note?: string) => Promise<void>;
}

export default function OrdersTab({ orders, onStatusUpdate }: Props) {
  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-2xl font-black text-gray-900">Orders</h1>
        <p className="text-sm text-gray-500 mt-1">
          {orders.length} total orders — update status and contact customers via WhatsApp.
        </p>
      </div>
      <div className="rounded-2xl bg-white border border-gray-100 shadow-sm p-4">
        <OrdersTable orders={orders} onStatusUpdate={onStatusUpdate} />
      </div>
    </div>
  );
}
