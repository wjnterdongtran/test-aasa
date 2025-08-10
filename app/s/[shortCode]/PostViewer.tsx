"use client";

import { useState, useEffect } from "react";
import {
    Play,
    Heart,
    MessageCircle,
    Eye,
    Smartphone,
    ExternalLink,
    Download,
} from "lucide-react";
import Image from "next/image";

interface PostData {
    id: string;
    name: string;
    username: string;
    userAvatar: string;
    thumbnail: string;
    mediaType: string;
    like: number;
    comment: number;
    view: number;
    caption: string;
}

interface PostViewerProps {
    postData: PostData;
}

export default function PostViewer({ postData }: PostViewerProps) {
    const [showAppPrompt, setShowAppPrompt] = useState(false);
    const [userAgent, setUserAgent] = useState("");

    useEffect(() => {
        setUserAgent(navigator.userAgent);

        // Show app prompt after 3 seconds on mobile
        const timer = setTimeout(() => {
            setShowAppPrompt(true);
        }, 3000);

        return () => clearTimeout(timer);
    }, []);

    const isIOS = () => /iPad|iPhone|iPod/.test(userAgent);
    const isAndroid = () => /Android/.test(userAgent);
    const isMobile = () => isIOS() || isAndroid();

    const openInApp = () => {
        const deepLink = `${
            process.env.NEXT_PUBLIC_APP_SCHEME || "ootnox-dev"
        }://post/${postData?.id}`;

        window.location.href = deepLink;

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

    return (
        <>
            <div className="max-w-sm w-full">
                {/* Post Preview Card */}
                <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 mb-8 border border-white/20 shadow-2xl">
                    {/* User Info */}
                    <div className="flex items-center space-x-3 mb-4">
                        <Image
                            src={postData?.userAvatar}
                            alt={postData?.username}
                            className="w-12 h-12 rounded-full border-2 border-white/30"
                            width={48}
                            height={48}
                        />
                        <div>
                            <p className="text-white font-semibold">
                                {postData?.name}
                            </p>
                            <p className="text-gray-300 text-sm">
                                @{postData?.username}
                            </p>
                        </div>
                    </div>

                    {/* Media Preview */}
                    <div className="relative rounded-xl overflow-hidden mb-4 group">
                        <Image
                            src={postData?.thumbnail}
                            alt="Post preview"
                            className="w-full h-[533px] object-cover"
                            width={400}
                            height={533}
                            quality={100}
                            priority={true}
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
                            <span>{postData?.like?.toLocaleString()}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                            <MessageCircle className="w-4 h-4" />
                            <span>{postData?.comment?.toLocaleString()}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                            <Eye className="w-4 h-4" />
                            <span>{postData?.view?.toLocaleString()}</span>
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
                            Get the app to see this post and discover amazing
                            content from @{postData?.username}
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
                            {isMobile() ? "Get the App" : "Download App"}
                        </button>

                        <p className="text-gray-400 text-sm">
                            Available on iOS and Android
                        </p>
                    </div>
                </div>
            </div>
            {/* App Prompt Modal */}
            {showAppPrompt && (
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
        </>
    );
}
