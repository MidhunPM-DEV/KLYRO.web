'use client';

import { useRouter } from 'next/navigation';
import {
  LayoutDashboard, ShoppingBag, Package, Folder, MessageSquare, Users,
  Settings, HelpCircle, LogOut, ExternalLink,
} from 'lucide-react';

interface Props {
  currentTab: string;
  setCurrentTab: (t: string) => void;
  pendingCount: number;
}

const menuItems = [
  { id: 'dashboard',   label: 'Dashboard',   icon: LayoutDashboard },
  { id: 'orders',      label: 'Orders',      icon: ShoppingBag,    badge: true },
  { id: 'products',    label: 'Products',    icon: Package },
  { id: 'categories',  label: 'Categories',  icon: Folder },
  { id: 'inquiries',   label: 'Inquiries',   icon: MessageSquare },
  { id: 'subscribers', label: 'Subscribers', icon: Users },
];

const generalItems = [
  { id: 'settings', label: 'Settings', icon: Settings },
  { id: 'help',     label: 'Help',     icon: HelpCircle },
];

export default function AdminSidebar({ currentTab, setCurrentTab, pendingCount }: Props) {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem('adminAuth');
    localStorage.removeItem('adminUser');
    router.push('/login');
  };

  const NavItem = ({
    id, label, icon: Icon, badge,
  }: { id: string; label: string; icon: React.ElementType; badge?: boolean }) => {
    const active = currentTab === id;
    return (
      <button
        type="button"
        onClick={() => setCurrentTab(id)}
        className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-semibold transition-all ${
          active
            ? 'bg-[#005E23] text-white shadow-sm'
            : 'text-[#555555] hover:bg-[#F0F2EE] hover:text-[#151515]'
        }`}
      >
        <div className="flex items-center gap-3">
          <Icon size={17} />
          <span>{label}</span>
        </div>
        {badge && pendingCount > 0 && (
          <span className={`rounded-full px-2 py-0.5 text-[10px] font-black ${
            active ? 'bg-white/20 text-white' : 'bg-[#005E23] text-white'
          }`}>
            {pendingCount}
          </span>
        )}
      </button>
    );
  };

  return (
    <aside className="w-56 shrink-0 min-h-screen bg-white border-r border-[#EBEBEB] flex flex-col">
      {/* Logo */}
      <div className="px-5 py-5 border-b border-[#EBEBEB]">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#005E23]">
            <span className="text-sm font-black text-white">K</span>
          </div>
          <span className="text-lg font-black text-[#151515] tracking-tight">KLYRO</span>
        </div>
      </div>

      <div className="flex-1 px-3 py-5 space-y-6 overflow-y-auto">
        {/* MENU section */}
        <div>
          <p className="px-3 mb-2 text-[10px] font-black uppercase tracking-widest text-[#AAAAAA]">
            Menu
          </p>
          <div className="space-y-0.5">
            {menuItems.map((item) => (
              <NavItem key={item.id} {...item} />
            ))}
          </div>
        </div>

        {/* GENERAL section */}
        <div>
          <p className="px-3 mb-2 text-[10px] font-black uppercase tracking-widest text-[#AAAAAA]">
            General
          </p>
          <div className="space-y-0.5">
            {generalItems.map((item) => (
              <NavItem key={item.id} {...item} />
            ))}

            {/* Storefront link */}
            <a
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold text-[#555555] hover:bg-[#F0F2EE] hover:text-[#151515] transition-all"
            >
              <ExternalLink size={17} />
              <span>Storefront</span>
            </a>

            {/* Logout */}
            <button
              type="button"
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold text-[#555555] hover:bg-red-50 hover:text-red-600 transition-all"
            >
              <LogOut size={17} />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </div>
    </aside>
  );
}
