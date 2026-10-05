export type CategoryId = 'all' | 'iphone' | 'mac' | 'ipad' | 'watch' | 'airpods' | 'accessories';

export interface ColorOption {
  name: string;
  hex: string;
  borderHex?: string;
  imageModifier?: string;
}

export interface StorageOption {
  capacity: string;
  priceDelta: number;
}

export interface SpecItem {
  label: string;
  value: string;
  iconName?: string;
}

export interface Product {
  id: string;
  name: string;
  category: CategoryId;
  tagline: string;
  badge?: string;
  description: string;
  basePrice: number;
  monthlyFinancingMonths?: number;
  rating: number;
  reviewCount: number;
  colors: ColorOption[];
  storageOptions: StorageOption[];
  specs: SpecItem[];
  highlights: string[];
  whatsInTheBox: string[];
  tradeInEligible?: boolean;
  maxTradeInValue?: number;
  type: string; // e.g. "Smartphone", "Laptop", "Tablet", "Smartwatch", "Audio"
}

export interface CartItem {
  id: string;
  productId: string;
  name: string;
  category: CategoryId;
  price: number;
  color: ColorOption;
  storage?: StorageOption;
  quantity: number;
  appleCareIncluded: boolean;
  appleCarePrice: number;
  tradeInCredit: number;
}

export interface ShippingDetails {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

export interface Order {
  orderNumber: string;
  date: string;
  items: CartItem[];
  subtotal: number;
  tradeInSavings: number;
  tax: number;
  total: number;
  shipping: ShippingDetails;
  paymentMethod: 'apple_pay' | 'credit_card' | 'installments';
  deliveryDate: string;
}
