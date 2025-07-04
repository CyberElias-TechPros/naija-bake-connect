
import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, Clock, Facebook, Instagram, Twitter } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-bakery-black text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* Company Info */}
          <div className="space-y-6">
            <div className="flex items-center space-x-3">
              <img 
                src="/lovable-uploads/4dda7e70-2eb0-4c8b-ae83-4b4c8b9a5b64.png" 
                alt="Fortune Cakes Logo" 
                className="h-10 w-auto"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                  e.currentTarget.nextElementSibling.style.display = 'block';
                }}
              />
              <div className="hidden font-heading">
                <span className="text-xl font-bold">Fortune</span>
                <span className="text-xl font-bold text-bakery-pink ml-1">Cakes</span>
              </div>
            </div>
            <p className="text-gray-300 leading-relaxed">
              Port Harcourt's premier bakery specializing in authentic Nigerian cakes, 
              pastries, and traditional baked goods. Fresh, quality ingredients delivered 
              with love across Rivers State.
            </p>
            
            {/* Social Media */}
            <div className="flex space-x-4">
              <a 
                href="#" 
                className="bg-gray-800 hover:bg-bakery-pink p-2 rounded-full transition-colors duration-300"
                aria-label="Follow us on Facebook"
              >
                <Facebook size={18} />
              </a>
              <a 
                href="#" 
                className="bg-gray-800 hover:bg-bakery-pink p-2 rounded-full transition-colors duration-300"
                aria-label="Follow us on Instagram"
              >
                <Instagram size={18} />
              </a>
              <a 
                href="#" 
                className="bg-gray-800 hover:bg-bakery-pink p-2 rounded-full transition-colors duration-300"
                aria-label="Follow us on Twitter"
              >
                <Twitter size={18} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-heading font-semibold mb-6">Quick Links</h3>
            <ul className="space-y-3">
              {[
                { name: 'Home', href: '/' },
                { name: 'Products', href: '/products' },
                { name: 'About Us', href: '/about' },
                { name: 'Contact', href: '/contact' },
                { name: 'My Account', href: '/account' },
                { name: 'Order Tracking', href: '/orders' }
              ].map((link) => (
                <li key={link.name}>
                  <Link 
                    to={link.href} 
                    className="text-gray-300 hover:text-bakery-pink transition-colors duration-300 flex items-center"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Product Categories */}
          <div>
            <h3 className="text-lg font-heading font-semibold mb-6">Our Specialties</h3>
            <ul className="space-y-3">
              {[
                'Wedding Cakes',
                'Birthday Cakes',
                'Small Chops Trays',
                'Meat Pies & Pastries',
                'Chin Chin & Snacks',
                'Fresh Bread',
                'Custom Orders'
              ].map((item) => (
                <li key={item}>
                  <span className="text-gray-300 hover:text-bakery-pink transition-colors duration-300 cursor-pointer">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-heading font-semibold mb-6">Contact Us</h3>
            <div className="space-y-4">
              
              {/* Address */}
              <div className="flex items-start space-x-3">
                <MapPin size={18} className="text-bakery-pink mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-gray-300">
                    NTA-Rumuokwuta Road<br />
                    Port Harcourt, Rivers State<br />
                    Nigeria
                  </p>
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-center space-x-3">
                <Phone size={18} className="text-bakery-pink flex-shrink-0" />
                <div>
                  <a 
                    href="tel:+2348031234567" 
                    className="text-gray-300 hover:text-bakery-pink transition-colors"
                  >
                    +234 (0) 803 123 4567
                  </a>
                  <br />
                  <a 
                    href="tel:+2349012345678" 
                    className="text-gray-300 hover:text-bakery-pink transition-colors text-sm"
                  >
                    +234 (0) 901 234 5678
                  </a>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-center space-x-3">
                <Mail size={18} className="text-bakery-pink flex-shrink-0" />
                <a 
                  href="mailto:orders@fortunecakes.ng" 
                  className="text-gray-300 hover:text-bakery-pink transition-colors"
                >
                  orders@fortunecakes.ng
                </a>
              </div>

              {/* Business Hours */}
              <div className="flex items-start space-x-3">
                <Clock size={18} className="text-bakery-pink mt-0.5 flex-shrink-0" />
                <div className="text-gray-300 text-sm">
                  <p className="font-medium mb-1">Business Hours:</p>
                  <p>Mon - Sat: 7:00 AM - 8:00 PM</p>
                  <p>Sunday: 10:00 AM - 6:00 PM</p>
                  <p className="text-bakery-pink mt-2">24/7 Online Orders</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Service Areas */}
        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="text-center mb-6">
            <h4 className="text-lg font-heading font-semibold mb-3">We Deliver To</h4>
            <p className="text-gray-300">
              <span className="text-bakery-pink font-medium">Port Harcourt Areas:</span> 
              {' '}Old GRA, New GRA, Trans-Amadi, Rumuola, Rumuokwuta, D-Line, Mile 1-4, Elekahia, Woji, Ada George, Oyigbo, and surrounding areas
            </p>
            <p className="text-gray-300 mt-2">
              <span className="text-bakery-pink font-medium">Rivers State:</span> 
              {' '}Obio-Akpor, Eleme, Ikwerre, Etche, and other LGAs (Special delivery available)
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-gray-400 text-sm">
              <p>&copy; {currentYear} Fortune Cakes. All rights reserved.</p>
              <p className="mt-1">Proudly serving Port Harcourt & Rivers State since 2020</p>
            </div>
            
            <div className="flex flex-wrap items-center space-x-6 text-sm">
              <Link to="/privacy" className="text-gray-400 hover:text-bakery-pink transition-colors">
                Privacy Policy
              </Link>
              <Link to="/terms" className="text-gray-400 hover:text-bakery-pink transition-colors">
                Terms of Service
              </Link>
              <Link to="/shipping" className="text-gray-400 hover:text-bakery-pink transition-colors">
                Shipping Info
              </Link>
              <Link to="/faq" className="text-gray-400 hover:text-bakery-pink transition-colors">
                FAQ
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
