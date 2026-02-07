import React, { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';

const Schemes = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedProvider, setSelectedProvider] = useState('all');
  const [expandedScheme, setExpandedScheme] = useState(null);

  const categories = ['all', 'Insurance', 'Credit', 'Subsidy', 'Organic Farming', 'Equipment', 'Soil Health'];
  const providers = ['all', 'Central', 'State'];

  const schemes = [
    {
      id: 1,
      name: { en: 'Pradhan Mantri Fasal Bima Yojana', hi: 'प्रधानमंत्री फसल बीमा योजना' },
      provider: 'Central',
      category: 'Insurance',
      description: 'Comprehensive crop insurance scheme that protects farmers against crop failure due to natural calamities, pests, and diseases.',
      eligibility: ['All farmers growing notified crops', 'Tenant farmers and sharecroppers with land documents', 'Both loanee and non-loanee farmers'],
      benefits: 'Premium subsidy up to 98%, coverage for all food and oilseed crops',
      documents: ['Aadhaar Card', 'Land Records', 'Bank Account', 'Sowing Certificate'],
      deadline: 'Kharif: 31 July | Rabi: 31 Dec',
      helpline: '1800-180-1551',
      website: 'https://pmfby.gov.in',
      featured: true
    },
    {
      id: 2,
      name: { en: 'Soil Health Card Scheme', hi: 'मृदा स्वास्थ्य कार्ड योजना' },
      provider: 'Central',
      category: 'Soil Health',
      description: 'Provides soil health cards to farmers with information on nutrient status and fertilizer recommendations.',
      eligibility: ['All landholding farmers', 'No minimum land requirement'],
      benefits: 'Free soil testing, personalized fertilizer recommendations, improved yields',
      documents: ['Aadhaar Card', 'Land ownership proof'],
      deadline: 'Ongoing',
      helpline: '011-23382652',
      website: 'https://soilhealth.dac.gov.in',
      featured: false
    },
    {
      id: 3,
      name: { en: 'Kisan Credit Card (KCC)', hi: 'किसान क्रेडिट कार्ड' },
      provider: 'Central',
      category: 'Credit',
      description: 'Provides adequate and timely credit support from banking system at concessional interest rates.',
      eligibility: ['Farmers, Tenant Farmers, Share Croppers', 'Self Help Groups', 'Joint Liability Groups'],
      benefits: 'Up to ₹3 lakh at 4% interest (with subsidy), flexible repayment',
      documents: ['Aadhaar Card', 'PAN Card', 'Land Records', 'Passport Photo'],
      deadline: 'Open all year',
      helpline: '1800-180-1111',
      website: 'https://pmkisan.gov.in',
      featured: true
    },
    {
      id: 4,
      name: { en: 'Paramparagat Krishi Vikas Yojana', hi: 'परंपरागत कृषि विकास योजना' },
      provider: 'Central',
      category: 'Organic Farming',
      description: 'Promotes organic farming through cluster approach with certification and marketing support.',
      eligibility: ['Cluster of minimum 50 farmers', '50 acre cluster land requirement'],
      benefits: '₹50,000 per hectare for 3 years, certification assistance, marketing support',
      documents: ['Farmer group details', 'Land documents', 'Bank account'],
      deadline: 'Apply via district office',
      helpline: '011-23382429',
      website: 'https://pgsindia-ncof.gov.in',
      featured: false
    },
    {
      id: 5,
      name: { en: 'PM Kisan Samman Nidhi', hi: 'पीएम किसान सम्मान निधि' },
      provider: 'Central',
      category: 'Subsidy',
      description: 'Direct income support of ₹6000 per year to all landholding farmer families.',
      eligibility: ['All landholding farmers', 'Family includes husband, wife and minor children'],
      benefits: '₹6000 per year in 3 installments directly to bank account',
      documents: ['Aadhaar Card', 'Bank Account', 'Land Ownership Proof'],
      deadline: 'Ongoing registrations',
      helpline: '155261',
      website: 'https://pmkisan.gov.in',
      featured: true
    },
    {
      id: 6,
      name: { en: 'Sub-Mission on Agricultural Mechanization', hi: 'कृषि मशीनीकरण उप-मिशन' },
      provider: 'Central',
      category: 'Equipment',
      description: 'Provides subsidies for purchase of agricultural machinery and equipment.',
      eligibility: ['Individual farmers', 'Farmer groups', 'Custom Hiring Centers'],
      benefits: '40-50% subsidy on machinery, support for custom hiring centers',
      documents: ['Aadhaar Card', 'Land Records', 'Quotation from dealer'],
      deadline: 'Subject to availability',
      helpline: '011-23382424',
      website: 'https://farmech.dac.gov.in',
      featured: false
    }
  ];

  const filteredSchemes = schemes.filter(scheme => {
    const matchesSearch = scheme.name.en.toLowerCase().includes(searchQuery.toLowerCase()) ||
      scheme.name.hi?.includes(searchQuery) ||
      scheme.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || scheme.category === selectedCategory;
    const matchesProvider = selectedProvider === 'all' || scheme.provider === selectedProvider;
    return matchesSearch && matchesCategory && matchesProvider;
  });

  return (
    <div className="min-h-screen bg-gray-50 py-8 sm:py-12">
      <Head>
        <title>Government Schemes - AgriPredict360</title>
        <meta name="description" content="Find government schemes and subsidies for farmers" />
      </Head>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">
            Government Schemes for Farmers
          </h1>
          <p className="mt-2 text-lg text-gray-600">
            Discover schemes, subsidies, and support programs available for you
          </p>
        </div>

        {/* Navigation Tabs */}
        <div className="flex justify-center mb-8 overflow-x-auto">
          <div className="bg-white p-1 rounded-lg shadow-sm inline-flex">
            <Link href="/learning/courses" className="px-4 py-2 rounded-md text-gray-600 hover:text-green-600 font-medium whitespace-nowrap">
              Courses
            </Link>
            <Link href="/learning/videos" className="px-4 py-2 rounded-md text-gray-600 hover:text-green-600 font-medium whitespace-nowrap">
              Videos
            </Link>
            <Link href="/learning/schemes" className="px-4 py-2 rounded-md bg-green-100 text-green-700 font-medium whitespace-nowrap">
              Govt Schemes
            </Link>
            <Link href="/learning/webinars" className="px-4 py-2 rounded-md text-gray-600 hover:text-green-600 font-medium whitespace-nowrap">
              Webinars
            </Link>
          </div>
        </div>

        {/* Search & Filters */}
        <div className="bg-white rounded-xl shadow-sm p-4 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <input
                type="text"
                placeholder="Search schemes..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
              <svg className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            >
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat === 'all' ? 'All Categories' : cat}</option>
              ))}
            </select>
            <select
              value={selectedProvider}
              onChange={(e) => setSelectedProvider(e.target.value)}
              className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            >
              {providers.map(p => (
                <option key={p} value={p}>{p === 'all' ? 'All Providers' : `${p} Govt`}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Featured Schemes */}
        {selectedCategory === 'all' && selectedProvider === 'all' && !searchQuery && (
          <div className="mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4">⭐ Featured Schemes</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {schemes.filter(s => s.featured).map(scheme => (
                <div key={scheme.id} className="bg-gradient-to-br from-green-500 to-green-700 rounded-xl p-5 text-white">
                  <span className="text-xs bg-white/20 px-2 py-1 rounded-full">{scheme.category}</span>
                  <h3 className="font-bold mt-2 mb-1">{scheme.name.en}</h3>
                  <p className="text-sm text-green-100 line-clamp-2">{scheme.benefits}</p>
                  <button onClick={() => setExpandedScheme(scheme.id)} className="mt-3 text-sm font-medium underline">
                    Learn More →
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Scheme Cards */}
        <div className="space-y-4">
          {filteredSchemes.map((scheme) => (
            <div key={scheme.id} className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow">
              <div className="p-5 sm:p-6">
                <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4">
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                      <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${scheme.category === 'Insurance' ? 'bg-blue-100 text-blue-700' :
                          scheme.category === 'Credit' ? 'bg-purple-100 text-purple-700' :
                            scheme.category === 'Subsidy' ? 'bg-green-100 text-green-700' :
                              scheme.category === 'Equipment' ? 'bg-orange-100 text-orange-700' :
                                'bg-gray-100 text-gray-700'
                        }`}>{scheme.category}</span>
                      <span className="text-xs text-gray-500">• {scheme.provider} Government</span>
                    </div>
                    <h3 className="text-lg sm:text-xl font-bold text-gray-900">{scheme.name.en}</h3>
                    <p className="text-sm text-gray-500 mb-2">{scheme.name.hi}</p>
                    <p className="text-gray-600">{scheme.description}</p>

                    <div className="mt-4 flex flex-wrap gap-4 text-sm">
                      <div className="flex items-center gap-1.5 text-green-600">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" /></svg>
                        <span>{scheme.benefits.split(',')[0]}</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-gray-600">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z" /></svg>
                        <span>Deadline: {scheme.deadline}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-row md:flex-col gap-2">
                    <button onClick={() => setExpandedScheme(expandedScheme === scheme.id ? null : scheme.id)} className="flex-1 md:flex-none px-4 py-2 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-colors text-sm">
                      {expandedScheme === scheme.id ? 'Hide Details' : 'View Details'}
                    </button>
                    <a href={scheme.website} target="_blank" rel="noopener noreferrer" className="flex-1 md:flex-none px-4 py-2 border border-green-600 text-green-600 rounded-lg font-medium hover:bg-green-50 transition-colors text-sm text-center">
                      Apply Now
                    </a>
                  </div>
                </div>

                {/* Expanded Details */}
                {expandedScheme === scheme.id && (
                  <div className="mt-6 pt-6 border-t border-gray-200 grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Eligibility</h4>
                      <ul className="space-y-1">
                        {scheme.eligibility.map((item, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-sm text-gray-600">
                            <svg className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" /></svg>
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Required Documents</h4>
                      <div className="flex flex-wrap gap-2">
                        {scheme.documents.map((doc, idx) => (
                          <span key={idx} className="text-xs px-3 py-1.5 bg-gray-100 text-gray-700 rounded-full">{doc}</span>
                        ))}
                      </div>
                    </div>
                    <div className="md:col-span-2">
                      <h4 className="font-semibold text-gray-900 mb-2">Contact Information</h4>
                      <div className="flex flex-wrap gap-4 text-sm">
                        <a href={`tel:${scheme.helpline}`} className="flex items-center gap-2 text-blue-600 hover:underline">
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" /></svg>
                          {scheme.helpline}
                        </a>
                        <a href={scheme.website} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-blue-600 hover:underline">
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zm6.93 6h-2.95c-.32-1.25-.78-2.45-1.38-3.56 1.84.63 3.37 1.91 4.33 3.56zM12 4.04c.83 1.2 1.48 2.53 1.91 3.96h-3.82c.43-1.43 1.08-2.76 1.91-3.96zM4.26 14C4.1 13.36 4 12.69 4 12s.1-1.36.26-2h3.38c-.08.66-.14 1.32-.14 2 0 .68.06 1.34.14 2H4.26zm.82 2h2.95c.32 1.25.78 2.45 1.38 3.56-1.84-.63-3.37-1.9-4.33-3.56zm2.95-8H5.08c.96-1.66 2.49-2.93 4.33-3.56C8.81 5.55 8.35 6.75 8.03 8zM12 19.96c-.83-1.2-1.48-2.53-1.91-3.96h3.82c-.43 1.43-1.08 2.76-1.91 3.96zM14.34 14H9.66c-.09-.66-.16-1.32-.16-2 0-.68.07-1.35.16-2h4.68c.09.65.16 1.32.16 2 0 .68-.07 1.34-.16 2zm.25 5.56c.6-1.11 1.06-2.31 1.38-3.56h2.95c-.96 1.65-2.49 2.93-4.33 3.56zM16.36 14c.08-.66.14-1.32.14-2 0-.68-.06-1.34-.14-2h3.38c.16.64.26 1.31.26 2s-.1 1.36-.26 2h-3.38z" /></svg>
                          Official Website
                        </a>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {filteredSchemes.length === 0 && (
          <div className="text-center py-12">
            <svg className="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p className="text-gray-500">No schemes found matching your criteria</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Schemes;
