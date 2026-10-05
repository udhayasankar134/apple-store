import React from 'react';
import { CartItem } from '../types/store';
import { ProductArtwork } from './ProductArtwork';
import { X, Trash2, Plus, Minus, ArrowRight, ShieldCheck, Lock, ShoppingBag } from 'lucide-react';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemoveItem: (id: string) => void;
  onProceedToCheckout: () => void;
  onContinueShopping: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onProceedToCheckout,
  onContinueShopping,
}) => {
  if (!isOpen) return null;

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const totalTradeInCredit = items.reduce((sum, item) => sum + item.tradeInCredit * item.quantity, 0);
  const estimatedTax = subtotal * 0.0825; // standard ~8.25% sales tax
  const orderTotal = subtotal + estimatedTax;
  const monthlyTotal = (orderTotal / 24).toFixed(2);

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col justify-between">
          {/* Header */}
          <div className="p-6 border-b border-black/5 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-[#1D1D1F]" />
              <h2 className="text-xl font-semibold tracking-tight text-[#1D1D1F]">
                Review your Bag
              </h2>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-[#F5F5F7] text-[#1D1D1F] transition-colors"
              aria-label="Close bag"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Bag Items Content */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {items.length === 0 ? (
              <div className="py-16 text-center space-y-4">
                <div className="w-16 h-16 mx-auto rounded-full bg-[#F5F5F7] flex items-center justify-center text-[#86868B]">
                  <ShoppingBag className="w-8 h-8 stroke-[1.5]" />
                </div>
                <h3 className="text-xl font-semibold text-[#1D1D1F]">Your Bag is empty.</h3>
                <p className="text-xs text-[#86868B] max-w-xs mx-auto">
                  Free shipping and free returns on all items. Discover the newest Apple products today.
                </p>
                <button
                  onClick={() => {
                    onClose();
                    onContinueShopping();
                  }}
                  className="px-6 py-2.5 bg-[#0071E3] hover:bg-[#0077ED] text-white text-xs font-medium rounded-full transition-colors"
                >
                  Continue Shopping
                </button>
              </div>
            ) : (
              <div className="divide-y divide-black/5 space-y-4">
                {items.map((item) => (
                  <div key={item.id} className="pt-4 first:pt-0 flex gap-4 items-start">
                    {/* Item Thumbnail Artwork */}
                    <div className="w-20 h-20 rounded-2xl bg-[#F5F5F7] flex items-center justify-center p-2 shrink-0">
                      <ProductArtwork
                        productId={item.productId}
                        category={item.category}
                        selectedColor={item.color}
                        size="sm"
                      />
                    </div>

                    {/* Details */}
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start gap-2">
                        <h4 className="text-sm font-semibold text-[#1D1D1F] truncate">
                          {item.name}
                        </h4>
                        <span className="text-sm font-semibold tabular-nums text-[#1D1D1F]">
                          ${(item.price * item.quantity).toLocaleString()}
                        </span>
                      </div>

                      <div className="text-xs text-[#86868B] mt-1 space-y-0.5">
                        <div className="flex items-center gap-1.5">
                          <span
                            className="w-2.5 h-2.5 rounded-full inline-block"
                            style={{ backgroundColor: item.color.hex }}
                          />
                          <span>{item.color.name}</span>
                          {item.storage && <span>· {item.storage.capacity}</span>}
                        </div>

                        {item.appleCareIncluded && (
                          <div className="flex items-center gap-1 text-[#E65100]">
                            <ShieldCheck className="w-3 h-3" />
                            <span>AppleCare+ Plan Included</span>
                          </div>
                        )}

                        {item.tradeInCredit > 0 && (
                          <div className="text-[#0071E3] text-[11px]">
                            Trade-in credit applied (-${item.tradeInCredit})
                          </div>
                        )}
                      </div>

                      {/* Quantity Stepper & Remove */}
                      <div className="mt-3 flex items-center justify-between">
                        <div className="flex items-center border border-black/10 rounded-full px-2 py-0.5 bg-[#F5F5F7]">
                          <button
                            onClick={() => onUpdateQuantity(item.id, -1)}
                            className="p-1 hover:text-[#0071E3] transition-colors"
                            aria-label="Decrease quantity"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="px-2 text-xs font-medium tabular-nums text-[#1D1D1F]">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => onUpdateQuantity(item.id, 1)}
                            className="p-1 hover:text-[#0071E3] transition-colors"
                            aria-label="Increase quantity"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>

                        <button
                          onClick={() => onRemoveItem(item.id)}
                          className="text-xs text-[#86868B] hover:text-[#FF3B30] flex items-center gap-1 transition-colors"
                          aria-label="Remove item"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                          <span>Remove</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer Order Summary & Checkout Action */}
          {items.length > 0 && (
            <div className="p-6 border-t border-black/5 bg-[#F5F5F7]/40 space-y-4">
              <div className="space-y-1.5 text-xs text-[#515154]">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-semibold text-[#1D1D1F] tabular-nums">
                    ${subtotal.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span className="font-semibold text-[#0071E3]">FREE</span>
                </div>

                <div className="flex justify-between">
                  <span>Estimated Tax</span>
                  <span className="tabular-nums">
                    ${estimatedTax.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </span>
                </div>

                <div className="pt-2 border-t border-black/10 flex justify-between text-sm font-semibold text-[#1D1D1F]">
                  <span>Total</span>
                  <span className="tabular-nums">
                    ${orderTotal.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </span>
                </div>

                <div className="text-[11px] text-[#86868B] text-right tabular-nums">
                  or ${monthlyTotal}/mo. for 24 mo. with Apple Card
                </div>
              </div>

              {/* Checkout CTAs */}
              <div className="space-y-2 pt-1">
                <button
                  onClick={onProceedToCheckout}
                  className="w-full py-3 bg-[#0071E3] hover:bg-[#0077ED] text-white text-sm font-medium rounded-full transition-all flex items-center justify-center gap-2 active:scale-[0.98] shadow-sm"
                >
                  <Lock className="w-4 h-4" />
                  <span>Check Out</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <p className="text-[11px] text-[#86868B] text-center">
                  Free 2-day delivery · 14-day free returns
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
