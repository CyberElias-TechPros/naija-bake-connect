
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Trash2, Minus, Plus, ShoppingBag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/hooks/useCart';
import { getProductById } from '@/data/mockData';
import { Product } from '@/types';
import { formatCurrency } from '@/utils/format';
import MainLayout from '@/components/layout/MainLayout';

interface CartItemWithDetails {
  productId: string;
  product: Product;
  quantity: number;
  selectedOptions?: { [key: string]: string };
  itemTotalPrice: number;
}

const Cart = () => {
  const { items, updateItem, removeItem, totalAmount } = useCart();
  const [cartItemsWithDetails, setCartItemsWithDetails] = useState<CartItemWithDetails[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProductDetails = async () => {
      setIsLoading(true);
      try {
        const itemsWithDetails = await Promise.all(
          items.map(async (item) => {
            const product = await getProductById(item.productId);
            if (!product) {
              throw new Error(`Product not found for ID: ${item.productId}`);
            }

            // Calculate price with options
            let itemPrice = product.price;
            if (item.selectedOptions && product.options) {
              product.options.forEach(option => {
                const selectedChoiceId = item.selectedOptions?.[option.name];
                if (selectedChoiceId) {
                  const choice = option.choices.find(c => c.id === selectedChoiceId);
                  if (choice) {
                    itemPrice += choice.priceAdjustment;
                  }
                }
              });
            }

            return {
              ...item,
              product,
              itemTotalPrice: itemPrice * item.quantity,
            };
          })
        );
        setCartItemsWithDetails(itemsWithDetails);
      } catch (error) {
        console.error('Error fetching cart item details:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProductDetails();
  }, [items]);

  const handleQuantityChange = (productId: string, newQuantity: number, selectedOptions?: { [key: string]: string }) => {
    if (newQuantity > 0) {
      updateItem(productId, newQuantity, selectedOptions);
    }
  };

  const getOptionDetails = (item: CartItemWithDetails, optionName: string, optionId: string) => {
    const option = item.product.options?.find(opt => opt.name === optionName);
    const choice = option?.choices.find(c => c.id === optionId);
    return choice ? choice.name : 'Unknown';
  };

  if (isLoading) {
    return (
      <MainLayout>
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-2xl font-heading font-bold mb-6">Your Cart</h1>
          <div className="animate-pulse space-y-4">
            {[1, 2].map(index => (
              <div key={index} className="flex p-4 border rounded-lg">
                <div className="h-24 w-24 bg-gray-200 rounded"></div>
                <div className="flex-1 ml-4 space-y-2">
                  <div className="h-5 bg-gray-200 rounded w-1/3"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/5"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </MainLayout>
    );
  }

  if (cartItemsWithDetails.length === 0) {
    return (
      <MainLayout>
        <div className="container mx-auto px-4 py-12 text-center">
          <div className="max-w-md mx-auto">
            <ShoppingBag size={64} className="mx-auto text-muted-foreground mb-4" />
            <h1 className="text-2xl font-heading font-bold mb-4">Your Cart is Empty</h1>
            <p className="text-muted-foreground mb-8">
              Looks like you haven't added any items to your cart yet.
            </p>
            <Link to="/products">
              <Button className="bg-bakery-brown hover:bg-bakery-brown-light text-white">
                Browse Products
              </Button>
            </Link>
          </div>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl md:text-3xl font-heading font-bold mb-6">Your Cart</h1>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Cart Items */}
          <div className="lg:w-2/3">
            <div className="space-y-4">
              {cartItemsWithDetails.map((item) => (
                <div key={item.productId} className="flex flex-col sm:flex-row border rounded-lg p-4 bg-white">
                  {/* Product Image */}
                  <div className="sm:w-24 sm:h-24 rounded overflow-hidden flex-shrink-0 mb-4 sm:mb-0">
                    <Link to={`/products/${item.productId}`}>
                      <img 
                        src={item.product.image} 
                        alt={item.product.name} 
                        className="w-full h-full object-cover"
                      />
                    </Link>
                  </div>

                  {/* Product Details */}
                  <div className="flex-1 sm:ml-4 flex flex-col">
                    <div className="flex justify-between mb-1">
                      <Link to={`/products/${item.productId}`} className="font-medium hover:text-bakery-brown">
                        {item.product.name}
                      </Link>
                      <div className="font-semibold">
                        {formatCurrency(item.itemTotalPrice)}
                      </div>
                    </div>
                    
                    {/* Selected options */}
                    {item.selectedOptions && Object.keys(item.selectedOptions).length > 0 && (
                      <div className="text-sm text-muted-foreground mb-2">
                        {Object.entries(item.selectedOptions).map(([optionName, optionId]) => (
                          <div key={optionName}>
                            {optionName}: {getOptionDetails(item, optionName, optionId)}
                          </div>
                        ))}
                      </div>
                    )}

                    <div className="flex items-center justify-between mt-auto pt-3">
                      {/* Quantity controls */}
                      <div className="flex items-center">
                        <Button 
                          variant="outline" 
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => handleQuantityChange(item.productId, item.quantity - 1, item.selectedOptions)}
                          disabled={item.quantity <= 1}
                        >
                          <Minus size={14} />
                        </Button>
                        <span className="w-8 text-center font-medium">{item.quantity}</span>
                        <Button 
                          variant="outline" 
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => handleQuantityChange(item.productId, item.quantity + 1, item.selectedOptions)}
                        >
                          <Plus size={14} />
                        </Button>
                      </div>

                      {/* Remove button */}
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeItem(item.productId)}
                        className="text-muted-foreground hover:text-destructive"
                      >
                        <Trash2 size={16} className="mr-1" />
                        <span className="hidden sm:inline">Remove</span>
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:w-1/3">
            <div className="bg-white border rounded-lg p-6 sticky top-24">
              <h2 className="text-xl font-heading font-semibold mb-4">Order Summary</h2>
              
              <div className="space-y-2 mb-4">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span className="font-medium">{formatCurrency(totalAmount)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Delivery Fee</span>
                  <span className="font-medium">To be calculated</span>
                </div>
              </div>
              
              <div className="border-t pt-4 mb-6">
                <div className="flex justify-between text-lg font-semibold">
                  <span>Total</span>
                  <span className="text-bakery-brown">{formatCurrency(totalAmount)}</span>
                </div>
              </div>
              
              <Link to="/checkout">
                <Button className="w-full bg-bakery-brown hover:bg-bakery-brown-light text-white py-6">
                  Proceed to Checkout
                </Button>
              </Link>
              
              <Link to="/products">
                <Button variant="link" className="mt-4 w-full text-bakery-brown hover:text-bakery-brown-light">
                  Continue Shopping
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Cart;
