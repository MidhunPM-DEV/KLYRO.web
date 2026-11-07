'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Search, Star, CheckCircle2, XCircle, Tag } from 'lucide-react';
import { Product } from '@/src/types';
import { categories } from '@/src/data/products';

export default function ProductsManager({ initialProducts }: { initialProducts: Product[] }) {
  const [productList, setProductList] = useState<Product[]>(initialProducts);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const formatPrice = (amount: number) => `₹${amount.toLocaleString('en-IN')}`;

  const toggleStock = (id: string) => {
    setProductList((prev) =>
      prev.map((p) => (p.id === id ? { ...p, inStock: !p.inStock } : p))
    );
  };

  const filtered = productList.filter((p) => {
    if (selectedCategory !== 'all' && p.categorySlug !== selectedCategory) {
      return false;
    }
    if (searchTerm.trim()) {
      const q = searchTerm.toLowerCase().trim();
      return (
        p.name.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q)
      );
    }
    return true;
  });

  return (
    <div className="space-y-4">
      {/* Controls Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        {/* Category Pills */}
        <div className="flex flex-wrap gap-1.5">
          <button
            type="button"
            onClick={() => setSelectedCategory('all')}
            className={`rounded-xl px-3 py-1.5 text-xs font-bold transition-all ${
              selectedCategory === 'all'
                ? 'bg-[#005E23] text-white shadow-sm'
                : 'bg-white border border-[#E8ECE6] text-[#555555] hover:border-[#005E23]'
            }`}
          >
            All Categories ({productList.length})
          </button>
          {categories.map((c) => (
            <button
              key={c.id}
              type="button"
              onClick={() => setSelectedCategory(c.slug)}
              className={`rounded-xl px-3 py-1.5 text-xs font-bold transition-all ${
                selectedCategory === c.slug
                  ? 'bg-[#005E23] text-white shadow-sm'
                  : 'bg-white border border-[#E8ECE6] text-[#555555] hover:border-[#005E23]'
              }`}
            >
              {c.name}
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="relative w-full sm:w-64">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#777777]" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search products..."
            className="w-full rounded-xl border border-[#E8ECE6] bg-white pl-9 pr-3 py-2 text-xs font-medium text-[#151515] placeholder-[#888888] focus:border-[#005E23] focus:outline-none"
          />
        </div>
      </div>

      {/* Products Table Card */}
      <div className="overflow-hidden rounded-2xl border border-[#E8ECE6] bg-white shadow-[0_2px_12px_rgba(0,0,0,0.03)]">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-[#E8ECE6] bg-[#F7F8F6] text-[#777777] uppercase text-[10px] font-bold tracking-wider">
                <th className="py-3 px-4">Product</th>
                <th className="py-3 px-4">Category</th>
                <th className="py-3 px-4">Selling Price</th>
                <th className="py-3 px-4">Original Price</th>
                <th className="py-3 px-4">Discount</th>
                <th className="py-3 px-4">Rating</th>
                <th className="py-3 px-4 text-center">Stock Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E8ECE6]">
              {filtered.map((product) => (
                <tr key={product.id} className="hover:bg-[#F7F8F6]/60 transition-colors">
                  {/* Product Visual & Name */}
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-3">
                      <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-xl border border-[#E8ECE6] bg-[#F7F8F6]">
                        <Image src={product.images[0]} alt={product.name} fill className="object-cover" />
                      </div>
                      <div>
                        <h4 className="font-bold text-[#151515] line-clamp-1">{product.name}</h4>
                        <span className="text-[10px] text-[#777777]">Slug: {product.slug}</span>
                      </div>
                    </div>
                  </td>

                  {/* Category */}
                  <td className="py-3 px-4 font-semibold text-[#555555]">
                    {product.category}
                  </td>

                  {/* Price */}
                  <td className="py-3 px-4 font-black text-[#151515]">
                    {formatPrice(product.price)}
                  </td>

                  {/* Original Price */}
                  <td className="py-3 px-4 text-[#777777] line-through">
                    {formatPrice(product.originalPrice)}
                  </td>

                  {/* Discount */}
                  <td className="py-3 px-4">
                    <span className="inline-flex items-center gap-1 rounded-full bg-[#ecfdf5] border border-[#a7f3d0] px-2.5 py-0.5 text-[10px] font-bold text-[#005E23]">
                      <Tag size={10} />
                      {product.discount}% OFF
                    </span>
                  </td>

                  {/* Rating */}
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-1 text-[#151515] font-bold">
                      <Star size={12} className="fill-[#005E23] text-[#005E23]" />
                      <span>{product.rating}</span>
                      <span className="text-[10px] text-[#777777] font-normal">({product.reviewsCount})</span>
                    </div>
                  </td>

                  {/* Stock Toggle */}
                  <td className="py-3 px-4 text-center">
                    <button
                      type="button"
                      onClick={() => toggleStock(product.id)}
                      className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[11px] font-bold transition-all ${
                        product.inStock
                          ? 'bg-[#ecfdf5] text-[#005E23] hover:bg-[#d1fae5]'
                          : 'bg-red-50 text-red-600 hover:bg-red-100'
                      }`}
                    >
                      {product.inStock ? (
                        <>
                          <CheckCircle2 size={13} />
                          <span>In Stock</span>
                        </>
                      ) : (
                        <>
                          <XCircle size={13} />
                          <span>Out of Stock</span>
                        </>
                      )}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

