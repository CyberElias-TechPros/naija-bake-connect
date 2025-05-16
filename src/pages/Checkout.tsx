
import { useState, useEffect } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useAuth } from '@/hooks/useAuth';
import { useCart } from '@/hooks/useCart';
import { getUserProfile, createOrder } from '@/services/supabaseService';
import MainLayout from '@/components/layout/MainLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/components/ui/use-toast';
import { UserProfile } from '@/types';
import { formatCurrency } from '@/utils/format';
import { Loader } from 'lucide-react';

const formSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(1, 'Phone number is required'),
  address: z.string().min(1, 'Address is required'),
  city: z.string().min(1, 'City is required'),
  state: z.string().min(1, 'State is required'),
  paymentMethod: z.enum(['cash', 'transfer', 'card']),
  deliveryMethod: z.enum(['pickup', 'delivery']),
  notes: z.string().optional()
});

type FormValues = z.infer<typeof formSchema>;

const Checkout = () => {
  const { user } = useAuth();
  const { items, totalAmount, clearCart } = useCart();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const navigate = useNavigate();

  const { register, handleSubmit, setValue, formState: { errors } } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      paymentMethod: 'transfer',
      deliveryMethod: 'delivery'
    }
  });

  // If cart is empty, redirect to products
  if (items.length === 0) {
    return <Navigate to="/products" />;
  }

  useEffect(() => {
    const fetchUserProfile = async () => {
      if (!user) return;
      
      try {
        const userProfile = await getUserProfile();
        if (userProfile) {
          setProfile(userProfile);
          
          // Pre-fill form with user data
          setValue('firstName', userProfile.firstName || '');
          setValue('lastName', userProfile.lastName || '');
          setValue('email', user.email || '');
          setValue('phone', userProfile.phone || '');
          setValue('address', userProfile.address || '');
          setValue('city', userProfile.city || '');
          setValue('state', userProfile.state || '');
        }
      } catch (error) {
        console.error('Error fetching user profile:', error);
      }
    };

    fetchUserProfile();
  }, [user, setValue]);

  const onSubmit = async (data: FormValues) => {
    try {
      setIsSubmitting(true);
      
      // Format order data
      const orderData = {
        totalAmount,
        recipientName: `${data.firstName} ${data.lastName}`,
        recipientEmail: data.email,
        recipientPhone: data.phone,
        deliveryAddress: data.address,
        deliveryCity: data.city,
        deliveryState: data.state,
        paymentMethod: data.paymentMethod,
        deliveryMethod: data.deliveryMethod,
        notes: data.notes,
        items: items.map(item => ({
          productId: item.productId,
          quantity: item.quantity,
          price: item.price || 0,
          selectedOptions: item.selectedOptions
        }))
      };
      
      // Create order in database
      const orderId = await createOrder(orderData);
      
      // Clear cart and navigate to success page
      clearCart();
      navigate(`/order-success/${orderId}`);
    } catch (error) {
      console.error('Error creating order:', error);
      toast({
        title: 'Error',
        description: 'Failed to process your order. Please try again.',
        variant: 'destructive'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-heading font-bold mb-6">Checkout</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Order Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow p-6">
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="space-y-8">
                  {/* Contact Information */}
                  <div>
                    <h2 className="text-xl font-bold mb-4">Contact Information</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="firstName">First Name</Label>
                        <Input 
                          id="firstName"
                          {...register('firstName')}
                          className={errors.firstName ? 'border-red-500' : ''}
                        />
                        {errors.firstName && (
                          <p className="text-red-500 text-sm">{errors.firstName.message}</p>
                        )}
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="lastName">Last Name</Label>
                        <Input 
                          id="lastName"
                          {...register('lastName')}
                          className={errors.lastName ? 'border-red-500' : ''}
                        />
                        {errors.lastName && (
                          <p className="text-red-500 text-sm">{errors.lastName.message}</p>
                        )}
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input 
                          id="email"
                          type="email"
                          {...register('email')}
                          className={errors.email ? 'border-red-500' : ''}
                        />
                        {errors.email && (
                          <p className="text-red-500 text-sm">{errors.email.message}</p>
                        )}
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone</Label>
                        <Input 
                          id="phone"
                          {...register('phone')}
                          className={errors.phone ? 'border-red-500' : ''}
                        />
                        {errors.phone && (
                          <p className="text-red-500 text-sm">{errors.phone.message}</p>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  {/* Delivery Information */}
                  <div>
                    <h2 className="text-xl font-bold mb-4">Delivery Information</h2>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="address">Address</Label>
                        <Input 
                          id="address"
                          {...register('address')}
                          className={errors.address ? 'border-red-500' : ''}
                        />
                        {errors.address && (
                          <p className="text-red-500 text-sm">{errors.address.message}</p>
                        )}
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="city">City</Label>
                          <Input 
                            id="city"
                            {...register('city')}
                            className={errors.city ? 'border-red-500' : ''}
                          />
                          {errors.city && (
                            <p className="text-red-500 text-sm">{errors.city.message}</p>
                          )}
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="state">State</Label>
                          <Input 
                            id="state"
                            {...register('state')}
                            className={errors.state ? 'border-red-500' : ''}
                          />
                          {errors.state && (
                            <p className="text-red-500 text-sm">{errors.state.message}</p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Payment Method */}
                  <div>
                    <h2 className="text-xl font-bold mb-4">Payment Method</h2>
                    <RadioGroup defaultValue="transfer" className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem 
                          value="cash" 
                          id="payment-cash" 
                          {...register('paymentMethod')}
                        />
                        <Label htmlFor="payment-cash">Pay on Delivery (Cash)</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem 
                          value="transfer" 
                          id="payment-transfer" 
                          {...register('paymentMethod')}
                        />
                        <Label htmlFor="payment-transfer">Bank Transfer</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem 
                          value="card" 
                          id="payment-card" 
                          {...register('paymentMethod')}
                        />
                        <Label htmlFor="payment-card">Credit/Debit Card</Label>
                      </div>
                    </RadioGroup>
                  </div>
                  
                  {/* Delivery Options */}
                  <div>
                    <h2 className="text-xl font-bold mb-4">Delivery Options</h2>
                    <RadioGroup defaultValue="delivery" className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem 
                          value="delivery" 
                          id="delivery-option" 
                          {...register('deliveryMethod')}
                        />
                        <Label htmlFor="delivery-option">Delivery to Your Address</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem 
                          value="pickup" 
                          id="pickup-option" 
                          {...register('deliveryMethod')}
                        />
                        <Label htmlFor="pickup-option">Pickup from Store</Label>
                      </div>
                    </RadioGroup>
                  </div>
                  
                  {/* Additional Notes */}
                  <div>
                    <h2 className="text-xl font-bold mb-4">Additional Notes</h2>
                    <Textarea 
                      id="notes"
                      placeholder="Special instructions for your order"
                      className="resize-none"
                      {...register('notes')}
                    />
                  </div>
                </div>
                
                <Button 
                  type="submit"
                  className="mt-8 w-full bg-bakery-pink hover:bg-bakery-pink-dark"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <><Loader className="mr-2 h-4 w-4 animate-spin" /> Processing...</>
                  ) : (
                    'Place Order'
                  )}
                </Button>
              </form>
            </div>
          </div>
          
          {/* Order Summary */}
          <div>
            <div className="bg-white rounded-lg shadow p-6 sticky top-24">
              <h2 className="text-xl font-bold mb-4">Order Summary</h2>
              
              <div className="space-y-4">
                {items.map((item) => (
                  <div key={`${item.productId}-${JSON.stringify(item.selectedOptions)}`} className="flex justify-between">
                    <div>
                      <p className="font-medium">{item.quantity}x Item</p>
                      {item.selectedOptions && Object.entries(item.selectedOptions).length > 0 && (
                        <div className="text-sm text-muted-foreground">
                          {Object.entries(item.selectedOptions).map(([key, value]) => (
                            <div key={key}>{key}: {value}</div>
                          ))}
                        </div>
                      )}
                    </div>
                    <p>{formatCurrency(item.price ? item.price * item.quantity : 0)}</p>
                  </div>
                ))}
              </div>
              
              <div className="border-t mt-4 pt-4">
                <div className="flex justify-between font-medium">
                  <p>Subtotal</p>
                  <p>{formatCurrency(totalAmount)}</p>
                </div>
                <div className="flex justify-between text-sm text-muted-foreground mt-1">
                  <p>Delivery</p>
                  <p>Calculated at next step</p>
                </div>
              </div>
              
              <div className="border-t mt-4 pt-4">
                <div className="flex justify-between text-lg font-bold">
                  <p>Total</p>
                  <p>{formatCurrency(totalAmount)}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Checkout;
