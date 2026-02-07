import React, { useState } from 'react';
import Head from 'next/head';
import VideoPlayer from '../../components/learning/VideoPlayer';

const Videos = () => {
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [selectedVideo, setSelectedVideo] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');

    const categories = [
        { id: 'all', name: 'All Videos' },
        { id: 'disease', name: 'Disease Detection' },
        { id: 'tutorial', name: 'Tutorials' },
        { id: 'course', name: 'Courses' },
        { id: 'webinar', name: 'Webinars' }
    ];

    const videos = [
        { id: 1, title: { en: 'How to Identify Wheat Rust Disease', hi: 'गेहूं में रस्ट रोग की पहचान' }, category: 'disease', duration: 420, views: 15200, thumbnail: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=400' },
        { id: 2, title: { en: 'Modern Irrigation Techniques', hi: 'आधुनिक सिंचाई तकनीक' }, category: 'tutorial', duration: 680, views: 8500, thumbnail: 'https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=400' },
        { id: 3, title: { en: 'Organic Farming Basics', hi: 'जैविक खेती की मूल बातें' }, category: 'course', duration: 1240, views: 22400, thumbnail: 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=400' },
        { id: 4, title: { en: 'Pest Management in Cotton', hi: 'कपास में कीट प्रबंधन' }, category: 'disease', duration: 540, views: 11300, thumbnail: 'https://images.unsplash.com/photo-1599488615731-7e5c2823ff28?w=400' },
        { id: 5, title: { en: 'Soil Health Webinar', hi: 'मिट्टी स्वास्थ्य वेबिनार' }, category: 'webinar', duration: 3600, views: 5600, thumbnail: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400' },
        { id: 6, title: { en: 'Using Drones in Agriculture', hi: 'कृषि में ड्रोन का उपयोग' }, category: 'tutorial', duration: 480, views: 18700, thumbnail: 'https://images.unsplash.com/photo-1508614999368-9260051292e5?w=400' },
    ];

    const formatDuration = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return mins >= 60 ? `${Math.floor(mins / 60)}h ${mins % 60}m` : `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    const formatViews = (num) => {
        return num >= 1000 ? `${(num / 1000).toFixed(1)}K` : num;
    };

    const filteredVideos = videos.filter(v =>
        (selectedCategory === 'all' || v.category === selectedCategory) &&
        (v.title.en.toLowerCase().includes(searchQuery.toLowerCase()) || v.title.hi?.includes(searchQuery))
    );

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <Head>
                <title>Video Learning - AgriPredict360</title>
            </Head>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="text-center mb-8">
                    <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">Video Learning Center</h1>
                    <p className="mt-2 text-lg text-gray-600">Learn farming techniques from expert videos in multiple languages</p>
                </div>

                {selectedVideo ? (
                    /* Video Player View */
                    <div className="space-y-6">
                        <button onClick={() => setSelectedVideo(null)} className="flex items-center gap-2 text-green-600 hover:text-green-700 font-medium">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
                            Back to Videos
                        </button>

                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                            <div className="lg:col-span-2">
                                <VideoPlayer video={selectedVideo} />
                                <div className="mt-4 bg-white rounded-lg p-4 shadow">
                                    <h2 className="text-xl font-bold text-gray-900">{selectedVideo.title.en}</h2>
                                    <p className="text-gray-600 mt-1">{selectedVideo.title.hi}</p>
                                    <div className="flex items-center gap-4 mt-3 text-sm text-gray-500">
                                        <span>{formatViews(selectedVideo.views)} views</span>
                                        <span>•</span>
                                        <span>{formatDuration(selectedVideo.duration)}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <h3 className="font-semibold text-gray-900">Related Videos</h3>
                                {videos.filter(v => v.id !== selectedVideo.id).slice(0, 4).map(video => (
                                    <div key={video.id} onClick={() => setSelectedVideo(video)} className="flex gap-3 bg-white rounded-lg p-2 shadow-sm cursor-pointer hover:shadow-md transition-shadow">
                                        <img src={video.thumbnail} alt="" className="w-24 h-16 object-cover rounded" />
                                        <div className="flex-1 min-w-0">
                                            <p className="text-sm font-medium text-gray-900 line-clamp-2">{video.title.en}</p>
                                            <p className="text-xs text-gray-500 mt-1">{formatViews(video.views)} views</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                ) : (
                    /* Video Grid View */
                    <>
                        {/* Search & Filters */}
                        <div className="flex flex-col sm:flex-row gap-4 mb-8">
                            <div className="relative flex-1">
                                <input
                                    type="text"
                                    placeholder="Search videos..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                />
                                <svg className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                            </div>
                        </div>

                        {/* Category Tabs */}
                        <div className="flex flex-wrap gap-2 mb-8">
                            {categories.map(cat => (
                                <button
                                    key={cat.id}
                                    onClick={() => setSelectedCategory(cat.id)}
                                    className={`px-4 py-2 rounded-full font-medium text-sm transition-colors ${selectedCategory === cat.id
                                            ? 'bg-green-600 text-white'
                                            : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
                                        }`}
                                >
                                    {cat.name}
                                </button>
                            ))}
                        </div>

                        {/* Video Grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {filteredVideos.map(video => (
                                <div key={video.id} onClick={() => setSelectedVideo(video)} className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow cursor-pointer group">
                                    <div className="relative aspect-video">
                                        <img src={video.thumbnail} alt="" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors flex items-center justify-center">
                                            <div className="w-14 h-14 bg-white/90 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-lg">
                                                <svg className="w-7 h-7 text-green-600 ml-1" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
                                            </div>
                                        </div>
                                        <div className="absolute bottom-2 right-2 bg-black/80 text-white text-xs px-2 py-1 rounded">
                                            {formatDuration(video.duration)}
                                        </div>
                                    </div>
                                    <div className="p-4">
                                        <h3 className="font-semibold text-gray-900 line-clamp-2">{video.title.en}</h3>
                                        <p className="text-sm text-gray-500 mt-1 line-clamp-1">{video.title.hi}</p>
                                        <div className="flex items-center gap-2 mt-3">
                                            <span className={`text-xs px-2 py-1 rounded-full ${video.category === 'disease' ? 'bg-red-100 text-red-700' :
                                                    video.category === 'tutorial' ? 'bg-blue-100 text-blue-700' :
                                                        video.category === 'course' ? 'bg-purple-100 text-purple-700' :
                                                            'bg-orange-100 text-orange-700'
                                                }`}>{video.category}</span>
                                            <span className="text-sm text-gray-500">{formatViews(video.views)} views</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default Videos;
