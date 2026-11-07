const path = require('path');
const fs = require('fs');

const dataFile = path.join(__dirname, '..', 'data', 'products.json');

function loadData() {
  const raw = fs.readFileSync(dataFile, 'utf8');
  return JSON.parse(raw);
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
      case 'price-asc':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'discount':
        result.sort((a, b) => b.discount - a.discount);
        break;
      case 'bestseller':
        result.sort((a, b) => (b.isBestSeller ? 1 : 0) - (a.isBestSeller ? 1 : 0));
        break;
      case 'rating':
        result.sort((a, b) => b.rating - a.rating);
        break;
    }
  }

  if (query.limit) {
    const l = parseInt(query.limit, 10);
    if (!isNaN(l) && l > 0) {
      result = result.slice(0, l);
    }
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

