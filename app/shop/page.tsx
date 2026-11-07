'use client';

import { Suspense, useState, useMemo, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { ChevronRight, ArrowUpDown } from "lucide-react";
import Navbar from "@/src/components/layout/Navbar";
import Footer from "@/src/components/layout/Footer";
import ProductCard from "@/src/components/product/ProductCard";
import { categories } from "@/src/data/products";
import { Product } from "@/src/types";

function ShopContent() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get("category") || "all";
  const initialSort = searchParams.get("sort") || "featured";

  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [selectedSort, setSelectedSort] = useState(initialSort);
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [loadingProducts, setLoadingProducts] = useState(true);

  // Fetch products from API (proxied to backend)
  useEffect(() => {
    setLoadingProducts(true);
    fetch('/api/products?limit=100')
      .then((r) => r.json())
      .then((data) => {
        if (data.success) setAllProducts(data.products);
      })
      .catch(() => {/* fallback handled in route.ts */})
      .finally(() => setLoadingProducts(false));
  }, []);

  const filteredAndSortedProducts = useMemo(() => {
    let list = [...allProducts];

    if (selectedCategory !== "all") {
      list = list.filter((p) => p.categorySlug === selectedCategory);
    }

    switch (selectedSort) {
      case "price-asc":    list.sort((a, b) => a.price - b.price); break;
      case "price-desc":   list.sort((a, b) => b.price - a.price); break;
      case "discount":     list.sort((a, b) => b.discount - a.discount); break;
      case "bestseller":   list.sort((a, b) => (b.isBestSeller ? 1 : 0) - (a.isBestSeller ? 1 : 0)); break;
      case "rating":       list.sort((a, b) => b.rating - a.rating); break;
      default: break;
    }

    return list;
  }, [allProducts, selectedCategory, selectedSort]);

  const currentCategoryObj = categories.find((c) => c.slug === selectedCategory);

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="border-b border-[#E8ECE6] bg-[#F7F8F6] py-8 sm:py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 text-xs font-semibold text-[#777777]">
            <Link href="/" className="hover:text-[#005E23]">Home</Link>
            <ChevronRight size={13} />
            <span className="text-[#151515]">Shop</span>
            {currentCategoryObj && (
              <>
                <ChevronRight size={13} />
                <span className="text-[#005E23]">{currentCategoryObj.name}</span>
              </>
            )}
          </div>

          <div className="mt-4 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-black tracking-[-0.03em] text-[#151515] sm:text-4xl">
                {currentCategoryObj ? currentCategoryObj.name : "Shop All Essentials"}
              </h1>
              <p className="mt-1 text-sm text-[#777777] max-w-xl">
                {currentCategoryObj
                  ? currentCategoryObj.description
                  : "Discover our full catalog of smart electronics, kitchen staples, nebulizers, baby sets, and precision tools."}
              </p>
            </div>
            <span className="text-xs font-bold text-[#777777]">
              Showing {filteredAndSortedProducts.length} of {allProducts.length} products
            </span>
          </div>
        </div>
      </div>

      {/* Main */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 pb-6 border-b border-[#E8ECE6]">
          {/* Category Pills */}
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => setSelectedCategory("all")}
              className={`rounded-full px-4 py-2 text-xs font-bold transition-all ${
                selectedCategory === "all"
                  ? "bg-[#005E23] text-white shadow-sm"
                  : "border border-[#E8ECE6] bg-[#F7F8F6] text-[#151515] hover:border-[#005E23]"
              }`}
            >
              All Items ({allProducts.length})
            </button>
            {categories.map((c) => {
              const count = allProducts.filter((p) => p.categorySlug === c.slug).length;
              return (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => setSelectedCategory(c.slug)}
                  className={`rounded-full px-4 py-2 text-xs font-bold transition-all ${
                    selectedCategory === c.slug
                      ? "bg-[#005E23] text-white shadow-sm"
                      : "border border-[#E8ECE6] bg-[#F7F8F6] text-[#151515] hover:border-[#005E23]"
                  }`}
                >
                  {c.name} ({count})
                </button>
              );
            })}
          </div>

          {/* Sort */}
          <div className="flex items-center gap-2 self-start lg:self-auto">
            <span className="text-xs font-bold uppercase tracking-wider text-[#777777] flex items-center gap-1">
              <ArrowUpDown size={13} />
              Sort:
            </span>
            <select
              value={selectedSort}
              onChange={(e) => setSelectedSort(e.target.value)}
              className="rounded-full border border-[#E8ECE6] bg-white px-3.5 py-1.5 text-xs font-semibold text-[#151515] focus:border-[#005E23] focus:outline-none"
            >
              <option value="featured">Featured Picks</option>
              <option value="bestseller">Best Sellers</option>
              <option value="discount">Biggest Discount</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="rating">Customer Rating</option>
            </select>
          </div>
        </div>

        {/* Product Grid */}
        {loadingProducts ? (
          <div className="mt-12 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="rounded-2xl bg-[#F7F8F6] h-72 animate-pulse" />
            ))}
          </div>
        ) : filteredAndSortedProducts.length === 0 ? (
          <div className="mt-16 text-center">
            <p className="text-lg font-bold text-[#151515]">No products found</p>
            <p className="text-sm text-[#777777] mt-1">Try a different category or check back later.</p>
          </div>
        ) : (
          <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredAndSortedProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default function ShopPage() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <Suspense fallback={<div className="p-12 text-center text-sm font-semibold text-[#777777]">Loading catalog...</div>}>
        <ShopContent />
      </Suspense>
      <Footer />
    </main>
  );
}
