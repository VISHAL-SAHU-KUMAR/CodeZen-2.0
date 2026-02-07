import React, { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';

const Marketplace = () => {
  const [activeCategory, setActiveCategory] = useState('All');

  const products = [
    { id: 1, name: 'Organic Fertilizer', price: 1200, category: 'Fertilizers', image: null, seller: 'Green Earth Ltd' },
    { id: 2, name: 'Hybrid Wheat Seeds', price: 850, category: 'Seeds', image: null, seller: 'AgriSeeds Co' },
    { id: 3, name: 'Drip Irrigation Kit', price: 4500, category: 'Equipment', image: null, seller: 'WaterWise' },
    { id: 4, name: 'Neem Oil Pesticide', price: 350, category: 'Pesticides', image: null, seller: 'EcoFarm' },
    { id: 5, name: 'Solar Insect Trap', price: 2100, category: 'Equipment', image: null, seller: 'SunTech' },
    { id: 6, name: 'Vermicompost (50kg)', price: 600, category: 'Fertilizers', image: null, seller: 'OrganicLife' },
  ];

  const categories = ['All', 'Seeds', 'Fertilizers', 'Pesticides', 'Equipment'];

  const filteredProducts = activeCategory === 'All' 
    ? products 
    : products.filter(p => p.category === activeCategory);

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <Head>
        <title>Marketplace - AgriPredict360</title>
      </Head>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Farmer's Marketplace
          </h1>
          <p className="mt-4 text-xl text-gray-500">
            Buy and sell quality agricultural products directly.
          </p>
        </div>

        {/* Categories */}
        <div className="mt-8 flex justify-center space-x-4 overflow-x-auto pb-4">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                activeCategory === cat
                  ? 'bg-green-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Product Grid */}
        <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {filteredProducts.map((product) => (
            <Link key={product.id} href={`/marketplace/${product.id}`} className="group">
              <div className="bg-white overflow-hidden shadow-lg rounded-lg hover:shadow-xl transition-shadow duration-300">
                <div className="h-48 bg-gray-200 flex items-center justify-center text-gray-500 group-hover:bg-gray-300 transition-colors">
                  <svg className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                  </svg>
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-lg font-bold text-gray-900 group-hover:text-green-600 transition-colors">
                        {product.name}
                      </h3>
                      <p className="text-sm text-gray-500">{product.seller}</p>
                    </div>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      {product.category}
                    </span>
                  </div>
                  <div className="mt-4 flex items-center justify-between">
                    <span className="text-2xl font-bold text-gray-900">₹{product.price}</span>
                    <button className="bg-green-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-green-700 transition-colors">
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Marketplace;
