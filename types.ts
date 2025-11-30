
export type Category = 'all' | 'birthday' | 'wedding' | 'cupcake' | 'special';
export type PageView = 'home' | 'about' | 'products' | 'order' | 'contact';

export interface Product {
  id: number;
  name: string;
  category: string;
  price: string;
  image: string;
  description: string;
  instagramLink?: string;
}

export interface Testimonial {
  id: number;
  name: string;
  comment: string;
  rating: number;
}

export interface OrderSuggestion {
  message: string;
  flavor: string;
  design: string;
}

export interface CustomDesign {
  image: string; // Base64 string
  prompt: string;
}

export interface DesignHistoryItem extends CustomDesign {
  id: number;
  timestamp: number;
}

export interface OrderFormState {
  step: 1 | 2 | 3 | 4;
  size: number;
  flavor: string;
  note: string;
  date: string;
  name: string;
  phone: string;
  address: string;
  paymentMethod: 'credit_card' | 'transfer' | 'door';
}

export interface Campaign {
  title: string;
  description: string;
  buttonText: string;
  subtitle: string;
  imageUrl: string;
  products: Product[];
}

export interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  date: string;
  imageUrl: string;
  readTime: string;
  category: string;
}