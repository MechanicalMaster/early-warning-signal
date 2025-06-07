import Link from 'next/link';
import Image from 'next/image'; // Import Image component

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-100 text-gray-800">
      <header className="w-full py-4 px-8 bg-white shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center">
            {/* Placeholder for a logo */}
            <Image src="/placeholder-logo.svg" alt="App Logo" width={40} height={40} />
            <span className="ml-3 text-2xl font-semibold">OurApp</span>
          </div>
          <nav>
            <Link href="/login" legacyBehavior>
              <a className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition duration-300">
                Login
              </a>
            </Link>
          </nav>
        </div>
      </header>
      <main className="flex flex-col items-center justify-center flex-grow p-8 text-center">
        <h1 className="text-5xl font-bold mb-6">
          Welcome to Our Application
        </h1>
        <p className="text-xl mb-8 max-w-md">
          This is a brief and engaging description of what our application does and why you should use it.
        </p>
        <Link href="/login" legacyBehavior>
          <a className="px-8 py-3 bg-blue-600 text-white text-lg font-semibold rounded-md hover:bg-blue-700 transition duration-300">
            Get Started
          </a>
        </Link>
      </main>
      <footer className="w-full py-4 px-8 text-center bg-gray-200">
        <p className="text-sm text-gray-600">&copy; 2024 OurApp. All rights reserved.</p>
      </footer>
    </div>
  );
}
