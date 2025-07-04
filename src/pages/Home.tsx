
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import FeaturedProducts from '@/components/products/FeaturedProducts';
import MainLayout from '@/components/layout/MainLayout';
import { fetchCategories } from '@/services/supabaseService';
import { Category } from '@/types';

const Home = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Set page title and meta description for SEO
    document.title = 'Fortune Cakes - Premium Nigerian Bakery in Port Harcourt | Fresh Cakes & Pastries';
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Fortune Cakes offers fresh Nigerian baked goods in Port Harcourt. Order wedding cakes, birthday cakes, meat pies, chin chin, small chops and more. Fast delivery across Rivers State.');
    } else {
      const newMeta = document.createElement('meta');
      newMeta.name = 'description';
      newMeta.content = 'Fortune Cakes offers fresh Nigerian baked goods in Port Harcourt. Order wedding cakes, birthday cakes, meat pies, chin chin, small chops and more. Fast delivery across Rivers State.';
      document.head.appendChild(newMeta);
    }

    const loadCategories = async () => {
      try {
        setIsLoading(true);
        const data = await fetchCategories();
        // Only display the first 4 categories on the home page
        setCategories(data.slice(0, 4));
      } catch (error) {
        console.error('Error loading categories:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadCategories();
  }, []);

  return (
    <MainLayout>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-bakery-black to-bakery-black-light text-white overflow-hidden">
        <div className="container mx-auto px-4 py-16 md:py-24 flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 z-10">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-heading mb-4">
              Fortune Cakes<br />
              <span className="text-bakery-pink">Port Harcourt's</span><br />
              Premium Bakery
            </h1>
            <p className="text-lg mb-8 max-w-md leading-relaxed">
              Discover the finest selection of freshly baked cakes, bread, pastries, 
              chin chin, small chops, and traditional Nigerian treats delivered right 
              to your doorstep across Port Harcourt and Rivers State.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/products">
                <Button size="lg" className="bg-bakery-pink hover:bg-bakery-pink-dark text-white shadow-lg hover:shadow-xl transition-all duration-300">
                  Shop Now <ArrowRight size={16} className="ml-2" />
                </Button>
              </Link>
              <Link to="/about">
                <Button variant="outline" size="lg" className="bg-transparent border-white text-white hover:bg-white hover:text-bakery-black transition-all duration-300">
                  About Us
                </Button>
              </Link>
            </div>
          </div>
          <div className="md:w-1/2 mt-10 md:mt-0">
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1586788680434-30d324b2d46f?q=80&w=800&auto=format"
                alt="Fortune Cakes - Premium Nigerian bakery products" 
                className="rounded-lg shadow-xl z-10 relative transform md:translate-x-12 animate-float"
                style={{maxHeight: '500px', objectFit: 'cover'}}
                loading="eager"
              />
              <div className="absolute inset-0 bg-bakery-pink rounded-lg transform translate-x-4 translate-y-4 -z-10 opacity-80"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Product Categories */}
      <section className="section-padding" id="categories">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-center mb-4">
            Explore Our Categories
          </h2>
          <p className="text-center text-muted-foreground mb-10 max-w-2xl mx-auto">
            Browse through our wide selection of freshly baked Nigerian delicacies, 
            made daily with premium ingredients in Port Harcourt
          </p>
          
          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[1, 2, 3, 4].map((item) => (
                <div key={item} className="aspect-square rounded-lg bg-gray-200 animate-pulse"></div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {categories.map((category) => (
                <Link 
                  to={`/products?category=${category.slug}`} 
                  key={category.id}
                  className="group relative overflow-hidden rounded-lg card-hover shadow-md hover:shadow-xl transition-all duration-300"
                  aria-label={`Browse ${category.name} products`}
                >
                  <div className="aspect-square">
                    <img 
                      src={category.image} 
                      alt={`${category.name} - Fortune Cakes`} 
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                    <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                      <h3 className="text-xl font-heading font-semibold">{category.name}</h3>
                      <span className="flex items-center text-sm mt-1 opacity-80 group-hover:opacity-100 transition-opacity">
                        Shop Now <ChevronRight size={16} className="ml-1 group-hover:ml-2 transition-all" />
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Featured Products Section */}
      <FeaturedProducts />

      {/* Why Choose Us Section */}
      <section className="section-padding bg-bakery-white-cream" id="why-choose-us">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-center mb-4 text-bakery-black">
            Why Choose Fortune Cakes
          </h2>
          <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
            At Fortune Cakes, we pride ourselves on quality, tradition, and exceptional 
            service throughout Port Harcourt and Rivers State
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                title: 'Fresh & Authentic',
                description: 'All our products are freshly baked daily using authentic Nigerian recipes and traditional techniques passed down through generations.',
                icon: '🥖'
              },
              {
                title: 'Quality Ingredients',
                description: 'We source the finest local ingredients from trusted suppliers to ensure premium quality and authentic taste in every bite.',
                icon: '🌾'
              },
              {
                title: 'Custom Orders',
                description: 'Personalize your cakes and pastries for weddings, birthdays, engagements, and other special occasions with our expert decorators.',
                icon: '🎂'
              },
              {
                title: 'Fast Delivery',
                description: 'We deliver across Port Harcourt and Rivers State, ensuring your baked goods arrive fresh, on time, and in perfect condition.',
                icon: '🚚'
              }
            ].map((feature, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 text-center">
                <div className="text-4xl mb-4" role="img" aria-label={feature.title}>{feature.icon}</div>
                <h3 className="text-xl font-heading font-semibold text-bakery-black mb-2">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Service Areas Section */}
      <section className="py-16 bg-gradient-to-r from-bakery-pink to-bakery-pink-dark text-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">
              Serving Port Harcourt & Beyond
            </h2>
            <p className="text-lg max-w-2xl mx-auto leading-relaxed">
              Fortune Cakes proudly serves customers across Port Harcourt and Rivers State. 
              From NTA-Rumuokwuta Road to every corner of the city, we bring fresh Nigerian delicacies to your doorstep.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="bg-white/10 p-6 rounded-lg backdrop-blur-sm">
              <h3 className="text-xl font-semibold mb-2">Port Harcourt City</h3>
              <p className="opacity-90">Fast delivery within 2-4 hours</p>
            </div>
            <div className="bg-white/10 p-6 rounded-lg backdrop-blur-sm">
              <h3 className="text-xl font-semibold mb-2">Rivers State</h3>
              <p className="opacity-90">Same-day delivery available</p>
            </div>
            <div className="bg-white/10 p-6 rounded-lg backdrop-blur-sm">
              <h3 className="text-xl font-semibold mb-2">Special Events</h3>
              <p className="opacity-90">Catering for weddings & parties</p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-bakery-black text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">
            Ready to Order from Port Harcourt's Best Bakery?
          </h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto leading-relaxed">
            Place your order now and enjoy the authentic taste of Nigerian baked goods 
            delivered fresh to your doorstep in Port Harcourt and Rivers State.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/products">
              <Button size="lg" className="bg-bakery-pink hover:bg-bakery-pink-dark text-white shadow-lg hover:shadow-xl transition-all duration-300">
                Start Shopping
              </Button>
            </Link>
            <Link to="/contact">
              <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-bakery-black transition-all duration-300">
                Contact Us
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </MainLayout>
  );
};

export default Home;
