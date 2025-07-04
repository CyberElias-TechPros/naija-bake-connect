
// SEO utilities for Fortune Cakes
export const setSEOTags = (title: string, description: string, keywords?: string) => {
  // Set document title
  document.title = title.includes('Fortune Cakes') ? title : `${title} - Fortune Cakes`;
  
  // Set meta description
  const metaDescription = document.querySelector('meta[name="description"]');
  if (metaDescription) {
    metaDescription.setAttribute('content', description);
  } else {
    const newMeta = document.createElement('meta');
    newMeta.name = 'description';
    newMeta.content = description;
    document.head.appendChild(newMeta);
  }
  
  // Set meta keywords if provided
  if (keywords) {
    const metaKeywords = document.querySelector('meta[name="keywords"]');
    if (metaKeywords) {
      metaKeywords.setAttribute('content', keywords);
    } else {
      const newMeta = document.createElement('meta');
      newMeta.name = 'keywords';
      newMeta.content = keywords;
      document.head.appendChild(newMeta);
    }
  }
  
  // Set Open Graph tags
  const ogTitle = document.querySelector('meta[property="og:title"]');
  if (ogTitle) {
    ogTitle.setAttribute('content', title);
  }
  
  const ogDescription = document.querySelector('meta[property="og:description"]');
  if (ogDescription) {
    ogDescription.setAttribute('content', description);
  }
  
  // Set Twitter tags
  const twitterTitle = document.querySelector('meta[property="twitter:title"]');
  if (twitterTitle) {
    twitterTitle.setAttribute('content', title);
  }
  
  const twitterDescription = document.querySelector('meta[property="twitter:description"]');
  if (twitterDescription) {
    twitterDescription.setAttribute('content', description);
  }
};

export const generateProductStructuredData = (product: any) => {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": product.name,
    "description": product.description,
    "image": product.image,
    "brand": {
      "@type": "Brand",
      "name": "Fortune Cakes"
    },
    "offers": {
      "@type": "Offer",
      "price": product.price,
      "priceCurrency": "NGN",
      "availability": product.available ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
      "seller": {
        "@type": "Organization",
        "name": "Fortune Cakes"
      }
    },
    "category": product.category,
    "manufacturer": {
      "@type": "Organization",
      "name": "Fortune Cakes",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "NTA-Rumuokwuta Road",
        "addressLocality": "Port Harcourt",
        "addressRegion": "Rivers State",
        "addressCountry": "Nigeria"
      }
    }
  };
};

export const setStructuredData = (data: any) => {
  // Remove existing structured data
  const existingScript = document.querySelector('script[type="application/ld+json"][data-dynamic]');
  if (existingScript) {
    existingScript.remove();
  }
  
  // Add new structured data
  const script = document.createElement('script');
  script.type = 'application/ld+json';
  script.setAttribute('data-dynamic', 'true');
  script.textContent = JSON.stringify(data);
  document.head.appendChild(script);
};
