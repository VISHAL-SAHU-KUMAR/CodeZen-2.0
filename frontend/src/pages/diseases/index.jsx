import React, { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';

const DiseaseLibrary = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const diseases = [
    { id: 1, name: 'Wheat Rust', category: 'Fungal', image: null, severity: 'High' },
    { id: 2, name: 'Rice Blast', category: 'Fungal', image: null, severity: 'High' },
    { id: 3, name: 'Tomato Blight', category: 'Fungal', image: null, severity: 'Medium' },
    { id: 4, name: 'Aphid Infestation', category: 'Pest', image: null, severity: 'Medium' },
    { id: 5, name: 'Root Rot', category: 'Fungal', image: null, severity: 'High' },
    { id: 6, name: 'Leaf Curl Virus', category: 'Viral', image: null, severity: 'High' },
  ];

  const filteredDiseases = diseases.filter(d => 
    d.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (selectedCategory === 'All' || d.category === selectedCategory)
  );

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <Head>
        <title>Disease Library - AgriPredict360</title>
      </Head>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Plant Disease Library
          </h1>
          <p className="mt-4 text-xl text-gray-500">
            Identify and treat common crop diseases with our comprehensive database.
          </p>
        </div>

        {/* Search and Filter */}
        <div className="mt-10 max-w-xl mx-auto">
          <div className="flex flex-col md:flex-row gap-4">
            <input
              type="text"
              placeholder="Search diseases..."
              className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 p-3 border"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <select
              className="rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 p-3 border"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <option value="All">All Categories</option>
              <option value="Fungal">Fungal</option>
              <option value="Viral">Viral</option>
              <option value="Bacterial">Bacterial</option>
              <option value="Pest">Pest</option>
            </select>
          </div>
        </div>

        {/* Grid */}
        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {filteredDiseases.map((disease) => (
            <Link key={disease.id} href={`/diseases/${disease.id}`} className="group">
              <div className="bg-white overflow-hidden shadow-lg rounded-lg hover:shadow-xl transition-shadow duration-300 h-full flex flex-col">
                <div className="h-48 bg-gray-200 flex items-center justify-center text-gray-500 group-hover:bg-gray-300 transition-colors">
                  {/* Placeholder for Image */}
                  <svg className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <div className="p-6 flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      {disease.category}
                    </span>
                    <span className={`text-xs font-medium ${disease.severity === 'High' ? 'text-red-600' : 'text-yellow-600'}`}>
                      {disease.severity} Severity
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 group-hover:text-green-600 transition-colors">
                    {disease.name}
                  </h3>
                  <p className="mt-2 text-base text-gray-500">
                    Learn about symptoms, causes, and effective treatments for {disease.name}.
                  </p>
                </div>
                <div className="bg-gray-50 px-6 py-4">
                  <span className="text-green-600 font-medium group-hover:underline">Read more &rarr;</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DiseaseLibrary;
