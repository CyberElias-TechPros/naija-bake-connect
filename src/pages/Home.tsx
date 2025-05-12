
import { Link } from 'react-router-dom';
import { ArrowRight, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import FeaturedProducts from '@/components/products/FeaturedProducts';
import MainLayout from '@/components/layout/MainLayout';

const Home = () => {
  const categories = [
    { name: 'Cakes', image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?q=80&w=500&auto=format', path: '/products?category=cakes' },
    { name: 'Bread', image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?q=80&w=500&auto=format', path: '/products?category=bread' },
    { name: 'Pastries', image: 'https://images.unsplash.com/photo-1576618148400-f54bed99fcfd?q=80&w=500&auto=format', path: '/products?category=pastries' },
    { name: 'Pies & Snacks', image: 'https://images.unsplash.com/photo-1621743478914-cc8a68d76208?q=80&w=500&auto=format', path: '/products?category=pies' },
  ];

  return (
    <MainLayout>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-bakery-brown to-bakery-brown-light text-white">
        <div className="container mx-auto px-4 py-16 md:py-24 flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 z-10">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-heading mb-4">
              Authentic Nigerian<br />Baked Goodness
            </h1>
            <p className="text-lg mb-8 max-w-md">
              Discover the finest selection of freshly baked cakes, bread, pastries, 
              and traditional Nigerian treats delivered right to your doorstep.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/products">
                <Button size="lg" className="bg-bakery-orange hover:bg-opacity-90 text-white">
                  Shop Now <ArrowRight size={16} className="ml-2" />
                </Button>
              </Link>
              <Link to="/about">
                <Button variant="outline" size="lg" className="bg-transparent border-white text-white hover:bg-white hover:text-bakery-brown">
                  About Us
                </Button>
              </Link>
            </div>
          </div>
          <div className="md:w-1/2 mt-10 md:mt-0">
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1586788680434-30d324b2d46f?q=80&w=800&auto=format"
                alt="Delicious cake" 
                className="rounded-lg shadow-xl z-10 relative transform md:translate-x-12 animate-float"
                style={{maxHeight: '500px', objectFit: 'cover'}}
              />
              <div className="absolute inset-0 bg-bakery-orange rounded-lg transform translate-x-4 translate-y-4 -z-10"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Product Categories */}
      <section className="section-padding">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-center mb-4">
            Explore Our Categories
          </h2>
          <p className="text-center text-muted-foreground mb-10 max-w-2xl mx-auto">
            Browse through our wide selection of freshly baked Nigerian delicacies
          </p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((category) => (
              <Link 
                to={category.path} 
                key={category.name}
                className="group relative overflow-hidden rounded-lg card-hover"
              >
                <div className="aspect-square">
                  <img 
                    src={category.image} 
                    alt={category.name} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
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
        </div>
      </section>

      {/* Featured Products Section */}
      <FeaturedProducts />

      {/* Why Choose Us Section */}
      <section className="section-padding bg-bakery-cream">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-center mb-4 text-bakery-brown">
            Why Choose Us
          </h2>
          <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
            At NaijaBakeConnect, we pride ourselves on quality, tradition, and exceptional service
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                title: 'Fresh & Authentic',
                description: 'All our products are freshly baked daily using authentic Nigerian recipes and techniques.',
                icon: '🥖'
              },
              {
                title: 'Quality Ingredients',
                description: 'We source the finest local ingredients to ensure premium quality in every bite.',
                icon: '🌾'
              },
              {
                title: 'Custom Orders',
                description: 'Personalize your cakes and pastries for special occasions and celebrations.',
                icon: '🎂'
              },
              {
                title: 'Fast Delivery',
                description: 'We deliver across Lagos, ensuring your baked goods arrive fresh and on time.',
                icon: '🚚'
              }
            ].map((feature, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-md text-center">
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-heading font-semibold text-bakery-brown mb-2">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-bakery-orange text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">
            Ready to Order?
          </h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto">
            Place your order now and enjoy the authentic taste of Nigerian baked goods delivered to your doorstep.
          </p>
          <Link to="/products">
            <Button size="lg" className="bg-white text-bakery-orange hover:bg-gray-100">
              Start Shopping
            </Button>
          </Link>
        </div>
      </section>
    </MainLayout>
  );
};

export default Home;
