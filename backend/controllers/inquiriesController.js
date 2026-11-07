const path = require('path');
const fs = require('fs');

const file = path.join(__dirname, '..', 'data', 'inquiries.json');

exports.getAllInquiries = () => {
  if (!fs.existsSync(file)) {
    fs.writeFileSync(file, JSON.stringify([], null, 2));
    return { success: true, total: 0, inquiries: [] };
  }
  const list = JSON.parse(fs.readFileSync(file, 'utf8'));
  return { success: true, total: list.length, inquiries: list };
};

exports.createInquiry = (body) => {
  const { name, phone, email, message, type } = body;

  if (!name || !phone || !message) {
    return { success: false, status: 400, error: 'Name, phone, and message are required' };
  }

  if (!fs.existsSync(file)) {
    fs.writeFileSync(file, JSON.stringify([], null, 2));
  }

  const list = JSON.parse(fs.readFileSync(file, 'utf8'));
  const inquiry = {
    id: `INQ-${Math.floor(1000 + Math.random() * 9000)}`,
    name: name.trim(),
    phone: phone.trim(),
    email: email ? email.trim() : undefined,
    message: message.trim(),
    type: type || 'general',
    createdAt: new Date().toISOString(),
  };

  list.unshift(inquiry);
  fs.writeFileSync(file, JSON.stringify(list, null, 2));

  return { success: true, inquiryId: inquiry.id, message: 'Inquiry received successfully' };
};

