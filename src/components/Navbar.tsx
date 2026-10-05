import React, { useState } from 'react';
import { Search, ShoppingBag, Menu, X, ArrowRight } from 'lucide-react';
import { CategoryId } from '../types/store';

interface NavbarProps {
  activeCategory: CategoryId;
  onSelectCategory: (category: CategoryId) => void;
  cartCount: number;
  onOpenCart: () => void;
  onOpenSearch: () => void;
  onOpenCompare: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeCategory,
  onSelectCategory,
  cartCount,
  onOpenCart,
  onOpenSearch,
  onOpenCompare,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks: { id: CategoryId; label: string }[] = [
    { id: 'all', label: 'Store' },
    { id: 'mac', label: 'Mac' },
    { id: 'ipad', label: 'iPad' },
    { id: 'iphone', label: 'iPhone' },
    { id: 'watch', label: 'Watch' },
    { id: 'airpods', label: 'AirPods' },
  ];

  const handleCategoryClick = (id: CategoryId) => {
    onSelectCategory(id);
    setMobileMenuOpen(false);
  };

  return (
    <>
      <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-white/85 dark:bg-[#161617]/85 border-b border-black/5 dark:border-white/10 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-12 flex items-center justify-between">
          {/* Zone 1: Apple Brand Wordmark & Logo */}
          <button
            onClick={() => handleCategoryClick('all')}
            className="flex items-center gap-1.5 text-[#1D1D1F] dark:text-white hover:opacity-75 transition-opacity"
            aria-label="Apple Store Home"
          >
            {/* Apple Logo SVG */}
            <svg
              className="w-4 h-4 fill-current"
              viewBox="0 0 170 170"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M150.37 130.25c-2.45 5.66-5.35 10.87-8.71 15.66-4.58 6.53-8.33 11.05-11.22 13.56-4.48 4.12-9.28 6.23-14.42 6.35-3.69 0-8.14-1.05-13.32-3.18-5.19-2.12-9.97-3.17-14.34-3.17-4.58 0-9.49 1.05-14.75 3.17-5.26 2.13-9.5 3.24-12.74 3.35-4.35.13-9.16-1.9-14.42-6.08-3.7-3.04-7.58-7.77-11.65-14.19-6.3-9.98-11.22-21.2-14.75-33.64-3.53-12.45-5.3-24.16-5.3-35.15 0-14.79 3.73-27.18 11.19-37.16 7.46-9.98 16.92-15.08 28.38-15.3 4.89 0 10.42 1.25 16.59 3.76 6.17 2.5 10.23 3.81 12.18 3.91 1.74-.1 6.03-1.47 12.87-4.11 6.84-2.65 12.75-3.8 17.73-3.46 13.58.87 24.32 5.66 32.22 14.37-11.74 7.07-17.49 16.63-17.27 28.69.22 9.57 3.91 17.5 11.08 23.8 7.17 6.3 15.7 9.89 25.59 10.76-2.07 6.3-4.46 12.71-7.18 19.23zM119.22 31.84c0-7.72 2.72-14.89 8.15-21.52 5.43-6.63 12.18-10.32 20.25-11.07.22 1.09.33 2.18.33 3.26 0 7.61-2.82 14.94-8.47 22-5.65 7.06-12.56 10.82-20.73 11.28-.11-1.3-.53-2.61-.53-3.95z" />
            </svg>
            <span className="font-semibold text-sm tracking-tight hidden sm:inline">Store</span>
          </button>

          {/* Zone 2: Navigation Links */}
          <nav className="hidden md:flex items-center gap-7">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleCategoryClick(link.id)}
                className={`text-xs font-normal tracking-normal transition-colors relative py-1 ${
                  activeCategory === link.id
                    ? 'text-[#1D1D1F] dark:text-white font-medium after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-[#1D1D1F] dark:after:bg-white'
                    : 'text-[#1D1D1F]/80 dark:text-white/80 hover:text-[#1D1D1F] dark:hover:text-white'
                }`}
              >
                {link.label}
              </button>
            ))}
            <button
              onClick={onOpenCompare}
              className="text-xs text-[#1D1D1F]/70 dark:text-white/70 hover:text-[#0071E3] transition-colors"
            >
              Compare
            </button>
          </nav>

          {/* Zone 3: Primary Actions (Search & Shopping Bag) */}
          <div className="flex items-center gap-4">
            <button
              onClick={onOpenSearch}
              className="p-1 text-[#1D1D1F]/80 dark:text-white/80 hover:text-[#1D1D1F] dark:hover:text-white transition-colors"
              aria-label="Search Apple Store"
            >
              <Search className="w-4 h-4" />
            </button>

            <button
              onClick={onOpenCart}
              className="relative p-1 text-[#1D1D1F]/80 dark:text-white/80 hover:text-[#1D1D1F] dark:hover:text-white transition-colors"
              aria-label={`Shopping Bag, ${cartCount} items`}
            >
              <ShoppingBag className="w-4 h-4" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#0071E3] text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center animate-in zoom-in-50 duration-200">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-1 md:hidden text-[#1D1D1F]/80 dark:text-white/80"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-black/5 dark:border-white/10 bg-white dark:bg-[#161617] px-6 py-5 space-y-4 shadow-lg animate-in slide-in-from-top-2 duration-200">
            <div className="flex flex-col space-y-3">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => handleCategoryClick(link.id)}
                  className={`flex items-center justify-between text-base py-2 border-b border-black/5 dark:border-white/5 ${
                    activeCategory === link.id
                      ? 'text-[#0071E3] font-semibold'
                      : 'text-[#1D1D1F] dark:text-white'
                  }`}
                >
                  <span>{link.label}</span>
                  <ArrowRight className="w-4 h-4 opacity-40" />
                </button>
              ))}
              <button
                onClick={() => {
                  onOpenCompare();
                  setMobileMenuOpen(false);
                }}
                className="flex items-center justify-between text-base py-2 text-[#0071E3]"
              >
                <span>Compare Products</span>
                <ArrowRight className="w-4 h-4 opacity-60" />
              </button>
            </div>
          </div>
        )}
      </header>

      {/* Slim Dismissible Top Apple Intelligence announcement banner */}
      <aside aria-label="Announcement" className="bg-[#1D1D1F] text-white text-xs py-2 px-4 text-center tracking-tight flex items-center justify-center gap-2">
        <span className="font-medium">Get $180–$650 in credit when you trade in iPhone 11 or higher.</span>
        <button
          onClick={() => handleCategoryClick('iphone')}
          className="text-[#2997FF] hover:underline inline-flex items-center gap-0.5 font-medium ml-1"
        >
          Shop iPhone
          <span aria-hidden="true">&gt;</span>
        </button>
      </aside>
    </>
  );
};
