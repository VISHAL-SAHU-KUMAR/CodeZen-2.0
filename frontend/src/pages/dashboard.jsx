import React, { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import FarmProfile from '../components/dashboard/FarmProfile';
import YieldPrediction from '../components/dashboard/YieldPrediction';
import DiseaseHistory from '../components/dashboard/DiseaseHistory';
import FinancialReport from '../components/dashboard/FinancialReport';
import CommunityForum from '../components/dashboard/CommunityForum';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="min-h-screen bg-gray-100">
      <Head>
        <title>Dashboard - AgriPredict360</title>
      </Head>

      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="flex flex-col md:flex-row gap-6">
            
            {/* Sidebar / Tabs */}
            <div className="w-full md:w-64 flex-shrink-0 bg-white shadow rounded-lg p-4 h-fit">
              <nav className="space-y-2">
                {['Overview', 'Farm Profile', 'Yield Prediction', 'Disease History', 'Financials', 'Community'].map((item) => {
                  const id = item.toLowerCase().replace(' ', '-');
                  return (
                    <button
                      key={id}
                      onClick={() => setActiveTab(id)}
                      className={`w-full text-left px-4 py-2 rounded-md font-medium transition-colors ${
                        activeTab === id
                          ? 'bg-green-100 text-green-700'
                          : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                      }`}
                    >
                      {item}
                    </button>
                  );
                })}
              </nav>
            </div>

            {/* Main Content Area */}
            <div className="flex-1 bg-white shadow rounded-lg p-6">
              {activeTab === 'overview' && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold text-gray-900">Welcome back, Farmer!</h2>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
                      <h3 className="text-lg font-semibold text-blue-800">Weather</h3>
                      <p className="text-3xl font-bold text-blue-600 mt-2">28°C</p>
                      <p className="text-sm text-blue-600">Sunny, Humidity 65%</p>
                    </div>
                    <div className="bg-green-50 p-4 rounded-lg border border-green-100">
                      <h3 className="text-lg font-semibold text-green-800">Crop Health</h3>
                      <p className="text-3xl font-bold text-green-600 mt-2">Good</p>
                      <p className="text-sm text-green-600">No recent alerts</p>
                    </div>
                    <div className="bg-purple-50 p-4 rounded-lg border border-purple-100">
                      <h3 className="text-lg font-semibold text-purple-800">Next Harvest</h3>
                      <p className="text-3xl font-bold text-purple-600 mt-2">15 Days</p>
                      <p className="text-sm text-purple-600">Wheat (Plot A)</p>
                    </div>
                  </div>
                  <div className="mt-8">
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Quick Actions</h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <Link href="/diseases/detect" className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 text-center flex flex-col items-center justify-center text-gray-700 hover:text-green-600 transition-colors">
                        <span className="font-medium">Scan Crop</span>
                      </Link>
                      <button onClick={() => setActiveTab('financials')} className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 text-center flex flex-col items-center justify-center text-gray-700 hover:text-blue-600 transition-colors">
                        <span className="font-medium">Log Expense</span>
                      </button>
                      <Link href="/community" className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 text-center flex flex-col items-center justify-center text-gray-700 hover:text-purple-600 transition-colors">
                        <span className="font-medium">Ask Expert</span>
                      </Link>
                      <Link href="/marketplace" className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 text-center flex flex-col items-center justify-center text-gray-700 hover:text-orange-600 transition-colors">
                        <span className="font-medium">Market Prices</span>
                      </Link>
                    </div>
                  </div>
                </div>
              )}
              
              {activeTab === 'farm-profile' && <FarmProfile />}
              {activeTab === 'yield-prediction' && <YieldPrediction />}
              {activeTab === 'disease-history' && <DiseaseHistory />}
              {activeTab === 'financials' && <FinancialReport />}
              {activeTab === 'community' && <CommunityForum />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
