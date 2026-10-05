import React, { useState } from 'react';
import { Product, ColorOption, StorageOption, CartItem } from '../types/store';
import { ProductArtwork } from './ProductArtwork';
import { X, Check, ShieldCheck, Truck, RefreshCw, ChevronDown, ChevronUp, Sparkles } from 'lucide-react';

interface ProductDetailsModalProps {
  product: Product;
  initialColor?: ColorOption;
  onClose: () => void;
  onAddToCart: (item: Omit<CartItem, 'id'>) => void;
  onInstantBuy: (item: Omit<CartItem, 'id'>) => void;
}

export const ProductDetailsModal: React.FC<ProductDetailsModalProps> = ({
  product,
  initialColor,
  onClose,
  onAddToCart,
  onInstantBuy,
}) => {
  // State for selections
  const [selectedColor, setSelectedColor] = useState<ColorOption>(
    initialColor || product.colors[0]
  );
  const [selectedStorage, setSelectedStorage] = useState<StorageOption>(
    product.storageOptions[0] || { capacity: 'Standard', priceDelta: 0 }
  );
  const [hasTradeIn, setHasTradeIn] = useState(false);
  const [appleCareSelected, setAppleCareSelected] = useState(false);
  const [activeTab, setActiveTab] = useState<'overview' | 'specs' | 'box'>('overview');

  // Pricing calculations
  const appleCarePrice = product.category === 'mac' ? 279 : product.category === 'iphone' ? 199 : 79;
  const tradeInCredit = hasTradeIn && product.maxTradeInValue ? product.maxTradeInValue : 0;

  const basePriceWithStorage = product.basePrice + selectedStorage.priceDelta;
  const finalPrice = Math.max(0, basePriceWithStorage + (appleCareSelected ? appleCarePrice : 0) - tradeInCredit);
  const monthlyCost = (finalPrice / 24).toFixed(2);

  const handleAddToBag = () => {
    onAddToCart({
      productId: product.id,
      name: product.name,
      category: product.category,
      price: finalPrice,
      color: selectedColor,
      storage: selectedStorage,
      quantity: 1,
      appleCareIncluded: appleCareSelected,
      appleCarePrice: appleCareSelected ? appleCarePrice : 0,
      tradeInCredit,
    });
    onClose();
  };

  const handleBuyNow = () => {
    onInstantBuy({
      productId: product.id,
      name: product.name,
      category: product.category,
      price: finalPrice,
      color: selectedColor,
      storage: selectedStorage,
      quantity: 1,
      appleCareIncluded: appleCareSelected,
      appleCarePrice: appleCareSelected ? appleCarePrice : 0,
      tradeInCredit,
    });
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-2 sm:p-4 md:p-6 animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl w-full max-w-5xl max-h-[92vh] overflow-hidden flex flex-col shadow-2xl relative my-auto">
        {/* Sticky Modal Top Bar */}
        <div className="px-6 py-4 border-b border-black/5 flex items-center justify-between bg-white/95 backdrop-blur z-10">
          <div>
            <div className="flex items-center gap-2 text-xs text-[#86868B]">
              <span className="capitalize">{product.category}</span>
              <span aria-hidden="true">·</span>
              <span>{product.type}</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-semibold tracking-tight text-[#1D1D1F]">
              Buy {product.name}
            </h2>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden sm:block text-right">
              <span className="text-lg font-semibold tabular-nums text-[#1D1D1F]">
                ${finalPrice.toLocaleString()}
              </span>
              <span className="block text-[11px] text-[#86868B] tabular-nums">
                or ${monthlyCost}/mo. for 24 mo.
              </span>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-full bg-[#F5F5F7] hover:bg-[#E8E8ED] text-[#1D1D1F] transition-colors"
              aria-label="Close dialog"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div className="overflow-y-auto p-6 md:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column: Visual Showcase & Tabs */}
          <div className="lg:col-span-6 flex flex-col items-center">
            <div className="w-full bg-[#F5F5F7] rounded-3xl p-6 sm:p-10 flex flex-col items-center justify-center relative min-h-[320px] sm:min-h-[400px]">
              <ProductArtwork
                productId={product.id}
                category={product.category}
                selectedColor={selectedColor}
                size="lg"
                className="transition-all duration-300"
              />
              <div className="mt-4 text-center">
                <span className="text-xs font-medium text-[#1D1D1F] bg-white px-3 py-1 rounded-full shadow-sm">
                  {selectedColor.name}
                </span>
              </div>
            </div>

            {/* Navigation Tabs (Overview, Tech Specs, In the Box) */}
            <div className="w-full mt-6">
              <div className="flex border-b border-black/10">
                <button
                  onClick={() => setActiveTab('overview')}
                  className={`pb-2 text-xs font-semibold uppercase tracking-wider transition-colors mr-6 ${
                    activeTab === 'overview'
                      ? 'border-b-2 border-[#1D1D1F] text-[#1D1D1F]'
                      : 'text-[#86868B] hover:text-[#1D1D1F]'
                  }`}
                >
                  Overview
                </button>
                <button
                  onClick={() => setActiveTab('specs')}
                  className={`pb-2 text-xs font-semibold uppercase tracking-wider transition-colors mr-6 ${
                    activeTab === 'specs'
                      ? 'border-b-2 border-[#1D1D1F] text-[#1D1D1F]'
                      : 'text-[#86868B] hover:text-[#1D1D1F]'
                  }`}
                >
                  Tech Specs
                </button>
                <button
                  onClick={() => setActiveTab('box')}
                  className={`pb-2 text-xs font-semibold uppercase tracking-wider transition-colors ${
                    activeTab === 'box'
                      ? 'border-b-2 border-[#1D1D1F] text-[#1D1D1F]'
                      : 'text-[#86868B] hover:text-[#1D1D1F]'
                  }`}
                >
                  In The Box
                </button>
              </div>

              <div className="pt-4 text-xs sm:text-sm text-[#515154]">
                {activeTab === 'overview' && (
                  <div className="space-y-3">
                    <p className="leading-relaxed">{product.description}</p>
                    <div className="space-y-1.5 pt-2">
                      {product.highlights.map((highlight, idx) => (
                        <div key={idx} className="flex items-start gap-2">
                          <Check className="w-4 h-4 text-[#0071E3] shrink-0 mt-0.5" />
                          <span>{highlight}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {activeTab === 'specs' && (
                  <div className="divide-y divide-black/5 space-y-2">
                    {product.specs.map((spec, idx) => (
                      <div key={idx} className="pt-2 flex justify-between gap-4">
                        <span className="font-medium text-[#86868B]">{spec.label}</span>
                        <span className="text-[#1D1D1F] text-right">{spec.value}</span>
                      </div>
                    ))}
                  </div>
                )}

                {activeTab === 'box' && (
                  <div className="space-y-2">
                    <p className="font-medium text-[#1D1D1F]">Included with your purchase:</p>
                    <ul className="space-y-1.5 list-disc list-inside">
                      {product.whatsInTheBox.map((item, idx) => (
                        <li key={idx}>{item}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Configurator */}
          <div className="lg:col-span-6 space-y-6">
            {/* Step 1: Finish Selector */}
            <div>
              <label className="block text-sm font-semibold text-[#1D1D1F] mb-3">
                1. Finish. <span className="text-[#86868B] font-normal">Pick your favorite color.</span>
              </label>
              <div className="grid grid-cols-2 gap-2.5">
                {product.colors.map((color) => {
                  const isSelected = selectedColor.name === color.name;
                  return (
                    <button
                      key={color.name}
                      onClick={() => setSelectedColor(color)}
                      className={`p-3 rounded-2xl border text-left flex items-center gap-3 transition-all ${
                        isSelected
                          ? 'border-[#0071E3] ring-1 ring-[#0071E3] bg-[#0071E3]/5'
                          : 'border-black/10 hover:border-black/30 bg-white'
                      }`}
                    >
                      <span
                        className="w-5 h-5 rounded-full shrink-0 shadow-inner"
                        style={{ backgroundColor: color.hex }}
                      />
                      <span className="text-xs font-medium text-[#1D1D1F] truncate">
                        {color.name}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 2: Storage / Configuration Selector */}
            {product.storageOptions.length > 0 && (
              <div>
                <label className="block text-sm font-semibold text-[#1D1D1F] mb-3">
                  2. Storage. <span className="text-[#86868B] font-normal">How much space do you need?</span>
                </label>
                <div className="grid grid-cols-2 gap-2.5">
                  {product.storageOptions.map((opt) => {
                    const isSelected = selectedStorage.capacity === opt.capacity;
                    return (
                      <button
                        key={opt.capacity}
                        onClick={() => setSelectedStorage(opt)}
                        className={`p-3 rounded-2xl border text-left transition-all ${
                          isSelected
                            ? 'border-[#0071E3] ring-1 ring-[#0071E3] bg-[#0071E3]/5'
                            : 'border-black/10 hover:border-black/30 bg-white'
                        }`}
                      >
                        <div className="text-xs font-bold text-[#1D1D1F]">
                          {opt.capacity}
                        </div>
                        <div className="text-[11px] text-[#86868B] mt-0.5">
                          {opt.priceDelta === 0 ? 'Included' : `+$${opt.priceDelta}`}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Step 3: Apple Trade In */}
            {product.tradeInEligible && (
              <div className="p-4 rounded-2xl border border-black/10 bg-[#F5F5F7]/50">
                <div className="flex items-start gap-3">
                  <RefreshCw className="w-5 h-5 text-[#0071E3] shrink-0 mt-0.5" />
                  <div className="flex-1">
                    <div className="text-xs sm:text-sm font-semibold text-[#1D1D1F]">
                      Apple Trade In. Save up to ${product.maxTradeInValue}.
                    </div>
                    <p className="text-xs text-[#86868B] mt-0.5">
                      Get credit toward your new device when you trade in your current eligible product.
                    </p>
                    <div className="mt-3 flex items-center gap-2">
                      <button
                        onClick={() => setHasTradeIn(true)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                          hasTradeIn
                            ? 'bg-[#0071E3] text-white'
                            : 'bg-white border border-black/10 text-[#1D1D1F]'
                        }`}
                      >
                        Yes, trade in (-${product.maxTradeInValue})
                      </button>
                      <button
                        onClick={() => setHasTradeIn(false)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                          !hasTradeIn
                            ? 'bg-[#1D1D1F] text-white'
                            : 'bg-white border border-black/10 text-[#1D1D1F]'
                        }`}
                      >
                        No trade-in
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Step 4: AppleCare+ Coverage */}
            <div className="p-4 rounded-2xl border border-black/10 bg-[#F5F5F7]/50">
              <div className="flex items-start gap-3">
                <ShieldCheck className="w-5 h-5 text-[#E65100] shrink-0 mt-0.5" />
                <div className="flex-1">
                  <div className="flex justify-between items-center">
                    <span className="text-xs sm:text-sm font-semibold text-[#1D1D1F]">
                      AppleCare+ Coverage
                    </span>
                    <span className="text-xs font-semibold tabular-nums text-[#1D1D1F]">
                      +${appleCarePrice}
                    </span>
                  </div>
                  <p className="text-xs text-[#86868B] mt-0.5">
                    Unlimited repairs for accidental damage protection, 24/7 priority tech support, and battery coverage.
                  </p>
                  <button
                    onClick={() => setAppleCareSelected(!appleCareSelected)}
                    className={`mt-2.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors flex items-center gap-1.5 ${
                      appleCareSelected
                        ? 'bg-[#0071E3] text-white'
                        : 'bg-white border border-black/10 text-[#1D1D1F] hover:bg-slate-50'
                    }`}
                  >
                    {appleCareSelected ? <Check className="w-3.5 h-3.5" /> : null}
                    <span>{appleCareSelected ? 'Added AppleCare+' : 'Add AppleCare+'}</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Delivery & Pickup Trust Details */}
            <div className="space-y-2 pt-2 text-xs text-[#515154]">
              <div className="flex items-center gap-2">
                <Truck className="w-4 h-4 text-[#0071E3]" />
                <span>Free delivery available. Order today, arrives in 2 business days.</span>
              </div>
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#0071E3]" />
                <span>Free returns within 14 days at any Apple Store.</span>
              </div>
            </div>

            {/* Bottom Actions Box */}
            <div className="pt-4 border-t border-black/10 flex flex-col sm:flex-row items-center gap-3">
              <button
                onClick={handleAddToBag}
                className="w-full sm:flex-1 py-3 px-6 bg-[#0071E3] hover:bg-[#0077ED] text-white font-medium text-sm rounded-full transition-all active:scale-[0.98] shadow-sm text-center"
              >
                Add to Bag · ${finalPrice.toLocaleString()}
              </button>

              <button
                onClick={handleBuyNow}
                className="w-full sm:w-auto py-3 px-6 bg-[#1D1D1F] hover:bg-black text-white font-medium text-sm rounded-full transition-all active:scale-[0.98] text-center"
              >
                Instant Checkout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
