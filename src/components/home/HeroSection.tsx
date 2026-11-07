'use client';

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, ArrowRight, ShieldCheck, Zap, Truck, Star } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-white pt-8 pb-16 sm:pt-12 sm:pb-24 lg:pt-16 lg:pb-28">
      {/* Subtle background ambient glow */}
      <div className="absolute top-1/4 right-0 -z-10 h-96 w-96 rounded-full bg-[#005E23]/5 blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-10 -z-10 h-80 w-80 rounded-full bg-[#F7F8F6] blur-2xl pointer-events-none" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-[1.05fr_1.15fr] lg:gap-14">
          
          {/* Left Column: Volitx-inspired Typography & CTAs */}
          <div className="max-w-2xl">
            {/* Eyebrow with accent line */}
            <div className="flex items-center gap-2.5">
              <span className="h-[2px] w-6 bg-[#005E23]" />
              <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#005E23]">
                Smart Living. Better Choices.
              </span>
            </div>

            {/* Massive Display Headline */}
            <h1 className="mt-5 text-5xl font-black tracking-[-0.04em] text-[#151515] sm:text-6xl lg:text-[70px] leading-[1.04]">
              Upgrade With
              <span className="block text-[#005E23] mt-1 sm:mt-2">
                Smarter Choices.
              </span>
            </h1>

            {/* Subtitle */}
            <p className="mt-6 text-base text-[#777777] sm:text-lg leading-relaxed max-w-lg">
              Discover thoughtfully selected smart home, kitchen, and everyday essentials designed to simplify your daily routine with uncompromising quality.
            </p>

            {/* CTAs */}
            <div className="mt-8 flex flex-wrap items-center gap-4 sm:gap-5">
              <Link
                href="/shop"
                className="inline-flex items-center gap-2.5 rounded-full bg-[#005E23] px-8 py-4 text-xs font-bold uppercase tracking-wider text-white shadow-[0_4px_14px_rgba(0,94,35,0.25)] transition-all duration-200 hover:bg-[#004719] hover:shadow-[0_6px_20px_rgba(0,94,35,0.35)] active:scale-95"
              >
                <span>Shop Collection</span>
                <ArrowRight size={15} />
              </Link>

              <Link
                href="#categories"
                className="group inline-flex items-center gap-1.5 py-3 text-xs font-bold uppercase tracking-wider text-[#151515] transition-colors hover:text-[#005E23]"
              >
                <span className="border-b-2 border-[#151515] group-hover:border-[#005E23] pb-0.5 transition-colors">
                  Explore Categories
                </span>
                <ArrowUpRight size={15} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            </div>

            {/* Trust Highlights Pill (Directly matching Volitx reference) */}
            <div className="mt-12 inline-flex flex-wrap items-center gap-x-5 gap-y-2 rounded-full border border-[#E8ECE6] bg-[#F7F8F6] px-5 py-3 text-[11px] font-semibold text-[#555555] shadow-[0_2px_8px_rgba(0,0,0,0.03)] sm:px-6">
              <div className="flex items-center gap-1.5 text-[#151515]">
                <Zap size={13} className="text-[#005E23]" />
                <span>Latest Technology</span>
              </div>
              <span className="text-[#CCCCCC]">•</span>
              <div className="flex items-center gap-1.5 text-[#151515]">
                <Truck size={13} className="text-[#005E23]" />
                <span>Fast & Secure Delivery</span>
              </div>
              <span className="text-[#CCCCCC]">•</span>
              <div className="flex items-center gap-1.5 text-[#151515]">
                <ShieldCheck size={13} className="text-[#005E23]" />
                <span>Premium Quality</span>
              </div>
            </div>
          </div>

          {/* Right Column: Multi-Product Volitx Composition */}
          <div className="relative mx-auto w-full max-w-lg lg:max-w-none">
            {/* Main Stage Backdrop with subtle gradient card */}
            <div className="relative aspect-[4/3] sm:aspect-[16/11] w-full overflow-hidden rounded-[32px] border border-[#E8ECE6] bg-gradient-to-br from-[#F7F8F6] to-[#ECEFEA] p-4 sm:p-7 shadow-[0_20px_50px_rgba(0,0,0,0.06)]">
              
              {/* Product 1: Portable Mini Blender (Primary Focal Image) */}
              <div className="relative h-full w-full overflow-hidden rounded-2xl bg-white shadow-md">
                <Image
                  src="https://images.unsplash.com/photo-1570222094114-d054a817e56b?auto=format&fit=crop&w=1200&q=90"
                  alt="KLYRO Portable Mini Blender"
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover object-center"
                />

                {/* Overlaid Volitx-style Device Metadata Card */}
                <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-auto sm:max-w-xs rounded-2xl bg-black/75 p-4 text-white backdrop-blur-md border border-white/10 shadow-xl">
                  <div className="flex items-center justify-between text-[10px] font-bold tracking-widest text-[#4ade80] uppercase">
                    <span>001 / Flagship</span>
                    <span>2026 Edition</span>
                  </div>
                  <h3 className="mt-1 text-sm font-bold text-white sm:text-base">
                    Portable Mini Blender
                  </h3>
                  <div className="mt-2 flex items-center justify-between text-[11px] text-[#DDDDDD] pt-2 border-t border-white/15">
                    <span>Cordless USB-C • 18,000 RPM</span>
                    <span className="font-black text-white">₹899</span>
                  </div>
                </div>

                {/* Top-right Rating Badge */}
                <div className="absolute top-4 right-4 flex items-center gap-1 rounded-full bg-white/95 px-3 py-1.5 shadow-md backdrop-blur-sm text-xs font-bold text-[#151515]">
                  <Star size={12} className="fill-[#005E23] text-[#005E23]" />
                  <span>4.9 / 5</span>
                  <span className="text-[10px] text-[#777777] font-normal">(140+)</span>
                </div>
              </div>
            </div>

            {/* Floating Side Card 1: Wireless Pocket Speaker / Fan */}
            <div className="absolute -bottom-6 -left-4 sm:-bottom-8 sm:-left-6 w-44 sm:w-56 rounded-2xl border border-[#E8ECE6] bg-white p-3 shadow-[0_16px_36px_rgba(0,0,0,0.1)] transition-transform duration-300 hover:-translate-y-1">
              <div className="relative aspect-video w-full overflow-hidden rounded-xl bg-[#F7F8F6]">
                <Image
                  src="https://images.unsplash.com/photo-1545454675-3531b543be5d?auto=format&fit=crop&w=600&q=85"
                  alt="Wireless Pocket Speaker"
                  fill
                  sizes="220px"
                  className="object-cover"
                />
              </div>
              <div className="mt-2.5 flex items-center justify-between">
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-wider text-[#777777]">Acoustics</p>
                  <p className="text-xs font-bold text-[#151515]">Pocket Speaker</p>
                </div>
                <span className="text-xs font-black text-[#005E23]">₹1,299</span>
              </div>
            </div>

            {/* Floating Side Card 2: Cordless Food Chopper Preview */}
            <div className="hidden sm:block absolute -top-5 -right-4 w-48 rounded-2xl border border-[#E8ECE6] bg-white p-3 shadow-[0_16px_36px_rgba(0,0,0,0.08)] transition-transform duration-300 hover:-translate-y-1">
              <div className="flex items-center gap-3">
                <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-xl bg-[#F7F8F6]">
                  <Image
                    src="https://images.unsplash.com/photo-1585515320310-259814833e62?auto=format&fit=crop&w=300&q=85"
                    alt="Mini Electric Chopper"
                    fill
                    sizes="60px"
                    className="object-cover"
                  />
                </div>
                <div>
                  <span className="text-[9px] font-bold uppercase tracking-wider text-[#005E23]">Bestseller</span>
                  <p className="text-xs font-bold text-[#151515] line-clamp-1">Mini Chopper</p>
                  <p className="text-xs font-bold text-[#777777]">₹499</p>
                </div>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
