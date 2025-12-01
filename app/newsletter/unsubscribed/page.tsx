import Link from 'next/link';

export default function NewsletterUnsubscribed() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-[#010C0C] via-[#010C0C] to-[#010C0C] text-white flex items-center justify-center px-4">
      <div className="max-w-md text-center">
        <div className="flex justify-center mb-6">
          <div className="w-20 h-20 rounded-full bg-[#0A2C2C] border-2 border-gray-500 flex items-center justify-center">
            <svg
              className="w-10 h-10 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            </svg>
          </div>
        </div>

        <h1 className="text-3xl md:text-4xl font-bold mb-4">
          Unsubscribed
        </h1>

        <p className="text-gray-300 mb-8">
          You&apos;ve been unsubscribed from the IslandDAO newsletter. We&apos;re sorry to see you go. You can always resubscribe if you change your mind.
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
