
import { Link } from 'react-router-dom';
import { ShoppingBag, Star, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { formatCurrency } from '@/utils/format';
import { Product } from '@/types';
import { useCart } from '@/hooks/useCart';
import { useState } from 'react';

interface ProductCardProps {
  product: Product;
  viewMode?: 'grid' | 'list';
}

const ProductCard = ({ product, viewMode = 'grid' }: ProductCardProps) => {
  const { addItem } = useCart();
  const [isAdding, setIsAdding] = useState(false);

  const handleQuickAdd = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (product.customizable) {
      // For customizable products, redirect to product detail page
      return;
    }
    
    setIsAdding(true);
    try {
      addItem({
        productId: product.id,
        quantity: 1,
        selectedOptions: {},
        price: product.price
      });
    } finally {
      setIsAdding(false);
    }
  };

  if (viewMode === 'list') {
    return (
      <Link to={`/products/${product.id}`} className="group">
        <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden border border-gray-100">
          <div className="flex flex-col md:flex-row">
            {/* Image */}
            <div className="md:w-64 flex-shrink-0 relative overflow-hidden">
              <img 
                src={product.image} 
                alt={product.name}
                className="w-full h-48 md:h-full object-cover group-hover:scale-105 transition-transform duration-300"
                loading="lazy"
              />
              {product.featured && (
                <Badge className="absolute top-2 left-2 bg-bakery-pink text-white">
                  Featured
                </Badge>
              )}
            </div>
            
            {/* Content */}
            <div className="flex-1 p-6 flex flex-col justify-between">
              <div>
                <div className="flex items-start justify-between mb-2">
                  <h3 className="text-xl font-heading font-semibold text-bakery-black group-hover:text-bakery-pink transition-colors line-clamp-2">
                    {product.name}
                  </h3>
                  <div className="text-right ml-4">
                    <div className="text-2xl font-bold text-bakery-pink">
                      {formatCurrency(product.price)}
                    </div>
                    {product.customizable && (
                      <div className="text-xs text-gray-500">Starting from</div>
                    )}
                  </div>
                </div>
                
                <p className="text-gray-600 text-sm mb-4 line-clamp-3 leading-relaxed">
                  {product.description}
                </p>
                
                <div className="flex items-center space-x-4 mb-4">
                  <div className="flex items-center space-x-1">
                    <Star className="text-yellow-400 fill-current" size={16} />
                    <span className="text-sm font-medium">4.8</span>
                    <span className="text-xs text-gray-500">(24 reviews)</span>
                  </div>
                  {product.customizable && (
                    <Badge variant="outline" className="text-xs">
                      Customizable
                    </Badge>
                  )}
                </div>
              </div>
              
              <div className="flex items-center justify-between pt-4 border-t">
                <Link 
                  to={`/products/${product.id}`}
                  className="flex items-center text-bakery-pink hover:text-bakery-pink-dark transition-colors"
                >
                  <Eye size={16} className="mr-1" />
                  <span className="text-sm font-medium">View Details</span>
                </Link>
                
                <Button
                  onClick={handleQuickAdd}
                  disabled={isAdding}
                  className="bg-bakery-pink hover:bg-bakery-pink-dark text-white px-6"
                  size="sm"
                >
                  {isAdding ? (
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  ) : (
                    <ShoppingBag size={16} className="mr-2" />
                  )}
                  {product.customizable ? 'Customize' : 'Add to Cart'}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Link>
    );
  }

  // Grid view (default)
  return (
    <Link to={`/products/${product.id}`} className="group">
      <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden border border-gray-100">
        {/* Image */}
        <div className="relative overflow-hidden aspect-square">
          <img 
            src={product.image} 
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            loading="lazy"
          />
          {product.featured && (
            <Badge className="absolute top-2 left-2 bg-bakery-pink text-white">
              Featured
            </Badge>
          )}
          
          {/* Hover overlay */}
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
            <div className="flex space-x-2">
              <Button
                onClick={handleQuickAdd}
                disabled={isAdding}
                className="bg-white/90 hover:bg-white text-bakery-black px-4 py-2"
                size="sm"
              >
                {isAdding ? (
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-bakery-pink"></div>
                ) : (
                  <>
                    <ShoppingBag size={16} className="mr-2" />
                    {product.customizable ? 'Customize' : 'Quick Add'}
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
        
        {/* Content */}
        <div className="p-4">
          <h3 className="text-lg font-heading font-semibold text-bakery-black group-hover:text-bakery-pink transition-colors mb-2 line-clamp-2">
            {product.name}
          </h3>
          
          <p className="text-gray-600 text-sm mb-3 line-clamp-2 leading-relaxed">
            {product.description}
          </p>
          
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-1">
              <Star className="text-yellow-400 fill-current" size={14} />
              <span className="text-sm font-medium">4.8</span>
              <span className="text-xs text-gray-500">(24)</span>
            </div>
            {product.customizable && (
              <Badge variant="outline" className="text-xs">
                Customizable
              </Badge>
            )}
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <div className="text-xl font-bold text-bakery-pink">
                {formatCurrency(product.price)}
              </div>
              {product.customizable && (
                <div className="text-xs text-gray-500">Starting from</div>
              )}
            </div>
            
            <Button
              onClick={handleQuickAdd}
              disabled={isAdding}
              variant="outline"
              size="sm"
              className="hover:bg-bakery-pink hover:text-white transition-all duration-300"
            >
              {isAdding ? (
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-bakery-pink"></div>
              ) : (
                <ShoppingBag size={16} />
              )}
            </Button>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
