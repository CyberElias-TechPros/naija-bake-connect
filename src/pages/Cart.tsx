
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '@/hooks/useCart';
import { fetchProductById } from '@/services/supabaseService';
import MainLayout from '@/components/layout/MainLayout';
import { Button } from '@/components/ui/button';
import { formatCurrency } from '@/utils/format';
import { Loader, Minus, Plus, ShoppingBag, Trash2 } from 'lucide-react';
import { Product } from '@/types';

interface CartProductItem {
  productId: string;
  product: Product | null;
  quantity: number;
  selectedOptions?: { [key: string]: string };
  price?: number;
  isLoading: boolean;
}

const Cart = () => {
  const { items, totalAmount, updateItem, removeItem } = useCart();
  const [cartItems, setCartItems] = useState<CartProductItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      if (items.length === 0) {
        setIsLoading(false);
        return;
      }

      setIsLoading(true);
      const cartProductPromises = items.map(async (item) => {
        const product = await fetchProductById(item.productId);
        return {
          ...item,
          product,
          isLoading: false
        };
      });

      const cartProducts = await Promise.all(cartProductPromises);
      setCartItems(cartProducts);
      setIsLoading(false);
    };

    fetchProducts();
  }, [items]);

  const handleQuantityChange = (productId: string, quantity: number, selectedOptions?: { [key: string]: string }) => {
    // Find the cart item being updated
    const cartItem = cartItems.find(item => 
      item.productId === productId && 
      JSON.stringify(item.selectedOptions) === JSON.stringify(selectedOptions)
    );
    
    // Set loading state for this item
    if (cartItem) {
      setCartItems(prev => prev.map(item => 
        item === cartItem ? { ...item, isLoading: true } : item
      ));
    }
    
    // Update the item quantity
    updateItem(productId, quantity, selectedOptions);
    
    // Reset loading state
    setTimeout(() => {
      setCartItems(prev => prev.map(item => 
        item.productId === productId && JSON.stringify(item.selectedOptions) === JSON.stringify(selectedOptions) 
          ? { ...item, isLoading: false } 
          : item
      ));
    }, 300);
  };

  const handleRemoveItem = (productId: string, selectedOptions?: { [key: string]: string }) => {
    removeItem(productId);
  };

  // Helper to display option choices in a readable format
  const getOptionLabel = (product: Product, optionName: string, choiceId: string): string => {
    const option = product.options?.find(opt => opt.name === optionName);
    if (!option) return '';
    
    const choice = option.choices.find(c => c.id === choiceId);
    return choice ? choice.name : '';
  };

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-3xl font-heading font-bold mb-8">Shopping Cart</h1>
        
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <Loader className="h-8 w-8 animate-spin text-bakery-pink" />
          </div>
        ) : cartItems.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-lg shadow">
            <ShoppingBag className="mx-auto h-16 w-16 text-gray-300" />
            <h2 className="mt-4 text-xl font-medium">Your cart is empty</h2>
            <p className="mt-2 text-muted-foreground">
              Looks like you haven't added any products to your cart yet.
            </p>
            <Button className="mt-6 bg-bakery-pink hover:bg-bakery-pink-dark" asChild>
              <Link to="/products">Start Shopping</Link>
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow overflow-hidden">
                <div className="p-6 border-b">
                  <h2 className="text-xl font-medium">Cart Items ({cartItems.length})</h2>
                </div>
                
                <div className="divide-y">
                  {cartItems.map((item, index) => (
                    <div key={`${item.productId}-${JSON.stringify(item.selectedOptions)}-${index}`} className="p-6">
                      {item.product ? (
                        <div className="flex flex-col sm:flex-row">
                          {/* Product Image */}
                          <div className="flex-shrink-0 sm:w-24 sm:h-24 mb-4 sm:mb-0">
                            <img
                              src={item.product.image}
                              alt={item.product.name}
                              className="w-full h-full object-cover rounded"
                            />
                          </div>
                          
                          {/* Product Details */}
                          <div className="flex-grow sm:ml-6">
                            <div className="flex flex-col sm:flex-row justify-between">
                              <div>
                                <h3 className="text-lg font-medium">{item.product.name}</h3>
                                
                                {/* Selected Options */}
                                {item.selectedOptions && Object.entries(item.selectedOptions).length > 0 && (
                                  <div className="mt-1 text-sm text-muted-foreground">
                                    {Object.entries(item.selectedOptions).map(([optionName, choiceId]) => (
                                      <div key={optionName}>
                                        {optionName}: {getOptionLabel(item.product!, optionName, choiceId)}
                                      </div>
                                    ))}
                                  </div>
                                )}
                                
                                {/* Price */}
                                <div className="mt-2 font-medium">
                                  {formatCurrency(item.price || 0)}
                                </div>
                              </div>
                              
                              {/* Quantity Controls */}
                              <div className="mt-4 sm:mt-0 flex items-center">
                                <Button
                                  variant="outline"
                                  size="icon"
                                  onClick={() => handleQuantityChange(
                                    item.productId,
                                    item.quantity - 1,
                                    item.selectedOptions
                                  )}
                                  disabled={item.quantity <= 1 || item.isLoading}
                                  className="h-8 w-8"
                                >
                                  <Minus className="h-3 w-3" />
                                </Button>
                                <span className="w-12 text-center">
                                  {item.isLoading ? (
                                    <Loader className="inline h-4 w-4 animate-spin" />
                                  ) : (
                                    item.quantity
                                  )}
                                </span>
                                <Button
                                  variant="outline"
                                  size="icon"
                                  onClick={() => handleQuantityChange(
                                    item.productId,
                                    item.quantity + 1,
                                    item.selectedOptions
                                  )}
                                  disabled={item.isLoading}
                                  className="h-8 w-8"
                                >
                                  <Plus className="h-3 w-3" />
                                </Button>
                                
                                {/* Remove Button */}
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  onClick={() => handleRemoveItem(
                                    item.productId,
                                    item.selectedOptions
                                  )}
                                  disabled={item.isLoading}
                                  className="ml-4 text-red-500 hover:text-red-600 hover:bg-red-50"
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-muted-foreground">Product not available</p>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleRemoveItem(item.productId)}
                            className="text-red-500 hover:text-red-600"
                          >
                            Remove
                          </Button>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Cart Summary */}
            <div>
              <div className="bg-white rounded-lg shadow p-6 sticky top-24">
                <h2 className="text-xl font-medium mb-4">Order Summary</h2>
                
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>{formatCurrency(totalAmount)}</span>
                  </div>
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>Delivery</span>
                    <span>Calculated at checkout</span>
                  </div>
                  <div className="border-t pt-3 mt-3">
                    <div className="flex justify-between font-bold">
                      <span>Total</span>
                      <span>{formatCurrency(totalAmount)}</span>
                    </div>
                  </div>
                </div>
                
                <Button className="w-full mt-6 bg-bakery-pink hover:bg-bakery-pink-dark" asChild>
                  <Link to="/checkout">
                    Proceed to Checkout
                  </Link>
                </Button>
                
                <Button variant="outline" className="w-full mt-4" asChild>
                  <Link to="/products">
                    Continue Shopping
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default Cart;
