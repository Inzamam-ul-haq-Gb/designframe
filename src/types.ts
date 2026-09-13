export type FrameSize = '8 × 10' | '12 × 16' | '16 × 20' | '18 × 24' | '24 × 36';
export type FrameColor = 'Black' | 'White' | 'Walnut' | 'Gold';
export type FrameStyle = 'Classic' | 'Modern' | 'Minimal' | 'Luxury';

export type ProductCategory = 
  | 'Abstract Art'
  | 'Islamic Art'
  | 'Motivational'
  | 'Cars & Automotive'
  | 'Anime & Gaming'
  | 'Couple Frames'
  | 'Nature'
  | 'Kids Room'
  | 'Office Décor'
  | 'Custom Frames'
  | 'Customized Print at Demand';

export interface Product {
  id: string;
  name: string;
  category: ProductCategory;
  price: number; // in PKR
  salePrice: number; // in PKR
  discount: number; // percentage
  rating: number;
  reviewsCount: number;
  image: string;
  roomImage: string;
  orientation: 'portrait' | 'landscape' | 'square';
  sizes: FrameSize[];
  colors: FrameColor[];
  description: string;
  specifications: {
    material: string;
    glass: string;
    finish: string;
    weight: string;
    hardware: string;
  };
  isBestSeller?: boolean;
  isNew?: boolean;
  isBundle?: boolean;
  bundleItemsCount?: number;
}

export interface CartItem {
  id: string; // unique item id (cart row)
  productId: string;
  name: string;
  image: string;
  size: FrameSize;
  color: FrameColor;
  style?: FrameStyle | string;
  price: number;
  quantity: number;
  isCustom?: boolean;
  customImageUrl?: string;
}

export interface Review {
  id: string;
  name: string;
  city: string;
  rating: number;
  date: string;
  comment: string;
  productName: string;
  avatar: string;
  verified: boolean;
}

export interface BundleDeal {
  id: string;
  title: string;
  subtitle: string;
  originalPrice: number;
  salePrice: number;
  discount: number;
  image: string;
  items: string[];
  recommendedRoom: string;
}

export interface OrderDetails {
  orderId: string;
  fullName: string;
  phone: string;
  email: string;
  address: string;
  city: string;
  province: string;
  postalCode: string;
  paymentMethod: 'Cash on Delivery' | 'Bank Transfer' | 'Online Payment';
  items: CartItem[];
  subtotal: number;
  discountAmount: number;
  shipping: number;
  total: number;
  date: string;
}
