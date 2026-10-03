import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import BrandLogo from './BrandLogo';

export type PageId = "home" | "businesses" | "workers" | "roles" | "about" | "contact";

interface NavbarProps {
  currentPage: PageId;
  onNavigate: (page: PageId) => void;
  onOpenCallModal: (role?: "general" | "contractor" | "worker" | "investor") => void;
}

const Navbar: React.FC<NavbarProps> = ({ currentPage, onNavigate, onOpenCallModal }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks: { id: PageId; label: string }[] = [
    { id: "home", label: "Home" },
    { id: "businesses", label: "For Businesses" },
    { id: "workers", label: "For Workers" },
    { id: "roles", label: "Roles" },
    { id: "about", label: "About" },
    { id: "contact", label: "Contact" },
  ];

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/80 backdrop-blur-xl shadow-lg border-b border-gray-100'
          : 'bg-white border-b border-gray-100'
      }`}
      style={{ fontFamily: '"Plus Jakarta Sans", sans-serif' }}
    >
      <div className="w-full px-6 sm:px-10 md:px-14 lg:px-16 xl:px-20">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center cursor-pointer" onClick={() => onNavigate('home')}>
            <BrandLogo darkVariant={false} />
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => onNavigate(link.id)}
                className={`text-sm font-semibold transition-colors duration-200 relative pb-1 ${
                  currentPage === link.id
                    ? 'text-[#0066FF]'
                    : 'text-gray-800 hover:text-[#0066FF]'
                }`}
              >
                {link.label}
                {currentPage === link.id && (
                  <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[#0066FF] rounded-full"></span>
                )}
              </button>
            ))}
            
            {/* CTA Button */}
            <button
              onClick={() => onOpenCallModal('general')}
              className="px-6 py-2.5 rounded-full text-white font-semibold text-sm transition-transform hover:scale-105 active:scale-95 bg-gradient-to-r from-[#0066FF] to-[#00D4FF] shadow-md shadow-[#0066FF]/20"
            >
              Get Started
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-800 hover:text-[#0066FF] focus:outline-none p-2"
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        } bg-white border-t border-gray-100`}
      >
        <div className="px-4 pt-2 pb-6 space-y-1 sm:px-3 flex flex-col">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => {
                onNavigate(link.id);
                setIsOpen(false);
              }}
              className={`block px-3 py-3 rounded-md text-base font-medium w-full text-left transition-colors border-b border-gray-50 last:border-none ${
                currentPage === link.id
                  ? 'text-[#0066FF] bg-blue-50/50'
                  : 'text-gray-800 hover:text-[#0066FF] hover:bg-gray-50'
              }`}
            >
              {link.label}
            </button>
          ))}
          <div className="pt-4 px-3">
            <button
              onClick={() => {
                onOpenCallModal('general');
                setIsOpen(false);
              }}
              className="w-full px-6 py-3 rounded-full text-white font-semibold transition-transform active:scale-95 bg-gradient-to-r from-[#0066FF] to-[#00D4FF] shadow-md shadow-[#0066FF]/20 text-center"
            >
              Get Started
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export { Navbar };
export default Navbar;
