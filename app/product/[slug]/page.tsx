import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ChevronRight, ShieldCheck, Truck, RefreshCw, CheckCircle2 } from "lucide-react";
import Navbar from "@/src/components/layout/Navbar";
import Footer from "@/src/components/layout/Footer";
import ProductCard from "@/src/components/product/ProductCard";
import ProductPurchaseSection from "./ProductPurchaseSection";
import { products, getProductBySlug, getProductsByCategory } from "@/src/data/products";

export function generateStaticParams() {
  return products.map((p) => ({
    slug: p.slug,
  }));
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const relatedProducts = getProductsByCategory(product.categorySlug)
    .filter((p) => p.id !== product.id)
    .slice(0, 4);

  return (
    <main className="min-h-screen bg-white">
      <Navbar />

      {/* Breadcrumb Navigation */}
      <div className="border-b border-[#E8ECE6] bg-[#F7F8F6] py-3.5">
        <div className="mx-auto flex max-w-7xl items-center gap-2 px-4 text-xs font-semibold text-[#777777] sm:px-6 lg:px-8">
          <Link href="/" className="hover:text-[#005E23]">Home</Link>
          <ChevronRight size={13} />
          <Link href="/shop" className="hover:text-[#005E23]">Shop</Link>
          <ChevronRight size={13} />
          <Link href={`/shop?category=${product.categorySlug}`} className="hover:text-[#005E23] line-clamp-1">
            {product.category}
          </Link>
          <ChevronRight size={13} />
          <span className="text-[#151515] line-clamp-1">{product.name}</span>
        </div>
      </div>

      {/* Product Main Section */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 lg:py-16">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
          
          {/* Left Column (7 cols): Images & Specifications */}
          <div className="lg:col-span-7">
            {/* Main Image */}
            <div className="relative aspect-square sm:aspect-4/3 w-full overflow-hidden rounded-3xl border border-[#E8ECE6] bg-[#F7F8F6] shadow-sm">
              <Image
                src={product.images[0]}
                alt={product.name}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 55vw"
                className="object-cover object-center"
              />
              {product.discount > 0 && (
                <span className="absolute left-4 top-4 rounded-full bg-[#005E23] px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider text-white shadow-md">
                  {product.discount}% OFF
                </span>
              )}
            </div>

            {/* Additional Images Thumbnails if available */}
            {product.images.length > 1 && (
              <div className="mt-4 grid grid-cols-4 gap-3">
                {product.images.map((img, idx) => (
                  <div
                    key={idx}
                    className="relative aspect-square overflow-hidden rounded-2xl border border-[#E8ECE6] bg-[#F7F8F6]"
                  >
                    <Image src={img} alt="" fill className="object-cover" />
                  </div>
                ))}
              </div>
            )}

            {/* Features & Detailed Specs */}
            <div className="mt-12 rounded-3xl border border-[#E8ECE6] bg-[#F7F8F6] p-6 sm:p-8">
              <h3 className="text-base font-bold text-[#151515]">
                Key Product Features
              </h3>
              <ul className="mt-4 space-y-2.5">
                {product.features.map((feat, i) => (
                  <li key={i} className="flex items-start gap-3 text-xs leading-relaxed text-[#444444]">
                    <CheckCircle2 size={16} className="text-[#005E23] shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>

              {product.specs && Object.keys(product.specs).length > 0 && (
                <div className="mt-8 pt-6 border-t border-[#E8ECE6]">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#151515]">
                    Specifications
                  </h4>
                  <div className="mt-3 grid grid-cols-2 gap-3 text-xs">
                    {Object.entries(product.specs).map(([k, v]) => (
                      <div key={k} className="rounded-xl bg-white p-3 border border-[#E8ECE6]">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-[#777777] block">{k}</span>
                        <span className="font-semibold text-[#151515] mt-0.5 block">{v}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right Column (5 cols): Details, Variant Selection & Purchase Actions */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <ProductPurchaseSection product={product} />

            {/* Trust Service Guarantee Highlights */}
            <div className="mt-8 rounded-2xl border border-[#E8ECE6] bg-white p-5 space-y-3.5">
              <div className="flex items-center gap-3 text-xs text-[#444444]">
                <Truck size={17} className="text-[#005E23] shrink-0" />
                <span><strong>Free Express Delivery</strong> on all orders above ₹499.</span>
              </div>
              <div className="flex items-center gap-3 text-xs text-[#444444]">
                <RefreshCw size={17} className="text-[#005E23] shrink-0" />
                <span><strong>7-Day Easy Replacement</strong> for transit damage or defects.</span>
              </div>
              <div className="flex items-center gap-3 text-xs text-[#444444]">
                <ShieldCheck size={17} className="text-[#005E23] shrink-0" />
                <span><strong>100% Genuine</strong> verified and inspected product.</span>
              </div>
            </div>
          </div>

        </div>

        {/* Related Products Carousel / Grid */}
        {relatedProducts.length > 0 && (
          <div className="mt-20 pt-12 border-t border-[#E8ECE6]">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#005E23]">
                  Matching Essentials
                </span>
                <h3 className="mt-1 text-2xl font-black text-[#151515]">
                  More from {product.category}
                </h3>
              </div>
              <Link
                href={`/shop?category=${product.categorySlug}`}
                className="text-xs font-bold text-[#005E23] hover:underline"
              >
                View Category &rarr;
              </Link>
            </div>

            <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {relatedProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}

      </div>

      <Footer />
    </main>
  );
}
