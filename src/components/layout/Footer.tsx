
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-bakery-black text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo and About */}
          <div className="space-y-4">
            <h3 className="font-heading text-2xl font-bold">
              Fortune<span className="text-bakery-pink">Cakes</span>
            </h3>
            <p className="text-sm text-white/80">
              Bringing the finest Nigerian baked goods to your doorstep. We specialize in 
              delicious cakes, pastries, bread, and traditional Nigerian baked treats.
            </p>
            <div className="flex space-x-4 pt-2">
              <a href="#" className="hover:text-bakery-pink transition-colors" aria-label="Facebook">
                <Facebook size={20} />
              </a>
              <a href="#" className="hover:text-bakery-pink transition-colors" aria-label="Instagram">
                <Instagram size={20} />
              </a>
              <a href="#" className="hover:text-bakery-pink transition-colors" aria-label="Twitter">
                <Twitter size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 font-heading">Quick Links</h3>
            <ul className="space-y-2">
              {[
                { name: 'Home', path: '/' },
                { name: 'Products', path: '/products' },
                { name: 'About Us', path: '/about' },
                { name: 'Contact', path: '/contact' },
                { name: 'My Account', path: '/account' },
              ].map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="text-white/80 hover:text-bakery-pink transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-lg font-semibold mb-4 font-heading">Product Categories</h3>
            <ul className="space-y-2">
              {[
                { name: 'Cakes', path: '/products?category=cakes' },
                { name: 'Bread', path: '/products?category=bread' },
                { name: 'Pastries', path: '/products?category=pastries' },
                { name: 'Chin Chin', path: '/products?category=chinchin' },
                { name: 'Pies & Snacks', path: '/products?category=pies' },
              ].map((category) => (
                <li key={category.name}>
                  <Link
                    to={category.path}
                    className="text-white/80 hover:text-bakery-pink transition-colors"
                  >
                    {category.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4 font-heading">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MapPin size={18} className="mr-2 mt-1 flex-shrink-0" />
                <span className="text-white/80">123 Bakery Street, Lagos, Nigeria</span>
              </li>
              <li className="flex items-center">
                <Phone size={18} className="mr-2 flex-shrink-0" />
                <a href="tel:+2347069126887" className="text-white/80 hover:text-bakery-pink transition-colors">
                  +234 706 912 6887
                </a>
              </li>
              <li className="flex items-center">
                <Mail size={18} className="mr-2 flex-shrink-0" />
                <a href="mailto:fortunecakes@techpros.com.ng" className="text-white/80 hover:text-bakery-pink transition-colors">
                  fortunecakes@techpros.com.ng
                </a>
              </li>
              <li className="pt-2">
                <p className="text-white/80">
                  <span className="font-semibold">Hours:</span> Mon-Fri: 8am - 8pm<br />
                  Sat-Sun: 9am - 6pm
                </p>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/20 mt-8 pt-6 text-center text-sm text-white/70">
          <p>&copy; {currentYear} Fortune Cakes. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
