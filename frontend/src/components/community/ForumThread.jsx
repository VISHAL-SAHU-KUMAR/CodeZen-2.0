import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const ForumThread = ({ post, onBack }) => {
  const [newAnswer, setNewAnswer] = useState('');
  const [upvoted, setUpvoted] = useState(false);

  // Mock thread data
  const threadPost = post || {
    id: 1,
    title: 'Wheat leaves turning yellow from edges - Need urgent help!',
    content: 'My wheat crop is 45 days old. Since last 3 days, leaves are turning yellow starting from the tips. Is it nutrient deficiency or some pest? I applied urea 10 days ago.',
    author: 'Suresh Kumar',
    date: '2 hours ago',
    category: 'Crop Health',
    tags: ['Wheat', 'Yellowing', 'Nutrients'],
    upvotes: 12,
    answers: [
      {
        id: 101,
        author: 'Dr. Arpan Patel',
        role: 'Expert Scientist',
        isExpert: true,
        isVerified: true,
        content: 'This looks like Nitrogen deficiency common in 45-day wheat. However, since you applied urea, check if the soil is too wet (waterlogging). If soil is fine, it could be Manganese deficiency. Apply a foliar spray of Manganese Sulphate (0.5%).',
        date: '1 hour ago',
        upvotes: 8
      },
      {
        id: 102,
        author: 'Gurpreet Singh',
        role: 'Progressive Farmer',
        isExpert: false,
        isVerified: false,
        content: 'I had the same issue last year. High moisture was the culprit. Check your drainage.',
        date: '45 mins ago',
        upvotes: 3
      }
    ]
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="max-w-4xl mx-auto p-4 sm:p-6"
    >
      <motion.button
        whileHover={{ x: -5 }}
        onClick={onBack}
        className="text-green-700 font-black flex items-center gap-2 mb-8 bg-white/50 backdrop-blur-md px-6 py-2 rounded-2xl border border-white shadow-sm hover:bg-white transition-all"
      >
        ← Back to Forum
      </motion.button>

      {/* Main Post Card */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="bg-white/80 backdrop-blur-xl rounded-[2.5rem] p-8 border border-white shadow-2xl relative overflow-hidden mb-8"
      >
        <div className="absolute top-0 right-0 w-32 h-32 bg-green-100/30 rounded-full -mr-16 -mt-16 blur-2xl"></div>

        <div className="flex items-center gap-4 mb-6">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-green-500 to-emerald-700 flex items-center justify-center text-white text-xl font-black shadow-lg">
            {threadPost.author[0]}
          </div>
          <div>
            <div className="font-black text-gray-900 text-lg">{threadPost.author}</div>
            <div className="text-xs font-bold text-gray-400 uppercase tracking-widest">{threadPost.date} • {threadPost.category}</div>
          </div>
        </div>

        <h1 className="text-3xl font-black text-gray-900 mb-6 leading-tight group-hover:text-green-700 transition-colors">
          {threadPost.title}
        </h1>

        <p className="text-gray-600 text-lg font-medium leading-relaxed mb-8">
          {threadPost.content}
        </p>

        <div className="flex flex-wrap gap-2 mb-8">
          {threadPost.tags.map(tag => (
            <span key={tag} className="px-5 py-2 bg-green-50 text-green-700 rounded-2xl text-[10px] font-black uppercase tracking-widest border border-green-100">
              #{tag}
            </span>
          ))}
        </div>

        <div className="flex items-center justify-between pt-8 border-t border-gray-100">
          <div className="flex items-center gap-6">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setUpvoted(!upvoted)}
              className={`flex items-center gap-2 px-6 py-3 rounded-2xl font-black text-sm transition-all ${upvoted ? 'bg-green-600 text-white shadow-lg' : 'bg-gray-50 text-gray-500 hover:bg-gray-100'}`}
            >
              ▲ {threadPost.upvotes + (upvoted ? 1 : 0)}
            </motion.button>
            <span className="text-sm font-bold text-gray-400">💬 {threadPost.answers.length} Answers</span>
          </div>
          <button className="text-sm font-black text-green-600 hover:underline">Share Query</button>
        </div>
      </motion.div>

      {/* Answers Section */}
      <div className="space-y-6 mb-12">
        <h2 className="text-2xl font-black text-gray-900 px-2 flex items-center gap-3">
          Expert Solutions <span className="text-sm bg-yellow-400 px-3 py-1 rounded-full text-yellow-900 uppercase">Verified</span>
        </h2>
        <AnimatePresence>
          {threadPost.answers.map((answer, idx) => (
            <motion.div
              key={answer.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className={`p-8 rounded-[2rem] border-2 shadow-xl relative ${answer.isVerified
                  ? 'bg-gradient-to-br from-white to-green-50 border-green-200'
                  : 'bg-white/80 backdrop-blur-md border-transparent'
                }`}
            >
              {answer.isVerified && (
                <div className="absolute top-6 right-6 bg-green-600 text-white px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-tighter flex items-center gap-2 shadow-lg">
                  ✅ Verified Solution
                </div>
              )}

              <div className="flex items-center gap-4 mb-6">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-white font-black shadow-md ${answer.isExpert ? 'bg-yellow-500' : 'bg-gray-400'}`}>
                  {answer.author[0]}
                </div>
                <div>
                  <div className="font-black text-gray-900 flex items-center gap-2">
                    {answer.author}
                    {answer.isExpert && <span className="bg-yellow-100 text-yellow-700 text-[10px] px-2 py-0.5 rounded-md">EXPERT</span>}
                  </div>
                  <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{answer.role} • {answer.date}</div>
                </div>
              </div>

              <p className="text-gray-600 font-medium leading-relaxed mb-6">
                {answer.content}
              </p>

              <div className="flex items-center gap-4">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  className="px-4 py-2 bg-gray-50 rounded-xl text-xs font-bold text-gray-500 hover:bg-green-50 hover:text-green-600 transition-all"
                >
                  ▲ Helpfully {answer.upvotes}
                </motion.button>
                <button className="text-xs font-bold text-gray-400 hover:text-green-600">Reply</button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Answer Form */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="bg-gray-900 rounded-[2.5rem] p-8 shadow-2xl relative overflow-hidden"
      >
        <div className="absolute bottom-0 right-0 w-48 h-48 bg-green-500/10 rounded-full -mb-24 -mr-24 blur-3xl"></div>

        <h3 className="text-xl font-black text-white mb-6 flex items-center gap-3">
          Share your Expertise 💡
        </h3>
        <textarea
          value={newAnswer}
          onChange={(e) => setNewAnswer(e.target.value)}
          placeholder="Write your answer here..."
          className="w-full h-40 bg-white/5 border border-white/10 rounded-[1.5rem] p-6 text-white text-lg font-medium focus:outline-none focus:ring-2 focus:ring-green-500 transition-all shadow-inner mb-6"
        />
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 text-xs font-bold uppercase tracking-widest">
            Your answer will be reviewed by experts
          </p>
          <motion.button
            whileHover={{ scale: 1.05, x: 5 }}
            whileTap={{ scale: 0.95 }}
            className="w-full sm:w-auto px-10 py-4 bg-green-600 text-white rounded-2xl font-black uppercase text-xs tracking-widest shadow-lg shadow-green-900 hover:bg-green-700 transition-all"
          >
            Post Answer 🚀
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ForumThread;
