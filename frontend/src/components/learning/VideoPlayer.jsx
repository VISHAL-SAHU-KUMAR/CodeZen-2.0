import React, { useState, useRef, useEffect } from 'react';

const VideoPlayer = ({ video }) => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [volume, setVolume] = useState(1);
    const [playbackRate, setPlaybackRate] = useState(1);
    const [selectedLanguage, setSelectedLanguage] = useState('en');
    const [showSubtitles, setShowSubtitles] = useState(true);
    const [activeChapter, setActiveChapter] = useState(0);
    const [isFullscreen, setIsFullscreen] = useState(false);
    const videoRef = useRef(null);
    const containerRef = useRef(null);

    // Demo video data if not provided
    const videoData = video || {
        title: { en: 'How to Identify Wheat Rust Disease', hi: 'गेहूं में रस्ट रोग की पहचान' },
        languages: [
            { code: 'en', videoUrl: 'https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4', subtitleUrl: '/subtitles/en.vtt' },
            { code: 'hi', videoUrl: 'https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4', subtitleUrl: '/subtitles/hi.vtt' }
        ],
        chapters: [
            { title: 'Introduction', timestamp: 0, description: 'Overview of the disease' },
            { title: 'Symptoms', timestamp: 30, description: 'Visual identification' },
            { title: 'Treatment', timestamp: 60, description: 'Cure and prevention' }
        ],
        duration: 120
    };

    const currentLanguage = videoData.languages?.find(l => l.code === selectedLanguage) || videoData.languages?.[0];

    useEffect(() => {
        const video = videoRef.current;
        if (video) {
            video.addEventListener('loadedmetadata', () => setDuration(video.duration));
            video.addEventListener('timeupdate', () => {
                setCurrentTime(video.currentTime);
                // Update active chapter
                const chapters = videoData.chapters || [];
                for (let i = chapters.length - 1; i >= 0; i--) {
                    if (video.currentTime >= chapters[i].timestamp) {
                        setActiveChapter(i);
                        break;
                    }
                }
            });
        }
    }, [currentLanguage]);

    const togglePlay = () => {
        if (videoRef.current.paused) {
            videoRef.current.play();
            setIsPlaying(true);
        } else {
            videoRef.current.pause();
            setIsPlaying(false);
        }
    };

    const handleSeek = (e) => {
        const time = (e.target.value / 100) * duration;
        videoRef.current.currentTime = time;
        setCurrentTime(time);
    };

    const jumpToChapter = (timestamp) => {
        videoRef.current.currentTime = timestamp;
        setCurrentTime(timestamp);
    };

    const toggleFullscreen = () => {
        if (!document.fullscreenElement) {
            containerRef.current?.requestFullscreen();
            setIsFullscreen(true);
        } else {
            document.exitFullscreen();
            setIsFullscreen(false);
        }
    };

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    return (
        <div ref={containerRef} className="bg-black rounded-lg overflow-hidden">
            {/* Video Element */}
            <div className="relative aspect-video">
                <video
                    ref={videoRef}
                    className="w-full h-full"
                    src={currentLanguage?.videoUrl}
                    onClick={togglePlay}
                    playsInline
                >
                    {showSubtitles && currentLanguage?.subtitleUrl && (
                        <track kind="subtitles" src={currentLanguage.subtitleUrl} label={selectedLanguage} default />
                    )}
                </video>

                {/* Play overlay */}
                {!isPlaying && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/30" onClick={togglePlay}>
                        <button className="w-16 h-16 sm:w-20 sm:h-20 bg-white/90 rounded-full flex items-center justify-center hover:bg-white transition-colors shadow-lg">
                            <svg className="w-8 h-8 sm:w-10 sm:h-10 text-green-600 ml-1" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M8 5v14l11-7z" />
                            </svg>
                        </button>
                    </div>
                )}
            </div>

            {/* Controls */}
            <div className="bg-gray-900 px-3 py-2 sm:px-4 sm:py-3 space-y-2">
                {/* Progress bar */}
                <div className="flex items-center gap-2 sm:gap-3">
                    <span className="text-white text-xs sm:text-sm font-mono">{formatTime(currentTime)}</span>
                    <input
                        type="range"
                        min="0"
                        max="100"
                        value={(currentTime / duration) * 100 || 0}
                        onChange={handleSeek}
                        className="flex-1 h-1 sm:h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-green-500"
                    />
                    <span className="text-white text-xs sm:text-sm font-mono">{formatTime(duration)}</span>
                </div>

                {/* Control buttons */}
                <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="flex items-center gap-2 sm:gap-3">
                        {/* Play/Pause */}
                        <button onClick={togglePlay} className="text-white hover:text-green-400 transition-colors p-1">
                            {isPlaying ? (
                                <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" /></svg>
                            ) : (
                                <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
                            )}
                        </button>

                        {/* Volume */}
                        <div className="hidden sm:flex items-center gap-2">
                            <button onClick={() => setVolume(v => v > 0 ? 0 : 1)} className="text-white hover:text-green-400 p-1">
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                    {volume > 0 ? <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02z" /> : <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z" />}
                                </svg>
                            </button>
                            <input
                                type="range"
                                min="0"
                                max="1"
                                step="0.1"
                                value={volume}
                                onChange={(e) => { setVolume(parseFloat(e.target.value)); videoRef.current.volume = e.target.value; }}
                                className="w-16 h-1 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-green-500"
                            />
                        </div>
                    </div>

                    <div className="flex items-center gap-2 sm:gap-3">
                        {/* Language selector */}
                        <select
                            value={selectedLanguage}
                            onChange={(e) => setSelectedLanguage(e.target.value)}
                            className="bg-gray-700 text-white text-xs sm:text-sm rounded px-2 py-1 border-0 focus:ring-2 focus:ring-green-500"
                        >
                            {videoData.languages?.map(lang => (
                                <option key={lang.code} value={lang.code}>
                                    {lang.code === 'en' ? 'English' : lang.code === 'hi' ? 'हिंदी' : lang.code === 'pa' ? 'ਪੰਜਾਬੀ' : 'मराठी'}
                                </option>
                            ))}
                        </select>

                        {/* Speed */}
                        <select
                            value={playbackRate}
                            onChange={(e) => { setPlaybackRate(parseFloat(e.target.value)); videoRef.current.playbackRate = e.target.value; }}
                            className="bg-gray-700 text-white text-xs sm:text-sm rounded px-2 py-1 border-0 focus:ring-2 focus:ring-green-500"
                        >
                            <option value="0.5">0.5x</option>
                            <option value="1">1x</option>
                            <option value="1.5">1.5x</option>
                            <option value="2">2x</option>
                        </select>

                        {/* Subtitles toggle */}
                        <button
                            onClick={() => setShowSubtitles(!showSubtitles)}
                            className={`text-xs sm:text-sm px-2 py-1 rounded ${showSubtitles ? 'bg-green-600 text-white' : 'bg-gray-700 text-gray-300'}`}
                        >
                            CC
                        </button>

                        {/* Fullscreen */}
                        <button onClick={toggleFullscreen} className="text-white hover:text-green-400 p-1">
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            {/* Chapters */}
            {videoData.chapters && videoData.chapters.length > 0 && (
                <div className="bg-gray-800 px-3 py-3 sm:px-4">
                    <h4 className="text-white text-sm font-medium mb-2">Chapters</h4>
                    <div className="flex flex-wrap gap-2">
                        {videoData.chapters.map((chapter, idx) => (
                            <button
                                key={idx}
                                onClick={() => jumpToChapter(chapter.timestamp)}
                                className={`text-xs sm:text-sm px-3 py-1.5 rounded-full transition-colors ${activeChapter === idx ? 'bg-green-600 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                                    }`}
                            >
                                {chapter.title}
                            </button>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default VideoPlayer;
