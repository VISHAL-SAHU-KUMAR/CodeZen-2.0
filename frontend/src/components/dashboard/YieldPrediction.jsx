import React, { useState } from 'react';

const YieldPrediction = () => {
  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    crop: 'Wheat',
    area: '',
    rainfall: '',
    temperature: ''
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handlePredict = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setPrediction(null);

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_AI_SERVICE_URL || 'http://localhost:8000/api'}/yield/predict`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          crop: formData.crop,
          area: parseFloat(formData.area),
          rainfall: parseFloat(formData.rainfall),
          temperature: parseFloat(formData.temperature)
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to fetch prediction');
      }

      const data = await response.json();
      setPrediction({
        yield: `${data.predicted_yield_tons} Tons`,
        confidence: `${(data.confidence * 100).toFixed(0)}%`,
        factors: ['Based on provided rainfall and temperature data'],
        advisory: 'Ensure optimal irrigation if rainfall is low.'
      });
    } catch (err) {
      setError('An error occurred while fetching the prediction. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold text-gray-900">Yield Prediction AI</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h3 className="text-lg font-medium mb-4">Input Parameters</h3>
          <form onSubmit={handlePredict} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Crop</label>
              <select
                name="crop"
                value={formData.crop}
                onChange={handleInputChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              >
                <option value="Wheat">Wheat</option>
                <option value="Rice">Rice</option>
                <option value="Corn">Corn</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Field Area (Hectares)</label>
              <input
                type="number"
                name="area"
                value={formData.area}
                onChange={handleInputChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                placeholder="e.g. 2.5"
                required
                step="0.1"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Rainfall (mm)</label>
              <input
                type="number"
                name="rainfall"
                value={formData.rainfall}
                onChange={handleInputChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                placeholder="e.g. 120"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Temperature (°C)</label>
              <input
                type="number"
                name="temperature"
                value={formData.temperature}
                onChange={handleInputChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                placeholder="e.g. 28"
                required
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className={`w-full text-white px-4 py-2 rounded-md transition-colors ${loading ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'}`}
            >
              {loading ? 'Analyzing...' : 'Generate Prediction'}
            </button>
          </form>
          {error && <p className="mt-4 text-sm text-red-600">{error}</p>}
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-6 flex flex-col justify-center">
          {!prediction ? (
            <div className="text-center text-gray-500">
              <p>Enter data and click "Generate Prediction" to see AI analysis.</p>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="text-center pb-4 border-b border-gray-100">
                <p className="text-sm text-gray-500 uppercase tracking-wide">Estimated Yield</p>
                <p className="text-4xl font-bold text-green-600">{prediction.yield}</p>
                <p className="text-xs text-gray-400 mt-1">Confidence: {prediction.confidence}</p>
              </div>

              <div>
                <h4 className="text-sm font-medium text-gray-900 mb-2">Contributing Factors:</h4>
                <ul className="list-disc list-inside text-sm text-gray-600">
                  {prediction.factors.map((f, i) => <li key={i}>{f}</li>)}
                </ul>
              </div>

              <div className="bg-yellow-50 p-3 rounded-md">
                <h4 className="text-sm font-medium text-yellow-800 mb-1">AI Advisory:</h4>
                <p className="text-sm text-yellow-700">{prediction.advisory}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default YieldPrediction;
