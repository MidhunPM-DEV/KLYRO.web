'use client';

import { useState } from 'react';
import Navbar from '@/src/components/layout/Navbar';
import Footer from '@/src/components/layout/Footer';
import { ChevronDown, Package, CreditCard, Truck, HelpCircle, Shield, RefreshCw, MessageCircle } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
  category: string;
}

const faqs: FAQItem[] = [
  // Shopping & Orders
  {
    category: 'Shopping & Orders',
    question: 'How do I place an order on KLYRO?',
    answer: 'Browse our curated collection, click "Buy Now" on your desired product, fill in your delivery details, and confirm via WhatsApp. Our support team will guide you through payment and shipping.',
  },
  {
    category: 'Shopping & Orders',
    question: 'Can I modify or cancel my order?',
    answer: 'Yes! Contact us immediately via WhatsApp at +91 92926 74447 with your Order ID. If your order hasn\'t been shipped yet, we can modify or cancel it for you.',
  },
  {
    category: 'Shopping & Orders',
    question: 'Do you have a minimum order value?',
    answer: 'No minimum order value! Shop any single item or multiple products. Orders above ₹499 qualify for FREE shipping across India.',
  },
  {
    category: 'Shopping & Orders',
    question: 'How can I track my order?',
    answer: 'After your order ships, you\'ll receive a tracking number via WhatsApp. Use our Order Tracking page or the courier\'s website to monitor your delivery in real-time.',
  },

  // Payment
  {
    category: 'Payment',
    question: 'What payment methods do you accept?',
    answer: 'We accept UPI (Google Pay, PhonePe, Paytm), Net Banking, Credit/Debit Cards, and Cash on Delivery (COD) for eligible orders. Payment details are confirmed via WhatsApp.',
  },
  {
    category: 'Payment',
    question: 'Is online payment secure?',
    answer: 'Absolutely! All online transactions are processed through secure, encrypted payment gateways. We never store your card or banking details.',
  },
  {
    category: 'Payment',
    question: 'Can I pay Cash on Delivery (COD)?',
    answer: 'Yes, COD is available for most locations. COD orders may have a nominal handling fee. Availability will be confirmed during order placement.',
  },
  {
    category: 'Payment',
    question: 'When will I be charged?',
    answer: 'For online payments, you\'re charged immediately after order confirmation. For COD, payment is collected upon delivery.',
  },

  // Shipping & Delivery
  {
    category: 'Shipping & Delivery',
    question: 'Do you ship across India?',
    answer: 'Yes! We deliver to all serviceable pin codes across India. Enter your pin code during checkout to verify delivery availability.',
  },
  {
    category: 'Shipping & Delivery',
    question: 'What are the shipping charges?',
    answer: 'Standard shipping is ₹49. FREE shipping on orders above ₹499! Delivery times vary by location (3-7 business days for most areas).',
  },
  {
    category: 'Shipping & Delivery',
    question: 'How long does delivery take?',
    answer: 'Metro cities: 3-5 business days. Other locations: 5-7 business days. Remote areas may take slightly longer. You\'ll receive estimated delivery date at checkout.',
  },
  {
    category: 'Shipping & Delivery',
    question: 'Do you ship internationally?',
    answer: 'Currently, we only ship within India. International shipping is coming soon! Subscribe to our newsletter for updates.',
  },

  // Returns & Refunds
  {
    category: 'Returns & Refunds',
    question: 'What is your return policy?',
    answer: '7-day easy returns on most products! Items must be unused, in original packaging with tags intact. Contact us within 7 days of delivery to initiate a return.',
  },
  {
    category: 'Returns & Refunds',
    question: 'How do I return a product?',
    answer: 'Message us on WhatsApp at +91 92926 74447 with your Order ID and reason for return. We\'ll arrange a free pickup and process your refund once we receive the item.',
  },
  {
    category: 'Returns & Refunds',
    question: 'When will I get my refund?',
    answer: 'Refunds are processed within 5-7 business days after we receive and verify the returned item. The amount will be credited to your original payment method.',
  },
  {
    category: 'Returns & Refunds',
    question: 'Can I exchange a product?',
    answer: 'Currently, we process returns and refunds. You can place a new order for the item you prefer. Contact our support team for assistance.',
  },

  // Products
  {
    category: 'Products',
    question: 'Are your products genuine?',
    answer: '100% authentic! All products are sourced directly from authorized suppliers. We guarantee quality and authenticity on every purchase.',
  },
  {
    category: 'Products',
    question: 'Do products come with warranty?',
    answer: 'Yes! Most products come with manufacturer warranty (6 months to 1 year). Warranty details are mentioned on individual product pages.',
  },
  {
    category: 'Products',
    question: 'When will out-of-stock items be available?',
    answer: 'Restock times vary by product. Use the "Notify Me" feature on product pages, or message us on WhatsApp for specific availability information.',
  },
  {
    category: 'Products',
    question: 'Can I request a product that\'s not listed?',
    answer: 'Absolutely! We love suggestions. Message us on WhatsApp with the product details, and we\'ll do our best to source it for you.',
  },

  // Account & Support
  {
    category: 'Account & Support',
    question: 'Do I need to create an account to shop?',
    answer: 'No account needed! Simply place your order and provide delivery details. We handle everything via WhatsApp for a seamless experience.',
  },
  {
    category: 'Account & Support',
    question: 'How can I contact customer support?',
    answer: 'WhatsApp: +91 92926 74447 (Fastest response) or Email: klyrotrade@gmail.com. Our team is available Monday-Saturday, 9 AM - 7 PM IST.',
  },
  {
    category: 'Account & Support',
    question: 'What if I receive a damaged product?',
    answer: 'We\'re sorry! Contact us immediately with photos of the damage. We\'ll arrange a free replacement or full refund, no questions asked.',
  },
  {
    category: 'Account & Support',
    question: 'How do I update my delivery address?',
    answer: 'Message us on WhatsApp before your order ships. If already shipped, the courier may allow address changes. We\'ll assist you throughout.',
  },
];

