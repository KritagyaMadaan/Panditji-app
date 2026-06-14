'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { User, Menu } from 'lucide-react';
import LoginModal from './LoginModal';

const Header = () => {
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
      <div className="container mx-auto px-4 h-20 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <div className="relative w-12 h-12">
            <Image 
              src="https://api.dicebear.com/7.x/bottts/svg?seed=BP" 
              alt="BookPanditJi Logo" 
              fill 
              sizes="48px"
              className="object-contain"
            />
          </div>
          <span className="text-2xl font-bold text-gray-900 hidden md:block uppercase tracking-tight">
            Book<span className="text-primary tracking-normal">PanditJi</span>
          </span>
        </Link>

        {/* Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          <Link href="/services" className="text-gray-600 hover:text-primary font-bold transition-colors">Services</Link>
          <Link href="/astrology" className="text-gray-600 hover:text-primary font-bold transition-colors">Astrology</Link>
          <Link href="/packages" className="text-gray-600 hover:text-primary font-bold transition-colors">Wedding</Link>
          <Link href="/verify-pandit" className="text-gray-600 hover:text-primary font-bold transition-colors">Apply as Pandit</Link>
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-4">
          <button 
            onClick={() => setIsLoginOpen(true)}
            className="hidden md:flex items-center gap-2 text-primary hover:bg-orange-50 font-bold px-6 py-2.5 rounded-full border-2 border-primary transition-all shadow-sm active:scale-95"
          >
            <User size={18} />
            Login / Signup
          </button>
          <button className="md:hidden p-2 text-gray-600">
            <Menu size={24} />
          </button>
        </div>
      </div>

    </header>
    <LoginModal 
      isOpen={isLoginOpen} 
      onClose={() => setIsLoginOpen(false)} 
    />
  </>
);
};

export default Header;
