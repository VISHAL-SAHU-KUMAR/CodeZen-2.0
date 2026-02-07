import React from 'react';

const FarmProfile = () => {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold text-gray-900">Farm Profile</h2>
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <form className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Farm Name</label>
              <input type="text" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" defaultValue="Green Acres" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Total Area (Acres)</label>
              <input type="number" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" defaultValue="50" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Primary Crop</label>
              <select className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2">
                <option>Wheat</option>
                <option>Rice</option>
                <option>Corn</option>
                <option>Cotton</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Location</label>
              <input type="text" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" defaultValue="Punjab, India" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Soil Type</label>
            <textarea className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" rows="3" defaultValue="Loamy soil, rich in organic matter."></textarea>
          </div>
          <button type="button" className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700">
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
};

export default FarmProfile;