const categories = Array.from(new Set(faqs.map(faq => faq.category)));

export default function FAQPage() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const toggleFAQ = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const filteredFAQs = selectedCategory === 'All' 
    ? faqs 
    : faqs.filter(faq => faq.category === selectedCategory);

  const categoryIcons: { [key: string]: any } = {
    'Shopping & Orders': Package,
    'Payment': CreditCard,
    'Shipping & Delivery': Truck,
    'Returns & Refunds': RefreshCw,
    'Products': HelpCircle,
    'Account & Support': MessageCircle,
  };

  return (
    <div className="min-h-screen bg-[#F7F8F6] text-[#151515]">
      <Navbar />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#005E23] via-[#007A2E] to-[#005E23] text-white py-20">
        <div className="container mx-auto px-6 max-w-4xl text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white/10 backdrop-blur-sm mb-6">
            <HelpCircle size={32} className="text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-black mb-4">
            Frequently Asked Questions
          </h1>
          <p className="text-lg md:text-xl text-white/90 font-medium">
            Everything you need to know about shopping at KLYRO
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="container mx-auto px-6 py-16 max-w-5xl">
        
        {/* Category Filter */}
        <div className="mb-12">
          <h2 className="text-sm font-bold uppercase tracking-wider text-[#777777] mb-4">
            Filter by Category
          </h2>
          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => setSelectedCategory('All')}
              className={`px-5 py-2.5 rounded-xl text-sm font-bold transition-all ${
                selectedCategory === 'All'
                  ? 'bg-[#005E23] text-white shadow-lg'
                  : 'bg-white border-2 border-[#E8ECE6] text-[#555555] hover:border-[#005E23]'
              }`}
            >
              All Questions
            </button>
            {categories.map((category) => {
              const Icon = categoryIcons[category] || HelpCircle;
              return (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-5 py-2.5 rounded-xl text-sm font-bold transition-all flex items-center gap-2 ${
                    selectedCategory === category
                      ? 'bg-[#005E23] text-white shadow-lg'
                      : 'bg-white border-2 border-[#E8ECE6] text-[#555555] hover:border-[#005E23]'
                  }`}
                >
                  <Icon size={16} />
                  {category}
                </button>
              );
            })}
          </div>
        </div>

        {/* FAQ Accordion */}
        <div className="space-y-4">
          {filteredFAQs.map((faq, index) => {
            const isOpen = activeIndex === index;
            const CategoryIcon = categoryIcons[faq.category] || HelpCircle;

            return (
              <div
                key={index}
                className="bg-white rounded-2xl border-2 border-[#E8ECE6] overflow-hidden shadow-sm hover:shadow-md transition-shadow"
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full px-6 py-5 flex items-start justify-between text-left gap-4 hover:bg-[#F7F8F6] transition-colors"
                >
                  <div className="flex items-start gap-4 flex-1">
                    <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-[#ecfdf5] flex items-center justify-center">
                      <CategoryIcon size={20} className="text-[#005E23]" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-[#005E23] bg-[#ecfdf5] px-2 py-1 rounded-md">
                          {faq.category}
                        </span>
                      </div>
                      <h3 className="text-base md:text-lg font-bold text-[#151515]">
                        {faq.question}
                      </h3>
                    </div>
                  </div>
                  <ChevronDown
                    size={24}
                    className={`flex-shrink-0 text-[#005E23] transition-transform ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-6 pb-6 pl-20">
                    <p className="text-sm md:text-base text-[#555555] leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Still Have Questions */}
        <div className="mt-16 bg-gradient-to-br from-[#005E23] to-[#007A2E] rounded-3xl p-8 md:p-12 text-center text-white">
          <Shield size={48} className="mx-auto mb-4 opacity-90" />
          <h2 className="text-2xl md:text-3xl font-black mb-4">
            Still have questions?
          </h2>
          <p className="text-lg mb-8 text-white/90">
            Our friendly support team is here to help you!
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="https://wa.me/919292674447"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-white text-[#005E23] px-8 py-4 rounded-full font-bold text-lg hover:bg-[#F7F8F6] transition-colors shadow-lg"
            >
              <MessageCircle size={20} />
              Chat on WhatsApp
            </a>
            <a
              href="mailto:klyrotrade@gmail.com"
              className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-white/20 transition-colors border-2 border-white/20"
            >
              Email Support
            </a>
          </div>
          <p className="mt-6 text-sm text-white/80">
            Response time: Usually within 2-3 hours • Available Mon-Sat, 9 AM - 7 PM IST
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
}
