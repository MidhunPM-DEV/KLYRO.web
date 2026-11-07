import Link from "next/link";
import Navbar from "@/src/components/layout/Navbar";
import Footer from "@/src/components/layout/Footer";

export const metadata = {
  title: "Privacy Policy — KLYRO",
  description: "Learn how KLYRO collects, uses, and protects your personal information.",
};

export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />

      {/* Hero */}
      <div className="bg-[#F7F8F6] border-b border-[#E8ECE6] py-12 sm:py-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <p className="text-xs font-bold uppercase tracking-widest text-[#005E23]">Legal</p>
          <h1 className="mt-3 text-4xl font-black tracking-tight text-[#151515]">Privacy Policy</h1>
          <p className="mt-3 text-sm text-[#777777]">Last updated: November 2026</p>
        </div>
      </div>

      {/* Content */}
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-14 space-y-10 text-[#333333]">

        <Section title="1. Information We Collect">
          <p>When you place an order or interact with KLYRO, we collect the following information:</p>
          <ul>
            <li><strong>Personal details:</strong> Full name, mobile number, and email address (optional).</li>
            <li><strong>Delivery address:</strong> House/building, street, city, state, PIN code, and landmark.</li>
            <li><strong>Order details:</strong> Products ordered, quantities, variants, and total amount.</li>
            <li><strong>Newsletter signups:</strong> Email address, if you choose to subscribe.</li>
            <li><strong>Inquiry messages:</strong> Name, phone, and message content when you contact support.</li>
          </ul>
          <p>We do <strong>not</strong> collect payment card details. All payments are handled via WhatsApp-confirmed COD (Cash on Delivery) or UPI links shared directly with you.</p>
        </Section>

        <Section title="2. How We Use Your Information">
          <p>Your information is used exclusively to:</p>
          <ul>
            <li>Process and fulfill your orders.</li>
            <li>Contact you via WhatsApp or phone for order confirmation, shipping updates, and delivery tracking.</li>
            <li>Send you KLYRO newsletters and promotional offers (only if you subscribed).</li>
            <li>Respond to your support inquiries and warranty requests.</li>
            <li>Improve our product catalog and customer experience.</li>
          </ul>
          <p>We never sell, rent, or trade your personal information to any third party for marketing purposes.</p>
        </Section>

        <Section title="3. WhatsApp Communication">
          <p>KLYRO primarily uses WhatsApp to confirm orders, share courier tracking links, and handle customer support. By placing an order, you consent to receiving order-related messages on the mobile number you provided.</p>
          <p>You can opt out of promotional WhatsApp messages at any time by replying <strong>STOP</strong> or messaging our support desk.</p>
        </Section>

        <Section title="4. Data Storage & Security">
          <p>Order data, subscriber emails, and inquiry records are stored securely on our servers. We use standard technical safeguards to protect your information from unauthorized access or disclosure.</p>
          <p>We retain order data for a minimum of 12 months for warranty and return purposes, then archive or delete it according to our internal retention policy.</p>
        </Section>

        <Section title="5. Cookies">
          <p>KLYRO's website uses only essential session cookies required for the shopping cart to function. We do not use tracking, advertising, or analytics cookies.</p>
        </Section>

        <Section title="6. Third-Party Services">
          <p>We use the following third-party services:</p>
          <ul>
            <li><strong>WhatsApp Business</strong> — order confirmation and customer support.</li>
            <li><strong>Courier partners</strong> (BlueDart, DTDC, etc.) — for shipment delivery; your name and address are shared with them.</li>
            <li><strong>Unsplash</strong> — product imagery (no personal data involved).</li>
          </ul>
        </Section>

        <Section title="7. Your Rights">
          <p>You have the right to:</p>
          <ul>
            <li>Request a copy of the personal data we hold about you.</li>
            <li>Request correction or deletion of your data.</li>
            <li>Opt out of newsletters at any time.</li>
          </ul>
          <p>To exercise any of these rights, contact us via WhatsApp or email at <strong>klyrotrade@gmail.com</strong>.</p>
        </Section>

        <Section title="8. Changes to This Policy">
          <p>We may update this Privacy Policy periodically. The "Last updated" date at the top of this page will reflect the most recent changes. Continued use of KLYRO after changes constitutes your acceptance of the revised policy.</p>
        </Section>

        <Section title="9. Contact Us">
          <p>For privacy-related questions, reach us at:</p>
          <ul>
            <li><strong>Email:</strong> klyrotrade@gmail.com</li>
            <li><strong>WhatsApp:</strong> +91 92926 74447</li>
          </ul>
        </Section>

      </div>

      <Footer />
    </main>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="space-y-3">
      <h2 className="text-lg font-black text-[#151515] border-l-4 border-[#005E23] pl-3">{title}</h2>
      <div className="space-y-3 text-sm leading-relaxed [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:space-y-1.5 [&_strong]:font-bold [&_strong]:text-[#151515]">
        {children}
      </div>
    </section>
  );
}
