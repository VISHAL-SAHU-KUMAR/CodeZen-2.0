import React from 'react';

const stories = [
  {
    name: 'Rajesh Kumar',
    role: 'Wheat Farmer, Punjab',
    image: null, // Placeholder
    quote: 'AgriPredict360 helped me identify a fungal infection early. I saved 80% of my crop this season.',
  },
  {
    name: 'Sarah Johnson',
    role: 'Organic Farmer, California',
    image: null, // Placeholder
    quote: 'The yield prediction tool gave me the confidence to invest in new equipment. Highly recommended!',
  },
  {
    name: 'Chen Wei',
    role: 'Rice Farmer, Hunan',
    image: null, // Placeholder
    quote: 'I use the soil analysis feature every month. My fertilizer costs have gone down by 30%.',
  },
];

const SuccessStories = () => {
  return (
    <div className="bg-gray-50 py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Success Stories
          </h2>
          <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500 sm:mt-4">
            Hear from farmers who have transformed their agriculture with our technology.
          </p>
        </div>
        <div className="mt-12 grid gap-8 lg:grid-cols-3 lg:gap-x-8">
          {stories.map((story) => (
            <div key={story.name} className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="p-8">
                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-green-500 text-white mx-auto mb-4">
                  <span className="text-2xl">❝</span>
                </div>
                <p className="text-gray-600 text-center italic mb-6">"{story.quote}"</p>
                <div className="flex items-center justify-center">
                  <div className="flex-shrink-0">
                    <div className="h-10 w-10 rounded-full bg-gray-300 flex items-center justify-center text-gray-500 font-bold">
                        {story.name[0]}
                    </div>
                  </div>
                  <div className="ml-3 text-center">
                    <p className="text-sm font-medium text-gray-900">{story.name}</p>
                    <p className="text-sm text-gray-500">{story.role}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SuccessStories;
