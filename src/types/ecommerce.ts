export type PageId =
  | 'home'
  | 'sarees'
  | 'banarasi'
  | 'kanjivaram'
  | 'tissue'
  | 'organza'
  | 'collections'
  | 'stores'
  | 'contact'
  | 'product';

export type Currency = 'INR' | 'USD' | 'EUR' | 'GBP' | 'AED';

export type SareeCategory = 'sarees' | 'banarasi' | 'kanjivaram' | 'tissue' | 'organza';

export interface Product {
  id: string;
  title: string;
  subtitle: string;
  designer?: string;
  category: SareeCategory;
  subcategory: string;
  price: number; // in INR
  originalPrice?: number;
  tag?: string;
  image: string;
  secondaryImage?: string;
  gallery?: string[];
  color: string;
  fabric: string;
  sizes: string[];
  sku: string;
  description: string;
  details: string[];
  itemCode?: string;
  wishlistCountBadge?: string;
  containsBadge?: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedSize: string;
}

export interface StoreLocation {
  id: string;
  city: string;
  name: string;
  address: string;
  neighborhood: string;
  timings: string;
  phone: string;
  email: string;
  image: string;
  services: string[];
}
