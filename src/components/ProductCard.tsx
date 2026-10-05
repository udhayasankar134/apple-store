import React, { useState } from 'react';
import { Product, ColorOption } from '../types/store';
import { ProductArtwork } from './ProductArtwork';
import { ShoppingBag, ArrowRight } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  onSelect: (product: Product, color?: ColorOption) => void;
  onAddToCart: (product: Product, color: ColorOption) => void;
  onCompare?: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onSelect,
  onAddToCart,
  onCompare,
}) => {
  const [selectedColorIndex, setSelectedColorIndex] = useState(0);
  const currentColor = product.colors[selectedColorIndex] || product.colors[0];

  const monthlyPrice = (product.basePrice / 24).toFixed(2);

  return (
    <div className="group bg-white rounded-3xl p-6 sm:p-7 flex flex-col justify-between border border-black/5 hover:shadow-[0_12px_36px_rgba(0,0,0,0.06)] transition-all duration-300 relative">
      {/* Top Header & Unboxed Metadata */}
      <div>
        <div className="flex items-center justify-between gap-2 mb-2 text-xs text-[#86868B]">
          <div className="flex items-center gap-1.5 font-medium tracking-tight">
            <span>{product.type}</span>
            <span aria-hidden="true">·</span>
            {product.badge && (
              <span className="text-[#BF4800] font-semibold">{product.badge}</span>
            )}
            {!product.badge && <span>In Stock</span>}
          </div>
          {onCompare && (
            <button
              onClick={() => onCompare(product)}
              className="text-[#0071E3] hover:underline text-[11px] font-medium"
            >
              Compare
            </button>
          )}
        </div>

        <h3 className="text-xl sm:text-2xl font-semibold tracking-tight text-[#1D1D1F] group-hover:text-[#0071E3] transition-colors">
          {product.name}
        </h3>

        <p className="text-xs sm:text-sm text-[#86868B] line-clamp-1 mt-0.5">
          {product.tagline}
        </p>

        {/* Pricing in tabular nums */}
        <div className="mt-3 flex items-baseline gap-2">
          <span className="text-lg font-semibold tabular-nums text-[#1D1D1F]">
            ${product.basePrice.toLocaleString()}
          </span>
          <span className="text-xs text-[#86868B] tabular-nums">
            or ${monthlyPrice}/mo. for 24 mo.
          </span>
        </div>
      </div>

      {/* Product Visual Showcase with Interactive Color Preview */}
      <div 
        onClick={() => onSelect(product, currentColor)}
        className="my-6 flex flex-col items-center justify-center cursor-pointer min-h-[180px] sm:min-h-[210px]"
      >
        <ProductArtwork
          productId={product.id}
          category={product.category}
          selectedColor={currentColor}
          size="md"
          className="transition-transform duration-300 group-hover:scale-105"
        />
      </div>

      {/* Color Dots Switcher */}
      <div className="mb-4 flex items-center justify-center gap-2">
        {product.colors.map((color, idx) => (
          <button
            key={color.name}
            onClick={(e) => {
              e.stopPropagation();
              setSelectedColorIndex(idx);
            }}
            title={color.name}
            aria-label={`Select ${color.name} finish`}
            className={`w-4 h-4 rounded-full transition-all duration-150 ${
              selectedColorIndex === idx
                ? 'ring-2 ring-offset-2 ring-[#0071E3] scale-110'
                : 'opacity-80 hover:opacity-100'
            }`}
            style={{ backgroundColor: color.hex }}
          />
        ))}
      </div>

      {/* Key Specs Pill Matrix */}
      <div className="pt-3 border-t border-black/5 text-xs text-[#515154] space-y-1.5 mb-5">
        {product.specs.slice(0, 3).map((spec, idx) => (
          <div key={idx} className="flex justify-between items-center">
            <span className="text-[#86868B]">{spec.label}</span>
            <span className="font-medium text-[#1D1D1F] text-right truncate max-w-[65%]">
              {spec.value}
            </span>
          </div>
        ))}
      </div>

      {/* Card Action Controls: Buy Now & Add to Cart */}
      <div className="flex items-center gap-2 pt-1">
        <button
          onClick={() => onSelect(product, currentColor)}
          className="flex-1 py-2 px-4 bg-[#0071E3] hover:bg-[#0077ED] text-white text-xs sm:text-sm font-medium rounded-full transition-colors flex items-center justify-center gap-1 active:scale-[0.98]"
        >
          <span>Buy Now</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>

        <button
          onClick={() => onAddToCart(product, currentColor)}
          className="p-2.5 bg-[#F5F5F7] hover:bg-[#E8E8ED] text-[#1D1D1F] rounded-full transition-colors"
          title="Add to Bag"
          aria-label={`Add ${product.name} to Bag`}
        >
          <ShoppingBag className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
