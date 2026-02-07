import React from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Link from 'next/link';

const ProductDetail = () => {
  const router = useRouter();
  const { id } = router.query;

  // Mock Data
  const product = {
    id: 1,
    name: 'Organic Fertilizer',
    price: 1200,
    category: 'Fertilizers',
    seller: 'Green Earth Ltd',
    description: 'High-quality organic fertilizer made from composted plant material. Improves soil structure and water retention while providing essential nutrients for your crops.',
    specifications: [
      { label: 'Weight', value: '25 kg' },
      { label: 'Composition', value: 'N: 4%, P: 3%, K: 3%' },
      { label: 'Organic Matter', value: '>60%' },
      { label: 'Application', value: 'Soil mix or top dressing' }
    ],
    reviews: [
      { user: 'Ramesh Singh', rating: 5, comment: 'Excellent results on my vegetable farm.' },
      { user: 'Priya Patel', rating: 4, comment: 'Good quality but packaging could be better.' }
    ]
  };

  if (!id) return <div>Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <Head>
        <title>{product.name} - Marketplace</title>
      </Head>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link href="/marketplace" className="text-green-600 hover:text-green-800 font-medium mb-6 inline-block">
          &larr; Back to Marketplace
        </Link>

        <div className="bg-white shadow-xl rounded-lg overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2">
            {/* Image Section */}
            <div className="bg-gray-200 h-96 md:h-auto flex items-center justify-center">
              <span className="text-gray-500 text-lg">Product Image Placeholder</span>
            </div>

            {/* Info Section */}
            <div className="p-8 md:p-12">
              <div className="flex justify-between items-start">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>
                  <p className="text-sm text-gray-500">Sold by {product.seller}</p>
                </div>
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                  {product.category}
                </span>
              </div>

              <div className="mt-6">
                <h2 className="text-4xl font-bold text-gray-900">₹{product.price}</h2>
                <p className="mt-4 text-gray-700 leading-relaxed">
                  {product.description}
                </p>
              </div>

              <div className="mt-8">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Specifications</h3>
                <div className="border-t border-gray-200">
                  <dl>
                    {product.specifications.map((spec, i) => (
                      <div key={i} className="bg-gray-50 px-4 py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 even:bg-white">
                        <dt className="text-sm font-medium text-gray-500">{spec.label}</dt>
                        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{spec.value}</dd>
                      </div>
                    ))}
                  </dl>
                </div>
              </div>

              <div className="mt-8 flex gap-4">
                <button className="flex-1 bg-green-600 text-white px-6 py-3 rounded-md font-bold hover:bg-green-700 transition-colors">
                  Add to Cart
                </button>
                <button className="flex-1 border border-green-600 text-green-600 px-6 py-3 rounded-md font-bold hover:bg-green-50 transition-colors">
                  Contact Seller
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
