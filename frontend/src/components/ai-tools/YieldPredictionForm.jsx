import React, { useState } from 'react';

const YieldPredictionForm = ({ onSubmit }) => {
    const [step, setStep] = useState(1);
    const [loading, setLoading] = useState(false);
    const [prediction, setPrediction] = useState(null);
    const [formData, setFormData] = useState({
        cropName: '',
        variety: '',
        area: '',
        soilType: '',
        irrigationType: '',
        sowingDate: '',
        state: '',
        district: ''
    });

    const crops = ['Wheat', 'Rice', 'Cotton', 'Soybean', 'Maize', 'Sugarcane', 'Mustard', 'Pulses'];
    const soilTypes = ['Alluvial', 'Black', 'Red', 'Laterite', 'Desert', 'Mountain', 'Other'];
    const irrigationTypes = ['Rainfed', 'Canal', 'Tubewell', 'Drip', 'Sprinkler', 'Other'];

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 2000));

        const estimatedYield = parseFloat(formData.area) * (Math.random() * 2 + 1.5);
        const confidence = Math.floor(Math.random() * 20 + 75);

        setPrediction({
            estimatedYield: estimatedYield.toFixed(2),
            yieldPerAcre: (estimatedYield / parseFloat(formData.area)).toFixed(2),
            confidence,
            factors: [
                { name: 'Weather Conditions', impact: 'positive', weight: 35 },
                { name: 'Soil Quality', impact: 'positive', weight: 25 },
                { name: 'Irrigation', impact: 'neutral', weight: 20 },
                { name: 'Historical Data', impact: 'positive', weight: 20 }
            ],
            financials: {
                revenue: Math.round(estimatedYield * 10 * 2500),
                costs: Math.round(parseFloat(formData.area) * 15000),
                profit: Math.round(estimatedYield * 10 * 2500 - parseFloat(formData.area) * 15000)
            }
        });

        setLoading(false);
        setStep(3);
    };

    return (
        <div className="max-w-4xl mx-auto">
            {/* Progress Steps */}
            <div className="mb-8">
                <div className="flex items-center justify-center">
                    {[1, 2, 3].map((s) => (
                        <React.Fragment key={s}>
                            <div className={`flex items-center justify-center w-10 h-10 rounded-full font-semibold ${step >= s ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-600'
                                }`}>
                                {s}
                            </div>
                            {s < 3 && <div className={`w-16 sm:w-24 h-1 ${step > s ? 'bg-green-600' : 'bg-gray-200'}`} />}
                        </React.Fragment>
                    ))}
                </div>
                <div className="flex justify-center mt-2 text-sm text-gray-600">
                    <span className="w-24 text-center">Farm Details</span>
                    <span className="w-24 text-center">Crop Info</span>
                    <span className="w-24 text-center">Results</span>
                </div>
            </div>

            {/* Step 1: Farm Details */}
            {step === 1 && (
                <div className="bg-white rounded-xl shadow-lg p-6 sm:p-8">
                    <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6">Farm Details</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Farm Area (Acres) *</label>
                            <input
                                type="number"
                                name="area"
                                value={formData.area}
                                onChange={handleChange}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                placeholder="e.g., 5"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Soil Type *</label>
                            <select
                                name="soilType"
                                value={formData.soilType}
                                onChange={handleChange}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                required
                            >
                                <option value="">Select soil type</option>
                                {soilTypes.map(type => <option key={type} value={type.toLowerCase()}>{type}</option>)}
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Irrigation Type *</label>
                            <select
                                name="irrigationType"
                                value={formData.irrigationType}
                                onChange={handleChange}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                required
                            >
                                <option value="">Select irrigation</option>
                                {irrigationTypes.map(type => <option key={type} value={type.toLowerCase()}>{type}</option>)}
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">State</label>
                            <input
                                type="text"
                                name="state"
                                value={formData.state}
                                onChange={handleChange}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                placeholder="e.g., Maharashtra"
                            />
                        </div>
                    </div>
                    <div className="mt-8 flex justify-end">
                        <button
                            onClick={() => setStep(2)}
                            disabled={!formData.area || !formData.soilType || !formData.irrigationType}
                            className="px-6 py-3 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
                        >
                            Next: Crop Details →
                        </button>
                    </div>
                </div>
            )}

            {/* Step 2: Crop Info */}
            {step === 2 && (
                <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-lg p-6 sm:p-8">
                    <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6">Crop Information</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Crop *</label>
                            <select
                                name="cropName"
                                value={formData.cropName}
                                onChange={handleChange}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                required
                            >
                                <option value="">Select crop</option>
                                {crops.map(crop => <option key={crop} value={crop}>{crop}</option>)}
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Variety</label>
                            <input
                                type="text"
                                name="variety"
                                value={formData.variety}
                                onChange={handleChange}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                placeholder="e.g., HD-2967"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Sowing Date *</label>
                            <input
                                type="date"
                                name="sowingDate"
                                value={formData.sowingDate}
                                onChange={handleChange}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                required
                            />
                        </div>
                    </div>
                    <div className="mt-8 flex justify-between">
                        <button type="button" onClick={() => setStep(1)} className="px-6 py-3 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors">
                            ← Back
                        </button>
                        <button type="submit" disabled={loading || !formData.cropName || !formData.sowingDate} className="px-6 py-3 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center gap-2">
                            {loading ? (
                                <>
                                    <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                                    Analyzing...
                                </>
                            ) : 'Get Prediction'}
                        </button>
                    </div>
                </form>
            )}

            {/* Step 3: Results */}
            {step === 3 && prediction && (
                <div className="space-y-6">
                    {/* Main prediction card */}
                    <div className="bg-gradient-to-br from-green-500 to-green-700 rounded-xl shadow-lg p-6 sm:p-8 text-white">
                        <h2 className="text-xl sm:text-2xl font-bold mb-4">Yield Prediction Results</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                            <div className="text-center">
                                <p className="text-green-100 text-sm">Estimated Yield</p>
                                <p className="text-3xl sm:text-4xl font-bold">{prediction.estimatedYield}</p>
                                <p className="text-green-100">tons</p>
                            </div>
                            <div className="text-center">
                                <p className="text-green-100 text-sm">Yield Per Acre</p>
                                <p className="text-3xl sm:text-4xl font-bold">{prediction.yieldPerAcre}</p>
                                <p className="text-green-100">tons/acre</p>
                            </div>
                            <div className="text-center">
                                <p className="text-green-100 text-sm">Confidence</p>
                                <p className="text-3xl sm:text-4xl font-bold">{prediction.confidence}%</p>
                                <p className="text-green-100">accuracy</p>
                            </div>
                        </div>
                    </div>

                    {/* Factors */}
                    <div className="bg-white rounded-xl shadow-lg p-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Contributing Factors</h3>
                        <div className="space-y-3">
                            {prediction.factors.map((factor, idx) => (
                                <div key={idx} className="flex items-center gap-4">
                                    <span className={`w-3 h-3 rounded-full ${factor.impact === 'positive' ? 'bg-green-500' : factor.impact === 'negative' ? 'bg-red-500' : 'bg-yellow-500'}`}></span>
                                    <span className="flex-1 text-gray-700">{factor.name}</span>
                                    <div className="w-24 bg-gray-200 rounded-full h-2">
                                        <div className="bg-green-600 h-2 rounded-full" style={{ width: `${factor.weight}%` }}></div>
                                    </div>
                                    <span className="text-sm text-gray-500">{factor.weight}%</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Financial Forecast */}
                    <div className="bg-white rounded-xl shadow-lg p-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Financial Forecast</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                            <div className="bg-blue-50 p-4 rounded-lg text-center">
                                <p className="text-blue-600 text-sm">Expected Revenue</p>
                                <p className="text-2xl font-bold text-blue-800">₹{prediction.financials.revenue.toLocaleString()}</p>
                            </div>
                            <div className="bg-orange-50 p-4 rounded-lg text-center">
                                <p className="text-orange-600 text-sm">Estimated Costs</p>
                                <p className="text-2xl font-bold text-orange-800">₹{prediction.financials.costs.toLocaleString()}</p>
                            </div>
                            <div className="bg-green-50 p-4 rounded-lg text-center">
                                <p className="text-green-600 text-sm">Expected Profit</p>
                                <p className="text-2xl font-bold text-green-800">₹{prediction.financials.profit.toLocaleString()}</p>
                            </div>
                        </div>
                    </div>

                    <button onClick={() => { setStep(1); setPrediction(null); }} className="w-full px-6 py-3 border border-green-600 text-green-600 font-medium rounded-lg hover:bg-green-50 transition-colors">
                        Start New Prediction
                    </button>
                </div>
            )}
        </div>
    );
};

export default YieldPredictionForm;
