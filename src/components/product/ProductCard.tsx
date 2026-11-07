'use client';

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Heart, ShoppingCart, Check, Star, Eye } from "lucide-react";
import { Product } from "@/src/types";
import { useCart } from "@/src/context/CartContext";

interface ProductCardProps {
  product: Product;
  priorityImage?: boolean;
}

export default function ProductCard({ product, priorityImage = false }: ProductCardProps) {
  const { addToCart, openQuickView } = useCart();
  const [added, setAdded] = useState(false);
  const [isWishlisted, setIsWishlisted] = useState(false);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1, product.variants?.[0]?.options[0], false);
    setAdded(true);
    setTimeout(() => setAdded(false), 1600);
  };

  const handleBuyNow = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1, product.variants?.[0]?.options[0], true);
  };

  const handleQuickView = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    openQuickView(product);
  };

  const handleToggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsWishlisted((prev) => !prev);
  };

  const formatPrice = (amount: number) => `₹${amount.toLocaleString('en-IN')}`;

  return (
    <div className="group relative flex flex-col justify-between overflow-hidden rounded-[26px] border border-[#272930] bg-gradient-to-b from-[#18191E] via-[#141518] to-[#101114] p-4 text-white shadow-[0_12px_32px_rgba(0,0,0,0.22)] transition-all duration-300 hover:border-[#005E23]/60 hover:shadow-[0_16px_40px_rgba(0,94,35,0.25)] sm:p-5">
      {/* Subtle ambient green glow in top-left */}
      <div className="pointer-events-none absolute -top-10 -left-10 h-32 w-32 rounded-full bg-[#005E23]/20 blur-2xl transition-opacity duration-300 group-hover:bg-[#005E23]/35" />

      {/* Top Media & Actions Header */}
      <div>
        <div className="relative z-10 flex items-center justify-between">
          {/* Top-Left Discount Pill Badge */}
          {product.discount > 0 ? (
            <span className="rounded-full bg-[#007A2F] px-3 py-1 text-[11px] font-bold tracking-wider text-white shadow-sm">
              -{product.discount}% OFF
            </span>
          ) : (
            <span className="rounded-full bg-white/10 px-3 py-1 text-[11px] font-semibold tracking-wider text-white/80">
              NEW
            </span>
          )}

          {/* Top-Right Action Icons: Quick View & Wishlist Heart */}
          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={handleQuickView}
              aria-label={`Quick view ${product.name}`}
              className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-white/80 opacity-0 backdrop-blur-sm transition-all duration-200 hover:bg-white hover:text-[#151515] group-hover:opacity-100"
              title="Quick View"
            >
              <Eye size={15} />
            </button>

            <button
              type="button"
              onClick={handleToggleWishlist}
              aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
              className="flex h-8 w-8 items-center justify-center rounded-full text-white/85 transition-transform duration-200 hover:scale-115 active:scale-95"
            >
              <Heart
                size={20}
                className={`transition-colors duration-200 ${
                  isWishlisted
                    ? "fill-[#EF4444] text-[#EF4444]"
                    : "text-white/90 hover:text-white"
                }`}
              />
            </button>
          </div>
        </div>

        {/* Product Image Stage */}
        <div className="relative mt-2 flex aspect-square sm:aspect-[4/3.5] w-full items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-b from-white/[0.03] to-black/30 p-2">
          <Link
            href={`/product/${product.slug}`}
            className="relative block h-full w-full"
          >
            <Image
              src={product.images[0]}
              alt={product.name}
              fill
              priority={priorityImage}
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
              className="object-contain object-center transition-transform duration-500 ease-out group-hover:scale-106"
            />
          </Link>

          {/* Carousel Slide Indicators matching reference */}
          <div className="pointer-events-none absolute bottom-2.5 left-0 right-0 flex items-center justify-center gap-1.5">
            <span className="h-1.5 w-4 rounded-full bg-[#00873E] shadow-[0_0_8px_rgba(0,135,62,0.6)]" />
            <span className="h-1.5 w-6 rounded-full bg-white/35" />
          </div>
        </div>

        {/* Product Content Details */}
        <div className="mt-3.5">
          {/* Category in clean uppercase */}
          <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#9CA3AF]">
            {product.category}
          </span>

          {/* Product Name */}
          <h3 className="mt-1 text-[15px] sm:text-base font-semibold leading-snug text-white transition-colors line-clamp-2 group-hover:text-[#4ade80]">
            <Link href={`/product/${product.slug}`}>
              {product.name}
            </Link>
          </h3>

          {/* Pricing Row */}
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-xl sm:text-[22px] font-extrabold tracking-tight text-[#00E676]">
              {formatPrice(product.price)}
            </span>
            {product.originalPrice > product.price && (
              <span className="text-xs font-normal text-[#9CA3AF] line-through">
                {formatPrice(product.originalPrice)}
              </span>
            )}
          </div>

          {/* Rating & Review count */}
          <div className="mt-1.5 flex items-center gap-1.5 text-xs">
            <Star size={13} className="fill-[#F59E0B] text-[#F59E0B]" />
            <span className="font-semibold text-white">{product.rating.toFixed(1)}</span>
            <span className="text-[#9CA3AF]">
              ({product.reviewsCount || 95} reviews)
            </span>
          </div>
        </div>
      </div>

      {/* Dual CTA Buttons (Matching Reference) */}
      <div className="mt-4 flex flex-col gap-2 pt-1">
        {/* Button 1: Add to Cart (White Pill with Green Cart Icon) */}
        <button
          type="button"
          onClick={handleAddToCart}
          className="flex h-11 w-full items-center justify-center gap-2 rounded-full bg-white text-xs sm:text-[13px] font-bold text-[#005E23] shadow-sm transition-all duration-200 hover:bg-[#F3F4F6] active:scale-[0.98]"
        >
          {added ? (
            <>
              <Check size={16} strokeWidth={2.5} className="text-[#005E23]" />
              <span>Added to Cart</span>
            </>
          ) : (
            <>
              <ShoppingCart size={16} strokeWidth={2.2} className="text-[#005E23]" />
              <span>Add to Cart</span>
            </>
          )}
        </button>

        {/* Button 2: Buy Now (Emerald Green Pill with White Text) */}
        <button
          type="button"
          onClick={handleBuyNow}
          className="flex h-11 w-full items-center justify-center gap-2 rounded-full bg-[#005E23] text-xs sm:text-[13px] font-bold text-white shadow-md transition-all duration-200 hover:bg-[#004719] active:scale-[0.98]"
        >
          <span>Buy Now</span>
        </button>
      </div>
    </div>
  );
}
