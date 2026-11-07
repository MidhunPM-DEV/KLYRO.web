import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'KLYRO Admin Workspace',
  description: 'Control center for KLYRO Store orders, catalog, and customer support.',
};

export default function AdminRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-[#F7F8F6] text-[#151515] antialiased">
        {children}
      </body>
    </html>
  );
}

