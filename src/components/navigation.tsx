"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white z-5 border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="text-2xl font-bold text-black">
            MOIA
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              href="/tutorial"
              className="text-gray-600 hover:text-black transition-colors duration-200"
            >
              Tutorial
            </Link>
            <Link
              href="/artworks"
              className="text-gray-600 hover:text-black transition-colors duration-200"
            >
              <Button
                variant="default"
                className="bg-black text-white hover:bg-gray-800 cursor-pointer"
              >
                See Artworks
              </Button>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-600 hover:text-black"
            >
              {isOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t border-gray-200">
              <Link
                href="/tutorial"
                onClick={() => setIsOpen(false)}
                className="block px-3 py-2 text-gray-600 hover:text-black transition-colors duration-200"
              >
                Tutorial
              </Link>
              <div className="px-3 py-2">
                <Link
                  href="/artworks"
                  onClick={() => setIsOpen(false)}
                  className="w-full"
                >
                  <Button
                    variant="default"
                    className="w-full bg-black text-white hover:bg-gray-800 cursor-pointer"
                  >
                    See Artworks
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
