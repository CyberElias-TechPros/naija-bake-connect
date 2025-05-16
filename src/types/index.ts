
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
  price?: number; // Unit price + options adjustments
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
  image?: string;
}

export interface UserProfile {
  id: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  address?: string;
  city?: string;
  state?: string;
}

export interface OrderSummary {
  id: string;
  created_at: string;
  status: string;
  total_amount: number;
  recipient_name: string;
}

export interface OrderDetail {
  order: {
    id: string;
    created_at: string;
    status: string;
    total_amount: number;
    recipient_name: string;
    recipient_email: string;
    recipient_phone: string;
    delivery_address: string;
    delivery_city: string;
    delivery_state: string;
    payment_method: string;
    delivery_method: string;
    notes: string;
  };
  items: OrderItem[];
}

export interface OrderItem {
  id: string;
  productId: string;
  productName: string;
  productImage: string;
  quantity: number;
  price: number;
  selectedOptions?: {
    [optionName: string]: string;
  };
}
