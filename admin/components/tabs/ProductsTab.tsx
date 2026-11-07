'use client';

import { Product } from '@/src/types';
import ProductsManager from '../ProductsManager';

interface Props {
  products: Product[];
}

export default function ProductsTab({ products }: Props) {
  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-2xl font-black text-gray-900">Products</h1>
        <p className="text-sm text-gray-500 mt-1">
          {products.length} items in catalog — manage stock and pricing.
        </p>
      </div>
      <div className="rounded-2xl bg-white border border-gray-100 shadow-sm p-4">
        <ProductsManager initialProducts={products} />
      </div>
    </div>
  );
}
