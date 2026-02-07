import React from 'react';

const FinancialReport = () => {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold text-gray-900">Financial Overview</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h3 className="text-lg font-medium mb-4">Expense Breakdown</h3>
          <div className="space-y-4">
            {['Seeds', 'Fertilizers', 'Pesticides', 'Labor', 'Equipment'].map((item, i) => (
              <div key={i} className="flex items-center">
                <span className="w-24 text-sm text-gray-600">{item}</span>
                <div className="flex-1 h-4 bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-full bg-blue-500" style={{ width: `${Math.random() * 80 + 10}%` }}></div>
                </div>
                <span className="ml-4 text-sm font-medium text-gray-900">${(Math.random() * 500).toFixed(0)}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h3 className="text-lg font-medium mb-4">Projected vs Actual Revenue</h3>
          <div className="h-48 flex items-end justify-between space-x-2">
             {/* Simple bar chart visualization */}
             {[1, 2, 3, 4, 5, 6].map((m) => (
               <div key={m} className="w-full flex flex-col items-center gap-1">
                 <div className="w-full bg-green-200 rounded-t" style={{ height: `${Math.random() * 60 + 20}%` }}></div>
                 <div className="w-full bg-green-500 rounded-t -mt-full opacity-70" style={{ height: `${Math.random() * 60 + 20}%` }}></div>
                 <span className="text-xs text-gray-500">M{m}</span>
               </div>
             ))}
          </div>
          <div className="flex justify-center gap-4 mt-4">
             <div className="flex items-center gap-2">
               <div className="w-3 h-3 bg-green-200"></div>
               <span className="text-xs text-gray-600">Projected</span>
             </div>
             <div className="flex items-center gap-2">
               <div className="w-3 h-3 bg-green-500"></div>
               <span className="text-xs text-gray-600">Actual</span>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FinancialReport;
