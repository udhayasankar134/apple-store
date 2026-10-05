import React, { useState } from 'react';
import { Product } from '../types/store';
import { ProductArtwork } from './ProductArtwork';
import { X, ArrowRight } from 'lucide-react';

interface ProductComparisonModalProps {
  isOpen: boolean;
  onClose: () => void;
  products: Product[];
  initialProduct?: Product;
  onSelectProduct: (product: Product) => void;
}

export const ProductComparisonModal: React.FC<ProductComparisonModalProps> = ({
  isOpen,
  onClose,
  products,
  initialProduct,
  onSelectProduct,
}) => {
  if (!isOpen) return null;

  const defaultA = initialProduct || products[0];
  const defaultB = products.find((p) => p.category === defaultA.category && p.id !== defaultA.id) || products[1];

  const [prodAId, setProdAId] = useState<string>(defaultA.id);
  const [prodBId, setProdBId] = useState<string>(defaultB?.id || products[1].id);

  const productA = products.find((p) => p.id === prodAId) || products[0];
  const productB = products.find((p) => p.id === prodBId) || products[1];

  // Compare specs common keys
  const compareKeys = [
    { label: 'Starting Price', getVal: (p: Product) => `$${p.basePrice}` },
    { label: 'Financing', getVal: (p: Product) => `$${(p.basePrice / 24).toFixed(2)}/mo. for 24 mo.` },
    { label: 'Category', getVal: (p: Product) => p.type },
    { label: 'Highlights', getVal: (p: Product) => p.highlights[0] || 'Standard' },
    {
      label: 'Key Specs',
      getVal: (p: Product) => p.specs.map((s) => `${s.label}: ${s.value}`).join(' · '),
    },
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col shadow-2xl relative my-auto">
        {/* Header */}
        <div className="px-6 py-4 border-b border-black/5 flex items-center justify-between bg-white">
          <div>
            <h2 className="text-xl font-semibold tracking-tight text-[#1D1D1F]">
              Compare Models
            </h2>
            <p className="text-xs text-[#86868B]">
              Get help deciding which Apple device is best for your daily workflow.
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-[#F5F5F7] text-[#1D1D1F] transition-colors"
            aria-label="Close comparison"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Comparison Grid */}
        <div className="overflow-y-auto p-6 space-y-8">
          {/* Top selectors & Artworks */}
          <div className="grid grid-cols-2 gap-6 sm:gap-12">
            {/* Product A */}
            <div className="flex flex-col items-center text-center space-y-3">
              <select
                value={prodAId}
                onChange={(e) => setProdAId(e.target.value)}
                className="w-full max-w-xs text-xs font-semibold px-3 py-2 rounded-xl border border-black/15 bg-white text-[#1D1D1F] focus:outline-none focus:ring-2 focus:ring-[#0071E3]"
              >
                {products.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name}
                  </option>
                ))}
              </select>

              <div className="w-36 h-36 sm:w-44 sm:h-44 flex items-center justify-center bg-[#F5F5F7] rounded-2xl p-3">
                <ProductArtwork
                  productId={productA.id}
                  category={productA.category}
                  selectedColor={productA.colors[0]}
                  size="md"
                />
              </div>

              <div>
                <h3 className="text-base sm:text-lg font-semibold text-[#1D1D1F]">
                  {productA.name}
                </h3>
                <div className="text-xs text-[#86868B] tabular-nums mt-0.5">
                  From ${productA.basePrice}
                </div>
              </div>

              <button
                onClick={() => {
                  onSelectProduct(productA);
                  onClose();
                }}
                className="px-5 py-2 bg-[#0071E3] hover:bg-[#0077ED] text-white text-xs font-medium rounded-full transition-colors flex items-center gap-1"
              >
                <span>Buy {productA.name}</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>

            {/* Product B */}
            <div className="flex flex-col items-center text-center space-y-3">
              <select
                value={prodBId}
                onChange={(e) => setProdBId(e.target.value)}
                className="w-full max-w-xs text-xs font-semibold px-3 py-2 rounded-xl border border-black/15 bg-white text-[#1D1D1F] focus:outline-none focus:ring-2 focus:ring-[#0071E3]"
              >
                {products.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name}
                  </option>
                ))}
              </select>

              <div className="w-36 h-36 sm:w-44 sm:h-44 flex items-center justify-center bg-[#F5F5F7] rounded-2xl p-3">
                <ProductArtwork
                  productId={productB.id}
                  category={productB.category}
                  selectedColor={productB.colors[0]}
                  size="md"
                />
              </div>

              <div>
                <h3 className="text-base sm:text-lg font-semibold text-[#1D1D1F]">
                  {productB.name}
                </h3>
                <div className="text-xs text-[#86868B] tabular-nums mt-0.5">
                  From ${productB.basePrice}
                </div>
              </div>

              <button
                onClick={() => {
                  onSelectProduct(productB);
                  onClose();
                }}
                className="px-5 py-2 bg-[#0071E3] hover:bg-[#0077ED] text-white text-xs font-medium rounded-full transition-colors flex items-center gap-1"
              >
                <span>Buy {productB.name}</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>
          </div>

          {/* Specifications Matrix */}
          <div className="border-t border-black/10 pt-6 space-y-6">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-[#86868B] text-center">
              Detailed Specifications
            </h4>

            {compareKeys.map((item, idx) => (
              <div key={idx} className="border-b border-black/5 pb-4">
                <div className="text-xs font-semibold text-[#86868B] text-center mb-2">
                  {item.label}
                </div>
                <div className="grid grid-cols-2 gap-6 sm:gap-12 text-center text-xs sm:text-sm text-[#1D1D1F]">
                  <div className="px-2">{item.getVal(productA)}</div>
                  <div className="px-2 border-l border-black/5">{item.getVal(productB)}</div>
                </div>
              </div>
            ))}

            {/* Individual Specs Comparison */}
            <div className="space-y-4 pt-2">
              <div className="text-xs font-semibold text-[#86868B] text-center">
                Hardware Architecture & Display
              </div>
              <div className="grid grid-cols-2 gap-6 sm:gap-12 text-xs">
                <div className="space-y-2">
                  {productA.specs.map((s, i) => (
                    <div key={i} className="bg-[#F5F5F7] p-2.5 rounded-xl">
                      <span className="font-semibold text-[#86868B] block text-[11px]">{s.label}</span>
                      <span className="text-[#1D1D1F] font-medium">{s.value}</span>
                    </div>
                  ))}
                </div>
                <div className="space-y-2">
                  {productB.specs.map((s, i) => (
                    <div key={i} className="bg-[#F5F5F7] p-2.5 rounded-xl">
                      <span className="font-semibold text-[#86868B] block text-[11px]">{s.label}</span>
                      <span className="text-[#1D1D1F] font-medium">{s.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
