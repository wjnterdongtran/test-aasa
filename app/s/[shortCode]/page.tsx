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

interface ShortCodeResponse {
    data: {
        clickCount: number;
        type: string;
        contentId: string;
        post: Post;
    };
}

async function fetchShortCodeData(): Promise<ShortCodeResponse> {
    // shortCode: string
    // const externalServiceUrl =
    //     process.env.EXTERNAL_SERVICE_URL || "https://api.example.com";
    // const apiKey = process.env.EXTERNAL_SERVICE_API_KEY;

    // const response = await fetch(
    //     `http://172.16.5.204:5050/api/links/${shortCode}`,
    //     {
    //         // const response = await fetch(`${externalServiceUrl}/s/${shortCode}`, {
    //         method: "GET",
    //         headers: {
    //             "Content-Type": "application/json",
    //             ...(apiKey && { Authorization: `Bearer ${apiKey}` }),
    //         },
    //         next: { revalidate: 60 }, // Revalidate every 60 seconds
    //     }
    // );

    // if (!response.ok) {
    //     if (response.status === 404) {
    //         notFound();
    //     }
    //     throw new Error(`Failed to fetch: ${response.status}`);
    // }

    return {
        data: {
            clickCount: 38,
            type: "post",
            contentId: "68931d8b085eae2d546b5c7d",
            post: {
                _id: "68931d8b085eae2d546b5c7d",
                contents: [
                    {
                        id: "68931d90085eae2d546b5c80",
                        url: "https://dhzrhptszj83u.cloudfront.net/posts/images/2025-08/68931d8b085eae2d546b5c7d_68774c761d9e19f248bf4755_20250806T091659.jpeg",
                        type: "image",
                        status: "C",
                    },
                ],
                like: 1,
                comment: 0,
                view: 0,
                userId: {
                    _id: "68774c761d9e19f248bf4755",
                    name: "Boher?",
                    username: "stev_chenfangshaodong",
                    avatar: "https://dhzrhptszj83u.cloudfront.net/avatar/68774c761d9e19f248bf4755/2025-08-1754386896088.jpeg",
                    bio: "bio tech ma ffoeg ma ffoeg ma đờ heo",
                },
            },
        },
    };
}

export async function generateMetadata({
    params,
}: {
    params: Promise<{ shortCode: string }>;
}): Promise<Metadata> {
    try {
        // const { shortCode } = await params;
        const data = await fetchShortCodeData();
        const { post } = data.data;

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
                canonical: `/s/1234567890`,
            },
        };
    } catch (error: unknown) {
        console.error("Error generating metadata:", error);
        return {
            title: "Post Not Found",
            description: "The requested post could not be found.",
        };
    }
}

export default async function ShortCodePage({
    params,
}: {
    params: Promise<{ shortCode: string }>;
}) {
    try {
        // const { shortCode } = await params;
        const data = await fetchShortCodeData();
        const { post, clickCount } = data.data;

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
                post.userId.bio || `Check out this post by ${post.userId.name}`,
        };

        return <PostViewer postData={postData} />;
    } catch (error) {
        console.error("Error loading short code page:", error);
        notFound();
    }
}
