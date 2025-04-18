export default function Loading() {
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="flex flex-col items-center">
                <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500 border-opacity-75"></div>
                <p className="mt-4 text-white text-lg">Loading...</p>
            </div>
        </div>
    );
};
