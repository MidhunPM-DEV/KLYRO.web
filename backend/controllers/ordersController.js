const path = require('path');
const fs = require('fs');
const siteConfig = require('../config/siteConfig');

const ordersFile = path.join(__dirname, '..', 'data', 'orders.json');

function getOrders() {
  if (!fs.existsSync(ordersFile)) {
    fs.writeFileSync(ordersFile, JSON.stringify([], null, 2));
    return [];
  }
  const raw = fs.readFileSync(ordersFile, 'utf8');
  return JSON.parse(raw);
}

function saveOrders(orders) {
  fs.writeFileSync(ordersFile, JSON.stringify(orders, null, 2));
}

exports.createOrder = (body) => {
  const { customer, items } = body;

  if (!customer || !customer.fullName || !customer.mobileNumber) {
    return { success: false, status: 400, error: 'Full name and mobile number are required' };
  }

  if (!customer.houseBuilding || !customer.streetLocality || !customer.city || !customer.pinCode) {
    return { success: false, status: 400, error: 'Complete delivery address is required' };
  }

  if (!items || !Array.isArray(items) || items.length === 0) {
    return { success: false, status: 400, error: 'Cart must contain at least one product' };
  }

  const orders = getOrders();
  const randomSuffix = Math.floor(10000 + Math.random() * 90000);
  const orderId = `KLY-${randomSuffix}`;

  const orderItems = items.map((item) => ({
    productId: item.product ? item.product.id : item.id,
    name: item.product ? item.product.name : item.name,
    price: item.product ? item.product.price : item.price,
    quantity: item.quantity,
    variant: item.selectedVariant || item.variant,
    image: item.product && item.product.images ? item.product.images[0] : item.image,
    subtotal: (item.product ? item.product.price : item.price) * item.quantity,
  }));

  const subtotal = orderItems.reduce((sum, it) => sum + it.subtotal, 0);
  const shippingFee = subtotal >= siteConfig.freeShippingThreshold || subtotal === 0 ? 0 : siteConfig.standardShippingFee;
  const totalAmount = subtotal + shippingFee;
  const now = new Date().toISOString();

  const newOrder = {
    id: orderId,
    createdAt: now,
    status: 'placed',
    customer,
    items: orderItems,
    subtotal,
    shippingFee,
    totalAmount,
    statusHistory: [
      {
        status: 'placed',
        timestamp: now,
        message: 'Order initiated with delivery address',
      },
    ],
  };

  orders.unshift(newOrder);
  saveOrders(orders);

  // Build WhatsApp URL
  const formatPrice = (n) => `₹${n.toLocaleString('en-IN')}`;
  const lines = [
    `*NEW ORDER — ${siteConfig.name}*`,
    `_Order ID: *${orderId}*_`,
    `_${siteConfig.tagline}_`,
    "",
    "*Customer Details*",
    `Name: ${customer.fullName.trim()}`,
    `Mobile: ${customer.mobileNumber.trim()}`,
  ];

  if (customer.email && customer.email.trim()) {
    lines.push(`Email: ${customer.email.trim()}`);
  }

  lines.push(
    "",
    "*Delivery Address*",
    `${customer.houseBuilding.trim()}, ${customer.streetLocality.trim()}`,
    `${customer.city.trim()}, ${customer.state.trim()} - ${customer.pinCode.trim()}`
  );

  if (customer.landmark && customer.landmark.trim()) {
    lines.push(`Landmark: ${customer.landmark.trim()}`);
  }
  if (customer.orderNotes && customer.orderNotes.trim()) {
    lines.push(`Order Notes: ${customer.orderNotes.trim()}`);
  }

  lines.push("", "*Order Items*");
  orderItems.forEach((item, index) => {
    const variantText = item.variant ? ` [${item.variant}]` : '';
    lines.push(
      `${index + 1}. ${item.name}${variantText} (Qty: ${item.quantity}) — ${formatPrice(item.price)} each = *${formatPrice(item.subtotal)}*`
    );
  });

  lines.push(
    "",
    `Subtotal: ${formatPrice(subtotal)}`,
    `Shipping: ${shippingFee === 0 ? "FREE" : formatPrice(shippingFee)}`,
    `*Total Payable: ${formatPrice(totalAmount)}*`,
    "",
    `Please confirm my Order *#${orderId}* and share estimated delivery timeline.`
  );

  const whatsappUrl = `https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(lines.join("\n"))}`;

  return {
    success: true,
    orderId,
    order: newOrder,
    whatsappUrl,
  };
};

exports.getAllOrders = () => {
  const orders = getOrders();
  return { success: true, total: orders.length, orders };
};

exports.getOrderById = (id) => {
  const orders = getOrders();
  const order = orders.find((o) => o.id.toUpperCase() === id.trim().toUpperCase());
  if (!order) {
    return { success: false, status: 404, error: `Order #${id} not found` };
  }
  return { success: true, order };
};

exports.trackOrder = (query) => {
  const orders = getOrders();
  const clean = query.trim().toUpperCase();

  // Try finding by Order ID
  const order = orders.find((o) => o.id.toUpperCase() === clean);
  if (order) {
    return { success: true, matchType: 'order_id', orders: [order] };
  }

  // Try finding by phone
  const phoneClean = query.replace(/\D/g, '');
  const byPhone = orders.filter((o) => o.customer.mobileNumber.replace(/\D/g, '').includes(phoneClean));
  if (byPhone.length > 0) {
    return { success: true, matchType: 'phone', orders: byPhone };
  }

  return { success: false, status: 404, error: `No orders found matching "${query}"` };
};

exports.updateOrderStatus = (id, status, message) => {
  const orders = getOrders();
  const order = orders.find((o) => o.id.toUpperCase() === id.trim().toUpperCase());
  if (!order) {
    return { success: false, status: 404, error: `Order #${id} not found` };
  }

  order.status = status;
  order.statusHistory.push({
    status,
    timestamp: new Date().toISOString(),
    message: message || `Status updated to ${status}`,
  });

  saveOrders(orders);
  return { success: true, order };
};

