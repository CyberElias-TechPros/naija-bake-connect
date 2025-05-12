
import { Product, Category } from '@/types';

export const categories: Category[] = [
  { id: '1', name: 'Cakes', slug: 'cakes' },
  { id: '2', name: 'Bread', slug: 'bread' },
  { id: '3', name: 'Pastries', slug: 'pastries' },
  { id: '4', name: 'Chin Chin', slug: 'chinchin' },
  { id: '5', name: 'Pies & Snacks', slug: 'pies' },
];

export const products: Product[] = [
  {
    id: '1',
    name: 'Red Velvet Cake',
    description: 'Delicious moist red velvet cake with cream cheese frosting. Perfect for birthdays and celebrations.',
    price: 12000,
    category: 'cakes',
    image: 'https://images.unsplash.com/photo-1586788680434-30d324b2d46f?q=80&w=500&auto=format',
    featured: true,
    customizable: true,
    options: [
      {
        name: 'Size',
        choices: [
          { id: 'small', name: 'Small (6")', priceAdjustment: 0 },
          { id: 'medium', name: 'Medium (8")', priceAdjustment: 3000 },
          { id: 'large', name: 'Large (10")', priceAdjustment: 6000 },
        ],
      },
      {
        name: 'Message',
        choices: [
          { id: 'none', name: 'No Message', priceAdjustment: 0 },
          { id: 'birthday', name: 'Happy Birthday', priceAdjustment: 500 },
          { id: 'custom', name: 'Custom Message', priceAdjustment: 1000 },
        ],
      },
    ],
  },
  {
    id: '2',
    name: 'Agege Bread',
    description: 'Authentic Nigerian Agege bread, soft and perfect for breakfast.',
    price: 1500,
    category: 'bread',
    image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?q=80&w=500&auto=format',
    featured: true,
  },
  {
    id: '3',
    name: 'Meat Pie',
    description: 'Savory Nigerian meat pie filled with seasoned minced meat, potatoes, and carrots.',
    price: 800,
    category: 'pies',
    image: 'https://images.unsplash.com/photo-1621743478914-cc8a68d76208?q=80&w=500&auto=format',
    featured: true,
  },
  {
    id: '4',
    name: 'Chin Chin',
    description: 'Crunchy, sweet Nigerian snack made from fried dough.',
    price: 1200,
    category: 'chinchin',
    image: 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?q=80&w=500&auto=format',
    options: [
      {
        name: 'Package Size',
        choices: [
          { id: 'small', name: 'Small Pack (250g)', priceAdjustment: 0 },
          { id: 'medium', name: 'Medium Pack (500g)', priceAdjustment: 1000 },
          { id: 'large', name: 'Large Pack (1kg)', priceAdjustment: 2200 },
        ],
      },
    ],
  },
  {
    id: '5',
    name: 'Chocolate Cupcakes',
    description: 'Moist chocolate cupcakes with rich chocolate frosting.',
    price: 3500,
    category: 'pastries',
    image: 'https://images.unsplash.com/photo-1576618148400-f54bed99fcfd?q=80&w=500&auto=format',
    options: [
      {
        name: 'Quantity',
        choices: [
          { id: '6pack', name: '6 Pack', priceAdjustment: 0 },
          { id: '12pack', name: '12 Pack', priceAdjustment: 3500 },
        ],
      },
    ],
  },
  {
    id: '6',
    name: 'Birthday Cake',
    description: 'Customizable celebration cake perfect for birthdays.',
    price: 15000,
    category: 'cakes',
    image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?q=80&w=500&auto=format',
    customizable: true,
    options: [
      {
        name: 'Flavor',
        choices: [
          { id: 'vanilla', name: 'Vanilla', priceAdjustment: 0 },
          { id: 'chocolate', name: 'Chocolate', priceAdjustment: 0 },
          { id: 'redvelvet', name: 'Red Velvet', priceAdjustment: 1000 },
          { id: 'carrot', name: 'Carrot', priceAdjustment: 1500 },
        ],
      },
      {
        name: 'Size',
        choices: [
          { id: 'small', name: 'Small (6")', priceAdjustment: 0 },
          { id: 'medium', name: 'Medium (8")', priceAdjustment: 5000 },
          { id: 'large', name: 'Large (10")', priceAdjustment: 10000 },
        ],
      },
    ],
  },
  {
    id: '7',
    name: 'Sausage Roll',
    description: 'Flaky pastry wrapped around a savory sausage filling.',
    price: 500,
    category: 'pies',
    image: 'https://images.unsplash.com/photo-1546548970-71785318a17b?q=80&w=500&auto=format',
  },
  {
    id: '8',
    name: 'Coconut Bread',
    description: 'Traditional Nigerian bread with coconut flavor.',
    price: 1800,
    category: 'bread',
    image: 'https://images.unsplash.com/photo-1608198093002-ad4e005484ec?q=80&w=500&auto=format',
  },
];

// Mock data services

export const getProducts = (): Promise<Product[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(products);
    }, 500);
  });
};

export const getProductById = (id: string): Promise<Product | undefined> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const product = products.find((p) => p.id === id);
      resolve(product);
    }, 300);
  });
};

export const getProductsByCategory = (categorySlug: string): Promise<Product[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const filteredProducts = products.filter((p) => p.category === categorySlug);
      resolve(filteredProducts);
    }, 500);
  });
};

export const getFeaturedProducts = (): Promise<Product[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const featuredProducts = products.filter((p) => p.featured);
      resolve(featuredProducts);
    }, 500);
  });
};

export const getCategories = (): Promise<Category[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(categories);
    }, 300);
  });
};
