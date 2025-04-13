import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const ProductCard = ({ product }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <Link href={`/products/${product.category}/${product.id}`}>
        <div className="relative h-64">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover"
          />
        </div>
        <div className="p-4">
          <h3 className="text-lg font-semibold text-gray-800">{product.name}</h3>
          <p className="text-gray-600 mt-2">{product.description}</p>
          <p className="text-primary font-bold mt-2">${product.price}</p>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard; 