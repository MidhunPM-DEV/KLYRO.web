import Navbar from "@/src/components/layout/Navbar";
import Footer from "@/src/components/layout/Footer";

export const metadata = {
  title: "Refund & Return Policy — KLYRO",
  description: "KLYRO's 7-day replacement policy and refund process explained clearly.",
};

export default function RefundPolicyPage() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />

      {/* Hero */}
      <div className="bg-[#F7F8F6] border-b border-[#E8ECE6] py-12 sm:py-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <p className="text-xs font-bold uppercase tracking-widest text-[#005E23]">Policy</p>
          <h1 className="mt-3 text-4xl font-black tracking-tight text-[#151515]">Refund & Return Policy</h1>
          <p className="mt-3 text-sm text-[#777777]">Last updated: November 2026</p>
        </div>
      </div>

      {/* Quick Summary Cards */}
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 pt-10">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { icon: "📦", title: "7-Day Replacement", desc: "Report issues within 7 days of delivery." },
            { icon: "✅", title: "Easy Process", desc: "Just WhatsApp us with photos/video." },
            { icon: "⚡", title: "Fast Resolution", desc: "Replacement dispatched within 2–3 business days." },
          ].map((card) => (
            <div key={card.title} className="rounded-2xl border border-[#E8ECE6] bg-[#F7F8F6] p-5 text-center">
              <div className="text-3xl mb-2">{card.icon}</div>
              <p className="text-sm font-black text-[#151515]">{card.title}</p>
              <p className="text-xs text-[#777777] mt-1 leading-relaxed">{card.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-14 space-y-10 text-[#333333]">

        <Section title="1. Our 7-Day Replacement Guarantee">
          <p>At KLYRO, every product is backed by a <strong>7-Day Replacement Guarantee</strong>. If your product arrives damaged, defective, or is significantly different from what was described, we will replace it at no extra cost.</p>
          <p>The 7-day window begins from the date of delivery as recorded by our courier partner.</p>
        </Section>

        <Section title="2. Eligible Reasons for Return / Replacement">
          <p>We accept replacement requests for the following reasons:</p>
          <ul>
            <li><strong>Dead on Arrival (DOA):</strong> Product is completely non-functional upon first use.</li>
            <li><strong>Physical damage:</strong> Broken, cracked, or visibly damaged due to shipping.</li>
            <li><strong>Wrong item delivered:</strong> You received a different product or variant than what you ordered.</li>
            <li><strong>Missing parts:</strong> Accessories or components listed in the product description are absent.</li>
            <li><strong>Manufacturing defect:</strong> Product fails within 7 days of normal use due to a factory fault.</li>
          </ul>
        </Section>

        <Section title="3. Non-Eligible Cases">
          <p>Replacement requests will <strong>not</strong> be accepted for:</p>
          <ul>
            <li>Damage caused by misuse, drops, water exposure, or improper handling.</li>
            <li>Requests raised after 7 days of delivery.</li>
            <li>Products with removed or tampered serial numbers or warranty stickers.</li>
            <li>Normal wear and tear from regular use.</li>
            <li>Change of mind or ordering the wrong variant (please check product details carefully before ordering).</li>
          </ul>
        </Section>

        <Section title="4. How to Raise a Return / Replacement Request">
          <p>Follow these simple steps:</p>
          <ul>
            <li><strong>Step 1:</strong> Take clear photos or a short video of the defective / damaged product.</li>
            <li><strong>Step 2:</strong> WhatsApp us at <strong>+91 92926 74447</strong> with your Order ID (e.g. KLY-XXXXX), photos/video, and a brief description of the issue.</li>
            <li><strong>Step 3:</strong> Our support team will review your request within 24 hours and confirm eligibility.</li>
            <li><strong>Step 4:</strong> If eligible, we will arrange a reverse pickup and dispatch the replacement within 2–3 business days of receiving the returned item.</li>
          </ul>
        </Section>

        <Section title="5. Refunds">
          <p>KLYRO primarily offers <strong>product replacements</strong> rather than monetary refunds. However, a refund will be issued in the following situations:</p>
          <ul>
            <li>The exact product is out of stock and no suitable alternative is available.</li>
            <li>Delivery was unsuccessful after 3 attempts and the product was returned to us.</li>
            <li>You were charged for a product you never received (payment-confirmed orders only).</li>
          </ul>
          <p>Refunds, when applicable, are processed within <strong>5–7 business days</strong> to the original payment method (UPI / bank transfer).</p>
        </Section>

        <Section title="6. Return Shipping">
          <ul>
            <li>For eligible returns, KLYRO arranges a <strong>free reverse pickup</strong>.</li>
            <li>If reverse pickup is unavailable at your location, we will reimburse reasonable courier charges (up to ₹100) upon sharing the courier receipt.</li>
            <li>Please pack the product securely in its original packaging (if available) before handing it to the courier.</li>
          </ul>
        </Section>

        <Section title="7. Warranty">
          <p>Most KLYRO products come with a <strong>manufacturer warranty</strong> (typically 6–12 months). Warranty terms vary by product and are mentioned on individual product pages.</p>
          <p>Warranty claims after the 7-day replacement window are handled directly with the manufacturer. Our support team will assist you in the process.</p>
        </Section>

        <Section title="8. Contact for Returns">
          <p>For all return, replacement, or refund queries, reach our dedicated support team:</p>
          <ul>
            <li><strong>WhatsApp:</strong> +91 92926 74447 (Mon–Sat, 9 AM – 7 PM IST)</li>
            <li><strong>Email:</strong> klyrotrade@gmail.com</li>
          </ul>
          <p>Please have your Order ID ready when contacting support for faster resolution.</p>
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
