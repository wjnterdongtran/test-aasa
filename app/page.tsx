"use client";

import React, { useState, useEffect } from "react";
import {
    Smartphone,
    Download,
    Play,
    ExternalLink,
    Share2,
    Heart,
    MessageCircle,
    Eye,
} from "lucide-react";

const MobileAppRedirect = () => {
    const [postData, setPostData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [userAgent, setUserAgent] = useState("");
    const [showAppPrompt, setShowAppPrompt] = useState(false);

    // Mock post data - replace with actual API call
    const mockPostData = {
        id: "12345",
        username: "johndoe",
        caption: "Amazing sunset at the beach! 🌅 #sunset #beach #nature",
        mediaType: "video",
        thumbnail:
            "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=600&fit=crop",
        likes: 15420,
        comments: 892,
        views: 128000,
        userAvatar:
            "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
    };

    useEffect(() => {
        setUserAgent(navigator.userAgent);

        // Simulate API call to fetch post data
        setTimeout(() => {
            setPostData(mockPostData);
            setLoading(false);
        }, 1000);

        // Auto-show app prompt after 2 seconds
        const timer = setTimeout(() => {
            setShowAppPrompt(true);
        }, 2000);

        return () => clearTimeout(timer);
    }, []);

    const isIOS = () => /iPad|iPhone|iPod/.test(userAgent);
    const isAndroid = () => /Android/.test(userAgent);
    const isMobile = () => isIOS() || isAndroid();

    const openInApp = () => {
        const deepLink = `myapp://post/${postData?.id}`;
        const universalLink = `https://yourapp.com/post/${postData?.id}`;

        if (isIOS()) {
            window.location.href = universalLink;
        } else {
            window.location.href = deepLink;
        }

        // Fallback to app store after delay
        setTimeout(() => {
            redirectToAppStore();
        }, 2000);
    };

    const redirectToAppStore = () => {
        if (isIOS()) {
            window.open("https://apps.apple.com/app/yourapp", "_blank");
        } else if (isAndroid()) {
            window.open(
                "https://play.google.com/store/apps/details?id=com.yourapp",
                "_blank"
            );
        } else {
            window.open("https://yourapp.com/download", "_blank");
        }
    };

    const sharePost = async () => {
        const shareData = {
            title: `Check out this post by @${postData?.username}`,
            text: postData?.caption,
            url: window.location.href,
        };

        if (navigator.share) {
            try {
                await navigator.share(shareData);
            } catch (err) {
                console.log("Share cancelled");
            }
        } else {
            // Fallback: copy to clipboard
            navigator.clipboard.writeText(window.location.href);
            alert("Link copied to clipboard!");
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-4 border-white border-t-transparent mx-auto mb-4"></div>
                    <p className="text-white text-lg">Loading post...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-red-900 via-purple-900 to-indigo-900 flex items-center justify-center p-4">
                <div className="text-center max-w-md">
                    <h1 className="text-2xl font-bold text-white mb-4">
                        Oops! Something went wrong
                    </h1>
                    <p className="text-gray-300 mb-6">{error}</p>
                    <button
                        onClick={() => window.location.reload()}
                        className="bg-white text-purple-900 px-6 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors"
                    >
                        Try Again
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 relative overflow-hidden">
            {/* Animated background elements */}
            <div className="absolute inset-0">
                <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
                <div className="absolute top-40 right-10 w-72 h-72 bg-cyan-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-1000"></div>
                <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-500"></div>
            </div>

            <div className="relative z-10 min-h-screen flex flex-col">
                {/* Header */}
                <header className="p-6 flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-gradient-to-r from-pink-500 to-violet-500 rounded-lg flex items-center justify-center">
                            <Play className="w-5 h-5 text-white" />
                        </div>
                        <h1 className="text-white font-bold text-xl">
                            YourApp
                        </h1>
                    </div>
                    <button
                        onClick={sharePost}
                        className="p-2 rounded-full bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-colors"
                    >
                        <Share2 className="w-5 h-5 text-white" />
                    </button>
                </header>

                {/* Main Content */}
                <main className="flex-1 flex flex-col items-center justify-center p-6">
                    <div className="max-w-sm w-full">
                        {/* Post Preview Card */}
                        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 mb-8 border border-white/20 shadow-2xl">
                            {/* User Info */}
                            <div className="flex items-center space-x-3 mb-4">
                                <img
                                    src={postData?.userAvatar}
                                    alt={postData?.username}
                                    className="w-12 h-12 rounded-full border-2 border-white/30"
                                />
                                <div>
                                    <p className="text-white font-semibold">
                                        @{postData?.username}
                                    </p>
                                    <p className="text-gray-300 text-sm">
                                        Creator
                                    </p>
                                </div>
                            </div>

                            {/* Media Preview */}
                            <div className="relative rounded-xl overflow-hidden mb-4 group">
                                <img
                                    src={postData?.thumbnail}
                                    alt="Post preview"
                                    className="w-full h-64 object-cover"
                                />
                                <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                    <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                                        <Play className="w-8 h-8 text-white ml-1" />
                                    </div>
                                </div>
                                {postData?.mediaType === "video" && (
                                    <div className="absolute top-3 right-3 bg-black/50 text-white text-xs px-2 py-1 rounded">
                                        Video
                                    </div>
                                )}
                            </div>

                            {/* Post Stats */}
                            <div className="flex items-center justify-between text-sm text-gray-300 mb-4">
                                <div className="flex items-center space-x-1">
                                    <Heart className="w-4 h-4" />
                                    <span>
                                        {postData?.likes?.toLocaleString()}
                                    </span>
                                </div>
                                <div className="flex items-center space-x-1">
                                    <MessageCircle className="w-4 h-4" />
                                    <span>
                                        {postData?.comments?.toLocaleString()}
                                    </span>
                                </div>
                                <div className="flex items-center space-x-1">
                                    <Eye className="w-4 h-4" />
                                    <span>
                                        {postData?.views?.toLocaleString()}
                                    </span>
                                </div>
                            </div>

                            {/* Caption */}
                            <p className="text-white text-sm leading-relaxed">
                                {postData?.caption}
                            </p>
                        </div>

                        {/* App Download Section */}
                        <div className="text-center">
                            <div className="mb-6">
                                <div className="w-20 h-20 bg-gradient-to-r from-pink-500 to-violet-500 rounded-2xl mx-auto mb-4 flex items-center justify-center transform hover:scale-105 transition-transform">
                                    <Smartphone className="w-10 h-10 text-white" />
                                </div>
                                <h2 className="text-2xl font-bold text-white mb-2">
                                    Watch the full video
                                </h2>
                                <p className="text-gray-300">
                                    Get the app to see this post and discover
                                    amazing content from @{postData?.username}
                                </p>
                            </div>

                            {/* Action Buttons */}
                            <div className="space-y-4">
                                {isMobile() ? (
                                    <button
                                        onClick={openInApp}
                                        className="w-full bg-gradient-to-r from-pink-500 to-violet-500 text-white py-4 px-6 rounded-2xl font-semibold text-lg hover:from-pink-600 hover:to-violet-600 transition-all duration-300 transform hover:scale-105 shadow-lg"
                                    >
                                        <ExternalLink className="w-5 h-5 inline mr-2" />
                                        Open in App
                                    </button>
                                ) : null}

                                <button
                                    onClick={redirectToAppStore}
                                    className="w-full bg-white text-purple-900 py-4 px-6 rounded-2xl font-semibold text-lg hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-lg"
                                >
                                    <Download className="w-5 h-5 inline mr-2" />
                                    {isMobile()
                                        ? "Get the App"
                                        : "Download App"}
                                </button>

                                <p className="text-gray-400 text-sm">
                                    Available on iOS and Android
                                </p>
                            </div>
                        </div>
                    </div>
                </main>

                {/* Footer */}
                <footer className="p-6 text-center">
                    <p className="text-gray-400 text-sm">
                        © 2025 YourApp. Share amazing moments.
                    </p>
                </footer>
            </div>

            {/* App Prompt Modal */}
            {showAppPrompt && isMobile() && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-end justify-center p-4 z-50">
                    <div className="bg-white rounded-t-3xl w-full max-w-md p-6 transform animate-slide-up">
                        <div className="text-center mb-6">
                            <div className="w-16 h-16 bg-gradient-to-r from-pink-500 to-violet-500 rounded-2xl mx-auto mb-4 flex items-center justify-center">
                                <Play className="w-8 h-8 text-white" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-2">
                                Better experience in the app
                            </h3>
                            <p className="text-gray-600 text-sm">
                                Watch videos, follow creators, and join the
                                community
                            </p>
                        </div>

                        <div className="space-y-3">
                            <button
                                onClick={openInApp}
                                className="w-full bg-gradient-to-r from-pink-500 to-violet-500 text-white py-3 px-6 rounded-xl font-semibold"
                            >
                                Open App
                            </button>
                            <button
                                onClick={() => setShowAppPrompt(false)}
                                className="w-full text-gray-600 py-3 px-6 font-medium"
                            >
                                Continue in Browser
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <style jsx>{`
                @keyframes slide-up {
                    from {
                        transform: translateY(100%);
                    }
                    to {
                        transform: translateY(0);
                    }
                }
                .animate-slide-up {
                    animation: slide-up 0.3s ease-out;
                }
            `}</style>
        </div>
    );
};

export default MobileAppRedirect;
