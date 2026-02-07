import React from 'react';
import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-1">
            <h3 className="text-2xl font-bold text-green-500 mb-4">AgriPredict360</h3>
            <p className="text-gray-400 text-sm">
              Empowering farmers with AI-driven insights for a sustainable and profitable future.
            </p>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Features</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><Link href="/diseases" className="hover:text-green-400">Disease Detection</Link></li>
              <li><Link href="/dashboard" className="hover:text-green-400">Yield Prediction</Link></li>
              <li><Link href="/community" className="hover:text-green-400">Community Forum</Link></li>
              <li><Link href="/marketplace" className="hover:text-green-400">Marketplace</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Resources</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><Link href="/learning/courses" className="hover:text-green-400">Learning Center</Link></li>
              <li><Link href="/learning/schemes" className="hover:text-green-400">Government Schemes</Link></li>
              <li><Link href="/" className="hover:text-green-400">Success Stories</Link></li>
              <li><Link href="/" className="hover:text-green-400">Help Center</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>Email: support@agripredict360.com</li>
              <li>Phone: +1 (555) 123-4567</li>
              <li>Address: 123 Farm Tech Lane, Agropolis</li>
            </ul>
          </div>
        </div>
        
        <div className="mt-8 border-t border-gray-700 pt-8 text-center text-sm text-gray-400">
          <p>&copy; {new Date().getFullYear()} AgriPredict360. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
