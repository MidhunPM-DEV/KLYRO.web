'use client';

import { useState, useMemo } from 'react';
import Navbar from '@/src/components/layout/Navbar';
import Footer from '@/src/components/layout/Footer';
import ProductCard from '@/src/components/product/ProductCard';
import { products } from '@/src/data/products';
import { Sparkles, SlidersHorizontal } from 'lucide-react';

export default function NewArrivalsPage() {
  const [sortBy, setSortBy] = useState<'recent' | 'price-low' | 'price-high'>('recent');

  // Filter products added in last 30 days (simulate with first 10 products)
  const newArrivals = useMemo(() => {
    // In real scenario, you'd filter by actual date
    // For demo, we'll take the first 10 products as "new arrivals"
    let filtered = products.slice(0, 10);

    // Sort based on selection
    if (sortBy === 'price-low') {
      filtered = [...filtered].sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-high') {
      filtered = [...filtered].sort((a, b) => b.price - a.price);
    }

    return filtered;
  }, [sortBy]);

  return (
    <div className="min-h-screen bg-[#F7F8F6] text-[#151515]">
      <Navbar />

      {/* Products Section */}
      <section className="container mx-auto px-6 py-16 max-w-7xl">
        
        {/* Filter & Sort Bar */}
        <div className="mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-black text-[#151515]">
              Latest Products
            </h2>
            <p className="text-sm text-[#777777] mt-1">
              Showing {newArrivals.length} new products added this month
            </p>
          </div>

          {/* Sort Dropdown */}
          <div className="flex items-center gap-3">
            <SlidersHorizontal size={18} className="text-[#777777]" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="px-4 py-2.5 rounded-xl border-2 border-[#E8ECE6] bg-white text-sm font-semibold text-[#151515] focus:border-[#005E23] focus:outline-none cursor-pointer"
            >
              <option value="recent">Most Recent</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
            </select>
          </div>
        </div>

        {/* Products Grid */}
        {newArrivals.length === 0 ? (
          <div className="py-20 text-center">
            <Sparkles size={64} className="mx-auto text-[#E8ECE6] mb-4" />
            <h3 className="text-xl font-bold text-[#151515] mb-2">
              No New Arrivals Yet
            </h3>
            <p className="text-sm text-[#777777]">
              Check back soon for exciting new products!
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {newArrivals.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}

        {/* Call to Action */}
        <div className="mt-16 bg-white rounded-3xl border-2 border-[#E8ECE6] p-8 md:p-12 text-center">
          <Sparkles size={48} className="mx-auto text-[#005E23] mb-4" />
          <h2 className="text-2xl md:text-3xl font-black text-[#151515] mb-3">
            Stay Updated on New Products
          </h2>
          <p className="text-base text-[#555555] mb-6 max-w-xl mx-auto">
            Subscribe to our newsletter and be the first to know about new arrivals, exclusive deals, and special offers!
          </p>
          <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-5 py-3.5 rounded-xl border-2 border-[#E8ECE6] text-sm font-medium text-[#151515] placeholder-[#888888] focus:border-[#005E23] focus:outline-none"
              required
            />
            <button
              type="submit"
              className="px-8 py-3.5 bg-[#005E23] text-white rounded-xl font-bold text-sm hover:bg-[#004A1C] transition-colors shadow-lg whitespace-nowrap"
            >
              Subscribe Now
            </button>
          </form>
        </div>
      </section>

      <Footer />
    </div>
  );
}
