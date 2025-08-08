import Link from "next/link";

export default function NotFound() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-4">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
                Post Not Found
            </h1>
            <p className="text-gray-600 text-center mb-8">
                The post you&apos;re looking for doesn&apos;t exist or has been
                removed.
            </p>
            <Link
                href="/"
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
                Go Home
            </Link>
        </div>
    );
}
