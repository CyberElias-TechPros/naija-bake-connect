
import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { fetchOrderDetails } from '@/services/supabaseService';
import MainLayout from '@/components/layout/MainLayout';
import { Button } from '@/components/ui/button';
import { Check, ShoppingBag, Loader } from 'lucide-react';
import { formatCurrency } from '@/utils/format';
import { OrderDetail } from '@/types';

const OrderSuccess = () => {
  const { id } = useParams<{ id: string }>();
  const [orderDetails, setOrderDetails] = useState<OrderDetail | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchOrder = async () => {
      if (!id) return;
      
      try {
        setIsLoading(true);
        const details = await fetchOrderDetails(id);
        setOrderDetails(details);
      } catch (error) {
        console.error('Error fetching order details:', error);
        setError('Failed to load order details. Please check your order history or contact customer support.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchOrder();
  }, [id]);

  if (isLoading) {
    return (
      <MainLayout>
        <div className="container mx-auto px-4 py-16 text-center">
          <Loader className="mx-auto h-12 w-12 animate-spin text-bakery-pink" />
          <p className="mt-4 text-lg">Loading your order details...</p>
        </div>
      </MainLayout>
    );
  }

  if (error) {
    return (
      <MainLayout>
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-2xl font-heading font-bold mb-4">Order Information</h1>
          <p className="text-red-500 mb-6">{error}</p>
          <Button asChild className="bg-bakery-pink hover:bg-bakery-pink-dark">
            <Link to="/products">Continue Shopping</Link>
          </Button>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-8">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center bg-green-100 rounded-full p-4 mb-4">
              <Check className="h-12 w-12 text-green-600" />
            </div>
            <h1 className="text-3xl font-heading font-bold">Order Confirmed!</h1>
            <p className="text-muted-foreground mt-2">Thank you for your order</p>
          </div>

          {orderDetails && (
            <>
              <div className="border-t border-b py-4 my-6">
                <div className="flex justify-between mb-2">
                  <span className="font-medium">Order Number:</span>
                  <span>{id}</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span className="font-medium">Date:</span>
                  <span>
                    {new Date(orderDetails.order.created_at).toLocaleDateString('en-NG', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </span>
                </div>
                <div className="flex justify-between mb-2">
                  <span className="font-medium">Total Amount:</span>
                  <span className="font-bold">{formatCurrency(orderDetails.order.total_amount)}</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span className="font-medium">Payment Method:</span>
                  <span>{orderDetails.order.payment_method === 'transfer' ? 'Bank Transfer' : 
                         orderDetails.order.payment_method === 'cash' ? 'Cash on Delivery' : 
                         'Credit/Debit Card'}</span>
                </div>
              </div>

              <div className="mb-6">
                <h2 className="text-lg font-semibold mb-4">Order Summary</h2>
                <div className="space-y-4">
                  {orderDetails.items.map((item) => (
                    <div key={item.id} className="flex justify-between">
                      <div>
                        <p className="font-medium">
                          {item.quantity}x {item.productName}
                        </p>
                        {item.selectedOptions && Object.keys(item.selectedOptions).length > 0 && (
                          <div className="text-sm text-muted-foreground">
                            {Object.entries(item.selectedOptions).map(([key, value]) => (
                              <div key={key}>{key}: {value}</div>
                            ))}
                          </div>
                        )}
                      </div>
                      <p>{formatCurrency(item.price * item.quantity)}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="text-center space-y-4">
                <p className="text-muted-foreground">
                  We've sent a confirmation email to <strong>{orderDetails.order.recipient_email}</strong> with your order details.
                </p>
                <div className="flex flex-col sm:flex-row justify-center gap-4">
                  <Button asChild className="bg-bakery-pink hover:bg-bakery-pink-dark">
                    <Link to="/orders">View My Orders</Link>
                  </Button>
                  <Button variant="outline" asChild>
                    <Link to="/products">
                      <ShoppingBag className="mr-2 h-4 w-4" /> Continue Shopping
                    </Link>
                  </Button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </MainLayout>
  );
};

export default OrderSuccess;
