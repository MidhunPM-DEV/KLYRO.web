'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { LayoutDashboard, ShoppingBag, Package, MessageSquare, Users, Settings, ExternalLink, LogOut } from 'lucide-react';

interface SidebarProps {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
  pendingOrdersCount?: number;
}

export default function AdminSidebar({
  currentTab,
  setCurrentTab,
  pendingOrdersCount = 0,
}: SidebarProps) {
  const router = useRouter();

  const handleLogout = () => {
    // Clear auth from localStorage
    localStorage.removeItem('adminAuth');
    localStorage.removeItem('adminUser');
    
    // Redirect to login page
    router.push('/login');
  };

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'orders', label: 'Orders', icon: ShoppingBag, badge: pendingOrdersCount > 0 ? pendingOrdersCount : undefined },
    { id: 'products', label: 'Products & Inventory', icon: Package },
    { id: 'inquiries', label: 'Customer Inquiries', icon: MessageSquare },
    { id: 'subscribers', label: 'Subscribers', icon: Users },
    { id: 'settings', label: 'Store Settings', icon: Settings },
  ];

  return (
    <aside className="w-64 bg-[#151515] text-white flex flex-col justify-between shrink-0 min-h-screen border-r border-[#262626]">
      <div>
        {/* Logo Banner */}
        <div className="px-6 py-6 border-b border-[#262626] flex items-center justify-between">
          <Link href="/admin" className="flex items-center gap-2">
            <span className="text-xl font-black tracking-tight text-white">KLYRO</span>
            <span className="rounded-md bg-[#005E23] px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white">
              Admin
            </span>
          </Link>
        </div>

        {/* Navigation Menu */}
        <div className="px-3 py-6 space-y-1">
          <div className="px-3 text-[10px] font-bold uppercase tracking-wider text-[#777777] mb-2">
            Store Management
          </div>
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentTab === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setCurrentTab(item.id)}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                  isActive
                    ? 'bg-[#005E23] text-white shadow-sm'
                    : 'text-[#A3A3A3] hover:bg-[#202020] hover:text-white'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon size={16} />
                  <span>{item.label}</span>
                </div>
                {item.badge !== undefined && (
                  <span className="rounded-full bg-[#f59e0b] px-2 py-0.5 text-[10px] font-bold text-black">
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Footer / Storefront Quick Link */}
      <div className="p-4 border-t border-[#262626] space-y-2">
        <Link
          href="/"
          target="_blank"
          className="flex items-center justify-between px-3.5 py-2.5 rounded-xl bg-[#202020] text-xs font-semibold text-[#A3A3A3] hover:text-white transition-colors"
        >
          <div className="flex items-center gap-2">
            <ExternalLink size={14} />
            <span>Open Storefront</span>
          </div>
          <span className="text-[10px] text-[#777777]">Live</span>
        </Link>

        <a
          href="https://wa.me/919292674447"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-3.5 py-2 text-[11px] font-medium text-[#4ade80] hover:underline"
        >
          <span>WhatsApp Support Desk</span>
        </a>

        {/* Logout Button */}
        <button
          type="button"
          onClick={handleLogout}
          className="w-full flex items-center gap-2 px-3.5 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-xs font-semibold text-white transition-colors"
        >
          <LogOut size={14} />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
}

