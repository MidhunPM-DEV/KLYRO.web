'use client';

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { ShoppingBag, Eye, Check, Star } from "lucide-react";
import { Product } from "@/src/types";
import { useCart } from "@/src/context/CartContext";

interface ProductCardProps {
  product: Product;
  priorityImage?: boolean;
}

export default function ProductCard({ product, priorityImage = false }: ProductCardProps) {
  const { addToCart, openQuickView } = useCart();
  const [added, setAdded] = useState(false);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1, product.variants?.[0]?.options[0]);
    setAdded(true);
    setTimeout(() => setAdded(false), 1600);
  };

  const handleQuickView = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    openQuickView(product);
  };

  const formatPrice = (amount: number) => `₹${amount.toLocaleString('en-IN')}`;

  return (
    <div className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-[#E8ECE6] bg-white p-4 transition-all duration-300 hover:border-[#005E23]/40 hover:shadow-[0_12px_36px_rgba(0,0,0,0.06)] sm:p-5">
      {/* Top Media Area */}
      <div className="relative">
        {/* Discount Badge */}
        {product.discount > 0 && (
          <span className="absolute left-2.5 top-2.5 z-10 rounded-full bg-[#005E23] px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-white shadow-sm">
            {product.discount}% OFF
          </span>
        )}

        {/* Quick View Button */}
        <button
          type="button"
          onClick={handleQuickView}
          aria-label={`Quick view ${product.name}`}
          className="absolute right-2.5 top-2.5 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-white/95 text-[#151515] opacity-0 shadow-md backdrop-blur-sm transition-all duration-200 hover:bg-[#005E23] hover:text-white group-hover:opacity-100"
        >
          <Eye size={15} />
        </button>

        {/* Product Image Link */}
        <Link
          href={`/product/${product.slug}`}
          className="relative block aspect-square w-full overflow-hidden rounded-xl bg-[#F7F8F6]"
        >
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            priority={priorityImage}
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover object-center transition-transform duration-500 ease-out group-hover:scale-106"
          />
        </Link>
      </div>

      {/* Product Content Details */}
      <div className="mt-4 flex flex-1 flex-col justify-between">
        <div>
          {/* Category & Rating */}
          <div className="flex items-center justify-between text-[11px] font-bold uppercase tracking-wider text-[#777777]">
            <span>{product.category}</span>
            <div className="flex items-center gap-1 text-[#151515]">
              <Star size={11} className="fill-[#005E23] text-[#005E23]" />
              <span>{product.rating}</span>
            </div>
          </div>

          {/* Product Name */}
          <h3 className="mt-1.5 text-[15px] font-bold text-[#151515] transition-colors line-clamp-1 group-hover:text-[#005E23]">
            <Link href={`/product/${product.slug}`}>
              {product.name}
            </Link>
          </h3>

          {/* Short Description */}
          <p className="mt-1 text-xs text-[#777777] line-clamp-2 leading-relaxed">
            {product.description}
          </p>
        </div>

        {/* Pricing & CTA Actions */}
        <div className="mt-4 pt-3 border-t border-[#F2F4F0]">
          {/* Price Row */}
          <div className="flex items-baseline gap-2 mb-3">
            <span className="text-lg font-black tracking-tight text-[#151515]">
              {formatPrice(product.price)}
            </span>
            {product.originalPrice > product.price && (
              <span className="text-xs text-[#777777] line-through font-medium">
                {formatPrice(product.originalPrice)}
              </span>
            )}
          </div>

          {/* Buttons: Add to Cart & Product Details */}
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={handleAddToCart}
              className={`flex items-center justify-center gap-1.5 rounded-full py-2.5 px-2 text-xs font-bold transition-all duration-200 shadow-sm active:scale-95 ${
                added
                  ? "bg-[#003D16] text-white"
                  : "bg-[#005E23] text-white hover:bg-[#004719]"
              }`}
            >
              {added ? (
                <>
                  <Check size={14} strokeWidth={2.5} />
                  <span>Added</span>
                </>
              ) : (
                <>
                  <ShoppingBag size={14} />
                  <span>Add to Cart</span>
                </>
              )}
            </button>

            <Link
              href={`/product/${product.slug}`}
              className="flex items-center justify-center rounded-full border border-[#E8ECE6] bg-white py-2.5 px-2 text-xs font-semibold text-[#151515] transition-colors duration-150 hover:bg-[#F7F8F6] hover:text-[#005E23] text-center"
            >
              Details
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

