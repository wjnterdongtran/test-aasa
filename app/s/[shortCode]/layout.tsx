import Image from "next/image";

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="min-h-screen bg-gradient-to-br from-[#FFDD55]  to-[#D12929] relative overflow-hidden">
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
                        <Image
                            src="/logo.svg"
                            alt="OotDrop"
                            width={32}
                            height={32}
                        />
                        <h1 className="text-white font-bold text-xl">
                            OOTDROP
                        </h1>
                    </div>
                </header>

                {/* Main Content */}
                <main className="flex-1 flex flex-col items-center justify-center p-6">
                    {children}
                </main>

                {/* Footer */}
                <footer className="p-6 text-center">
                    <p className="text-gray-400 text-sm">
                        © 2025 OotDrop. Share amazing moments.
                    </p>
                </footer>
            </div>
        </div>
    );
}
