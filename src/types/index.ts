
export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
  featured?: boolean;
  customizable?: boolean;
  options?: ProductOption[];
}

export interface ProductOption {
  name: string;
  choices: {
    id: string;
    name: string;
    priceAdjustment: number;
  }[];
}

export interface CartItem {
  productId: string;
  quantity: number;
  selectedOptions?: {
    [optionName: string]: string;
  };
}

export interface Order {
  id: string;
  date: string;
  items: CartItem[];
  totalAmount: number;
  status: 'pending' | 'processing' | 'completed' | 'delivered' | 'cancelled';
  customerInfo: {
    name: string;
    email: string;
    phone: string;
  };
  shippingAddress: {
    address: string;
    city: string;
    state: string;
  };
  paymentMethod: string;
  deliveryMethod: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
}
