'use client';

import { useState } from "react";
import { Star, MessageCircle, CheckCircle2 } from "lucide-react";
import { Product } from "@/src/types";
import { useCart } from "@/src/context/CartContext";
import AddToCartButton from "@/src/components/buttons/AddToCartButton";

export default function ProductPurchaseSection({ product }: { product: Product }) {
  const { addToCart, generateSingleProductWhatsAppUrl } = useCart();
  const [selectedVariant, setSelectedVariant] = useState(
    product.variants?.[0]?.options[0] || ""
  );
  const [quantity, setQuantity] = useState(1);

  const formatPrice = (amount: number) => `₹${amount.toLocaleString('en-IN')}`;

  const handleAddToCart = () => {
    addToCart(product, quantity, selectedVariant);
  };

  const handleWhatsAppOrder = () => {
    const url = generateSingleProductWhatsAppUrl(product, quantity, selectedVariant);
    window.open(url, "_blank");
  };

  return (
    <div className="space-y-6">
      <div>
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold uppercase tracking-wider text-[#005E23]">
            {product.category}
          </span>
          <span className="inline-flex items-center gap-1 rounded-full bg-[#ecfdf5] px-2.5 py-1 text-[11px] font-bold text-[#005E23]">
            <CheckCircle2 size={12} /> In Stock
          </span>
        </div>

        <h1 className="mt-2 text-2xl sm:text-3xl font-black tracking-[-0.03em] text-[#151515]">
          {product.name}
        </h1>

        {/* Rating */}
        <div className="mt-2.5 flex items-center gap-2">
          <div className="flex items-center gap-1 text-[#005E23]">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                size={14}
                className={i < Math.floor(product.rating) ? "fill-[#005E23]" : "fill-transparent text-[#CCCCCC]"}
              />
            ))}
          </div>
          <span className="text-xs font-bold text-[#151515]">{product.rating}</span>
          <span className="text-xs text-[#777777]">({product.reviewsCount} customer reviews)</span>
        </div>
      </div>

      {/* Pricing Row */}
      <div className="flex items-baseline gap-3 rounded-2xl bg-[#F7F8F6] p-4 border border-[#E8ECE6]">
        <span className="text-3xl font-black text-[#151515]">
          {formatPrice(product.price)}
        </span>
        {product.originalPrice > product.price && (
          <span className="text-sm font-medium text-[#777777] line-through">
            {formatPrice(product.originalPrice)}
          </span>
        )}
        {product.discount > 0 && (
          <span className="ml-auto rounded-full bg-[#005E23] px-3 py-1 text-xs font-bold uppercase tracking-wider text-white">
            Save {product.discount}%
          </span>
        )}
      </div>

      {/* Short Description */}
      <p className="text-xs sm:text-sm text-[#555555] leading-relaxed">
        {product.description}
      </p>

      {/* Variant Selector */}
      {product.variants && product.variants.length > 0 && (
        <div className="pt-2">
          <span className="text-xs font-bold uppercase tracking-wider text-[#151515]">
            Choose {product.variants[0].name}: <span className="text-[#005E23] font-black">{selectedVariant}</span>
          </span>
          <div className="mt-2.5 flex flex-wrap gap-2.5">
            {product.variants[0].options.map((opt) => (
              <button
                key={opt}
                type="button"
                onClick={() => setSelectedVariant(opt)}
                className={`rounded-full px-4 py-2 text-xs font-bold transition-all ${selectedVariant === opt
                  ? "bg-[#005E23] text-white shadow-sm ring-2 ring-[#005E23]/20"
                  : "border border-[#E8ECE6] bg-white text-[#151515] hover:border-[#005E23]"
                  }`}
              >
                {opt}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Quantity Selector */}
      <div className="flex items-center gap-4 pt-1">
        <span className="text-xs font-bold uppercase tracking-wider text-[#151515]">
          Quantity:
        </span>
        <div className="flex items-center rounded-full border border-[#E8ECE6] bg-[#F7F8F6] p-1">
          <button
            type="button"
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
            className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-sm font-bold shadow-sm hover:bg-[#F0F2EE]"
          >
            -
          </button>
          <span className="w-10 text-center text-xs font-bold text-[#151515]">
            {quantity}
          </span>
          <button
            type="button"
            onClick={() => setQuantity(quantity + 1)}
            className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-sm font-bold shadow-sm hover:bg-[#F0F2EE]"
          >
            +
          </button>
        </div>
      </div>

      {/* Dual CTA Buttons */}
      <div className="pt-4 space-y-3">
        <AddToCartButton
          onClick={handleAddToCart}
          showPrice={true}
          price={product.price * quantity}
          size="lg"
        />

        <button
          type="button"
          onClick={handleWhatsAppOrder}
          className="flex w-full items-center justify-center gap-2 rounded-xl border-2 border-[#25D366] bg-[#25D366] py-3.5 px-4 text-xs font-bold tracking-wide text-white transition-all duration-200 shadow-sm hover:bg-[#20ba5a] active:scale-98"
        >
          <MessageCircle size={17} />
          <span>Quick Order via WhatsApp</span>
        </button>
      </div>
    </div>
  );
}

