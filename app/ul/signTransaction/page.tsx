"use client";

export default function SignTransactionPage() {
  return (
    <div className="min-h-screen bg-[#010C0C] flex flex-col items-center justify-center p-4">
      <div className="max-w-md mx-auto text-center">
        <h1 className="text-3xl font-bold text-white mb-6">Sign Transaction</h1>
        <p className="text-gray-300 mb-8">
          Sign transactions securely through the IslandDAO mobile app.
        </p>
        
        <div className="space-y-4">
          <button 
            onClick={() => {
              window.location.href = 'https://apps.apple.com/app/islanddao';
            }}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg transition-colors"
          >
            Download on App Store
          </button>
          
          <button 
            onClick={() => {
              window.location.href = 'https://play.google.com/store/apps/details?id=org.islanddao';
            }}
            className="w-full bg-green-600 hover:bg-green-700 text-white py-3 px-6 rounded-lg transition-colors"
          >
            Get it on Google Play
          </button>
        </div>
        
        <p className="text-sm text-gray-500 mt-6">
          If you have the app installed, it should have opened automatically.
        </p>
      </div>
    </div>
  );
}