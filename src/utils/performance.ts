
// Performance optimization utilities for Fortune Cakes

// Image lazy loading observer
export const createImageObserver = () => {
  if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target as HTMLImageElement;
          if (img.dataset.src) {
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
            img.classList.remove('lazy');
            observer.unobserve(img);
          }
        }
      });
    });

    return imageObserver;
  }
  return null;
};

// Preload critical resources
export const preloadCriticalResources = () => {
  // Preload hero image
  const heroImage = new Image();
  heroImage.src = 'https://images.unsplash.com/photo-1586788680434-30d324b2d46f?q=80&w=800&auto=format';
  
  // Preload logo
  const logo = new Image();
  logo.src = '/lovable-uploads/4dda7e70-2eb0-4c8b-ae83-4b4c8b9a5b64.png';
};

// Optimize images
export const optimizeImage = (url: string, width?: number, quality: number = 80) => {
  if (url.includes('unsplash.com')) {
    const params = new URLSearchParams();
    if (width) params.append('w', width.toString());
    params.append('q', quality.toString());
    params.append('auto', 'format');
    
    return `${url.split('?')[0]}?${params.toString()}`;
  }
  return url;
};

// Debounce function for search and other inputs
export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  wait: number
): ((...args: Parameters<T>) => void) => {
  let timeout: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};

// Throttle function for scroll events
export const throttle = <T extends (...args: any[]) => any>(
  func: T,
  limit: number
): ((...args: Parameters<T>) => void) => {
  let inThrottle: boolean;
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
};

// Check if user prefers reduced motion
export const prefersReducedMotion = () => {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};

// Viewport utilities
export const isInViewport = (element: Element) => {
  const rect = element.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
};

// Local storage with error handling
export const safeLocalStorage = {
  getItem: (key: string): string | null => {
    try {
      return localStorage.getItem(key);
    } catch (error) {
      console.warn('LocalStorage not available:', error);
      return null;
    }
  },
  
  setItem: (key: string, value: string): boolean => {
    try {
      localStorage.setItem(key, value);
      return true;
    } catch (error) {
      console.warn('LocalStorage not available:', error);
      return false;
    }
  },
  
  removeItem: (key: string): boolean => {
    try {
      localStorage.removeItem(key);
      return true;
    } catch (error) {
      console.warn('LocalStorage not available:', error);
      return false;
    }
  }
};

// Check network connection
export const getNetworkStatus = () => {
  if ('navigator' in window && 'connection' in navigator) {
    const connection = (navigator as any).connection;
    return {
      effectiveType: connection.effectiveType,
      downlink: connection.downlink,
      rtt: connection.rtt,
      saveData: connection.saveData
    };
  }
  return null;
};

// Optimize for slow connections
export const isSlowConnection = () => {
  const connection = getNetworkStatus();
  if (connection) {
    return connection.effectiveType === 'slow-2g' || connection.effectiveType === '2g' || connection.saveData;
  }
  return false;
};
