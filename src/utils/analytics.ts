
// Analytics utilities for Fortune Cakes
// This file provides interfaces for analytics integration

export interface AnalyticsEvent {
  action: string;
  category: string;
  label?: string;
  value?: number;
}

export interface EcommerceEvent {
  event: 'purchase' | 'add_to_cart' | 'view_item' | 'begin_checkout';
  transaction_id?: string;
  value?: number;
  currency?: string;
  items?: Array<{
    item_id: string;
    item_name: string;
    category: string;
    quantity: number;
    price: number;
  }>;
}

// Track page views
export const trackPageView = (path: string, title?: string) => {
  console.log('Page view tracked:', { path, title });
  
  // Google Analytics 4 - replace with actual implementation
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('config', 'GA_MEASUREMENT_ID', {
      page_title: title,
      page_location: window.location.href,
      page_path: path
    });
  }
  
  // Facebook Pixel - replace with actual implementation
  if (typeof window !== 'undefined' && (window as any).fbq) {
    (window as any).fbq('track', 'PageView');
  }
};

// Track custom events
export const trackEvent = (event: AnalyticsEvent) => {
  console.log('Event tracked:', event);
  
  // Google Analytics 4
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', event.action, {
      event_category: event.category,
      event_label: event.label,
      value: event.value
    });
  }
};

// Track ecommerce events
export const trackEcommerceEvent = (event: EcommerceEvent) => {
  console.log('Ecommerce event tracked:', event);
  
  // Google Analytics 4
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', event.event, {
      transaction_id: event.transaction_id,
      value: event.value,
      currency: event.currency || 'NGN',
      items: event.items
    });
  }
  
  // Facebook Pixel
  if (typeof window !== 'undefined' && (window as any).fbq) {
    switch (event.event) {
      case 'purchase':
        (window as any).fbq('track', 'Purchase', {
          value: event.value,
          currency: event.currency || 'NGN'
        });
        break;
      case 'add_to_cart':
        (window as any).fbq('track', 'AddToCart', {
          value: event.value,
          currency: event.currency || 'NGN'
        });
        break;
      case 'view_item':
        (window as any).fbq('track', 'ViewContent');
        break;
      case 'begin_checkout':
        (window as any).fbq('track', 'InitiateCheckout', {
          value: event.value,
          currency: event.currency || 'NGN'
        });
        break;
    }
  }
};

// Track product views
export const trackProductView = (product: any) => {
  trackEcommerceEvent({
    event: 'view_item',
    items: [{
      item_id: product.id,
      item_name: product.name,
      category: product.category,
      quantity: 1,
      price: product.price
    }]
  });
};

// Track add to cart
export const trackAddToCart = (product: any, quantity: number = 1) => {
  trackEcommerceEvent({
    event: 'add_to_cart',
    value: product.price * quantity,
    currency: 'NGN',
    items: [{
      item_id: product.id,
      item_name: product.name,
      category: product.category,
      quantity: quantity,
      price: product.price
    }]
  });
};

// Track purchase
export const trackPurchase = (orderId: string, items: any[], totalValue: number) => {
  trackEcommerceEvent({
    event: 'purchase',
    transaction_id: orderId,
    value: totalValue,
    currency: 'NGN',
    items: items.map(item => ({
      item_id: item.productId,
      item_name: item.productName || item.name,
      category: item.category || 'Unknown',
      quantity: item.quantity,
      price: item.price
    }))
  });
};

// Initialize analytics
export const initializeAnalytics = () => {
  console.log('Analytics initialized for Fortune Cakes');
  
  // Track initial page load
  trackPageView(window.location.pathname, document.title);
};
