'use client';

import { useState } from "react";
import Link from "next/link";
import { MessageCircle, Mail, MapPin, ArrowRight, CheckCircle2 } from "lucide-react";
import { categories, siteConfig } from "@/src/data/products";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [newsletterStatus, setNewsletterStatus] = useState<{
    type: 'idle' | 'loading' | 'success' | 'error';
    message: string;
  }>({ type: 'idle', message: '' });

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      setNewsletterStatus({ type: 'error', message: 'Please enter a valid email address.' });
      return;
    }

    setNewsletterStatus({ type: 'loading', message: '' });

    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setNewsletterStatus({ type: 'success', message: data.message || 'Subscribed successfully!' });
        setEmail('');
      } else {
        setNewsletterStatus({ type: 'error', message: data.error || 'Failed to subscribe' });
      }
    } catch {
      setNewsletterStatus({ type: 'error', message: 'Network error. Please try again.' });
    }
  };

  return (
    <footer className="border-t border-[#E8ECE6] bg-[#151515] text-[#A3A3A3] pt-16 pb-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-12 lg:gap-8">
          
          {/* Brand Info (4 cols) */}
          <div className="lg:col-span-4">
            <Link href="/" className="flex items-center gap-1.5" aria-label="KLYRO home">
              <span className="text-2xl font-black tracking-[-0.04em] text-white">
                KLYRO
              </span>
              <span className="inline-block h-2 w-2 rounded-full bg-[#005E23]" />
            </Link>

            <p className="mt-3 text-xs font-semibold tracking-wider text-[#4ade80] uppercase">
              {siteConfig.tagline}
            </p>

            <p className="mt-3 text-xs leading-relaxed text-[#8E8E8E] max-w-sm">
              Thoughtfully selected smart home, kitchen, and nursery essentials designed to elevate your everyday living with premium build quality and simplicity.
            </p>

            {/* Direct WhatsApp Callout */}
            <div className="mt-6 flex items-center gap-3">
              <a
                href={`https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent("Hello KLYRO Team, I would like to inquire about your products.")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-[#005E23] px-4 py-2 text-xs font-bold text-white transition-colors hover:bg-[#004719]"
              >
                <MessageCircle size={14} className="text-[#25D366]" />
                <span>WhatsApp: {siteConfig.whatsappDisplay}</span>
              </a>
            </div>
          </div>

          {/* Categories (3 cols) */}
          <div className="lg:col-span-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Shop Categories
            </h4>
            <ul className="mt-4 space-y-2.5 text-xs">
              {categories.map((c) => (
                <li key={c.id}>
                  <Link
                    href={`/shop?category=${c.slug}`}
                    className="transition-colors hover:text-white"
                  >
                    {c.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links & Customer Care (2 cols) */}
          <div className="lg:col-span-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Customer Care
            </h4>
            <ul className="mt-4 space-y-2.5 text-xs">
              <li>
                <Link href="/track" className="transition-colors hover:text-white font-medium text-white/90">
                  Track Your Order
                </Link>
              </li>
              <li>
                <Link href="#warranty" className="transition-colors hover:text-white">
                  Warranty Policy
                </Link>
              </li>
              <li>
                <Link href="#shipping" className="transition-colors hover:text-white">
                  Shipping & Delivery
                </Link>
              </li>
              <li>
                <Link href="#replacements" className="transition-colors hover:text-white">
                  7-Day Replacements
                </Link>
              </li>
              <li>
                <Link href="#faq" className="transition-colors hover:text-white">
                  Frequently Asked Questions
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter / Updates (3 cols) */}
          <div className="lg:col-span-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Stay In Touch
            </h4>
            <p className="mt-4 text-xs text-[#8E8E8E] leading-relaxed">
              Get notified of new product drops, special festive offers, and exclusive discounts.
            </p>
            <form onSubmit={handleNewsletterSubmit} className="mt-4 flex gap-2">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full rounded-full border border-white/20 bg-white/5 px-4 py-2.5 text-xs text-white placeholder-[#777777] focus:border-[#005E23] focus:outline-none"
              />
              <button
                type="submit"
                disabled={newsletterStatus.type === 'loading'}
                aria-label="Subscribe"
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#005E23] text-white hover:bg-[#004719] transition-colors disabled:opacity-50"
              >
                <ArrowRight size={14} />
              </button>
            </form>
            {newsletterStatus.message && (
              <p
                className={`mt-2 text-[11px] ${
                  newsletterStatus.type === 'success' ? 'text-[#4ade80]' : 'text-red-400'
                }`}
              >
                {newsletterStatus.message}
              </p>
            )}
            <p className="mt-2 text-[10px] text-[#777777]">
              Zero spam. Unsubscribe anytime.
            </p>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="mt-14 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#777777]">
          <p>© 2026 KLYRO. All rights reserved.</p>
          <div className="flex items-center gap-5 text-[11px]">
            <Link href="#privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <span>•</span>
            <Link href="#terms" className="hover:text-white transition-colors">Terms of Service</Link>
            <span>•</span>
            <Link href="#refund" className="hover:text-white transition-colors">Refund & Return</Link>
          </div>
        </div>

      </div>
    </footer>
  );
}
