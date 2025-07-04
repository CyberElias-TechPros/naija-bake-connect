
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ShoppingBag, User, Search, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/hooks/useCart';
import { useAuth } from '@/hooks/useAuth';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const { getTotalItems } = useCart();
  const { user, logout } = useAuth();
  const totalItems = getTotalItems();

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      setScrolled(isScrolled);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  const isActivePath = (path: string) => {
    return location.pathname === path;
  };

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Products', href: '/products' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled 
        ? 'bg-white/95 backdrop-blur-md shadow-lg' 
        : 'bg-white/90 backdrop-blur-sm'
    }`}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 lg:h-20">
          
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 hover:opacity-80 transition-opacity" onClick={closeMenu}>
            <img 
              src="/lovable-uploads/4dda7e70-2eb0-4c8b-ae83-4b4c8b9a5b64.png" 
              alt="Fortune Cakes Logo" 
              className="h-10 w-auto lg:h-12"
              onError={(e) => {
                // Fallback if logo fails to load
                e.currentTarget.style.display = 'none';
                e.currentTarget.nextElementSibling.style.display = 'block';
              }}
            />
            <div className="hidden font-heading">
              <span className="text-xl lg:text-2xl font-bold text-bakery-black">Fortune</span>
              <span className="text-xl lg:text-2xl font-bold text-bakery-pink ml-1">Cakes</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                className={`text-sm font-medium transition-colors hover:text-bakery-pink ${
                  isActivePath(link.href) 
                    ? 'text-bakery-pink border-b-2 border-bakery-pink pb-1' 
                    : 'text-gray-700'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-4">
            
            {/* Contact Info - Desktop Only */}
            <div className="hidden xl:flex items-center space-x-2 text-sm text-gray-600">
              <Phone size={16} className="text-bakery-pink" />
              <span>+234 (0) 803 123 4567</span>
            </div>

            {/* Search Button - Hidden on mobile for space */}
            <Link to="/products" className="hidden sm:block">
              <Button variant="ghost" size="sm" className="hover:bg-bakery-pink/10">
                <Search size={18} />
              </Button>
            </Link>

            {/* Cart */}
            <Link to="/cart" className="relative">
              <Button 
                variant="ghost" 
                size="sm" 
                className="hover:bg-bakery-pink/10 relative"
                aria-label={`Shopping cart with ${totalItems} items`}
              >
                <ShoppingBag size={18} />
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 bg-bakery-pink text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium">
                    {totalItems > 99 ? '99+' : totalItems}
                  </span>
                )}
              </Button>
            </Link>

            {/* User Account */}
            <div className="relative">
              {user ? (
                <div className="hidden sm:flex items-center space-x-2">
                  <Link to="/account">
                    <Button variant="ghost" size="sm" className="hover:bg-bakery-pink/10">
                      <User size={18} />
                    </Button>
                  </Link>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={logout}
                    className="text-xs hover:bg-red-50 hover:text-red-600"
                  >
                    Logout
                  </Button>
                </div>
              ) : (
                <Link to="/auth" className="hidden sm:block">
                  <Button variant="ghost" size="sm" className="hover:bg-bakery-pink/10">
                    <User size={18} />
                  </Button>
                </Link>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={toggleMenu}
              className="lg:hidden p-2 rounded-md hover:bg-gray-100 transition-colors"
              aria-label="Toggle mobile menu"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isOpen && (
          <div className="lg:hidden absolute top-full left-0 right-0 bg-white border-t shadow-lg">
            <div className="container mx-auto px-4 py-4">
              <div className="flex flex-col space-y-4">
                
                {/* Navigation Links */}
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    to={link.href}
                    onClick={closeMenu}
                    className={`text-base font-medium py-2 px-3 rounded-md transition-colors ${
                      isActivePath(link.href)
                        ? 'text-bakery-pink bg-bakery-pink/10'
                        : 'text-gray-700 hover:text-bakery-pink hover:bg-gray-50'
                    }`}
                  >
                    {link.name}
                  </Link>
                ))}
                
                {/* Mobile-only items */}
                <div className="border-t pt-4 mt-4">
                  <Link
                    to="/products"
                    onClick={closeMenu}
                    className="flex items-center space-x-2 text-gray-700 hover:text-bakery-pink py-2 px-3 rounded-md transition-colors"
                  >
                    <Search size={18} />
                    <span>Search Products</span>
                  </Link>
                  
                  {user ? (
                    <>
                      <Link
                        to="/account"
                        onClick={closeMenu}
                        className="flex items-center space-x-2 text-gray-700 hover:text-bakery-pink py-2 px-3 rounded-md transition-colors"
                      >
                        <User size={18} />
                        <span>My Account</span>
                      </Link>
                      <button
                        onClick={() => {
                          logout();
                          closeMenu();
                        }}
                        className="flex items-center space-x-2 text-red-600 hover:bg-red-50 py-2 px-3 rounded-md transition-colors w-full text-left"
                      >
                        <span>Logout</span>
                      </button>
                    </>
                  ) : (
                    <Link
                      to="/auth"
                      onClick={closeMenu}
                      className="flex items-center space-x-2 text-gray-700 hover:text-bakery-pink py-2 px-3 rounded-md transition-colors"
                    >
                      <User size={18} />
                      <span>Login / Register</span>
                    </Link>
                  )}
                  
                  {/* Contact Info */}
                  <div className="flex items-center space-x-2 text-gray-600 py-2 px-3">
                    <Phone size={16} className="text-bakery-pink" />
                    <span className="text-sm">+234 (0) 803 123 4567</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
