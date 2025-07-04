
import MainLayout from '@/components/layout/MainLayout';
import { ChefHat, Award, Users, Heart, Clock, MapPin } from 'lucide-react';
import { useEffect } from 'react';

const About = () => {
  useEffect(() => {
    document.title = 'About Fortune Cakes - Premium Nigerian Bakery in Port Harcourt';
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Learn about Fortune Cakes, Port Harcourt\'s premier bakery. Our story, mission, and commitment to delivering fresh Nigerian baked goods across Rivers State.');
    }
  }, []);

  const stats = [
    { icon: Users, label: 'Happy Customers', value: '5,000+' },
    { icon: ChefHat, label: 'Years of Experience', value: '4+' },
    { icon: Award, label: 'Products Available', value: '50+' },
    { icon: Heart, label: 'Five Star Reviews', value: '500+' }
  ];

  const team = [
    {
      name: 'Chef Adaora Okoro',
      role: 'Head Baker & Founder',
      image: 'https://images.unsplash.com/photo-1559548331-f9cb98001426?q=80&w=400&auto=format',
      description: 'With over 10 years of baking experience, Chef Adaora brings authentic Nigerian flavors to every creation.'
    },
    {
      name: 'James Eze',
      role: 'Pastry Specialist',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&auto=format',
      description: 'Master of traditional Nigerian pastries and small chops, ensuring every bite is perfect.'
    },
    {
      name: 'Grace Nwankwo',
      role: 'Cake Decorator',
      image: 'https://images.unsplash.com/photo-1494790108755-2616b612b1b8?q=80&w=400&auto=format',
      description: 'Creative artist who transforms cakes into beautiful masterpieces for your special occasions.'
    }
  ];

  return (
    <MainLayout>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-bakery-pink to-bakery-pink-dark text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-heading font-bold mb-6">
              About Fortune Cakes
            </h1>
            <p className="text-xl leading-relaxed">
              Port Harcourt's premier bakery, dedicated to bringing you the finest Nigerian 
              baked goods with authentic flavors, quality ingredients, and exceptional service 
              since 2020.
            </p>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-heading font-bold mb-6 text-bakery-black">
                Our Story
              </h2>
              <div className="prose prose-lg text-gray-700 space-y-4">
                <p>
                  Fortune Cakes began as a dream in 2020, right here in the heart of Port Harcourt, 
                  Rivers State. Founded by Chef Adaora Okoro, a passionate baker with deep roots 
                  in traditional Nigerian cuisine, our bakery was born from a desire to share 
                  authentic Nigerian flavors with our community.
                </p>
                <p>
                  What started as a small home-based operation on NTA-Rumuokwuta Road has grown 
                  into Port Harcourt's most trusted bakery, serving thousands of satisfied 
                  customers across Rivers State. We believe that every occasion deserves 
                  exceptional baked goods, whether it's a grand wedding cake or simple chin chin 
                  for an afternoon snack.
                </p>
                <p>
                  Our commitment to quality, authenticity, and community has made us a household 
                  name in Port Harcourt. Every day, we wake up excited to create delicious 
                  memories for our customers, one baked good at a time.
                </p>
              </div>
            </div>
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?q=80&w=800&auto=format" 
                alt="Fortune Cakes bakery interior in Port Harcourt"
                className="rounded-lg shadow-xl w-full h-auto"
              />
              <div className="absolute inset-0 bg-bakery-pink/20 rounded-lg"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 bg-bakery-white-cream">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="bg-white p-8 rounded-lg shadow-md">
              <div className="flex items-center mb-6">
                <Heart className="text-bakery-pink mr-3" size={32} />
                <h3 className="text-2xl font-heading font-bold text-bakery-black">Our Mission</h3>
              </div>
              <p className="text-gray-700 leading-relaxed">
                To preserve and celebrate Nigerian baking traditions while delivering exceptional 
                quality and service to every customer in Port Harcourt and Rivers State. We strive 
                to make every celebration special with our authentic, freshly-baked goods that 
                bring families and communities together.
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-lg shadow-md">
              <div className="flex items-center mb-6">
                <Award className="text-bakery-pink mr-3" size={32} />
                <h3 className="text-2xl font-heading font-bold text-bakery-black">Our Vision</h3>
              </div>
              <p className="text-gray-700 leading-relaxed">
                To become the leading Nigerian bakery brand, known throughout West Africa for 
                our commitment to quality, authenticity, and innovation. We envision a future 
                where Fortune Cakes is synonymous with celebration, tradition, and the very 
                best of Nigerian baking heritage.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-center mb-12 text-bakery-black">
            Fortune Cakes by the Numbers
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => {
              const IconComponent = stat.icon;
              return (
                <div key={index} className="text-center">
                  <div className="bg-bakery-pink/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <IconComponent className="text-bakery-pink" size={28} />
                  </div>
                  <div className="text-2xl md:text-3xl font-bold text-bakery-black mb-2">
                    {stat.value}
                  </div>
                  <p className="text-gray-600 text-sm md:text-base">{stat.label}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-16 bg-bakery-white-cream">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-center mb-12 text-bakery-black">
            What We Stand For
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="bg-bakery-pink/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <ChefHat className="text-bakery-pink" size={28} />
              </div>
              <h3 className="text-xl font-heading font-semibold mb-3 text-bakery-black">Quality First</h3>
              <p className="text-gray-700">
                We use only the finest ingredients sourced locally and internationally, 
                ensuring every product meets our high standards of excellence.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="bg-bakery-pink/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="text-bakery-pink" size={28} />
              </div>
              <h3 className="text-xl font-heading font-semibold mb-3 text-bakery-black">Community Focus</h3>
              <p className="text-gray-700">
                As a proud Port Harcourt business, we're committed to serving our community 
                and contributing to the growth of Rivers State's economy.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="bg-bakery-pink/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="text-bakery-pink" size={28} />
              </div>
              <h3 className="text-xl font-heading font-semibold mb-3 text-bakery-black">Made with Love</h3>
              <p className="text-gray-700">
                Every cake, pastry, and snack is crafted with genuine care and passion, 
                because we believe love is the most important ingredient.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Team */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-center mb-12 text-bakery-black">
            Meet Our Team
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                <img 
                  src={member.image} 
                  alt={member.name}
                  className="w-full h-64 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-heading font-semibold mb-2 text-bakery-black">
                    {member.name}
                  </h3>
                  <p className="text-bakery-pink font-medium mb-3">{member.role}</p>
                  <p className="text-gray-700 text-sm leading-relaxed">{member.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Location & Contact */}
      <section className="py-16 bg-bakery-black text-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-heading font-bold mb-6">
                Visit Our Bakery
              </h2>
              <p className="text-gray-300 mb-6 leading-relaxed">
                Located in the heart of Port Harcourt on NTA-Rumuokwuta Road, our bakery 
                welcomes you with the aroma of freshly baked goods and warm Nigerian hospitality. 
                Come experience the Fortune Cakes difference in person.
              </p>
              
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <MapPin className="text-bakery-pink mt-1 flex-shrink-0" size={20} />
                  <div>
                    <p className="font-medium">Address</p>
                    <p className="text-gray-300">
                      NTA-Rumuokwuta Road<br />
                      Port Harcourt, Rivers State, Nigeria
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <Clock className="text-bakery-pink mt-1 flex-shrink-0" size={20} />
                  <div>
                    <p className="font-medium">Opening Hours</p>
                    <p className="text-gray-300">
                      Monday - Saturday: 7:00 AM - 8:00 PM<br />
                      Sunday: 10:00 AM - 6:00 PM
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1517457373958-b7bdd4587205?q=80&w=800&auto=format" 
                alt="Fortune Cakes storefront in Port Harcourt"
                className="rounded-lg shadow-xl w-full h-auto"
              />
              <div className="absolute inset-0 bg-bakery-pink/20 rounded-lg"></div>
            </div>
          </div>
        </div>
      </section>
    </MainLayout>
  );
};

export default About;
