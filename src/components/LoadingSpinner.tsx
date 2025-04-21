// components/LoadingSpinner.tsx
const LoadingSpinner = () => {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/10 backdrop-blur-md">
            <div className="flex flex-col items-center justify-center p-6 rounded-2xl shadow-xl bg-secondary/30 backdrop-blur-md">
                <div className="w-12 h-12 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin mb-4" />
                <p className="text-slate-300 font-semibold">Analyzing...</p>
            </div>
        </div>
    );
};

export default LoadingSpinner;
