const path = require('path');
const fs = require('fs');

const dataFile = path.join(__dirname, '..', 'data', 'products.json');

function loadData() {
  const raw = fs.readFileSync(dataFile, 'utf8');
  return JSON.parse(raw);
}

function saveData(data) {
  fs.writeFileSync(dataFile, JSON.stringify(data, null, 2));
}

exports.getProducts = (query = {}) => {
  const { categories, products } = loadData();
  let result = [...products];

  if (query.category && query.category !== 'all') {
    result = result.filter(
      (p) => p.categorySlug.toLowerCase() === query.category.toLowerCase()
    );
  }

  if (query.search && query.search.trim()) {
    const q = query.search.toLowerCase().trim();
    result = result.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q)
    );
  }

  if (query.sort) {
    switch (query.sort) {
      case 'price-asc':   result.sort((a, b) => a.price - b.price); break;
      case 'price-desc':  result.sort((a, b) => b.price - a.price); break;
      case 'discount':    result.sort((a, b) => b.discount - a.discount); break;
      case 'bestseller':  result.sort((a, b) => (b.isBestSeller ? 1 : 0) - (a.isBestSeller ? 1 : 0)); break;
      case 'rating':      result.sort((a, b) => b.rating - a.rating); break;
    }
  }

  if (query.limit) {
    const l = parseInt(query.limit, 10);
    if (!isNaN(l) && l > 0) result = result.slice(0, l);
  }

  return { success: true, total: result.length, products: result };
};

exports.getProductBySlug = (slug) => {
  const { products } = loadData();
  const product = products.find((p) => p.slug === slug);
  if (!product) {
    return { success: false, status: 404, error: `Product '${slug}' not found` };
  }
  return { success: true, product };
};

exports.getCategories = () => {
  const { categories } = loadData();
  return { success: true, total: categories.length, categories };
};

exports.addProduct = (body) => {
  const {
    name, category, categorySlug, price, originalPrice,
    discount, description, images, inStock,
    rating, reviewsCount, isNewArrival, isBestSeller, isFeatured,
    features, variants,
  } = body;

  if (!name || !category || !price || !images || images.length === 0) {
    return { success: false, status: 400, error: 'name, category, price, and at least one image are required' };
  }

  const data = loadData();

  // Generate slug from name
  const slug = name
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-') + '-' + Date.now();

  const newProduct = {
    id: `prod-${Date.now()}`,
    slug,
    name: name.trim(),
    category,
    categorySlug: categorySlug || category.toLowerCase().replace(/\s+/g, '-'),
    price: Number(price),
    originalPrice: Number(originalPrice || price),
    discount: Number(discount || 0),
    description: (description || '').trim(),
    fullDescription: (description || '').trim(),
    features: Array.isArray(features) ? features : [],
    specs: {},
    images: Array.isArray(images) ? images : [images],
    variants: Array.isArray(variants) ? variants : [],
    inStock: inStock !== false,
    rating: Number(rating || 4.0),
    reviewsCount: Number(reviewsCount || 0),
    isNewArrival: !!isNewArrival,
    isBestSeller: !!isBestSeller,
    isFeatured: !!isFeatured,
  };

  data.products.unshift(newProduct);

  // Update category itemCount
  const cat = data.categories.find((c) => c.slug === newProduct.categorySlug);
  if (cat) cat.itemCount = data.products.filter((p) => p.categorySlug === cat.slug).length;

  saveData(data);
  return { success: true, product: newProduct };
};

exports.deleteProduct = (id) => {
  const data = loadData();
  const index = data.products.findIndex((p) => p.id === id || p.slug === id);
  if (index === -1) {
    return { success: false, status: 404, error: `Product '${id}' not found` };
  }

  const removed = data.products.splice(index, 1)[0];

  // Update category itemCount
  const cat = data.categories.find((c) => c.slug === removed.categorySlug);
  if (cat) cat.itemCount = data.products.filter((p) => p.categorySlug === cat.slug).length;

  saveData(data);
  return { success: true, message: `Product '${removed.name}' deleted`, productId: removed.id };
};

exports.updateProduct = (id, body) => {
  const data = loadData();
  const index = data.products.findIndex((p) => p.id === id || p.slug === id);
  if (index === -1) {
    return { success: false, status: 404, error: `Product '${id}' not found` };
  }

  data.products[index] = { ...data.products[index], ...body };
  saveData(data);
  return { success: true, product: data.products[index] };
};
