
import { useEffect, useState } from 'react';
import { Product } from '@/types';
import { getFeaturedProducts } from '@/data/mockData';
import ProductCard from './ProductCard';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const FeaturedProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const featuredProducts = await getFeaturedProducts();
        setProducts(featuredProducts);
      } catch (error) {
        console.error('Failed to load featured products:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadProducts();
  }, []);

  if (isLoading) {
    return (
      <div className="py-12 text-center">
        <div className="animate-pulse flex flex-col items-center">
          <div className="h-8 w-64 bg-gray-200 rounded mb-8"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-6xl">
            {[1, 2, 3].map((item) => (
              <div key={item} className="bg-gray-100 rounded-lg overflow-hidden shadow">
                <div className="h-64 bg-gray-200"></div>
                <div className="p-4">
                  <div className="h-6 bg-gray-200 rounded w-3/4 mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <section className="section-padding bg-muted">
      <div className="container mx-auto">
        <h2 className="text-3xl md:text-4xl font-heading font-bold text-center mb-2">
          Featured Products
        </h2>
        <p className="text-center text-muted-foreground mb-8 max-w-2xl mx-auto">
          Discover our most popular baked goods, freshly made with premium ingredients for your enjoyment.
        </p>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        
        <div className="text-center">
          <Link to="/products">
            <Button className="bg-bakery-brown text-white hover:bg-bakery-brown-light">
              View All Products
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
