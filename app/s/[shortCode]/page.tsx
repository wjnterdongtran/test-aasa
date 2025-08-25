import { Metadata } from "next";
import { notFound } from "next/navigation";
import PostViewer from "./PostViewer";

interface PostContent {
    id: string;
    url: string;
    type: string;
    status: string;
}

interface User {
    _id: string;
    name: string;
    username: string;
    avatar: string;
    bio: string;
}

interface Post {
    _id: string;
    contents: PostContent[];
    userId: User;
    like: number;
    comment: number;
    view: number;
}

interface PostShortCodeData {
    clickCount: number;
    type: "post";
    contentId: string;
    post: Post;
}

interface UserShortCodeData {
    clickCount: number;
    type: "user";
    contentId: string;
    user: User;
}

interface ShortCodeResponse {
    data: PostShortCodeData | UserShortCodeData;
}

async function fetchShortCodeData(
    shortCode: string
): Promise<ShortCodeResponse> {
    const externalServiceUrl =
        process.env.EXTERNAL_SERVER_URL || "https://api.example.com";

    const response = await fetch(`${externalServiceUrl}/links/${shortCode}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
        next: { revalidate: 60 }, // Revalidate every 60 seconds
    });

    if (!response.ok) {
        if (response.status === 404) {
            notFound();
        }
        throw new Error(`Failed to fetch: ${response.status}`);
    }

    const data = await response.json();

    console.log(data);

    return data;
}

export async function generateMetadata({
    params,
}: {
    params: Promise<{ shortCode: string }>;
}): Promise<Metadata> {
    try {
        const { shortCode } = await params;
        const data = await fetchShortCodeData(shortCode);

        if (data.data.type === "user") {
            const { user } = data.data as UserShortCodeData;
            const description =
                user.bio || `Follow ${user.name} (@${user.username})`;

            return {
                title: `${user.name} (@${user.username}) - Profile`,
                description: description.slice(0, 160),
                openGraph: {
                    title: `${user.name} (@${user.username})`,
                    description: description.slice(0, 160),
                    images: user.avatar
                        ? [
                              {
                                  url: user.avatar,
                                  width: 400,
                                  height: 400,
                                  alt: `${user.name}'s profile picture`,
                              },
                          ]
                        : [],
                    type: "profile",
                },
                twitter: {
                    card: "summary",
                    title: `${user.name} (@${user.username})`,
                    description: description.slice(0, 160),
                    images: user.avatar ? [user.avatar] : [],
                    creator: `@${user.username}`,
                },
                alternates: {
                    canonical: `/s/${shortCode}`,
                },
            };
        } else {
            const { post } = data.data as PostShortCodeData;
            const firstImage = post.contents.find(
                (content) => content.type === "image"
            );
            const description =
                post.userId.bio ||
                `Post by ${post.userId.name} (@${post.userId.username})`;

            return {
                title: `${post.userId.name} (@${post.userId.username}) - Post`,
                description: description.slice(0, 160),
                openGraph: {
                    title: `${post.userId.name} (@${post.userId.username})`,
                    description: description.slice(0, 160),
                    images: firstImage
                        ? [
                              {
                                  url: firstImage.url,
                                  width: 800,
                                  height: 600,
                                  alt: `Post by ${post.userId.name}`,
                              },
                          ]
                        : [],
                    type: "article",
                    authors: [post.userId.name],
                },
                twitter: {
                    card: "summary_large_image",
                    title: `${post.userId.name} (@${post.userId.username})`,
                    description: description.slice(0, 160),
                    images: firstImage ? [firstImage.url] : [],
                    creator: `@${post.userId.username}`,
                },
                alternates: {
                    canonical: `/s/${shortCode}`,
                },
            };
        }
    } catch (error: unknown) {
        console.error("Error generating metadata:", error);
        return {
            title: "Content Not Found",
            description: "The requested content could not be found.",
        };
    }
}

export default async function ShortCodePage({
    params,
}: {
    params: Promise<{ shortCode: string }>;
}) {
    try {
        const { shortCode } = await params;
        const data = await fetchShortCodeData(shortCode);

        if (data.data.type === "user") {
            const { user, clickCount } = data.data as UserShortCodeData;

            // For user sharing, create a user profile display format
            const userProfileData = {
                id: user._id,
                name: user.name,
                username: user.username,
                userAvatar: user.avatar,
                thumbnail: user.avatar,
                mediaType: "profile",
                like: 0,
                comment: 0,
                view: clickCount,
                caption: user.bio || `Follow ${user.name} (@${user.username})`,
            };

            return <PostViewer postData={userProfileData} />;
        } else {
            const { post, clickCount } = data.data as PostShortCodeData;

            // Map API response to PostViewer expected format
            const postData = {
                id: post._id,
                name: post.userId.name,
                username: post.userId.username,
                userAvatar: post.userId.avatar,
                thumbnail:
                    post.contents.find((c) => c.type === "image")?.url ||
                    post.contents[0]?.url ||
                    "",
                mediaType: post.contents[0]?.type || "image",
                like: post.like,
                comment: post.comment,
                view: clickCount,
                caption:
                    post.userId.bio ||
                    `Check out this post by ${post.userId.name}`,
            };

            return <PostViewer postData={postData} />;
        }
    } catch (error) {
        console.error("Error loading short code page:", error);
        notFound();
    }
}
