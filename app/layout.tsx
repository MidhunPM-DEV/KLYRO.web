import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Geist_Mono } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/src/context/CartContext";
import CartDrawer from "@/src/components/cart/CartDrawer";
import SearchModal from "@/src/components/search/SearchModal";
import ProductDetailModal from "@/src/components/product/ProductDetailModal";

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "KLYRO | Smart Living. Better Choices.",
  description:
    "Discover thoughtfully selected smart home, kitchen, and nursery essentials designed for everyday living.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${plusJakarta.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-white text-[#151515]">
        <CartProvider>
          {children}
          <CartDrawer />
          <SearchModal />
          <ProductDetailModal />
        </CartProvider>
      </body>
    </html>
  );
}
