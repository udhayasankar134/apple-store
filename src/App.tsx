import React, { useState, useMemo } from 'react';
import { PRODUCTS } from './data/products';
import { Product, CategoryId, ColorOption, CartItem, Order } from './types/store';
import { Navbar } from './components/Navbar';
import { CategoryNav } from './components/CategoryNav';
import { HeroBanner } from './components/HeroBanner';
import { ProductCard } from './components/ProductCard';
import { ProductDetailsModal } from './components/ProductDetailsModal';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { SearchModal } from './components/SearchModal';
import { ProductComparisonModal } from './components/ProductComparisonModal';
import { Footer } from './components/Footer';
import { Sparkles, SlidersHorizontal, CheckCircle2, Shield, Truck, RefreshCcw } from 'lucide-react';

export default function App() {
  // Navigation & Category state
  const [activeCategory, setActiveCategory] = useState<CategoryId>('all');
  const [subFilter, setSubFilter] = useState<'all' | 'pro' | 'under1000' | 'new'>('all');

  // Modals & Drawers state
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedInitialColor, setSelectedInitialColor] = useState<ColorOption | undefined>(undefined);
  const [cartOpen, setCartOpen] = useState(false);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [compareOpen, setCompareOpen] = useState(false);
  const [compareTargetProduct, setCompareTargetProduct] = useState<Product | undefined>(undefined);

  // Cart state
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Toast notification timer
  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage(null);
    }, 3200);
  };

  // Add to Bag handler from quick card or hero
  const handleQuickAddToCart = (product: Product, color?: ColorOption) => {
    const chosenColor = color || product.colors[0];
    const defaultStorage = product.storageOptions[0] || { capacity: 'Standard', priceDelta: 0 };
    const cartItemId = `${product.id}-${chosenColor.name}-${defaultStorage.capacity}`;

    setCartItems((prev) => {
      const existing = prev.find((item) => item.id === cartItemId);
      if (existing) {
        return prev.map((item) =>
          item.id === cartItemId ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [
        ...prev,
        {
          id: cartItemId,
          productId: product.id,
          name: product.name,
          category: product.category,
          price: product.basePrice,
          color: chosenColor,
          storage: defaultStorage,
          quantity: 1,
          appleCareIncluded: false,
          appleCarePrice: 0,
          tradeInCredit: 0,
        },
      ];
    });

    showToast(`Added ${product.name} (${chosenColor.name}) to your Bag`);
  };

  // Add to bag from configurator PDP
  const handleFullAddToCart = (item: Omit<CartItem, 'id'>) => {
    const cartItemId = `${item.productId}-${item.color.name}-${item.storage?.capacity || 'std'}-${
      item.appleCareIncluded ? 'care' : 'nocare'
    }`;

    setCartItems((prev) => {
      const existing = prev.find((i) => i.id === cartItemId);
      if (existing) {
        return prev.map((i) =>
          i.id === cartItemId ? { ...i, quantity: i.quantity + item.quantity } : i
        );
      }
      return [...prev, { ...item, id: cartItemId }];
    });

    showToast(`Added ${item.name} to your Bag`);
  };

  // Instant Checkout from PDP
  const handleInstantBuy = (item: Omit<CartItem, 'id'>) => {
    handleFullAddToCart(item);
    setSelectedProduct(null);
    setCheckoutOpen(true);
  };

  // Cart quantity controls
  const handleUpdateCartQuantity = (id: string, delta: number) => {
    setCartItems((prev) =>
      prev
        .map((item) => {
          if (item.id === id) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const handleRemoveCartItem = (id: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const handleOrderSuccess = (order: Order) => {
    // Clear items after completed order
    setCartItems([]);
    showToast(`Order #${order.orderNumber} placed successfully!`);
  };

  const handleOpenCompare = (product?: Product) => {
    setCompareTargetProduct(product);
    setCompareOpen(true);
  };

  // Filtered Products
  const displayedProducts = useMemo(() => {
    let list = PRODUCTS;

    // Filter by Category
    if (activeCategory !== 'all') {
      list = list.filter((p) => p.category === activeCategory);
    }

    // Secondary Filter Tabs
    if (subFilter === 'pro') {
      list = list.filter((p) => p.name.includes('Pro') || p.name.includes('Ultra'));
    } else if (subFilter === 'under1000') {
      list = list.filter((p) => p.basePrice < 1000);
    } else if (subFilter === 'new') {
      list = list.filter((p) => p.badge === 'New' || p.badge === 'Flagship');
    }

    return list;
  }, [activeCategory, subFilter]);

  const totalCartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen bg-[#F5F5F7] flex flex-col text-[#1D1D1F]">
      {/* Top Notification Toast */}
      {toastMessage && (
        <div className="fixed top-14 left-1/2 -translate-x-1/2 z-50 bg-[#1D1D1F] text-white px-5 py-2.5 rounded-full text-xs font-medium shadow-2xl flex items-center gap-2 animate-in slide-in-from-top-3 fade-in duration-200">
          <CheckCircle2 className="w-4 h-4 text-[#30D158]" />
          <span>{toastMessage}</span>
          <button
            onClick={() => setCartOpen(true)}
            className="text-[#2997FF] hover:underline ml-1 font-semibold"
          >
            Review Bag
          </button>
        </div>
      )}

      {/* Main Apple Navigation Bar */}
      <Navbar
        activeCategory={activeCategory}
        onSelectCategory={setActiveCategory}
        cartCount={totalCartCount}
        onOpenCart={() => setCartOpen(true)}
        onOpenSearch={() => setSearchOpen(true)}
        onOpenCompare={() => handleOpenCompare()}
      />

      {/* Visual Category Scroller */}
      <CategoryNav
        activeCategory={activeCategory}
        onSelectCategory={setActiveCategory}
      />

      {/* Hero Spotlight (Shown in All or Featured categories) */}
      {activeCategory === 'all' && (
        <HeroBanner
          products={PRODUCTS}
          onSelectProduct={(p) => {
            setSelectedProduct(p);
            setSelectedInitialColor(p.colors[0]);
          }}
          onAddToCart={(p) => handleQuickAddToCart(p)}
        />
      )}

      {/* Main Storefront Body */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
        {/* Section Header & Sub-filters */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-4 border-b border-black/5">
          <div>
            <div className="text-xs font-semibold uppercase tracking-wider text-[#0071E3] flex items-center gap-1.5 mb-1">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Apple Store Lineup</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-[#1D1D1F]">
              {activeCategory === 'all'
                ? 'The latest. Take a look at what’s new.'
                : `Explore all ${activeCategory.toUpperCase()} models`}
            </h2>
          </div>

          {/* Interactive filter tabs */}
          <div className="flex items-center gap-1 p-1 bg-white rounded-xl border border-black/5 shadow-sm overflow-x-auto no-scrollbar">
            <button
              onClick={() => setSubFilter('all')}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap ${
                subFilter === 'all'
                  ? 'bg-[#1D1D1F] text-white shadow-sm'
                  : 'text-[#1D1D1F]/70 hover:text-[#1D1D1F]'
              }`}
            >
              All Models
            </button>
            <button
              onClick={() => setSubFilter('pro')}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap ${
                subFilter === 'pro'
                  ? 'bg-[#1D1D1F] text-white shadow-sm'
                  : 'text-[#1D1D1F]/70 hover:text-[#1D1D1F]'
              }`}
            >
              Pro & Ultra
            </button>
            <button
              onClick={() => setSubFilter('new')}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap ${
                subFilter === 'new'
                  ? 'bg-[#1D1D1F] text-white shadow-sm'
                  : 'text-[#1D1D1F]/70 hover:text-[#1D1D1F]'
              }`}
            >
              New Releases
            </button>
            <button
              onClick={() => setSubFilter('under1000')}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap ${
                subFilter === 'under1000'
                  ? 'bg-[#1D1D1F] text-white shadow-sm'
                  : 'text-[#1D1D1F]/70 hover:text-[#1D1D1F]'
              }`}
            >
              Under $1,000
            </button>
          </div>
        </div>

        {/* Product Cards Grid: 3 columns desktop, 2 tablet, 1 mobile */}
        {displayedProducts.length === 0 ? (
          <div className="bg-white rounded-3xl p-16 text-center space-y-3 border border-black/5">
            <h3 className="text-xl font-semibold text-[#1D1D1F]">No products match this filter</h3>
            <p className="text-xs text-[#86868B]">
              Try choosing &ldquo;All Models&rdquo; or browse another category.
            </p>
            <button
              onClick={() => setSubFilter('all')}
              className="px-5 py-2 bg-[#0071E3] text-white text-xs font-medium rounded-full hover:bg-[#0077ED] transition-colors"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {displayedProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onSelect={(p, col) => {
                  setSelectedProduct(p);
                  setSelectedInitialColor(col);
                }}
                onAddToCart={(p, col) => handleQuickAddToCart(p, col)}
                onCompare={(p) => handleOpenCompare(p)}
              />
            ))}
          </div>
        )}

        {/* Apple Experience & Trust Strip */}
        <section className="bg-white rounded-3xl p-8 sm:p-10 border border-black/5 space-y-8 mt-12">
          <div className="text-center max-w-xl mx-auto space-y-2">
            <h3 className="text-2xl sm:text-3xl font-semibold tracking-tight text-[#1D1D1F]">
              Why the Apple Store is the best place to buy.
            </h3>
            <p className="text-xs sm:text-sm text-[#86868B]">
              Fast delivery, flexible payment options, trade-in savings, and dedicated Specialist support.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-4">
            <div className="flex flex-col items-center text-center p-4 rounded-2xl bg-[#F5F5F7] space-y-2">
              <Truck className="w-8 h-8 text-[#0071E3]" />
              <h4 className="text-sm font-semibold text-[#1D1D1F]">Free 2-Day Delivery</h4>
              <p className="text-xs text-[#86868B]">
                Free shipping on all items or free in-store pickup at any Apple Store.
              </p>
            </div>

            <div className="flex flex-col items-center text-center p-4 rounded-2xl bg-[#F5F5F7] space-y-2">
              <RefreshCcw className="w-8 h-8 text-[#0071E3]" />
              <h4 className="text-sm font-semibold text-[#1D1D1F]">Apple Trade In</h4>
              <p className="text-xs text-[#86868B]">
                Trade in your eligible device for instant credit towards your new purchase.
              </p>
            </div>

            <div className="flex flex-col items-center text-center p-4 rounded-2xl bg-[#F5F5F7] space-y-2">
              <Shield className="w-8 h-8 text-[#0071E3]" />
              <h4 className="text-sm font-semibold text-[#1D1D1F]">AppleCare+</h4>
              <p className="text-xs text-[#86868B]">
                24/7 priority support and coverage for accidental drops, spills, and repairs.
              </p>
            </div>

            <div className="flex flex-col items-center text-center p-4 rounded-2xl bg-[#F5F5F7] space-y-2">
              <Sparkles className="w-8 h-8 text-[#0071E3]" />
              <h4 className="text-sm font-semibold text-[#1D1D1F]">Personal Setup</h4>
              <p className="text-xs text-[#86868B]">
                Connect with an Apple Specialist online for a free one-on-one session.
              </p>
            </div>
          </div>
        </section>
      </main>

      {/* Product Details / Configurator PDP Modal */}
      {selectedProduct && (
        <ProductDetailsModal
          product={selectedProduct}
          initialColor={selectedInitialColor}
          onClose={() => setSelectedProduct(null)}
          onAddToCart={handleFullAddToCart}
          onInstantBuy={handleInstantBuy}
        />
      )}

      {/* Shopping Bag Drawer */}
      <CartDrawer
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateCartQuantity}
        onRemoveItem={handleRemoveCartItem}
        onProceedToCheckout={() => {
          setCartOpen(false);
          setCheckoutOpen(true);
        }}
        onContinueShopping={() => setCartOpen(false)}
      />

      {/* Checkout Modal with Apple Pay */}
      <CheckoutModal
        isOpen={checkoutOpen}
        onClose={() => setCheckoutOpen(false)}
        items={cartItems}
        onOrderSuccess={handleOrderSuccess}
      />

      {/* Full-Screen Search Modal */}
      <SearchModal
        isOpen={searchOpen}
        onClose={() => setSearchOpen(false)}
        products={PRODUCTS}
        onSelectProduct={(p) => {
          setSelectedProduct(p);
          setSelectedInitialColor(p.colors[0]);
        }}
      />

      {/* Compare Models Modal */}
      <ProductComparisonModal
        isOpen={compareOpen}
        onClose={() => setCompareOpen(false)}
        products={PRODUCTS}
        initialProduct={compareTargetProduct}
        onSelectProduct={(p) => {
          setSelectedProduct(p);
          setSelectedInitialColor(p.colors[0]);
        }}
      />

      {/* Apple Footer */}
      <Footer onSelectCategory={setActiveCategory} />
    </div>
  );
}
