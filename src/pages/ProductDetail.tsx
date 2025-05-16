
import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { fetchProductById } from '@/services/supabaseService';
import { Product, ProductOption } from '@/types';
import MainLayout from '@/components/layout/MainLayout';
import { Button } from '@/components/ui/button';
import { ChevronLeft, Minus, Plus, ShoppingBag } from 'lucide-react';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { formatCurrency } from '@/utils/format';
import { useCart } from '@/hooks/useCart';

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [selectedOptions, setSelectedOptions] = useState<{ [key: string]: string }>({});
  const [totalPrice, setTotalPrice] = useState(0);
  
  const { addItem } = useCart();

  useEffect(() => {
    const loadProduct = async () => {
      if (!id) return;
      
      setIsLoading(true);
      try {
        const productData = await fetchProductById(id);
        if (productData) {
          setProduct(productData);
          
          // Initialize selected options with default values
          if (productData.options) {
            const initialOptions: { [key: string]: string } = {};
            productData.options.forEach(option => {
              if (option.choices.length > 0) {
                initialOptions[option.name] = option.choices[0].id;
              }
            });
            setSelectedOptions(initialOptions);
          }
        }
      } catch (error) {
        console.error('Error loading product:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadProduct();
  }, [id]);

  useEffect(() => {
    // Calculate total price based on base price and selected options
    if (product) {
      let price = product.price;
      
      // Add price adjustments for selected options
      if (product.options) {
        product.options.forEach(option => {
          const selectedOptionId = selectedOptions[option.name];
          const selectedChoice = option.choices.find(choice => choice.id === selectedOptionId);
          if (selectedChoice) {
            price += selectedChoice.priceAdjustment;
          }
        });
      }
      
      setTotalPrice(price * quantity);
    }
  }, [product, selectedOptions, quantity]);

  const handleOptionChange = (optionName: string, choiceId: string) => {
    setSelectedOptions(prev => ({
      ...prev,
      [optionName]: choiceId
    }));
  };

  const decreaseQuantity = () => {
    setQuantity(prev => (prev > 1 ? prev - 1 : 1));
  };

  const increaseQuantity = () => {
    setQuantity(prev => prev + 1);
  };

  const handleAddToCart = () => {
    if (!product) return;
    
    // Calculate unit price with options
    let unitPrice = product.price;
    if (product.options) {
      product.options.forEach(option => {
        const selectedOptionId = selectedOptions[option.name];
        const selectedChoice = option.choices.find(choice => choice.id === selectedOptionId);
        if (selectedChoice) {
          unitPrice += selectedChoice.priceAdjustment;
        }
      });
    }
    
    addItem({
      productId: product.id,
      quantity,
      selectedOptions,
      price: unitPrice
    });
  };

  if (isLoading) {
    return (
      <MainLayout>
        <div className="container mx-auto px-4 py-8">
          <div className="animate-pulse">
            <div className="h-6 w-32 bg-gray-200 rounded mb-4"></div>
            <div className="flex flex-col lg:flex-row gap-8">
              <div className="lg:w-1/2">
                <div className="bg-gray-200 aspect-square rounded-lg"></div>
              </div>
              <div className="lg:w-1/2">
                <div className="h-8 bg-gray-200 rounded w-3/4 mb-4"></div>
                <div className="h-6 bg-gray-200 rounded w-1/4 mb-6"></div>
                <div className="h-24 bg-gray-200 rounded mb-6"></div>
                <div className="h-10 bg-gray-200 rounded mb-6 w-1/2"></div>
                <div className="h-12 bg-gray-200 rounded w-full"></div>
              </div>
            </div>
          </div>
        </div>
      </MainLayout>
    );
  }

  if (!product) {
    return (
      <MainLayout>
        <div className="container mx-auto px-4 py-16 text-center">
          <h2 className="text-2xl font-semibold mb-4">Product Not Found</h2>
          <p className="mb-6 text-muted-foreground">
            The product you're looking for doesn't exist or has been removed.
          </p>
          <Link to="/products">
            <Button>
              <ChevronLeft size={16} className="mr-2" /> Back to Products
            </Button>
          </Link>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <div className="mb-6">
          <Link 
            to="/products" 
            className="flex items-center text-sm text-muted-foreground hover:text-bakery-pink transition-colors"
          >
            <ChevronLeft size={16} className="mr-1" /> Back to Products
          </Link>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Product Image */}
          <div className="lg:w-1/2">
            <div className="sticky top-24">
              <img 
                src={product.image} 
                alt={product.name} 
                className="w-full h-auto rounded-lg shadow-md"
              />
            </div>
          </div>

          {/* Product Details */}
          <div className="lg:w-1/2">
            <h1 className="text-3xl font-heading font-bold mb-2">{product.name}</h1>
            <div className="text-2xl font-semibold text-bakery-pink mb-4">
              {formatCurrency(totalPrice)}
            </div>

            <div className="prose mb-6">
              <p>{product.description}</p>
            </div>

            {/* Product Options */}
            {product.options && product.options.length > 0 && (
              <div className="mb-6 space-y-6">
                {product.options.map((option: ProductOption) => (
                  <div key={option.name}>
                    <h3 className="text-lg font-medium mb-3">{option.name}</h3>
                    <RadioGroup 
                      value={selectedOptions[option.name] || ''} 
                      onValueChange={(value) => handleOptionChange(option.name, value)}
                      className="space-y-2"
                    >
                      {option.choices.map((choice) => (
                        <div key={choice.id} className="flex items-center space-x-2">
                          <RadioGroupItem value={choice.id} id={`${option.name}-${choice.id}`} />
                          <Label htmlFor={`${option.name}-${choice.id}`} className="flex justify-between w-full">
                            <span>{choice.name}</span>
                            {choice.priceAdjustment > 0 && (
                              <span className="text-muted-foreground">
                                +{formatCurrency(choice.priceAdjustment)}
                              </span>
                            )}
                          </Label>
                        </div>
                      ))}
                    </RadioGroup>
                  </div>
                ))}
              </div>
            )}

            {/* Quantity */}
            <div className="mb-6">
              <h3 className="text-lg font-medium mb-3">Quantity</h3>
              <div className="flex items-center">
                <Button 
                  variant="outline" 
                  size="icon" 
                  onClick={decreaseQuantity}
                  disabled={quantity <= 1}
                >
                  <Minus size={16} />
                </Button>
                <span className="w-12 text-center font-medium">{quantity}</span>
                <Button 
                  variant="outline" 
                  size="icon" 
                  onClick={increaseQuantity}
                >
                  <Plus size={16} />
                </Button>
              </div>
            </div>

            {/* Add to Cart Button */}
            <Button 
              onClick={handleAddToCart}
              className="w-full bg-bakery-pink hover:bg-bakery-pink-dark text-white flex items-center justify-center py-6"
            >
              <ShoppingBag size={18} className="mr-2" />
              Add to Cart
            </Button>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default ProductDetail;
