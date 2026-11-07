'use client';

import { useState, useEffect } from 'react';
import AdminSidebar from './AdminSidebar';
import AdminHeader from './AdminHeader';
import DashboardHome from './tabs/DashboardHome';
import OrdersTab from './tabs/OrdersTab';
import ProductsTab from './tabs/ProductsTab';
import InquiriesTab from './tabs/InquiriesTab';
import SubscribersTab from './tabs/SubscribersTab';
import SettingsTab from './tabs/SettingsTab';
import { Order, OrderStatus } from '@/src/lib/db';
import { Product } from '@/src/types';

export interface Inquiry {
  id: string;
  name: string;
  phone: string;
  email?: string;
  message: string;
  type: string;
  createdAt: string;
}

export interface Subscriber {
  email: string;
  subscribedAt: string;
}

export default function AdminDashboard() {
  const [currentTab, setCurrentTab] = useState('dashboard');
  const [orders, setOrders] = useState<Order[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchOrders = async () => {
    try {
      const res = await fetch('/api/orders');
      const data = await res.json();
      if (res.ok && data.success) setOrders(data.orders);
    } catch (e) { console.error(e); }
  };

  // Fetch products from backend (reflects add/delete)
  const fetchProducts = async () => {
    try {
      const res = await fetch('/api/products?limit=200');
      const data = await res.json();
      if (res.ok && data.success) setProducts(data.products);
    } catch (e) { console.error(e); }
  };

  const fetchInquiries = async () => {
    try {
      const res = await fetch('/api/inquiries');
      const data = await res.json();
      if (res.ok && data.success) setInquiries(data.inquiries);
    } catch (e) { console.error(e); }
  };

  const fetchSubscribers = async () => {
    try {
      const res = await fetch('/api/subscribers');
      const data = await res.json();
      if (res.ok && data.success) setSubscribers(data.subscribers);
    } catch (e) { console.error(e); }
  };

  const fetchAll = async () => {
    await Promise.all([fetchOrders(), fetchProducts(), fetchInquiries(), fetchSubscribers()]);
    setLoading(false);
    setRefreshing(false);
  };

  useEffect(() => { fetchAll(); }, []);

  const handleRefresh = () => { setRefreshing(true); fetchAll(); };

  const handleStatusUpdate = async (orderId: string, newStatus: OrderStatus, note?: string) => {
    try {
      const res = await fetch(`/api/orders/${orderId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus, message: note }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setOrders((prev) => prev.map((o) => (o.id === orderId ? data.order : o)));
      }
    } catch (err) { console.error(err); }
  };

  const pendingCount = orders.filter((o) => o.status === 'placed').length;

  return (
    <div className="flex min-h-screen bg-[#F7F8F6]">
      <AdminSidebar
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
        pendingCount={pendingCount}
      />

      <div className="flex-1 flex flex-col min-w-0">
        <AdminHeader refreshing={refreshing} onRefresh={handleRefresh} />

        <main className="flex-1 p-6 overflow-y-auto">
          {loading ? (
            <div className="flex items-center justify-center py-32">
              <div className="flex flex-col items-center gap-3">
                <div className="h-10 w-10 rounded-full border-4 border-[#005E23] border-t-transparent animate-spin" />
                <p className="text-sm font-semibold text-[#777777]">Loading workspace...</p>
              </div>
            </div>
          ) : (
            <>
              {currentTab === 'dashboard' && (
                <DashboardHome
                  orders={orders}
                  products={products}
                  inquiriesCount={inquiries.length}
                  subscribersCount={subscribers.length}
                  onTabChange={setCurrentTab}
                  onStatusUpdate={handleStatusUpdate}
                />
              )}
              {currentTab === 'orders' && (
                <OrdersTab orders={orders} onStatusUpdate={handleStatusUpdate} />
              )}
              {currentTab === 'products' && (
                <ProductsTab
                  products={products}
                  onProductsChange={setProducts}
                />
              )}
              {currentTab === 'inquiries' && (
                <InquiriesTab inquiries={inquiries} />
              )}
              {currentTab === 'subscribers' && (
                <SubscribersTab subscribers={subscribers} />
              )}
              {currentTab === 'settings' && (
                <SettingsTab />
              )}
            </>
          )}
        </main>
      </div>
    </div>
  );
}
