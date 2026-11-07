const http = require('http');
const url = require('url');
const siteConfig = require('./config/siteConfig');
const productsController = require('./controllers/productsController');
const ordersController = require('./controllers/ordersController');
const newsletterController = require('./controllers/newsletterController');
const inquiriesController = require('./controllers/inquiriesController');

const PORT = siteConfig.port || 5001;

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
    req.on('data', (chunk) => {
      body += chunk.toString();
    });
    req.on('end', () => {
      if (!body) return resolve({});
      try {
        resolve(JSON.parse(body));
      } catch {
        resolve({});
      }
    });
  });
}

const server = http.createServer(async (req, res) => {
  // CORS Preflight
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
    // Health Check
    if (pathname === '/' || pathname === '/api/health') {
      return sendJson(res, 200, {
        status: 'online',
        name: siteConfig.name,
        tagline: siteConfig.tagline,
        port: PORT,
        timestamp: new Date().toISOString(),
      });
    }

    // 1. Products API
    if (pathname === '/api/products' && method === 'GET') {
      const data = productsController.getProducts(query);
      return sendJson(res, 200, data);
    }

    // Add product
    if (pathname === '/api/products' && method === 'POST') {
      const body = await parseBody(req);
      const data = productsController.addProduct(body);
      return sendJson(res, data.status || 200, data);
    }

    // Delete product: /api/products/:id
    if (pathname.startsWith('/api/products/') && method === 'DELETE') {
      const id = pathname.replace('/api/products/', '');
      const data = productsController.deleteProduct(id);
      return sendJson(res, data.status || 200, data);
    }

    // Update product: /api/products/:id
    if (pathname.startsWith('/api/products/') && method === 'PATCH') {
      const id = pathname.replace('/api/products/', '');
      const body = await parseBody(req);
      const data = productsController.updateProduct(id, body);
      return sendJson(res, data.status || 200, data);
    }

    // Single Product: /api/products/:slug
    if (pathname.startsWith('/api/products/') && method === 'GET') {
      const slug = pathname.replace('/api/products/', '');
      const data = productsController.getProductBySlug(slug);
      return sendJson(res, data.status || 200, data);
    }

    // 2. Categories API
    if (pathname === '/api/categories' && method === 'GET') {
      const data = productsController.getCategories();
      return sendJson(res, 200, data);
    }

    // 3. Orders API
    if (pathname === '/api/orders' && method === 'GET') {
      const data = ordersController.getAllOrders();
      return sendJson(res, 200, data);
    }

    if (pathname === '/api/orders' && method === 'POST') {
      const body = await parseBody(req);
      const data = ordersController.createOrder(body);
      return sendJson(res, data.status || 200, data);
    }

    // Single Order: /api/orders/:id
    if (pathname.startsWith('/api/orders/') && method === 'GET') {
      const id = pathname.replace('/api/orders/', '');
      const data = ordersController.getOrderById(id);
      return sendJson(res, data.status || 200, data);
    }

    if (pathname.startsWith('/api/orders/') && method === 'PATCH') {
      const id = pathname.replace('/api/orders/', '');
      const body = await parseBody(req);
      const data = ordersController.updateOrderStatus(id, body.status, body.message);
      return sendJson(res, data.status || 200, data);
    }

    // 4. Order Tracking: /api/track?query=...
    if (pathname === '/api/track' && method === 'GET') {
      if (!query.query) {
        return sendJson(res, 400, { success: false, error: 'Query parameter required' });
      }
      const data = ordersController.trackOrder(query.query);
      return sendJson(res, data.status || 200, data);
    }

    // 5. Newsletter subscribe
    if (pathname === '/api/newsletter' && method === 'POST') {
      const body = await parseBody(req);
      const data = newsletterController.subscribe(body.email);
      return sendJson(res, data.status || 200, data);
    }

    // 6. Subscribers list (Admin)
    if (pathname === '/api/subscribers' && method === 'GET') {
      const data = newsletterController.getAllSubscribers();
      return sendJson(res, 200, data);
    }

    // 7. Inquiries list (Admin)
    if (pathname === '/api/inquiries' && method === 'GET') {
      const data = inquiriesController.getAllInquiries();
      return sendJson(res, 200, data);
    }

    if (pathname === '/api/inquiries' && method === 'POST') {
      const body = await parseBody(req);
      const data = inquiriesController.createInquiry(body);
      return sendJson(res, data.status || 200, data);
    }

    // Not Found
    return sendJson(res, 404, {
      success: false,
      error: `Endpoint '${method} ${pathname}' not found on KLYRO backend`,
    });
  } catch (err) {
    console.error('Backend Server Error:', err);
    return sendJson(res, 500, {
      success: false,
      error: 'Internal Server Error',
      details: err.message,
    });
  }
});

server.listen(PORT, () => {
  console.log(`===============================================`);
  console.log(` KLYRO Backend Server active on port ${PORT}`);
  console.log(` Base URL: http://localhost:${PORT}`);
  console.log(` Health:   http://localhost:${PORT}/api/health`);
  console.log(`===============================================`);
});

module.exports = server;
