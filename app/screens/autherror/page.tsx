"use client"

import { useRouter } from 'next/navigation';

const AuthError = () => {
  const router = useRouter();

  const handleRedirect = () => {
    router.push('/signin'); // Redirect to the sign-in page
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg max-w-sm w-full text-center">
        <h1 className="text-3xl font-bold text-white mb-6">Sign-in Error</h1>
        <p className="text-gray-300 mb-4">
          Something went wrong during sign-in. Please try signing in with a different method.
        </p>
        <button
          onClick={handleRedirect}
          className="bg-yellow-500 text-gray-900 px-6 py-2 rounded-md shadow-md hover:bg-yellow-400"
        >
          Go to Sign-in Page
        </button>
      </div>
    </div>
  );
};

export default AuthError;
