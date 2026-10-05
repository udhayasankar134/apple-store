import React, { useState } from 'react';
import { CartItem, ShippingDetails, Order } from '../types/store';
import { ProductArtwork } from './ProductArtwork';
import { X, CheckCircle2, Lock, CreditCard, Smartphone, ShieldCheck, ArrowRight, Truck, Package, Clock } from 'lucide-react';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onOrderSuccess: (order: Order) => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  items,
  onOrderSuccess,
}) => {
  if (!isOpen) return null;

  const [step, setStep] = useState<'checkout' | 'processing' | 'success'>('checkout');
  const [paymentMethod, setPaymentMethod] = useState<'apple_pay' | 'credit_card' | 'installments'>('apple_pay');
  const [completedOrder, setCompletedOrder] = useState<Order | null>(null);

  // Form details
  const [formData, setFormData] = useState<ShippingDetails>({
    firstName: 'Alex',
    lastName: 'Chen',
    email: 'alex.chen@icloud.com',
    phone: '(408) 555-0199',
    street: '1 Apple Park Way',
    city: 'Cupertino',
    state: 'CA',
    zipCode: '95014',
    country: 'United States',
  });

  const [cardData, setCardData] = useState({
    number: '•••• •••• •••• 4242',
    exp: '09/28',
    cvv: '888',
    name: 'Alex Chen',
  });

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const totalTradeInSavings = items.reduce((sum, item) => sum + item.tradeInCredit * item.quantity, 0);
  const tax = subtotal * 0.0825;
  const total = subtotal + tax;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePlaceOrder = () => {
    setStep('processing');

    setTimeout(() => {
      const generatedOrder: Order = {
        orderNumber: `W${Math.floor(100000000 + Math.random() * 900000000)}`,
        date: new Date().toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        }),
        items: [...items],
        subtotal,
        tradeInSavings: totalTradeInSavings,
        tax,
        total,
        shipping: formData,
        paymentMethod,
        deliveryDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', {
          weekday: 'short',
          month: 'short',
          day: 'numeric',
        }),
      };

      setCompletedOrder(generatedOrder);
      setStep('success');
      onOrderSuccess(generatedOrder);
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl w-full max-w-4xl max-h-[92vh] overflow-hidden flex flex-col shadow-2xl relative my-auto">
        {/* Top Header */}
        <div className="px-6 py-4 border-b border-black/5 flex items-center justify-between bg-white">
          <div className="flex items-center gap-2">
            <Lock className="w-4 h-4 text-[#86868B]" />
            <h2 className="text-lg font-semibold tracking-tight text-[#1D1D1F]">
              {step === 'success' ? 'Order Confirmation' : 'Apple Store Checkout'}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-[#F5F5F7] text-[#1D1D1F] transition-colors"
            aria-label="Close checkout"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body content */}
        <div className="overflow-y-auto p-6 sm:p-8">
          {step === 'processing' && (
            <div className="py-24 text-center space-y-4">
              <div className="w-16 h-16 border-4 border-[#0071E3] border-t-transparent rounded-full animate-spin mx-auto" />
              <h3 className="text-xl font-semibold text-[#1D1D1F]">
                {paymentMethod === 'apple_pay' ? 'Authorizing with Apple Pay...' : 'Securing your order...'}
              </h3>
              <p className="text-xs text-[#86868B]">
                Connecting securely to Apple Pay servers. Please do not refresh.
              </p>
            </div>
          )}

          {step === 'success' && completedOrder && (
            <div className="space-y-8 animate-in zoom-in-95 duration-300">
              {/* Celebration header */}
              <div className="text-center space-y-2">
                <div className="w-16 h-16 bg-emerald-50 rounded-full flex items-center justify-center mx-auto text-emerald-600">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h3 className="text-2xl sm:text-3xl font-semibold text-[#1D1D1F]">
                  Thank you for your order.
                </h3>
                <p className="text-sm text-[#86868B]">
                  We sent a confirmation email to{' '}
                  <span className="font-semibold text-[#1D1D1F]">{completedOrder.shipping.email}</span>.
                </p>
                <div className="inline-block mt-2 px-4 py-1.5 bg-[#F5F5F7] rounded-full text-xs font-mono font-medium text-[#1D1D1F]">
                  Order Number: {completedOrder.orderNumber}
                </div>
              </div>

              {/* Delivery Tracker Bar */}
              <div className="bg-[#F5F5F7] p-5 rounded-2xl space-y-4">
                <div className="flex items-center justify-between text-xs font-medium text-[#1D1D1F]">
                  <div className="flex items-center gap-2 text-[#0071E3]">
                    <Package className="w-4 h-4" />
                    <span>Estimated Delivery: {completedOrder.deliveryDate}</span>
                  </div>
                  <span className="text-[#86868B]">Carrier: FedEx Priority</span>
                </div>

                <div className="grid grid-cols-4 gap-2 pt-2 text-center text-[11px]">
                  <div className="space-y-1">
                    <div className="h-1.5 bg-[#0071E3] rounded-full" />
                    <span className="font-semibold text-[#0071E3]">Order Placed</span>
                  </div>
                  <div className="space-y-1">
                    <div className="h-1.5 bg-[#0071E3] rounded-full" />
                    <span className="font-medium text-[#1D1D1F]">Processing</span>
                  </div>
                  <div className="space-y-1">
                    <div className="h-1.5 bg-black/10 rounded-full" />
                    <span className="text-[#86868B]">Preparing</span>
                  </div>
                  <div className="space-y-1">
                    <div className="h-1.5 bg-black/10 rounded-full" />
                    <span className="text-[#86868B]">Delivered</span>
                  </div>
                </div>
              </div>

              {/* Receipt Line Items */}
              <div className="border border-black/10 rounded-2xl p-5 space-y-4">
                <h4 className="text-xs font-semibold uppercase tracking-wider text-[#86868B]">
                  Purchased Items ({completedOrder.items.length})
                </h4>
                <div className="divide-y divide-black/5 space-y-3">
                  {completedOrder.items.map((item, idx) => (
                    <div key={idx} className="pt-3 first:pt-0 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-[#F5F5F7] rounded-xl flex items-center justify-center p-1">
                          <ProductArtwork
                            productId={item.productId}
                            category={item.category}
                            selectedColor={item.color}
                            size="sm"
                          />
                        </div>
                        <div>
                          <div className="text-xs sm:text-sm font-semibold text-[#1D1D1F]">
                            {item.name} <span className="text-[#86868B] font-normal">×{item.quantity}</span>
                          </div>
                          <div className="text-[11px] text-[#86868B]">
                            {item.color.name} {item.storage ? `· ${item.storage.capacity}` : ''}
                          </div>
                        </div>
                      </div>
                      <span className="text-xs sm:text-sm font-semibold tabular-nums text-[#1D1D1F]">
                        ${(item.price * item.quantity).toLocaleString()}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="border-t border-black/10 pt-3 flex justify-between text-sm font-bold text-[#1D1D1F]">
                  <span>Total Charged</span>
                  <span className="tabular-nums">
                    ${completedOrder.total.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </span>
                </div>
              </div>

              {/* Done button */}
              <div className="flex justify-center">
                <button
                  onClick={onClose}
                  className="px-8 py-3 bg-[#0071E3] hover:bg-[#0077ED] text-white text-sm font-medium rounded-full transition-colors"
                >
                  Continue Shopping
                </button>
              </div>
            </div>
          )}

          {step === 'checkout' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* Left Column: Shipping & Payment Forms */}
              <div className="lg:col-span-7 space-y-6">
                {/* 1. Shipping Address */}
                <div>
                  <h3 className="text-sm font-semibold text-[#1D1D1F] mb-3 flex items-center gap-1.5">
                    <Truck className="w-4 h-4 text-[#0071E3]" />
                    <span>Shipping Address</span>
                  </h3>
                  <div className="grid grid-cols-2 gap-3">
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      placeholder="First Name"
                      className="px-3.5 py-2.5 rounded-xl border border-black/15 text-xs text-[#1D1D1F] focus:outline-none focus:ring-2 focus:ring-[#0071E3]"
                    />
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      placeholder="Last Name"
                      className="px-3.5 py-2.5 rounded-xl border border-black/15 text-xs text-[#1D1D1F] focus:outline-none focus:ring-2 focus:ring-[#0071E3]"
                    />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="Email Address"
                      className="col-span-2 px-3.5 py-2.5 rounded-xl border border-black/15 text-xs text-[#1D1D1F] focus:outline-none focus:ring-2 focus:ring-[#0071E3]"
                    />
                    <input
                      type="text"
                      name="street"
                      value={formData.street}
                      onChange={handleInputChange}
                      placeholder="Street Address"
                      className="col-span-2 px-3.5 py-2.5 rounded-xl border border-black/15 text-xs text-[#1D1D1F] focus:outline-none focus:ring-2 focus:ring-[#0071E3]"
                    />
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      placeholder="City"
                      className="px-3.5 py-2.5 rounded-xl border border-black/15 text-xs text-[#1D1D1F] focus:outline-none focus:ring-2 focus:ring-[#0071E3]"
                    />
                    <div className="grid grid-cols-2 gap-2">
                      <input
                        type="text"
                        name="state"
                        value={formData.state}
                        onChange={handleInputChange}
                        placeholder="State"
                        className="px-3.5 py-2.5 rounded-xl border border-black/15 text-xs text-[#1D1D1F] focus:outline-none focus:ring-2 focus:ring-[#0071E3]"
                      />
                      <input
                        type="text"
                        name="zipCode"
                        value={formData.zipCode}
                        onChange={handleInputChange}
                        placeholder="ZIP Code"
                        className="px-3.5 py-2.5 rounded-xl border border-black/15 text-xs text-[#1D1D1F] focus:outline-none focus:ring-2 focus:ring-[#0071E3]"
                      />
                    </div>
                  </div>
                </div>

                {/* 2. Payment Method Selector */}
                <div>
                  <h3 className="text-sm font-semibold text-[#1D1D1F] mb-3 flex items-center gap-1.5">
                    <CreditCard className="w-4 h-4 text-[#0071E3]" />
                    <span>Payment Method</span>
                  </h3>
                  <div className="grid grid-cols-3 gap-2.5">
                    <button
                      type="button"
                      onClick={() => setPaymentMethod('apple_pay')}
                      className={`p-3 rounded-2xl border text-center transition-all flex flex-col items-center justify-center gap-1.5 ${
                        paymentMethod === 'apple_pay'
                          ? 'border-black ring-2 ring-black bg-[#1D1D1F] text-white'
                          : 'border-black/10 hover:border-black/30 bg-white text-[#1D1D1F]'
                      }`}
                    >
                      <span className="font-bold text-xs tracking-tight">Pay</span>
                      <span className="text-[10px] opacity-80">Instant Touch ID</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setPaymentMethod('credit_card')}
                      className={`p-3 rounded-2xl border text-center transition-all flex flex-col items-center justify-center gap-1.5 ${
                        paymentMethod === 'credit_card'
                          ? 'border-[#0071E3] ring-2 ring-[#0071E3] bg-[#0071E3]/5 text-[#1D1D1F]'
                          : 'border-black/10 hover:border-black/30 bg-white text-[#1D1D1F]'
                      }`}
                    >
                      <CreditCard className="w-4 h-4" />
                      <span className="text-[10px] font-medium">Credit Card</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setPaymentMethod('installments')}
                      className={`p-3 rounded-2xl border text-center transition-all flex flex-col items-center justify-center gap-1.5 ${
                        paymentMethod === 'installments'
                          ? 'border-[#0071E3] ring-2 ring-[#0071E3] bg-[#0071E3]/5 text-[#1D1D1F]'
                          : 'border-black/10 hover:border-black/30 bg-white text-[#1D1D1F]'
                      }`}
                    >
                      <Clock className="w-4 h-4" />
                      <span className="text-[10px] font-medium">0% APR Monthly</span>
                    </button>
                  </div>

                  {/* Payment Details Form based on method */}
                  {paymentMethod === 'credit_card' && (
                    <div className="mt-3 p-4 bg-[#F5F5F7] rounded-2xl space-y-3 animate-in fade-in">
                      <input
                        type="text"
                        placeholder="Card Number"
                        value={cardData.number}
                        onChange={(e) => setCardData({ ...cardData, number: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-black/15 bg-white text-xs text-[#1D1D1F]"
                      />
                      <div className="grid grid-cols-2 gap-2">
                        <input
                          type="text"
                          placeholder="MM/YY"
                          value={cardData.exp}
                          onChange={(e) => setCardData({ ...cardData, exp: e.target.value })}
                          className="px-3.5 py-2.5 rounded-xl border border-black/15 bg-white text-xs text-[#1D1D1F]"
                        />
                        <input
                          type="text"
                          placeholder="CVV"
                          value={cardData.cvv}
                          onChange={(e) => setCardData({ ...cardData, cvv: e.target.value })}
                          className="px-3.5 py-2.5 rounded-xl border border-black/15 bg-white text-xs text-[#1D1D1F]"
                        />
                      </div>
                    </div>
                  )}

                  {paymentMethod === 'apple_pay' && (
                    <div className="mt-3 p-4 bg-[#1D1D1F] text-white rounded-2xl flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center font-bold text-lg">
                          
                        </div>
                        <div>
                          <div className="text-xs font-semibold">Apple Pay Ready</div>
                          <div className="text-[11px] text-white/70">Apple Card (•••• 8042)</div>
                        </div>
                      </div>
                      <span className="text-xs bg-white/20 px-2.5 py-1 rounded-full font-medium">
                        Double-click ready
                      </span>
                    </div>
                  )}

                  {paymentMethod === 'installments' && (
                    <div className="mt-3 p-4 bg-[#F5F5F7] rounded-2xl text-xs text-[#515154] space-y-1">
                      <p className="font-semibold text-[#1D1D1F]">
                        Apple Card Monthly Installments: ${(total / 24).toFixed(2)}/mo. for 24 months.
                      </p>
                      <p className="text-[11px] text-[#86868B]">
                        0% APR. Plus earn 3% Daily Cash back right away on this purchase.
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Right Column: Order Summary */}
              <div className="lg:col-span-5 bg-[#F5F5F7] p-6 rounded-3xl flex flex-col justify-between space-y-6">
                <div>
                  <h3 className="text-sm font-semibold text-[#1D1D1F] mb-4">Order Summary</h3>
                  <div className="divide-y divide-black/5 space-y-3">
                    {items.map((item) => (
                      <div key={item.id} className="pt-3 first:pt-0 flex justify-between text-xs">
                        <div>
                          <span className="font-medium text-[#1D1D1F]">{item.name}</span>
                          <span className="text-[#86868B]"> ×{item.quantity}</span>
                          <div className="text-[11px] text-[#86868B]">{item.color.name}</div>
                        </div>
                        <span className="font-semibold tabular-nums text-[#1D1D1F]">
                          ${(item.price * item.quantity).toLocaleString()}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="border-t border-black/10 mt-4 pt-3 space-y-2 text-xs text-[#515154]">
                    <div className="flex justify-between">
                      <span>Subtotal</span>
                      <span className="tabular-nums font-medium text-[#1D1D1F]">${subtotal.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Shipping</span>
                      <span className="text-[#0071E3] font-semibold">FREE (2-Day Express)</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Estimated Sales Tax</span>
                      <span className="tabular-nums">${tax.toFixed(2)}</span>
                    </div>
                    <div className="border-t border-black/10 pt-2 flex justify-between text-base font-bold text-[#1D1D1F]">
                      <span>Order Total</span>
                      <span className="tabular-nums">${total.toFixed(2)}</span>
                    </div>
                  </div>
                </div>

                {/* Submit button */}
                <div className="space-y-3">
                  <button
                    onClick={handlePlaceOrder}
                    className={`w-full py-3.5 rounded-full text-sm font-semibold transition-all active:scale-[0.98] shadow-md flex items-center justify-center gap-2 ${
                      paymentMethod === 'apple_pay'
                        ? 'bg-black hover:bg-[#1D1D1F] text-white'
                        : 'bg-[#0071E3] hover:bg-[#0077ED] text-white'
                    }`}
                  >
                    {paymentMethod === 'apple_pay' ? (
                      <>
                        <span className="text-base"></span>
                        <span>Pay with Apple Pay</span>
                      </>
                    ) : (
                      <>
                        <Lock className="w-4 h-4" />
                        <span>Place Order · ${total.toFixed(2)}</span>
                      </>
                    )}
                  </button>

                  <div className="text-center text-[11px] text-[#86868B] flex items-center justify-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#0071E3]" />
                    <span>256-bit encrypted checkout with Apple Security</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
