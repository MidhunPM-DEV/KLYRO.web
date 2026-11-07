'use client';

import { useState, useEffect } from 'react';
import AdminSidebar from './AdminSidebar';
import StatsOverview from './StatsOverview';
import OrdersTable from './OrdersTable';
import ProductsManager from './ProductsManager';
import { Order, OrderStatus } from '@/src/lib/db';
import { products as localProducts, siteConfig } from '@/src/data/products';
import { RefreshCw, Bell, ShieldCheck, Mail, MessageSquare, Phone, MapPin } from 'lucide-react';

const defaultInitialOrders: Order[] = [
  {
    id: 'KLY-78241',
    createdAt: new Date().toISOString(),
    status: 'shipped',
    customer: {
      fullName: 'Sneha Nair',
      mobileNumber: '9876543210',
      email: 'sneha.nair@example.com',
      houseBuilding: 'Flat 304, Palm Grove Apartments',
      streetLocality: 'Kaloor Kadavanthra Road',
      city: 'Kochi',
      state: 'Kerala',
      pinCode: '682020',
      landmark: 'Opposite Metro Pillar 782',
    },
    items: [
      {
        productId: 'prod-1',
        name: 'Portable Mini Blender',
        price: 899,
        quantity: 1,
        variant: 'Sage Green',
        image: 'https://images.unsplash.com/photo-1570222094114-d054a817e56b?auto=format&fit=crop&w=400&q=80',
        subtotal: 899,
      },
    ],
    subtotal: 899,
    shippingFee: 0,
    totalAmount: 899,
    statusHistory: [
      {
        status: 'placed',
        timestamp: new Date().toISOString(),
        message: 'Order initiated with delivery address',
      },
      {
        status: 'confirmed',
        timestamp: new Date().toISOString(),
        message: 'Payment and delivery address confirmed by WhatsApp Support Desk',
      },
      {
        status: 'shipped',
        timestamp: new Date().toISOString(),
        message: 'Dispatched via Express Courier. BlueDart AWB #BLR92837482',
      },
    ],
  },
];

