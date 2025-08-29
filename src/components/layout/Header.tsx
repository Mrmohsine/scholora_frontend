'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navigation = [
    { name: 'How it works', href: '#how-it-works' },
    { name: 'Featured Tutors', href: '#tutors' },
    { name: 'Success Stories', href: '#success-stories' },
    { name: 'Subjects', href: '#subjects' },
    { name: 'Stay in the loop', href: '#newsletter' },
  ];

  return (
    <header className="bg-white shadow-sm border-b sticky top-0 z-50">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <div className="flex items-center mr-3">
                <Image
                  src="/images/logos/logo_blue.png"
                  alt="Scholora Logo"
                  width={200}
                  height={320}
                  className="rounded-lg"
                />
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:block ml-12">
              <div className="flex items-baseline space-x-8">
                {navigation.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className="text-gray-600 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors"
                  >
                    {item.name}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <Link
              href="/auth/login"
              className="text-gray-600 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors"
            >
              Log in
            </Link>
            <Link
              href="/become-tutor"
              className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 shadow-sm"
            >
              Become a tutor
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-gray-600 hover:text-blue-600 p-2"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-gray-200 py-4">
            <div className="space-y-2">
              {navigation.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="block text-gray-600 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.name}
                </a>
              ))}
            </div>
            <div className="border-t border-gray-200 pt-4 mt-4 space-y-2">
              <Link
                href="/auth/login"
                className="block text-gray-600 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Log in
              </Link>
              <Link
                href="/become-tutor"
                className="block bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-lg text-sm font-semibold transition-all mx-3"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Become a tutor
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;