import React from 'react';
import Link from 'next/link';

const LiveDemo = () => {
  return (
    <div className="bg-white py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative bg-gray-900 rounded-2xl shadow-xl overflow-hidden lg:grid lg:grid-cols-2 lg:gap-4">
          <div className="pt-10 pb-12 px-6 sm:pt-16 sm:px-16 lg:py-16 lg:pr-0 xl:py-20 xl:px-20">
            <div className="lg:self-center">
              <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
                <span className="block">Ready to dive in?</span>
                <span className="block text-green-400">Start your free trial today.</span>
              </h2>
              <p className="mt-4 text-lg leading-6 text-gray-200">
                Experience the power of AI in your farm management. Detect diseases, predict yields, and connect with experts instantly.
              </p>
              <Link
                href="/dashboard"
                className="mt-8 bg-green-600 border border-transparent rounded-md shadow px-5 py-3 inline-flex items-center text-base font-medium text-white hover:bg-green-700"
              >
                Launch Dashboard
              </Link>
            </div>
          </div>
          <div className="relative -mt-6 aspect-w-5 aspect-h-3 md:aspect-w-2 md:aspect-h-1">
            <div className="transform translate-x-6 translate-y-6 rounded-md object-cover object-left-top sm:translate-x-16 lg:translate-y-20 bg-gray-700 h-full w-full flex items-center justify-center text-gray-400">
                {/* Placeholder for dashboard screenshot */}
                [Dashboard Preview]
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LiveDemo;
