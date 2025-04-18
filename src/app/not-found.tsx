import Link from "next/link";

export default async function NotFound() {
    
    return (
        <div className="flex flex-col items-center justify-center h-screen bg-primary text-white">
            <h1 className="text-6xl font-bold mb-4">404</h1>
            <p className="text-xl mb-6">Oops! The page you're looking for doesn't exist.</p>
            <Link
                href="/"
                className="px-6 py-3 bg-secondary text-white rounded-lg shadow-2xl  hover:bg-icon hover:text-black transition"
            >
                Go Back Home
            </Link>
        </div>
    );
};
