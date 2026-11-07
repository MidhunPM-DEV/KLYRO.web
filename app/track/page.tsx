'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Search, Package, CheckCircle2, Clock, Truck, ShieldCheck, MapPin, MessageCircle, ArrowRight, ChevronRight, AlertCircle } from 'lucide-react';
import AnnouncementBar from '@/src/components/layout/AnnouncementBar';
import Navbar from '@/src/components/layout/Navbar';
import Footer from '@/src/components/layout/Footer';
import { Order, OrderStatus } from '@/src/lib/db';
import { siteConfig } from '@/src/data/products';

function TrackContent() {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get('query') || '';

  const [query, setQuery] = useState(initialQuery);
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [searched, setSearched] = useState(false);

  const fetchTrack = async (searchVal: string) => {
    if (!searchVal.trim()) return;
    setLoading(true);
    setError('');
    setSearched(true);

    try {
      const res = await fetch(`/api/track?query=${encodeURIComponent(searchVal.trim())}`);
      const data = await res.json();
      if (res.ok && data.success) {
        setOrders(data.orders);
      } else {
        setOrders([]);
        setError(data.error || 'No active orders found.');
      }
    } catch {
      setError('Network error while searching for order. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (initialQuery) {
      fetchTrack(initialQuery);
    } else {
      // Check if there is a last order ID in localStorage
      try {
        const lastOrder = localStorage.getItem('klyro_last_order');
        if (lastOrder) {
          setQuery(lastOrder);
          fetchTrack(lastOrder);
        }
      } catch {}
    }
  }, [initialQuery]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    fetchTrack(query);
  };

  const formatPrice = (amount: number) => `₹${amount.toLocaleString('en-IN')}`;

  const getStatusStepIndex = (status: OrderStatus) => {
    switch (status) {
      case 'placed':
        return 0;
      case 'confirmed':
        return 1;
      case 'processing':
        return 2;
      case 'shipped':
        return 3;
      case 'delivered':
        return 4;
      default:
        return 0;
    }
  };

  const steps = [
    { title: 'Order Placed', desc: 'Registered in system' },
    { title: 'WhatsApp Confirmed', desc: 'Verified by support' },
    { title: 'Packed & Inspected', desc: 'Shockproof boxing' },
    { title: 'In Transit', desc: 'Dispatched with express courier' },
    { title: 'Delivered', desc: 'Delivered to your doorstep' },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="border-b border-[#E8ECE6] bg-[#F7F8F6] py-8 sm:py-12">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <div className="flex items-center gap-2 text-xs font-semibold text-[#777777]">
            <Link href="/" className="hover:text-[#005E23]">Home</Link>
            <ChevronRight size={13} />
            <span className="text-[#151515]">Track Order</span>
          </div>

          <h1 className="mt-4 text-3xl font-black tracking-[-0.03em] text-[#151515] sm:text-4xl">
            Track Your Order
          </h1>
          <p className="mt-1 text-sm text-[#777777]">
            Enter your Order ID (e.g. <strong className="text-[#151515]">KLY-78241</strong>) or your registered 10-digit WhatsApp number to view real-time shipping status.
          </p>

          {/* Search Form */}
          <form onSubmit={handleSearch} className="mt-6 flex flex-col sm:flex-row gap-2.5">
            <div className="relative flex-1">
              <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#777777]" />
              <input
                type="text"
                required
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Order ID (e.g. KLY-78241) or Mobile Number"
                className="w-full rounded-full border border-[#E8ECE6] bg-white pl-11 pr-4 py-3 text-xs sm:text-sm font-medium text-[#151515] shadow-sm placeholder-[#888888] focus:border-[#005E23] focus:outline-none"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="rounded-full bg-[#005E23] px-8 py-3 text-xs font-bold uppercase tracking-wider text-white shadow-sm transition-colors hover:bg-[#004719] disabled:opacity-60"
            >
              {loading ? 'Searching...' : 'Track Order'}
            </button>
          </form>
        </div>
      </div>

      {/* Results Container */}
      <div className="mx-auto max-w-4xl px-4 sm:px-6 py-10">
        {loading && (
          <div className="py-16 text-center text-sm font-semibold text-[#777777]">
            Fetching order tracking details from KLYRO system...
          </div>
        )}

        {!loading && error && (
          <div className="rounded-2xl border border-red-200 bg-red-50/60 p-6 text-center">
            <AlertCircle size={24} className="mx-auto text-red-500" />
            <h3 className="mt-2 text-sm font-bold text-red-800">{error}</h3>
            <p className="mt-1 text-xs text-red-600 max-w-md mx-auto">
              If you placed your order directly on WhatsApp, feel free to message our support desk with your name or mobile number for immediate status.
            </p>
            <div className="mt-4">
              <a
                href={`https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(`Hello KLYRO Team, I would like to check status of my order: ${query}`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-[#25D366] px-5 py-2.5 text-xs font-bold text-white hover:bg-[#20ba5a]"
              >
                <MessageCircle size={15} />
                <span>Ask on WhatsApp Support</span>
              </a>
            </div>
          </div>
        )}

        {!loading && searched && orders.length > 0 && (
          <div className="space-y-8">
            {orders.map((order) => {
              const currentStep = getStatusStepIndex(order.status);
              return (
                <div
                  key={order.id}
                  className="overflow-hidden rounded-3xl border border-[#E8ECE6] bg-white shadow-[0_4px_24px_rgba(0,0,0,0.04)]"
                >
                  {/* Order Top Banner */}
                  <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#E8ECE6] bg-[#F7F8F6] px-6 py-4">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold uppercase tracking-wider text-[#777777]">
                          Order ID
                        </span>
                        <span className="text-base font-black text-[#151515]">
                          #{order.id}
                        </span>
                      </div>
                      <span className="text-[11px] text-[#777777]">
                        Placed on {new Date(order.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                      </span>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className="rounded-full bg-[#ecfdf5] border border-[#a7f3d0] px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-[#005E23]">
                        {order.status}
                      </span>
                      <a
                        href={`https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(`Hello KLYRO Team, I am inquiring about Order #${order.id}`)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1.5 rounded-full bg-white border border-[#E8ECE6] px-3 py-1.5 text-xs font-semibold text-[#151515] hover:border-[#005E23] hover:text-[#005E23]"
                      >
                        <MessageCircle size={14} className="text-[#25D366]" />
                        <span>Support</span>
                      </a>
                    </div>
                  </div>

                  {/* Status Timeline */}
                  <div className="p-6 sm:p-8">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-[#151515] mb-6">
                      Shipment Progress
                    </h3>

                    <div className="grid grid-cols-1 sm:grid-cols-5 gap-4 relative">
                      {steps.map((step, idx) => {
                        const isDone = idx <= currentStep;
                        const isCurrent = idx === currentStep;

                        return (
                          <div key={idx} className="flex sm:flex-col items-center sm:items-start gap-3 sm:gap-2">
                            <div
                              className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-bold transition-all ${
                                isDone
                                  ? 'bg-[#005E23] text-white shadow-sm'
                                  : 'bg-[#F0F2EE] text-[#999999]'
                              }`}
                            >
                              {isDone ? <CheckCircle2 size={16} /> : idx + 1}
                            </div>
                            <div>
                              <p className={`text-xs font-bold ${isCurrent ? 'text-[#005E23]' : isDone ? 'text-[#151515]' : 'text-[#888888]'}`}>
                                {step.title}
                              </p>
                              <p className="text-[10px] text-[#777777] hidden sm:block mt-0.5">
                                {step.desc}
                              </p>
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    {/* Status History log */}
                    {order.statusHistory && order.statusHistory.length > 0 && (
                      <div className="mt-8 rounded-2xl bg-[#F7F8F6] p-4 border border-[#E8ECE6]">
                        <h4 className="text-[11px] font-bold uppercase tracking-wider text-[#777777] mb-2">
                          Activity Log
                        </h4>
                        <div className="space-y-2">
                          {order.statusHistory.map((h, i) => (
                            <div key={i} className="flex items-start gap-2.5 text-xs text-[#555555]">
                              <Clock size={13} className="text-[#005E23] shrink-0 mt-0.5" />
                              <div className="flex-1">
                                <span className="font-semibold text-[#151515]">{h.message}</span>
                                <span className="ml-2 text-[10px] text-[#888888]">
                                  {new Date(h.timestamp).toLocaleString('en-IN', { hour: '2-digit', minute: '2-digit', day: 'numeric', month: 'short' })}
                                </span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Order Details & Items Grid */}
                  <div className="border-t border-[#E8ECE6] bg-[#FAFAFA] p-6 sm:p-8">
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
                      {/* Items (7 cols) */}
                      <div className="md:col-span-7">
                        <h4 className="text-xs font-bold uppercase tracking-wider text-[#151515] mb-4">
                          Items in this Order ({order.items.length})
                        </h4>
                        <div className="divide-y divide-[#E8ECE6]">
                          {order.items.map((item, idx) => (
                            <div key={idx} className="flex items-center gap-3.5 py-3">
                              <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-xl border border-[#E8ECE6] bg-white">
                                <Image src={item.image} alt={item.name} fill className="object-cover" />
                              </div>
                              <div className="flex-1">
                                <h5 className="text-xs font-bold text-[#151515] line-clamp-1">
                                  {item.name}
                                </h5>
                                {item.variant && (
                                  <span className="text-[10px] text-[#777777] block">
                                    Variant: {item.variant}
                                  </span>
                                )}
                                <span className="text-[11px] text-[#555555]">
                                  Qty: {item.quantity} × {formatPrice(item.price)}
                                </span>
                              </div>
                              <span className="text-xs font-black text-[#151515]">
                                {formatPrice(item.subtotal)}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Customer Address & Totals (5 cols) */}
                      <div className="md:col-span-5 space-y-5">
                        {/* Delivery Address */}
                        <div className="rounded-2xl bg-white p-4 border border-[#E8ECE6]">
                          <div className="flex items-center gap-1.5 text-xs font-bold text-[#151515] mb-2">
                            <MapPin size={14} className="text-[#005E23]" />
                            <span>Delivery Address</span>
                          </div>
                          <p className="text-xs font-semibold text-[#151515]">{order.customer.fullName}</p>
                          <p className="text-xs text-[#555555] mt-0.5">
                            {order.customer.houseBuilding}, {order.customer.streetLocality}
                          </p>
                          <p className="text-xs text-[#555555]">
                            {order.customer.city}, {order.customer.state} - {order.customer.pinCode}
                          </p>
                          <p className="text-xs text-[#777777] mt-1">
                            Phone: {order.customer.mobileNumber}
                          </p>
                        </div>

                        {/* Totals */}
                        <div className="rounded-2xl bg-white p-4 border border-[#E8ECE6] space-y-1.5 text-xs">
                          <div className="flex justify-between text-[#555555]">
                            <span>Subtotal</span>
                            <span className="font-bold text-[#151515]">{formatPrice(order.subtotal)}</span>
                          </div>
                          <div className="flex justify-between text-[#555555]">
                            <span>Shipping</span>
                            <span className="font-bold text-[#151515]">
                              {order.shippingFee === 0 ? <span className="text-[#005E23]">FREE</span> : formatPrice(order.shippingFee)}
                            </span>
                          </div>
                          <div className="flex justify-between pt-2 border-t border-[#F0F2EE] font-black text-sm text-[#151515]">
                            <span>Total</span>
                            <span className="text-base text-[#005E23]">{formatPrice(order.totalAmount)}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

export default function TrackPage() {
  return (
    <main className="min-h-screen bg-white">
      <AnnouncementBar />
      <Navbar />
      <Suspense fallback={<div className="p-16 text-center text-sm font-semibold text-[#777777]">Loading order tracker...</div>}>
        <TrackContent />
      </Suspense>
      <Footer />
    </main>
  );
}

