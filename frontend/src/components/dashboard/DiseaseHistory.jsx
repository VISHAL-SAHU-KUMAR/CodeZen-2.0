import React from 'react';

const DiseaseHistory = () => {
  const history = [
    { id: 1, date: '2023-10-15', crop: 'Wheat', disease: 'Yellow Rust', status: 'Resolved', confidence: '98%' },
    { id: 2, date: '2023-09-20', crop: 'Rice', disease: 'Blast', status: 'Resolved', confidence: '95%' },
    { id: 3, date: '2023-08-05', crop: 'Cotton', disease: 'Leaf Curl', status: 'Resolved', confidence: '89%' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold text-gray-900">Disease Detection History</h2>
        <button className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 text-sm">
          New Scan
        </button>
      </div>

      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Crop</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Disease Detected</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">AI Confidence</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {history.map((item) => (
                <tr key={item.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.date}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.crop}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-red-600 font-medium">{item.disease}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.confidence}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                      {item.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-600 hover:text-blue-900 cursor-pointer">
                    View Report
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DiseaseHistory;
