'use client';

import { useState } from 'react';
import Image from 'next/image';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async () => {
    setMessage('');
    setError('');

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/forgot-password`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email }),
        }
      );

      const data = await response.json();

      if (data.success) {
        setMessage('✅ Check your inbox, a reset link has been sent.');
      } else {
        setError(data.message || '❌ An error occurred');
      }
    } catch (err) {
      setError('❌ Server error');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute top-40 left-40 w-80 h-80 bg-indigo-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
      </div>
      <div className="bg-white/90 backdrop-blur-md p-6 rounded-2xl shadow-xl w-full max-w-md">
        {/* Logo */}
        <div className="flex justify-center">
          <Image
            src="/images/logos/logo_blue.png"
            alt="Scholora Logo"
            width={150}
            height={60}
            priority
          />
        </div>

        {/* Title */}
        <h1 className="text-l font-bold text-center text-gray-800 mb-2">
          Forgot your password?
        </h1>
        <p className="text-center text-sm text-gray-500 mb-6">
          Enter your email to receive a password reset link.
        </p>

        {/* Alerts */}
        {message && (
          <p className="bg-green-100 text-green-700 px-4 py-2 rounded mb-4 text-sm text-center">
            {message}
          </p>
        )}
        {error && (
          <p className="bg-red-100 text-red-700 px-4 py-2 rounded mb-4 text-sm text-center">
            {error}
          </p>
        )}

        {/* Input */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Email
          </label>
          <input
            type="email"
            placeholder="example@scholora.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        {/* Button */}
        <button
          onClick={handleSubmit}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition duration-200"
        >
          Send Reset Link
        </button>

        {/* Back to login */}
        <p className="text-sm text-center text-gray-600 mt-6">
          Remember your password?{' '}
          <a
            href="/auth/login"
            className="text-blue-600 hover:text-blue-700 font-medium"
          >
            Log in
          </a>
        </p>
      </div>
    </div>
  );
}
