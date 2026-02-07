import React from 'react';

const CommunityForum = () => {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold text-gray-900">Community Discussions</h2>
      
      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden divide-y divide-gray-200">
        {[
          { title: 'Best practices for organic wheat farming?', author: 'Rajesh K.', replies: 12, time: '2 hours ago' },
          { title: 'How to control aphids naturally?', author: 'Sarah J.', replies: 5, time: '5 hours ago' },
          { title: 'Market price trends for cotton in Gujarat', author: 'Amit P.', replies: 24, time: '1 day ago' },
        ].map((thread, i) => (
          <div key={i} className="p-4 hover:bg-gray-50 cursor-pointer">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-md font-medium text-green-700">{thread.title}</h3>
                <p className="text-sm text-gray-500 mt-1">Posted by {thread.author} • {thread.time}</p>
              </div>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                {thread.replies} replies
              </span>
            </div>
          </div>
        ))}
      </div>
      <button className="w-full text-center text-green-600 font-medium py-2 hover:text-green-800">
        View All Discussions
      </button>
    </div>
  );
};

export default CommunityForum;
