
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingBag, Menu, X, User, Phone, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/hooks/useCart';
import { useAuth } from '@/hooks/useAuth';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { totalItems } = useCart();
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Products', path: '/products' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <span className="font-heading text-2xl font-bold text-bakery-black">
              Fortune<span className="text-bakery-pink">Cakes</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className="font-medium text-bakery-black-light hover:text-bakery-pink transition-colors"
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Phone Number */}
          <div className="hidden md:flex items-center mr-4">
            <a href="tel:+2347069126887" className="flex items-center text-bakery-black-light hover:text-bakery-pink">
              <Phone size={16} className="mr-2" />
              <span>+234 706 912 6887</span>
            </a>
          </div>

          {/* Action Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="rounded-full">
                    <User size={20} className="text-bakery-black-light" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => navigate('/account')}>
                    My Account
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => navigate('/orders')}>
                    My Orders
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleSignOut}>
                    <LogOut className="mr-2 h-4 w-4" />
                    Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link to="/auth" className="p-2 rounded-full hover:bg-muted transition-colors">
                <User size={20} className="text-bakery-black-light" />
              </Link>
            )}
            <Link to="/cart" className="relative p-2 rounded-full hover:bg-muted transition-colors">
              <ShoppingBag size={20} className="text-bakery-black-light" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-bakery-pink text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <Link to="/cart" className="relative p-2 mr-2">
              <ShoppingBag size={20} className="text-bakery-black-light" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-bakery-pink text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </Link>
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleMenu}
              className="p-2"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <X size={24} className="text-bakery-black-light" />
              ) : (
                <Menu size={24} className="text-bakery-black-light" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden pt-4 pb-3 border-t mt-3">
            <div className="flex flex-col space-y-3">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className="px-3 py-2 font-medium text-bakery-black-light hover:bg-muted rounded"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
              {user ? (
                <>
                  <Link
                    to="/account"
                    className="px-3 py-2 font-medium text-bakery-black-light hover:bg-muted rounded flex items-center"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <User size={18} className="mr-2" /> My Account
                  </Link>
                  <Link
                    to="/orders"
                    className="px-3 py-2 font-medium text-bakery-black-light hover:bg-muted rounded flex items-center"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Orders
                  </Link>
                  <button
                    onClick={() => {
                      handleSignOut();
                      setIsMenuOpen(false);
                    }}
                    className="px-3 py-2 font-medium text-bakery-black-light hover:bg-muted rounded flex items-center w-full text-left"
                  >
                    <LogOut size={18} className="mr-2" /> Sign Out
                  </button>
                </>
              ) : (
                <Link
                  to="/auth"
                  className="px-3 py-2 font-medium text-bakery-black-light hover:bg-muted rounded flex items-center"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <User size={18} className="mr-2" /> Sign In
                </Link>
              )}
              <a
                href="tel:+2347069126887"
                className="px-3 py-2 font-medium text-bakery-black-light hover:bg-muted rounded flex items-center"
              >
                <Phone size={18} className="mr-2" /> +234 706 912 6887
              </a>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
