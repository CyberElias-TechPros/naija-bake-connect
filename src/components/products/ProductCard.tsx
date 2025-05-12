
import { Link } from 'react-router-dom';
import { Product } from '@/types';
import { formatCurrency } from '@/utils/format';

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  return (
    <Link to={`/products/${product.id}`}>
      <div className="card-hover bg-white rounded-lg overflow-hidden shadow-md">
        <div className="aspect-square overflow-hidden bg-gray-100">
          <img 
            src={product.image} 
            alt={product.name} 
            className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
          />
        </div>
        <div className="p-4">
          <h3 className="font-medium text-lg text-bakery-brown-dark truncate">
            {product.name}
          </h3>
          <div className="flex justify-between items-center mt-2">
            <span className="font-semibold text-bakery-brown">
              {formatCurrency(product.price)}
            </span>
            {product.customizable && (
              <span className="text-xs bg-bakery-cream px-2 py-1 rounded text-bakery-brown">
                Customizable
              </span>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
