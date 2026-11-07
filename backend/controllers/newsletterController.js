const path = require('path');
const fs = require('fs');

const file = path.join(__dirname, '..', 'data', 'subscribers.json');

exports.getAllSubscribers = () => {
  if (!fs.existsSync(file)) {
    fs.writeFileSync(file, JSON.stringify([], null, 2));
    return { success: true, total: 0, subscribers: [] };
  }
  const list = JSON.parse(fs.readFileSync(file, 'utf8'));
  return { success: true, total: list.length, subscribers: list };
};

exports.subscribe = (email) => {
  if (!email || !email.includes('@') || !email.includes('.')) {
    return { success: false, status: 400, error: 'Valid email address required' };
  }

  if (!fs.existsSync(file)) {
    fs.writeFileSync(file, JSON.stringify([], null, 2));
  }

  const clean = email.trim().toLowerCase();
  const list = JSON.parse(fs.readFileSync(file, 'utf8'));

  if (list.some((s) => s.email === clean)) {
    return { success: true, message: 'Already subscribed to KLYRO updates' };
  }

  list.push({ email: clean, subscribedAt: new Date().toISOString() });
  fs.writeFileSync(file, JSON.stringify(list, null, 2));

  return { success: true, message: 'Thank you for subscribing to KLYRO updates!' };
};