export default function AdminDashboard() {
  const [currentTab, setCurrentTab] = useState('dashboard');
  const [orders, setOrders] = useState<Order[]>(defaultInitialOrders);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  // Fetch orders from backend API
  const fetchOrders = async () => {
    try {
      const res = await fetch('/api/orders');
      const data = await res.json();
      if (res.ok && data.success) {
        setOrders(data.orders);
      }
    } catch (e) {
      console.error('Error fetching admin orders:', e);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleRefresh = () => {
    setRefreshing(true);
    fetchOrders();
  };

  const handleStatusUpdate = async (orderId: string, newStatus: OrderStatus, note?: string) => {
    try {
      const res = await fetch(`/api/orders/${orderId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus, message: note }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setOrders((prev) =>
          prev.map((o) => (o.id === orderId ? data.order : o))
        );
      } else {
        alert(data.error || 'Failed to update order status');
      }
    } catch (err) {
      console.error('Error updating status:', err);
      alert('Network error while updating status');
    }
  };

  const pendingOrdersCount = orders.filter((o) => o.status === 'placed').length;

  return (
    <div className="flex min-h-screen bg-[#F7F8F6] text-[#151515]">
      {/* Sidebar */}
      <AdminSidebar
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
        pendingOrdersCount={pendingOrdersCount}
      />

      {/* Main Admin Area */}
      <div className="flex-1 flex flex-col min-w-0">
        
        {/* Top Admin Header Bar */}
        <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-[#E8ECE6] bg-white px-6 sm:px-8">
          <div>
            <h1 className="text-base font-black text-[#151515] capitalize">
              {currentTab === 'dashboard'
                ? 'Store Overview'
                : currentTab === 'orders'
                ? 'Order Management'
                : currentTab === 'products'
                ? 'Product Inventory'
                : currentTab === 'inquiries'
                ? 'Support Tickets'
                : currentTab === 'subscribers'
                ? 'Newsletter Subscribers'
                : 'Store Configuration'}
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={handleRefresh}
              title="Refresh Data"
              className="flex h-9 w-9 items-center justify-center rounded-xl border border-[#E8ECE6] text-[#555555] hover:bg-[#F7F8F6] transition-colors"
            >
              <RefreshCw size={15} className={refreshing ? 'animate-spin text-[#005E23]' : ''} />
            </button>

            <div className="flex items-center gap-2 pl-3 border-l border-[#E8ECE6]">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#005E23] text-white text-xs font-bold">
                K
              </div>
              <div className="hidden sm:block text-left text-xs">
                <span className="font-bold text-[#151515] block">Admin Desk</span>
                <span className="text-[10px] text-[#777777] block">support@klyro.com</span>
              </div>
            </div>
          </div>
        </header>

        {/* Admin Tab Content */}
        <main className="flex-1 p-6 sm:p-8 space-y-8 max-w-7xl">
          {loading ? (
            <div className="py-20 text-center text-sm font-semibold text-[#777777]">
              Loading KLYRO admin workspace...
            </div>
          ) : (
            <>
              {/* TAB 1: DASHBOARD OVERVIEW */}
              {currentTab === 'dashboard' && (
                <div className="space-y-8">
                  <StatsOverview orders={orders} totalProductsCount={localProducts.length} />

                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <h2 className="text-sm font-bold uppercase tracking-wider text-[#151515]">
                        Recent Orders
                      </h2>
                      <button
                        type="button"
                        onClick={() => setCurrentTab('orders')}
                        className="text-xs font-bold text-[#005E23] hover:underline"
                      >
                        View All Orders &rarr;
                      </button>
                    </div>

                    <OrdersTable orders={orders} onStatusUpdate={handleStatusUpdate} />
                  </div>
                </div>
              )}

              {/* TAB 2: ORDERS MANAGEMENT */}
              {currentTab === 'orders' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-lg font-bold text-[#151515]">All Orders</h2>
                      <p className="text-xs text-[#777777]">
                        Track, update fulfillment status, and contact customers directly via WhatsApp.
                      </p>
                    </div>
                  </div>

                  <OrdersTable orders={orders} onStatusUpdate={handleStatusUpdate} />
                </div>
              )}

              {/* TAB 3: PRODUCTS & INVENTORY */}
              {currentTab === 'products' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-lg font-bold text-[#151515]">Product Inventory</h2>
                      <p className="text-xs text-[#777777]">
                        Manage stock availability, discounts, and pricing across all 17 items.
                      </p>
                    </div>
                  </div>

                  <ProductsManager initialProducts={localProducts} />
                </div>
              )}

              {/* TAB 4: INQUIRIES & SUPPORT */}
              {currentTab === 'inquiries' && (
                <div className="space-y-4">
                  <div>
                    <h2 className="text-lg font-bold text-[#151515]">Customer Inquiries</h2>
                    <p className="text-xs text-[#777777]">
                      Pre-sales questions and warranty requests received from customers.
                    </p>
                  </div>

                  <div className="rounded-2xl border border-[#E8ECE6] bg-white p-6 shadow-sm">
                    <p className="text-xs text-[#555555]">
                      All customer inquiries submitted via the store or WhatsApp are routed directly to your WhatsApp desk for instant 1-on-1 human assistance.
                    </p>
                    <div className="mt-4 flex gap-3">
                      <a
                        href={`https://wa.me/${siteConfig.whatsappNumber}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 rounded-full bg-[#25D366] px-5 py-2.5 text-xs font-bold text-white hover:bg-[#20ba5a]"
                      >
                        <MessageSquare size={14} />
                        <span>Open WhatsApp Business Chat</span>
                      </a>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 5: SUBSCRIBERS */}
              {currentTab === 'subscribers' && (
                <div className="space-y-4">
                  <div>
                    <h2 className="text-lg font-bold text-[#151515]">Newsletter Subscribers</h2>
                    <p className="text-xs text-[#777777]">
                      Emails collected from the store footer newsletter form.
                    </p>
                  </div>

                  <div className="rounded-2xl border border-[#E8ECE6] bg-white p-6 text-xs text-[#555555]">
                    Subscribers are logged in <code className="bg-[#F7F8F6] px-2 py-0.5 rounded text-[#151515]">data/subscribers.json</code> and <code className="bg-[#F7F8F6] px-2 py-0.5 rounded text-[#151515]">backend/data/subscribers.json</code>.
                  </div>
                </div>
              )}

              {/* TAB 6: STORE SETTINGS */}
              {currentTab === 'settings' && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-lg font-bold text-[#151515]">Store Configuration</h2>
                    <p className="text-xs text-[#777777]">
                      Live settings for KLYRO Ecommerce.
                    </p>
                  </div>

                  <div className="rounded-2xl border border-[#E8ECE6] bg-white p-6 space-y-4 text-xs">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <span className="font-bold text-[#777777] uppercase text-[10px] block">Store Name</span>
                        <span className="text-sm font-bold text-[#151515] mt-0.5 block">{siteConfig.name}</span>
                      </div>
                      <div>
                        <span className="font-bold text-[#777777] uppercase text-[10px] block">Tagline</span>
                        <span className="text-sm font-semibold text-[#151515] mt-0.5 block">{siteConfig.tagline}</span>
                      </div>
                      <div>
                        <span className="font-bold text-[#777777] uppercase text-[10px] block">Official WhatsApp Number</span>
                        <span className="text-sm font-bold text-[#005E23] mt-0.5 block">{siteConfig.whatsappDisplay}</span>
                      </div>
                      <div>
                        <span className="font-bold text-[#777777] uppercase text-[10px] block">Free Shipping Threshold</span>
                        <span className="text-sm font-bold text-[#151515] mt-0.5 block">₹{siteConfig.freeShippingThreshold}</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </>
          )}
        </main>
      </div>
    </div>
  );
}

