'use client';

import Link from "next/link";
import { useState, useEffect } from "react";
import { Search, ShoppingBag, Menu, X, ChevronDown } from "lucide-react";
import { useCart } from "@/src/context/CartContext";
import { categories } from "@/src/data/products";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Shop", href: "/shop" },
  {
    label: "Categories",
    href: "/shop",
    hasDropdown: true,
  },
  { label: "Deals", href: "/shop?sort=discount" },
  { label: "New Arrivals", href: "/#new-arrivals" },
];

export default function Navbar() {
  const { totalItems, openCart, openSearch } = useCart();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-40 w-full transition-all duration-200 bg-white ${
        isScrolled
          ? "border-b border-[#E8ECE6] shadow-[0_4px_20px_rgba(0,0,0,0.04)]"
          : "border-b border-[#F0F2EE]"
      }`}
    >
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Brand Logo on the Left */}
        <div className="flex shrink-0 items-center">
          <Link
            href="/"
            className="group flex items-center gap-1.5 transition-transform duration-200 hover:opacity-95"
            aria-label="KLYRO Homepage"
          >
            <span className="text-2xl font-black tracking-[-0.04em] text-[#151515] sm:text-[26px]">
              KLYRO
            </span>
            <span className="inline-block h-2 w-2 rounded-full bg-[#005E23] transition-transform duration-200 group-hover:scale-125" />
          </Link>
        </div>

        {/* Navigation Links: Positioned slightly right of horizontal center */}
        <nav
          aria-label="Main Navigation"
          className="hidden items-center gap-8 lg:flex ml-auto mr-12"
        >
          {navLinks.map((link) => {
            if (link.hasDropdown) {
              return (
                <div
                  key={link.label}
                  className="relative group"
                  onMouseEnter={() => setIsCategoryOpen(true)}
                  onMouseLeave={() => setIsCategoryOpen(false)}
                >
                  <Link
                    href={link.href}
                    className="flex items-center gap-1 text-[13.5px] font-semibold tracking-[-0.01em] text-[#151515] transition-colors duration-150 hover:text-[#005E23] py-2"
                  >
                    <span>{link.label}</span>
                    <ChevronDown
                      size={14}
                      className={`text-[#777777] transition-transform duration-200 ${
                        isCategoryOpen ? "rotate-180 text-[#005E23]" : ""
                      }`}
                    />
                  </Link>

                  {/* Dropdown Menu */}
                  <div
                    className={`absolute left-1/2 top-full -translate-x-1/2 w-64 rounded-2xl border border-[#E8ECE6] bg-white p-2.5 shadow-[0_12px_32px_rgba(0,0,0,0.08)] transition-all duration-200 ${
                      isCategoryOpen
                        ? "opacity-100 visible translate-y-1"
                        : "opacity-0 invisible -translate-y-1 pointer-events-none"
                    }`}
                  >
                    <div className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-[#777777]">
                      Explore Categories
                    </div>
                    {categories.map((cat) => (
                      <Link
                        key={cat.id}
                        href={`/shop?category=${cat.slug}`}
                        onClick={() => setIsCategoryOpen(false)}
                        className="flex items-center justify-between rounded-xl px-3 py-2 text-xs font-semibold text-[#151515] transition-colors hover:bg-[#F7F8F6] hover:text-[#005E23]"
                      >
                        <span>{cat.name}</span>
                        <span className="text-[10px] text-[#777777]">
                          {cat.itemCount} items
                        </span>
                      </Link>
                    ))}
                  </div>
                </div>
              );
            }

            return (
              <Link
                key={link.label}
                href={link.href}
                className="text-[13.5px] font-semibold tracking-[-0.01em] text-[#151515] transition-colors duration-150 hover:text-[#005E23]"
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Right Action Icons: Search & Cart Only */}
        <div className="flex items-center gap-2 sm:gap-3">
          <button
            type="button"
            onClick={openSearch}
            aria-label="Search products"
            className="flex h-10 w-10 items-center justify-center rounded-full text-[#151515] transition-colors hover:bg-[#F7F8F6] hover:text-[#005E23]"
          >
            <Search size={20} strokeWidth={2} />
          </button>

          <button
            type="button"
            onClick={openCart}
            aria-label="Shopping Cart"
            className="relative flex h-10 w-10 items-center justify-center rounded-full text-[#151515] transition-colors hover:bg-[#F7F8F6] hover:text-[#005E23]"
          >
            <ShoppingBag size={20} strokeWidth={2} />
            {totalItems > 0 && (
              <span className="absolute top-1 right-1 flex h-4.5 min-w-4.5 items-center justify-center rounded-full bg-[#005E23] px-1 text-[10px] font-bold text-white shadow-sm animate-in zoom-in-75 duration-150">
                {totalItems}
              </span>
            )}
          </button>

          {/* Mobile Menu Button */}
          <button
            type="button"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle mobile menu"
            className="flex h-10 w-10 items-center justify-center rounded-full text-[#151515] transition-colors hover:bg-[#F7F8F6] lg:hidden"
          >
            {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {isMobileMenuOpen && (
        <div className="border-t border-[#E8ECE6] bg-white px-5 py-6 shadow-xl lg:hidden animate-in slide-in-from-top-2 duration-200">
          <div className="flex flex-col space-y-4">
            <Link
              href="/"
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-base font-semibold text-[#151515] hover:text-[#005E23]"
            >
              Home
            </Link>
            <Link
              href="/shop"
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-base font-semibold text-[#151515] hover:text-[#005E23]"
            >
              Shop All Products
            </Link>

            <div className="pt-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#777777]">
                Categories
              </span>
              <div className="mt-2 grid grid-cols-1 gap-2 pl-2">
                {categories.map((c) => (
                  <Link
                    key={c.id}
                    href={`/shop?category=${c.slug}`}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="text-sm font-medium text-[#444444] hover:text-[#005E23]"
                  >
                    • {c.name}
                  </Link>
                ))}
              </div>
            </div>

            <Link
              href="/shop?sort=discount"
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-base font-semibold text-[#151515] hover:text-[#005E23]"
            >
              Special Deals
            </Link>
            <Link
              href="/#new-arrivals"
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-base font-semibold text-[#151515] hover:text-[#005E23]"
            >
              New Arrivals
            </Link>

            <div className="pt-4 border-t border-[#E8ECE6]">
              <a
                href="https://wa.me/919292674447"
                target="_blank"
                rel="noopener noreferrer"
                className="flex w-full items-center justify-center rounded-full bg-[#005E23] py-3 text-xs font-bold uppercase tracking-wider text-white transition-colors hover:bg-[#004719]"
              >
                Order via WhatsApp
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
