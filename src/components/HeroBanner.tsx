import React, { useState } from 'react';
import { Product } from '../types/store';
import { ProductArtwork } from './ProductArtwork';
import { ArrowRight, Sparkles } from 'lucide-react';

interface HeroBannerProps {
  products: Product[];
  onSelectProduct: (product: Product) => void;
  onAddToCart: (product: Product) => void;
}

export const HeroBanner: React.FC<HeroBannerProps> = ({
  products,
  onSelectProduct,
  onAddToCart,
}) => {
  // Let user pick between flagship showcases: iPhone 16 Pro and MacBook Pro M4
  const featuredIds = ['iphone-16-pro', 'macbook-pro-m4', 'ipad-pro-m4'];
  const featuredProducts = products.filter((p) => featuredIds.includes(p.id));
  const [selectedIndex, setSelectedIndex] = useState(0);

  const activeProduct = featuredProducts[selectedIndex] || products[0];
  const [activeColorIndex, setActiveColorIndex] = useState(0);

  const currentColor = activeProduct.colors[activeColorIndex] || activeProduct.colors[0];

  return (
    <section className="relative w-full bg-white dark:bg-[#000000] text-[#1D1D1F] dark:text-white pt-10 pb-16 overflow-hidden border-b border-black/5 dark:border-white/10 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Subtle switcher between flagship heroes */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex items-center gap-1 p-1 bg-[#F5F5F7] dark:bg-[#1D1D1F] rounded-full text-xs font-medium">
            {featuredProducts.map((p, idx) => (
              <button
                key={p.id}
                onClick={() => {
                  setSelectedIndex(idx);
                  setActiveColorIndex(0);
                }}
                className={`px-3 py-1 rounded-full transition-all duration-200 whitespace-nowrap ${
                  selectedIndex === idx
                    ? 'bg-white dark:bg-[#2C2C2E] text-[#1D1D1F] dark:text-white shadow-sm'
                    : 'text-[#1D1D1F]/60 dark:text-white/60 hover:text-[#1D1D1F] dark:hover:text-white'
                }`}
              >
                {p.name}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Column: Editorial Headline & Actions */}
          <div className="lg:col-span-6 text-center lg:text-left space-y-4">
            <div className="inline-flex items-center gap-1.5 text-xs font-semibold tracking-wide uppercase text-[#0071E3] dark:text-[#2997FF]">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Apple Intelligence</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight text-[#1D1D1F] dark:text-white text-balance">
              {activeProduct.name}
            </h1>

            <p className="text-xl sm:text-2xl font-normal text-[#1D1D1F]/80 dark:text-white/80">
              {activeProduct.tagline}
            </p>

            <p className="text-sm sm:text-base text-[#86868B] max-w-lg mx-auto lg:mx-0 font-normal">
              {activeProduct.description}
            </p>

            {/* Price & Monthly Financing */}
            <div className="pt-2 text-sm text-[#1D1D1F] dark:text-white font-medium">
              <span>From ${activeProduct.basePrice}</span>
              <span className="text-[#86868B] font-normal">
                {' '}or ${(activeProduct.basePrice / 24).toFixed(2)}/mo. for 24 mo.
              </span>
            </div>

            {/* Color preview selector dots */}
            <div className="pt-2 flex items-center justify-center lg:justify-start gap-2.5">
              <span className="text-xs text-[#86868B] mr-1">Finish: {currentColor.name}</span>
              <div className="flex items-center gap-2">
                {activeProduct.colors.map((color, idx) => (
                  <button
                    key={color.name}
                    onClick={() => setActiveColorIndex(idx)}
                    title={color.name}
                    aria-label={`Select ${color.name}`}
                    className={`w-5 h-5 rounded-full transition-all duration-150 relative ${
                      activeColorIndex === idx
                        ? 'ring-2 ring-offset-2 ring-[#0071E3] dark:ring-offset-black scale-110'
                        : 'opacity-80 hover:opacity-100'
                    }`}
                    style={{ backgroundColor: color.hex }}
                  />
                ))}
              </div>
            </div>

            {/* CTAs: Buy Now & Learn More */}
            <div className="pt-4 flex flex-wrap items-center justify-center lg:justify-start gap-4">
              <button
                onClick={() => onSelectProduct(activeProduct)}
                className="px-6 py-2.5 bg-[#0071E3] hover:bg-[#0077ED] text-white text-sm font-medium rounded-full transition-all shadow-sm active:scale-[0.98]"
              >
                Buy Now
              </button>
              <button
                onClick={() => onAddToCart(activeProduct)}
                className="px-5 py-2.5 bg-transparent border border-[#0071E3] text-[#0071E3] hover:bg-[#0071E3]/5 text-sm font-medium rounded-full transition-all"
              >
                Add to Bag
              </button>
              <button
                onClick={() => onSelectProduct(activeProduct)}
                className="text-sm font-medium text-[#0071E3] hover:underline inline-flex items-center gap-1"
              >
                <span>Tech Specs</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Right Column: High-Fidelity Interactive Artwork */}
          <div className="lg:col-span-6 flex flex-col items-center justify-center relative">
            <div className="relative group cursor-pointer" onClick={() => onSelectProduct(activeProduct)}>
              <ProductArtwork
                productId={activeProduct.id}
                category={activeProduct.category}
                selectedColor={currentColor}
                size="hero"
                className="transition-transform duration-500 group-hover:scale-105"
              />
              <div className="text-center mt-2">
                <span className="text-xs text-[#86868B] hover:text-[#0071E3] transition-colors">
                  Click to customize {activeProduct.name} &rarr;
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
