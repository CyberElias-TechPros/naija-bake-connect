
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { CartItem, Product } from '@/types';
import { getProductById } from '@/data/mockData';
import { toast } from '@/components/ui/use-toast';

interface CartContextType {
  items: CartItem[];
  totalItems: number;
  totalAmount: number;
  addItem: (item: CartItem) => void;
  updateItem: (productId: string, quantity: number, selectedOptions?: { [key: string]: string }) => void;
  removeItem: (productId: string) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const [totalItems, setTotalItems] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);

  // Load cart from localStorage on initial render
  useEffect(() => {
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
      setItems(JSON.parse(storedCart));
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(items));
    
    // Calculate total items
    setTotalItems(items.reduce((total, item) => total + item.quantity, 0));
    
    // Calculate total amount
    const calculateTotalAmount = async () => {
      let total = 0;
      
      for (const item of items) {
        const product = await getProductById(item.productId);
        if (product) {
          let itemPrice = product.price;
          
          // Add price adjustments for selected options
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
          
          total += itemPrice * item.quantity;
        }
      }
      
      setTotalAmount(total);
    };
    
    calculateTotalAmount();
  }, [items]);

  const addItem = (item: CartItem) => {
    setItems(prevItems => {
      // Check if product already exists in cart
      const existingItemIndex = prevItems.findIndex(
        cartItem => cartItem.productId === item.productId
      );

      if (existingItemIndex >= 0) {
        // If options are different, add as new item
        const existingItem = prevItems[existingItemIndex];
        const hasDifferentOptions = 
          JSON.stringify(existingItem.selectedOptions) !== 
          JSON.stringify(item.selectedOptions);
        
        if (hasDifferentOptions) {
          toast({
            title: "Added to cart",
            description: "Item added to your shopping cart"
          });
          return [...prevItems, item];
        } else {
          // Update quantity if same product with same options
          const updatedItems = [...prevItems];
          updatedItems[existingItemIndex].quantity += item.quantity;
          
          toast({
            title: "Updated cart",
            description: "Item quantity increased in your cart"
          });
          
          return updatedItems;
        }
      } else {
        // Add new item
        toast({
          title: "Added to cart",
          description: "Item added to your shopping cart"
        });
        
        return [...prevItems, item];
      }
    });
  };

  const updateItem = (
    productId: string, 
    quantity: number, 
    selectedOptions?: { [key: string]: string }
  ) => {
    setItems(prevItems => {
      return prevItems.map(item => {
        if (item.productId === productId) {
          return {
            ...item,
            quantity: quantity,
            selectedOptions: selectedOptions || item.selectedOptions
          };
        }
        return item;
      });
    });
  };

  const removeItem = (productId: string) => {
    setItems(prevItems => prevItems.filter(item => item.productId !== productId));
    
    toast({
      title: "Removed from cart",
      description: "Item removed from your shopping cart"
    });
  };

  const clearCart = () => {
    setItems([]);
    
    toast({
      title: "Cart cleared",
      description: "All items have been removed from your cart"
    });
  };

  return (
    <CartContext.Provider
      value={{
        items,
        totalItems,
        totalAmount,
        addItem,
        updateItem,
        removeItem,
        clearCart
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
