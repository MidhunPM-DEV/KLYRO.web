const Product = require('../models/Product');
const path = require('path');
const fs = require('fs');

// Seed products from JSON on first run if DB is empty
async function seedProductsIfEmpty() {
  const count = await Product.countDocuments();
  if (count > 0) return;

  const dataFile = path.join(__dirname, '..', 'data', 'products.json');
  if (!fs.existsSync(dataFile)) return;

  const { products } = JSON.parse(fs.readFileSync(dataFile, 'utf8'));
  await Product.insertMany(products);
  console.log(`✅ Seeded ${products.length} products into MongoDB`);
}

// Call seed on module load
seedProductsIfEmpty().catch(console.error);

exports.getProducts = async (query = {}) => {
  let filter = {};

  if (query.category && query.category !== 'all') {
    filter.categorySlug = query.category.toLowerCase();
  }

  if (query.search && query.search.trim()) {
    const q = query.search.trim();
    filter.$or = [
      { name: { $regex: q, $options: 'i' } },
      { category: { $regex: q, $options: 'i' } },
      { description: { $regex: q, $options: 'i' } },
    ];
  }

  let sortObj = {};
  switch (query.sort) {
    case 'price-asc':   sortObj = { price: 1 }; break;
    case 'price-desc':  sortObj = { price: -1 }; break;
    case 'discount':    sortObj = { discount: -1 }; break;
    case 'bestseller':  sortObj = { isBestSeller: -1 }; break;
    case 'rating':      sortObj = { rating: -1 }; break;
    default:            sortObj = {}; break;
  }

  let dbQuery = Product.find(filter).sort(sortObj).select('-_id -__v').lean();

  if (query.limit) {
    const l = parseInt(query.limit, 10);
    if (!isNaN(l) && l > 0) dbQuery = dbQuery.limit(l);
  }

  const products = await dbQuery;
  return { success: true, total: products.length, products };
};

exports.getProductBySlug = async (slug) => {
  const product = await Product.findOne({ slug }).select('-_id -__v').lean();
  if (!product) return { success: false, status: 404, error: `Product '${slug}' not found` };
  return { success: true, product };
};

exports.getCategories = async () => {
  const dataFile = path.join(__dirname, '..', 'data', 'products.json');
  const { categories } = JSON.parse(fs.readFileSync(dataFile, 'utf8'));
  return { success: true, total: categories.length, categories };
};

exports.addProduct = async (body) => {
  const { name, category, categorySlug, price, originalPrice, discount, description, images, inStock,
    rating, reviewsCount, isNewArrival, isBestSeller, isFeatured, features, variants } = body;

  if (!name || !category || !price || !images || images.length === 0) {
    return { success: false, status: 400, error: 'name, category, price, and at least one image are required' };
  }

  const slug = name.toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '').trim()
    .replace(/\s+/g, '-').replace(/-+/g, '-') + '-' + Date.now();

  const newProduct = await Product.create({
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
    images: Array.isArray(images) ? images : [images],
    variants: Array.isArray(variants) ? variants : [],
    inStock: inStock !== false,
    rating: Number(rating || 4.0),
    reviewsCount: Number(reviewsCount || 0),
    isNewArrival: !!isNewArrival,
    isBestSeller: !!isBestSeller,
    isFeatured: !!isFeatured,
  });

  return { success: true, product: newProduct.toObject() };
};

exports.deleteProduct = async (id) => {
  const product = await Product.findOneAndDelete({ $or: [{ id }, { slug: id }] });
  if (!product) return { success: false, status: 404, error: `Product '${id}' not found` };
  return { success: true, message: `Product '${product.name}' deleted`, productId: product.id };
};

exports.updateProduct = async (id, body) => {
  const product = await Product.findOneAndUpdate(
    { $or: [{ id }, { slug: id }] },
    body,
    { new: true }
  ).lean();
  if (!product) return { success: false, status: 404, error: `Product '${id}' not found` };
  return { success: true, product };
};
