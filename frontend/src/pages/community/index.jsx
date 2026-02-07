import React, { useState } from 'react';
import Head from 'next/head';

const Community = () => {
  const [posts, setPosts] = useState([
    {
      id: 1,
      author: 'Rajesh Kumar',
      role: 'Wheat Farmer',
      time: '2 hours ago',
      content: 'Has anyone tried the new organic pesticide for aphids? I am seeing mixed results in my wheat field.',
      likes: 12,
      comments: 4,
      tags: ['Pest Control', 'Wheat']
    },
    {
      id: 2,
      author: 'Sarah Johnson',
      role: 'Agronomist',
      time: '4 hours ago',
      content: 'Tip of the day: Ensure your soil moisture levels are consistent before applying nitrogen fertilizers to avoid leaching.',
      likes: 45,
      comments: 8,
      tags: ['Soil Health', 'Tips']
    },
    {
      id: 3,
      author: 'Vikram Singh',
      role: 'Cotton Farmer',
      time: '1 day ago',
      content: 'Looking for recommendations on the best drought-resistant cotton varieties for the upcoming season in Gujarat.',
      likes: 23,
      comments: 15,
      tags: ['Seeds', 'Cotton']
    }
  ]);

  const [newPost, setNewPost] = useState('');

  const handlePostSubmit = (e) => {
    e.preventDefault();
    if (!newPost.trim()) return;
    
    const post = {
      id: posts.length + 1,
      author: 'You',
      role: 'Farmer',
      time: 'Just now',
      content: newPost,
      likes: 0,
      comments: 0,
      tags: ['General']
    };

    setPosts([post, ...posts]);
    setNewPost('');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <Head>
        <title>Community Forum - AgriPredict360</title>
      </Head>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Farmer Community
          </h1>
          <p className="mt-4 text-xl text-gray-500">
            Connect, share, and learn from fellow farmers and experts.
          </p>
        </div>

        {/* Create Post */}
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <form onSubmit={handlePostSubmit}>
            <div className="flex gap-4">
              <div className="flex-shrink-0 h-10 w-10 rounded-full bg-green-100 flex items-center justify-center text-green-600 font-bold">
                Y
              </div>
              <div className="flex-grow">
                <textarea
                  className="w-full border-gray-300 rounded-md shadow-sm focus:border-green-500 focus:ring-green-500 p-3 border"
                  rows="3"
                  placeholder="Share your experience or ask a question..."
                  value={newPost}
                  onChange={(e) => setNewPost(e.target.value)}
                ></textarea>
                <div className="mt-3 flex justify-end">
                  <button
                    type="submit"
                    className="bg-green-600 text-white px-6 py-2 rounded-md font-medium hover:bg-green-700 transition-colors"
                  >
                    Post
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>

        {/* Feed */}
        <div className="space-y-6">
          {posts.map((post) => (
            <div key={post.id} className="bg-white rounded-lg shadow overflow-hidden">
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 font-bold">
                      {post.author[0]}
                    </div>
                    <div className="ml-3">
                      <p className="text-sm font-medium text-gray-900">{post.author}</p>
                      <div className="flex text-xs text-gray-500">
                        <span>{post.role}</span>
                        <span className="mx-1">•</span>
                        <span>{post.time}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    {post.tags.map((tag, i) => (
                      <span key={i} className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                
                <p className="text-gray-800 text-base leading-relaxed mb-4">
                  {post.content}
                </p>

                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <div className="flex space-x-6">
                    <button className="flex items-center text-gray-500 hover:text-green-600 transition-colors">
                      <svg className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
                      </svg>
                      <span className="text-sm font-medium">{post.likes} Likes</span>
                    </button>
                    <button className="flex items-center text-gray-500 hover:text-blue-600 transition-colors">
                      <svg className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                      </svg>
                      <span className="text-sm font-medium">{post.comments} Comments</span>
                    </button>
                  </div>
                  <button className="text-gray-400 hover:text-gray-600">
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Community;
