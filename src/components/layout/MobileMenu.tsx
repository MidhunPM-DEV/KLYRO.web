import Link from "next/link";
import { Menu } from "lucide-react";

const links = [
  { label: "Home", href: "/" },
  { label: "Shop", href: "/shop" },
  { label: "Categories", href: "#categories" },
  { label: "Deals", href: "#deals" },
  { label: "New arrivals", href: "#new-arrivals" },
];

export default function MobileMenu() {
  return (
    <details className="relative lg:hidden">
      <summary className="flex cursor-pointer list-none items-center rounded-full p-2 text-[#171717] [&::-webkit-details-marker]:hidden">
        <span className="sr-only">Open navigation menu</span>
        <Menu size={22} strokeWidth={1.7} />
      </summary>
      <div className="absolute right-0 top-12 z-30 w-64 rounded-2xl border border-black/10 bg-white p-3 shadow-xl">
        {links.map((link) => (
          <Link
            key={link.label}
            href={link.href}
            className="block rounded-xl px-4 py-3 text-sm font-medium text-[#383838] transition-colors hover:bg-[#f5f4f1]"
          >
            {link.label}
          </Link>
        ))}
        <Link
          href="#sign-in"
          className="mt-2 block rounded-xl bg-[#171717] px-4 py-3 text-center text-sm font-semibold text-white"
        >
          Sign in
        </Link>
      </div>
    </details>
  );
}
