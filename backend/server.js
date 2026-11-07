require('dotenv').config();
const http = require('http');
const url = require('url');
const connectDB = require('./config/db');
const siteConfig = require('./config/siteConfig');
const productsController = require('./controllers/productsController');
const ordersController = require('./controllers/ordersController');
const newsletterController = require('./controllers/newsletterController');
const inquiriesController = require('./controllers/inquiriesController');

const PORT = process.env.PORT || siteConfig.port || 5001;

function sendJson(res, statusCode, data) {
  res.writeHead(statusCode, {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  });
  res.end(JSON.stringify(data, null, 2));
}

function parseBody(req) {
  return new Promise((resolve) => {
    let body = '';
    req.on('data', (chunk) => { body += chunk.toString(); });
    req.on('end', () => {
      if (!body) return resolve({});
      try { resolve(JSON.parse(body)); } catch { resolve({}); }
    });
  });
}

const server = http.createServer(async (req, res) => {
  if (req.method === 'OPTIONS') {
    res.writeHead(204, {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    });
    return res.end();
  }

  const parsedUrl = url.parse(req.url, true);
  const pathname = parsedUrl.pathname;
  const query = parsedUrl.query;
  const method = req.method;

  try {
    // Health
    if (pathname === '/' || pathname === '/api/health') {
      return sendJson(res, 200, {
        status: 'online',
        db: 'mongodb',
        name: siteConfig.name,
        port: PORT,
        timestamp: new Date().toISOString(),
      });
    }

    // ── PRODUCTS ─────────────────────────────────────────
    if (pathname === '/api/products' && method === 'GET') {
      return sendJson(res, 200, await productsController.getProducts(query));
    }
    if (pathname === '/api/products' && method === 'POST') {
      const body = await parseBody(req);
      return sendJson(res, 200, await productsController.addProduct(body));
    }
    if (pathname.startsWith('/api/products/') && method === 'GET') {
      const slug = pathname.replace('/api/products/', '');
      const data = await productsController.getProductBySlug(slug);
      return sendJson(res, data.status || 200, data);
    }
    if (pathname.startsWith('/api/products/') && method === 'DELETE') {
      const id = pathname.replace('/api/products/', '');
      const data = await productsController.deleteProduct(id);
      return sendJson(res, data.status || 200, data);
    }
    if (pathname.startsWith('/api/products/') && method === 'PATCH') {
      const id = pathname.replace('/api/products/', '');
      const body = await parseBody(req);
      const data = await productsController.updateProduct(id, body);
      return sendJson(res, data.status || 200, data);
    }

    // ── CATEGORIES ───────────────────────────────────────
    if (pathname === '/api/categories' && method === 'GET') {
      return sendJson(res, 200, await productsController.getCategories());
    }

    // ── ORDERS ───────────────────────────────────────────
    if (pathname === '/api/orders' && method === 'GET') {
      return sendJson(res, 200, await ordersController.getAllOrders());
    }
    if (pathname === '/api/orders' && method === 'POST') {
      const body = await parseBody(req);
      const data = await ordersController.createOrder(body);
      return sendJson(res, data.status || 200, data);
    }
    if (pathname.startsWith('/api/orders/') && method === 'GET') {
      const id = pathname.replace('/api/orders/', '');
      const data = await ordersController.getOrderById(id);
      return sendJson(res, data.status || 200, data);
    }
    if (pathname.startsWith('/api/orders/') && method === 'PATCH') {
      const id = pathname.replace('/api/orders/', '');
      const body = await parseBody(req);
      const data = await ordersController.updateOrderStatus(id, body.status, body.message);
      return sendJson(res, data.status || 200, data);
    }

    // ── ORDER TRACKING ───────────────────────────────────
    if (pathname === '/api/track' && method === 'GET') {
      if (!query.query) return sendJson(res, 400, { success: false, error: 'Query parameter required' });
      const data = await ordersController.trackOrder(query.query);
      return sendJson(res, data.status || 200, data);
    }

    // ── NEWSLETTER ───────────────────────────────────────
    if (pathname === '/api/newsletter' && method === 'POST') {
      const body = await parseBody(req);
      const data = await newsletterController.subscribe(body.email);
      return sendJson(res, data.status || 200, data);
    }
    if (pathname === '/api/subscribers' && method === 'GET') {
      return sendJson(res, 200, await newsletterController.getAllSubscribers());
    }

    // ── INQUIRIES ────────────────────────────────────────
    if (pathname === '/api/inquiries' && method === 'GET') {
      return sendJson(res, 200, await inquiriesController.getAllInquiries());
    }
    if (pathname === '/api/inquiries' && method === 'POST') {
      const body = await parseBody(req);
      const data = await inquiriesController.createInquiry(body);
      return sendJson(res, data.status || 200, data);
    }

    // 404
    return sendJson(res, 404, {
      success: false,
      error: `Endpoint '${method} ${pathname}' not found`,
    });

  } catch (err) {
    console.error('Server Error:', err);
    return sendJson(res, 500, { success: false, error: 'Internal Server Error', details: err.message });
  }
});

// Connect DB then start server
connectDB().then(() => {
  server.listen(PORT, () => {
    console.log(`===============================================`);
    console.log(` KLYRO Backend  →  http://localhost:${PORT}`);
    console.log(` Database       →  MongoDB Atlas (klyro)`);
    console.log(`===============================================`);
  });
});

module.exports = server;
