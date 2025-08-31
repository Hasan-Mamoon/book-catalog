'use Client'

import { useState, useEffect } from "react";
import { BookOpen, Menu, X } from "lucide-react";
import { Button } from "@radix-ui/themes";
import Image from "next/image";
import { useSession, signOut } from "next-auth/react";
import Link from "next/link";

export default function Navbar() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const { data: session } = useSession();

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (isDropdownOpen && !(event.target as Element)?.closest('.user-dropdown')) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [isDropdownOpen]);

  return (
    <>
      {/* Navigation */}
      <nav
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${
          scrollY > 50
            ? "bg-white/90 backdrop-blur-md shadow-sm"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center space-x-2">
              <BookOpen className="h-8 w-8 text-blue-600" />
              <span className="text-xl font-bold text-gray-900">Books Catalogue</span>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {session ? (
                <>
                  <Link
                    href="/add-books"
                    className="text-gray-700 hover:text-blue-600 transition-colors"
                  >
                    Add Books
                  </Link>
                  
                  {/* User Profile Dropdown */}
                  <div className="relative user-dropdown">
                    <button
                      type="button"
                      className="flex text-sm bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
                      onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    >
                      <span className="sr-only">Open user menu</span>
                      {session?.user.image ? (
                        <Image
                          className="w-8 h-8 rounded-full"
                          src={session.user.image}
                          alt="user photo"
                          width={32}
                          height={32}
                          priority={true}
                        />
                      ) : (
                        <div className="w-8 h-8 rounded-full bg-gray-600 flex items-center justify-center">
                          <span className="text-white font-medium text-sm">
                            {session.user.name?.charAt(0).toUpperCase()}
                          </span>
                        </div>
                      )}
                    </button>
                    
                    {/* Dropdown menu */}
                    {isDropdownOpen && (
                      <div className="absolute right-0 z-50 mt-2 w-48 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow-lg dark:bg-gray-700 dark:divide-gray-600">
                        <div className="px-4 py-3">
                          <span className="block text-sm text-gray-900 dark:text-white">
                            {session?.user.name}
                          </span>
                          <span className="block text-sm text-gray-500 truncate dark:text-gray-400">
                            {session?.user.email}
                          </span>
                        </div>
                        <ul className="py-2">
                          <li>
                            <button
                              onClick={() => {
                                signOut({ callbackUrl: "/" });
                                setIsDropdownOpen(false);
                              }}
                              className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                            >
                              Sign out
                            </button>
                          </li>
                        </ul>
                      </div>
                    )}
                  </div>
                </>
              ) : (
                <>
                  <a
                    href="#features"
                    className="text-gray-700 hover:text-blue-600 transition-colors"
                  >
                    Features
                  </a>
                  <a
                    href="#testimonials"
                    className="text-gray-700 hover:text-blue-600 transition-colors"
                  >
                    Reviews
                  </a>
                  <Button
                    variant="outline"
                    className="mr-2"
                    onClick={() => (window.location.href = "/auth/signin")}
                  >
                    Sign In
                  </Button>
                  <Button
                    className="bg-blue-600 hover:bg-blue-700"
                    onClick={() => (window.location.href = "/auth/register")}
                  >
                    Get Started
                  </Button>
                </>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white border-t shadow-lg">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {session ? (
                <>
                  <Link
                    href="/add-books"
                    className="block px-3 py-2 text-gray-700 hover:text-blue-600 transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Add Books
                  </Link>
                  
                  {/* Mobile User Info */}
                  <div className="border-t pt-2 mt-2">
                    <div className="px-3 py-2">
                      <div className="flex items-center space-x-3">
                        {session?.user.image ? (
                          <Image
                            className="w-8 h-8 rounded-full"
                            src={session.user.image}
                            alt="user photo"
                            width={32}
                            height={32}
                            priority={true}
                          />
                        ) : (
                          <div className="w-8 h-8 rounded-full bg-gray-600 flex items-center justify-center">
                            <span className="text-white font-medium text-sm">
                              {session.user.name?.charAt(0).toUpperCase()}
                            </span>
                          </div>
                        )}
                        <div>
                          <div className="text-sm font-medium text-gray-900">
                            {session?.user.name}
                          </div>
                          <div className="text-sm text-gray-500">
                            {session?.user.email}
                          </div>
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={() => {
                        signOut({ callbackUrl: "/" });
                        setIsMobileMenuOpen(false);
                      }}
                      className="block w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Sign out
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <a
                    href="#features"
                    className="block px-3 py-2 text-gray-700 hover:text-blue-600 transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Features
                  </a>
                  <a
                    href="#testimonials"
                    className="block px-3 py-2 text-gray-700 hover:text-blue-600 transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Reviews
                  </a>
                  <div className="flex flex-col space-y-2 px-3 py-2">
                    <Button
                      variant="outline"
                      onClick={() => (window.location.href = "/auth/signin")}
                    >
                      Sign In
                    </Button>
                    <Button
                      className="bg-blue-600 hover:bg-blue-700"
                      onClick={() => (window.location.href = "/auth/register")}
                    >
                      Get Started
                    </Button>
                  </div>
                </>
              )}
            </div>
          </div>
        )}
      </nav>
    </>
  );
}
