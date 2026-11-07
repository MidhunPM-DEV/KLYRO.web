import Link from "next/link";
import Image from "next/image";
import type { ReactNode } from "react";
import { Search, ShoppingBag } from "lucide-react";
import MobileMenu from "./MobileMenu";

const links = [
  { label: "Home", href: "/" },
  { label: "Shop", href: "/shop" },
  { label: "Categories", href: "#categories" },
  { label: "Deals", href: "#deals" },
  { label: "New arrivals", href: "#new-arrivals" },
];

function IconLink({ label, href, children }: { label: string; href: string; children: ReactNode }) {
  return (
    <Link href={href} aria-label={label} className="text-[#343434] transition-colors hover:text-[#8b5e3c]">
      {children}
    </Link>
  );
}

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-20 border-b border-black/10 bg-[#fbfaf8]/95 backdrop-blur-md">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between gap-6 px-5 lg:grid lg:grid-cols-[1fr_auto_auto] lg:px-8">
        <Link href="/" className="shrink-0" aria-label="KLYRO home">
          <Image
            src="https://www.klyroo.online/images/klyro-logo.png"
            alt="KLYRO"
            width={126}
            height={20}
            priority
            className="h-auto w-26 object-contain"
          />
        </Link>

        <div className="hidden items-center justify-self-end gap-10 pr-10 lg:flex">
          {links.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="text-[13px] font-medium text-[#454545] transition-colors hover:text-[#8b5e3c]"
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-4 lg:justify-self-end">
          <div className="hidden items-center gap-4 sm:flex">
            <IconLink label="Search" href="#search">
              <Search size={19} strokeWidth={1.6} />
            </IconLink>
            <IconLink label="Shopping bag" href="#bag">
              <ShoppingBag size={19} strokeWidth={1.6} />
            </IconLink>
          </div>
          <MobileMenu />
        </div>
      </div>
    </nav>
  );
}
