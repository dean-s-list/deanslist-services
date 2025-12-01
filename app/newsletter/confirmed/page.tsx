import Link from 'next/link';

export default function NewsletterConfirmed() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-[#010C0C] via-[#010C0C] to-[#010C0C] text-white flex items-center justify-center px-4">
      <div className="max-w-md text-center">
        <div className="flex justify-center mb-6">
          <div className="w-20 h-20 rounded-full bg-[#0A2C2C] border-2 border-[#C4F9CF] flex items-center justify-center">
            <svg
              className="w-10 h-10 text-[#C4F9CF]"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
        </div>

        <h1 className="text-3xl md:text-4xl font-bold mb-4">
          Subscription Confirmed!
        </h1>

        <p className="text-gray-300 mb-8">
          You&apos;re now subscribed to the IslandDAO newsletter. We&apos;ll keep you updated with the latest news, events, and community highlights.
        </p>

        <Link
          href="/"
          className="inline-block px-8 py-3 rounded-full bg-[#0A2C2C] border border-[#C4F9CF] text-white font-medium hover:bg-green-900 transition"
        >
          Back to Homepage
        </Link>
      </div>
    </main>
  );
}
