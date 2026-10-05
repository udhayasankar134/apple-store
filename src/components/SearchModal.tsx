import React, { useState, useMemo } from 'react';
import { Product } from '../types/store';
import { ProductArtwork } from './ProductArtwork';
import { Search, X, ArrowRight } from 'lucide-react';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  products: Product[];
  onSelectProduct: (product: Product) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  products,
  onSelectProduct,
}) => {
  const [query, setQuery] = useState('');

  const quickLinks = ['iPhone 16 Pro', 'MacBook Pro', 'M4', 'iPad Pro', 'Apple Watch Ultra', 'AirPods 4'];

  const filteredProducts = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase();
    return products.filter((p) => {
      return (
        p.name.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.tagline.toLowerCase().includes(q) ||
        p.type.toLowerCase().includes(q) ||
        p.specs.some((s) => s.value.toLowerCase().includes(q))
      );
    });
  }, [query, products]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-md flex items-start justify-center pt-16 sm:pt-24 px-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl w-full max-w-2xl overflow-hidden shadow-2xl relative border border-black/10">
        {/* Search Input Bar */}
        <div className="p-4 sm:p-5 border-b border-black/10 flex items-center gap-3">
          <Search className="w-5 h-5 text-[#86868B]" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search for iPhone, Mac, iPad, Watch, AirPods..."
            autoFocus
            className="flex-1 text-sm sm:text-base text-[#1D1D1F] placeholder-[#86868B] bg-transparent focus:outline-none"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="text-xs text-[#86868B] hover:text-[#1D1D1F] px-2 py-1"
            >
              Clear
            </button>
          )}
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-[#F5F5F7] text-[#1D1D1F]"
            aria-label="Close search"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Quick Suggestions when empty */}
        {!query && (
          <div className="p-6 space-y-4">
            <div className="text-xs font-semibold uppercase tracking-wider text-[#86868B]">
              Quick Links
            </div>
            <div className="flex flex-wrap gap-2">
              {quickLinks.map((link) => (
                <button
                  key={link}
                  onClick={() => setQuery(link)}
                  className="px-3.5 py-1.5 rounded-full bg-[#F5F5F7] hover:bg-[#E8E8ED] text-xs font-medium text-[#1D1D1F] transition-colors"
                >
                  {link}
                </button>
              ))}
            </div>

            <div className="pt-4 border-t border-black/5">
              <div className="text-xs font-semibold uppercase tracking-wider text-[#86868B] mb-3">
                Featured Categories
              </div>
              <div className="grid grid-cols-2 gap-2 text-xs">
                {products.slice(0, 4).map((p) => (
                  <button
                    key={p.id}
                    onClick={() => {
                      onSelectProduct(p);
                      onClose();
                    }}
                    className="p-2.5 rounded-xl hover:bg-[#F5F5F7] flex items-center justify-between text-left transition-colors"
                  >
                    <span className="font-medium text-[#1D1D1F]">{p.name}</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#86868B]" />
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Search Results */}
        {query && (
          <div className="max-h-[60vh] overflow-y-auto p-4 divide-y divide-black/5">
            {filteredProducts.length === 0 ? (
              <div className="py-12 text-center text-xs text-[#86868B]">
                No products found matching &ldquo;{query}&rdquo;. Try searching for &ldquo;iPhone&rdquo;, &ldquo;Mac&rdquo;, or &ldquo;AirPods&rdquo;.
              </div>
            ) : (
              filteredProducts.map((p) => (
                <div
                  key={p.id}
                  onClick={() => {
                    onSelectProduct(p);
                    onClose();
                  }}
                  className="p-3 rounded-2xl hover:bg-[#F5F5F7] flex items-center justify-between cursor-pointer transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 bg-[#F5F5F7] rounded-xl flex items-center justify-center p-1">
                      <ProductArtwork
                        productId={p.id}
                        category={p.category}
                        size="sm"
                      />
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-[#1D1D1F]">
                        {p.name}
                      </div>
                      <div className="text-xs text-[#86868B] line-clamp-1">
                        {p.tagline}
                      </div>
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="text-sm font-semibold tabular-nums text-[#1D1D1F]">
                      ${p.basePrice.toLocaleString()}
                    </div>
                    <div className="text-[11px] text-[#0071E3] font-medium flex items-center gap-0.5 justify-end">
                      <span>View</span>
                      <ArrowRight className="w-3 h-3" />
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
};
