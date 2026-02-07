import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const FarmerProfile = ({ profile, isOwnProfile = false }) => {
  const [activeTab, setActiveTab] = useState('farms');

  // Mock data for demo
  const mockProfile = profile || {
    fullName: 'Ram Kumar Singh',
    username: 'ramsingh_farmer',
    avatar: null,
    bio: 'Progressive farmer from Punjab. Growing wheat, rice, and vegetables for 15 years. Believer in sustainable farming 🌱',
    location: { district: 'Ludhiana', state: 'Punjab' },
    experience: 15,
    followers: new Array(234),
    following: new Array(89),
    stats: { level: 12, points: 4500, detectionsCount: 45, answersGiven: 28, videosWatched: 67 },
    achievements: [
      { id: 1, title: 'Expert Farmer', icon: '🏆', description: 'Completed 50+ disease detections' },
      { id: 2, title: 'Helpful', icon: '🤝', description: 'Answered 25+ questions' },
      { id: 3, title: 'Learner', icon: '📚', description: 'Watched 50+ videos' }
    ],
    farmDetails: {
      crops: [
        { id: 1, name: 'Wheat', variety: 'HD-3086', area: 5, status: 'growing', sowingDate: '2025-11-15', expectedHarvestDate: '2026-04-15' },
        { id: 2, name: 'Rice', variety: 'Pusa Basmati', area: 3, status: 'harvested', sowingDate: '2025-06-15', expectedHarvestDate: '2025-10-20' }
      ]
    },
    recentActivity: [
      { id: 1, icon: '🌿', title: 'Disease Detected', description: 'Identified Wheat Rust on your field', timestamp: new Date(Date.now() - 3600000) },
      { id: 2, icon: '💬', title: 'Answer Accepted', description: 'Your answer was marked as helpful', timestamp: new Date(Date.now() - 86400000) },
      { id: 3, icon: '🎬', title: 'Video Watched', description: 'Completed "Organic Farming Basics"', timestamp: new Date(Date.now() - 172800000) }
    ]
  };

  const tabs = [
    { id: 'farms', label: '🌾 My Farms', icon: '🌾' },
    { id: 'activity', label: '📊 Activity', icon: '📊' },
    { id: 'learning', label: '🎓 Learning', icon: '🎓' },
    { id: 'achievements', label: '🏆 Achievements', icon: '🏆' },
    { id: 'posts', label: '💬 Posts', icon: '💬' }
  ];

  const formatDate = (date) => new Date(date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
  const timeAgo = (date) => {
    const diff = Date.now() - new Date(date).getTime();
    if (diff < 3600000) return `${Math.floor(diff / 60000)}m ago`;
    if (diff < 86400000) return `${Math.floor(diff / 3600000)}h ago`;
    return `${Math.floor(diff / 86400000)}d ago`;
  };
  const daysUntil = (date) => Math.max(0, Math.ceil((new Date(date).getTime() - Date.now()) / 86400000));

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="max-w-6xl mx-auto p-4 sm:p-6"
    >
      {/* Header Section */}
      <motion.div
        variants={itemVariants}
        className="bg-gradient-to-r from-green-600 via-green-700 to-emerald-800 rounded-3xl p-6 sm:p-8 text-white relative overflow-hidden shadow-2xl"
      >
        {/* 3D Background Effect */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.3, 0.2] }}
            transition={{ duration: 10, repeat: Infinity }}
            className="absolute w-64 h-64 -top-32 -right-32 bg-green-400 rounded-full blur-[100px]"
          />
          <div className="absolute w-48 h-48 -bottom-24 -left-24 bg-emerald-400/20 rounded-full blur-3xl"></div>
        </div>

        <div className="relative z-10">
          <div className="flex flex-col sm:flex-row items-start justify-between gap-6">
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
              <motion.div whileHover={{ scale: 1.05 }} className="relative">
                <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-3xl bg-white/20 border-4 border-white/50 backdrop-blur-md flex items-center justify-center text-4xl sm:text-5xl shadow-xl overflow-hidden">
                  {mockProfile.avatar ? <img src={mockProfile.avatar} alt="" className="w-full h-full object-cover" /> : mockProfile.fullName[0]}
                </div>
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -bottom-2 -right-2 bg-yellow-400 text-yellow-900 text-xs font-black px-3 py-1.5 rounded-xl shadow-lg border-2 border-white"
                >
                  Lv.{mockProfile.stats.level}
                </motion.div>
              </motion.div>
              <div>
                <motion.h1 className="text-3xl sm:text-4xl font-black tracking-tight">{mockProfile.fullName}</motion.h1>
                <p className="text-green-200 font-bold">@{mockProfile.username}</p>
                <div className="flex flex-wrap gap-3 sm:gap-4 mt-3 text-sm font-semibold">
                  <span className="flex items-center gap-1.5 bg-black/10 px-3 py-1 rounded-full">📍 {mockProfile.location.district}, {mockProfile.location.state}</span>
                  <span className="flex items-center gap-1.5 bg-black/10 px-3 py-1 rounded-full">🌾 {mockProfile.experience} वर्ष अनुभव</span>
                </div>
                <div className="flex gap-8 mt-5">
                  <div className="text-center"><div className="text-2xl font-black">{mockProfile.followers.length}</div><div className="text-xs text-green-200 uppercase tracking-widest font-black">Followers</div></div>
                  <div className="text-center"><div className="text-2xl font-black">{mockProfile.following.length}</div><div className="text-xs text-green-200 uppercase tracking-widest font-black">Following</div></div>
                </div>
              </div>
            </div>
            <div className="flex flex-wrap gap-3 mt-4 sm:mt-0">
              {!isOwnProfile ? (
                <>
                  <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="bg-white text-green-700 px-8 py-3 rounded-2xl font-black text-sm uppercase tracking-widest shadow-xl hover:shadow-green-500/20 transition-all">Follow</motion.button>
                  <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="bg-green-500 text-white px-8 py-3 rounded-2xl font-black text-sm uppercase tracking-widest shadow-xl border border-white/20 backdrop-blur-md hover:bg-green-400 transition-all">Message</motion.button>
                </>
              ) : (
                <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="bg-white text-green-700 px-8 py-3 rounded-2xl font-black text-sm uppercase tracking-widest shadow-xl">Edit Profile</motion.button>
              )}
            </div>
          </div>
          <motion.p className="mt-6 text-green-50 max-w-2xl text-lg font-medium leading-relaxed opacity-90">{mockProfile.bio}</motion.p>
          <div className="flex flex-wrap gap-3 mt-6">
            {mockProfile.achievements.map((achievement, idx) => (
              <motion.div
                key={achievement.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 + idx * 0.1 }}
                whileHover={{ y: -5, rotate: 2 }}
                className="bg-yellow-400 text-yellow-900 px-4 py-2 rounded-2xl text-xs font-black uppercase tracking-widest flex items-center gap-2 shadow-lg cursor-pointer"
              >
                <span className="text-lg">{achievement.icon}</span> {achievement.title}
              </motion.div>
            ))}
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8 bg-white/10 backdrop-blur-md rounded-[2rem] p-6 border border-white/10 shadow-inner">
            {[
              { label: 'Platform Level', value: mockProfile.stats.level, icon: '🔥' },
              { label: 'Agri Points', value: mockProfile.stats.points.toLocaleString(), icon: '💎' },
              { label: 'Detections', value: mockProfile.stats.detectionsCount, icon: '🔬' },
              { label: 'Answers', value: mockProfile.stats.answersGiven, icon: '💬' }
            ].map(stat => (
              <div key={stat.label} className="text-center group">
                <div className="text-2xl mb-1 group-hover:scale-125 transition-transform duration-300">{stat.icon}</div>
                <div className="text-2xl font-black">{stat.value}</div>
                <div className="text-[10px] text-green-200 uppercase tracking-[0.2em] font-black">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Tabs */}
      <motion.div variants={itemVariants} className="mt-8">
        <div className="flex overflow-x-auto gap-2 bg-white/50 backdrop-blur-md p-2 rounded-2xl shadow-inner border border-white/50">
          {tabs.map(tab => (
            <motion.button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
              className={`flex-1 min-w-max px-6 py-4 rounded-xl font-black text-xs uppercase tracking-[0.1em] transition-all whitespace-nowrap ${activeTab === tab.id ? 'bg-gradient-to-br from-green-600 to-emerald-700 text-white shadow-xl translate-y-[-2px]' : 'text-gray-500 hover:text-green-700 hover:bg-green-50'
                }`}
            >
              {tab.label}
            </motion.button>
          ))}
        </div>

        <div className="mt-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
            >
              {activeTab === 'farms' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {mockProfile.farmDetails.crops.map((crop, idx) => (
                    <motion.div
                      key={crop.id}
                      whileHover={{ scale: 1.02, y: -5 }}
                      className="bg-white/80 backdrop-blur-md border border-white shadow-xl rounded-[2.5rem] p-8 hover:shadow-green-100 transition-all group"
                    >
                      <div className="flex justify-between items-start mb-6">
                        <div>
                          <h3 className="text-2xl font-black text-gray-900 group-hover:text-green-700 transition-colors">{crop.name}</h3>
                          <p className="text-gray-500 font-bold uppercase tracking-widest text-xs">{crop.variety}</p>
                        </div>
                        <span className={`px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-widest ${crop.status === 'growing' ? 'bg-green-100 text-green-700 border border-green-200 shadow-sm animate-pulse' : 'bg-gray-100 text-gray-700 border border-gray-200'
                          }`}>
                          {crop.status === 'growing' ? '🌱 In Progress' : '✅ Harvested'}
                        </span>
                      </div>
                      <div className="grid grid-cols-2 gap-6 text-sm mb-6">
                        <div className="bg-gray-50/50 p-4 rounded-2xl">
                          <span className="text-gray-400 font-black uppercase text-[10px] block mb-1">Land Area</span>
                          <span className="font-black text-gray-900 text-lg">{crop.area} <span className="text-gray-400 text-sm">Acres</span></span>
                        </div>
                        <div className="bg-gray-50/50 p-4 rounded-2xl">
                          <span className="text-gray-400 font-black uppercase text-[10px] block mb-1">Days Remaining</span>
                          <span className="font-black text-green-600 text-lg">{daysUntil(crop.expectedHarvestDate)} <span className="text-gray-400 text-sm italic">Left</span></span>
                        </div>
                      </div>
                      <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="w-full bg-gradient-to-r from-green-600 to-emerald-700 text-white py-4 rounded-2xl shadow-xl hover:shadow-green-500/30 transition-all font-black uppercase text-xs tracking-widest">
                        Manage Crop Health 🔬
                      </motion.button>
                    </motion.div>
                  ))}
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    className="border-4 border-dashed border-gray-200 rounded-[2.5rem] p-8 flex items-center justify-center hover:bg-green-50/50 cursor-pointer transition-all hover:border-green-400 group h-full min-h-[250px]"
                  >
                    <div className="text-center">
                      <div className="text-5xl mb-4 group-hover:rotate-12 group-hover:scale-125 transition-all duration-500">🌾</div>
                      <div className="font-black text-gray-400 uppercase tracking-widest group-hover:text-green-600 transition-colors">Start New Season</div>
                    </div>
                  </motion.div>
                </div>
              )}
              {activeTab === 'activity' && (
                <div className="space-y-4">
                  {mockProfile.recentActivity.map((activity, idx) => (
                    <motion.div
                      key={activity.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.1 }}
                      className="group bg-white/80 backdrop-blur-md p-6 rounded-[1.5rem] shadow-lg border-2 border-transparent hover:border-green-200 hover:shadow-xl transition-all flex items-center gap-6"
                    >
                      <div className="text-4xl bg-gray-50 w-20 h-20 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-500 shadow-inner">{activity.icon}</div>
                      <div className="flex-1">
                        <div className="font-black text-gray-900 text-lg group-hover:text-green-700 transition-colors">{activity.title}</div>
                        <div className="text-gray-500 font-medium italic mt-1">{activity.description}</div>
                        <div className="text-[10px] text-gray-400 mt-3 font-black uppercase tracking-widest">{timeAgo(activity.timestamp)}</div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
              {/* Other tabs follow similar premium animated pattern */}
              {activeTab === 'learning' && (
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                  {[
                    { label: 'Videos Watched', val: mockProfile.stats.videosWatched, icon: '🎬', color: 'blue' },
                    { label: 'Courses Done', val: 5, icon: '📚', color: 'purple' },
                    { label: 'Certificates', val: 3, icon: 'emerald', color: 'emerald' }
                  ].map(card => (
                    <motion.div
                      key={card.label}
                      whileHover={{ y: -10 }}
                      className={`bg-white shadow-xl rounded-[2rem] p-8 text-center border-b-8 border-${card.color}-500 transition-all`}
                    >
                      <div className="text-5xl mb-4 grayscale group-hover:grayscale-0 transition-all">{card.icon}</div>
                      <div className={`text-5xl font-black text-${card.color}-600 mb-2`}>{card.val}</div>
                      <div className="text-gray-400 font-black uppercase text-[10px] tracking-widest">{card.label}</div>
                    </motion.div>
                  ))}
                </div>
              )}
              {activeTab === 'achievements' && (
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  {[{ id: 1, icon: '🏆', title: 'Expert Farmer', description: '50+ detections', unlocked: true }, { id: 2, icon: '🤝', title: 'Helpful', description: '25+ answers', unlocked: true }, { id: 3, icon: '📚', title: 'Learner', description: '50+ videos', unlocked: true }, { id: 4, icon: '🌟', title: 'Rising Star', description: '100 followers', unlocked: true }, { id: 5, icon: '🔬', title: 'Scientist', description: '100 detections', unlocked: false, progress: 45 }, { id: 6, icon: '💎', title: 'Diamond', description: 'Level 20', unlocked: false, progress: 60 }].map(a => (
                    <div key={a.id} className={`border rounded-xl p-4 sm:p-6 text-center transition-all transform hover:scale-105 ${a.unlocked ? 'bg-yellow-50 border-yellow-400' : 'bg-gray-50 opacity-60'}`}>
                      <div className="text-4xl sm:text-5xl mb-3">{a.icon}</div><div className="font-bold text-gray-900">{a.title}</div><div className="text-xs sm:text-sm text-gray-600 mt-2">{a.description}</div>
                      {a.unlocked ? <div className="text-xs text-green-600 mt-2">✅ Unlocked</div> : <div className="mt-2"><div className="w-full bg-gray-200 rounded-full h-2"><div className="bg-yellow-400 h-2 rounded-full" style={{ width: `${a.progress}%` }}></div></div><div className="text-xs text-gray-500 mt-1">{a.progress}%</div></div>}
                    </div>
                  ))}
                </div>
              )}
              {activeTab === 'posts' && <div className="text-center py-12 text-gray-500"><div className="text-5xl mb-4">💬</div><p>No posts yet. Start sharing!</p><button className="mt-4 bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-all">Create First Post</button></div>}
            </motion.div>
          </AnimatePresence>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default FarmerProfile;
