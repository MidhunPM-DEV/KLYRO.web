import Navbar from "@/src/components/layout/Navbar";
import Footer from "@/src/components/layout/Footer";

export const metadata = {
  title: "Terms of Service — KLYRO",
  description: "Read KLYRO's terms and conditions for using our website and purchasing products.",
};

export default function TermsOfServicePage() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />

      {/* Hero */}
      <div className="bg-[#F7F8F6] border-b border-[#E8ECE6] py-12 sm:py-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <p className="text-xs font-bold uppercase tracking-widest text-[#005E23]">Legal</p>
          <h1 className="mt-3 text-4xl font-black tracking-tight text-[#151515]">Terms of Service</h1>
          <p className="mt-3 text-sm text-[#777777]">Last updated: November 2026</p>
        </div>
      </div>

      {/* Content */}
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-14 space-y-10 text-[#333333]">

        <Section title="1. Acceptance of Terms">
          <p>By accessing and using the KLYRO website (klyro.com) or placing an order with us, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our website or services.</p>
        </Section>

        <Section title="2. About KLYRO">
          <p>KLYRO is an Indian e-commerce store offering smart home, kitchen, nursery, and lifestyle products. We operate primarily through our website and WhatsApp-based order confirmation.</p>
          <p>Our tagline is <strong>"Smart Living. Better Choices."</strong> — and every product in our catalog is hand-selected to reflect that promise.</p>
        </Section>

        <Section title="3. Product Information">
          <p>We make every effort to ensure product descriptions, images, and specifications are accurate. However:</p>
          <ul>
            <li>Product colors may vary slightly due to screen display differences.</li>
            <li>Specifications are sourced from manufacturers and may change without prior notice.</li>
            <li>Stock availability is updated in real-time but cannot be guaranteed at the exact moment of purchase during peak demand.</li>
          </ul>
        </Section>

        <Section title="4. Ordering Process">
          <p>KLYRO uses a WhatsApp-based confirmation model:</p>
          <ul>
            <li>You fill in your order and delivery details on our website.</li>
            <li>You are redirected to WhatsApp to confirm the order with our support team.</li>
            <li>The order is confirmed only after our team sends an acknowledgement message.</li>
            <li>An Order ID (e.g. KLY-XXXXX) is generated for tracking.</li>
          </ul>
          <p>We reserve the right to cancel or modify any order in cases of pricing errors, stock unavailability, or suspected fraudulent activity.</p>
        </Section>

        <Section title="5. Pricing & Payment">
          <ul>
            <li>All prices are listed in Indian Rupees (₹) inclusive of applicable taxes.</li>
            <li>Shipping is <strong>FREE</strong> on orders above ₹499. A flat fee of ₹49 applies for orders below ₹499.</li>
            <li>Payment is accepted via Cash on Delivery (COD) or UPI/online payment links shared over WhatsApp.</li>
            <li>KLYRO does not store any payment card or UPI credentials.</li>
          </ul>
        </Section>

        <Section title="6. Shipping & Delivery">
          <ul>
            <li>We ship across India via reputed courier partners.</li>
            <li>Estimated delivery time is 4–7 business days from order confirmation.</li>
            <li>Delivery timelines may vary due to location, public holidays, or courier delays beyond our control.</li>
            <li>Tracking information is shared over WhatsApp once your order is dispatched.</li>
          </ul>
        </Section>

        <Section title="7. Intellectual Property">
          <p>All content on this website — including product images, descriptions, logos, and design — is owned by or licensed to KLYRO. You may not copy, reproduce, or redistribute any content without prior written permission.</p>
        </Section>

        <Section title="8. Limitation of Liability">
          <p>KLYRO shall not be liable for any indirect, incidental, or consequential damages arising from the use of our products or website. Our maximum liability is limited to the value of the product purchased.</p>
        </Section>

        <Section title="9. Governing Law">
          <p>These Terms shall be governed by and construed in accordance with the laws of India. Any disputes shall be subject to the exclusive jurisdiction of courts in Kerala, India.</p>
        </Section>

        <Section title="10. Modifications">
          <p>KLYRO reserves the right to update these Terms at any time. Continued use of the website after changes are posted constitutes your acceptance of the revised terms.</p>
        </Section>

        <Section title="11. Contact">
          <p>For questions about these Terms:</p>
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
