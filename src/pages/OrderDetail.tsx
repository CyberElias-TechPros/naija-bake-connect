
import { useEffect, useState } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { fetchOrderDetails } from '@/services/supabaseService';
import MainLayout from '@/components/layout/MainLayout';
import { Button } from '@/components/ui/button';
import { OrderDetail as OrderDetailType } from '@/types';
import { formatCurrency } from '@/utils/format';
import { Loader, ArrowLeft, ShoppingBag } from 'lucide-react';

const OrderDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { user, isLoading: authLoading } = useAuth();
  const [orderDetails, setOrderDetails] = useState<OrderDetailType | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  // Redirect if not logged in
  if (!user && !authLoading) {
    return <Navigate to="/auth" state={{ from: { pathname: `/orders/${id}` } }} />;
  }

  useEffect(() => {
    const fetchOrder = async () => {
      if (!id || !user) return;
      
      try {
        setIsLoading(true);
        const details = await fetchOrderDetails(id);
        setOrderDetails(details);
      } catch (error) {
        console.error('Error fetching order details:', error);
        setError('Failed to load order details. The order may not exist or you may not have permission to view it.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchOrder();
  }, [id, user]);

  // Format date function
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-NG', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Status badge component
  const StatusBadge = ({ status }: { status: string }) => {
    let bgColor = '';
    let textColor = '';

    switch (status) {
      case 'pending':
        bgColor = 'bg-yellow-100';
        textColor = 'text-yellow-800';
        break;
      case 'processing':
        bgColor = 'bg-blue-100';
        textColor = 'text-blue-800';
        break;
      case 'completed':
        bgColor = 'bg-green-100';
        textColor = 'text-green-800';
        break;
      case 'delivered':
        bgColor = 'bg-green-100';
        textColor = 'text-green-800';
        break;
      case 'cancelled':
        bgColor = 'bg-red-100';
        textColor = 'text-red-800';
        break;
      default:
        bgColor = 'bg-gray-100';
        textColor = 'text-gray-800';
    }

    return (
      <span className={`px-3 py-1 rounded-full text-sm font-medium ${bgColor} ${textColor}`}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  if (isLoading) {
    return (
      <MainLayout>
        <div className="container mx-auto px-4 py-12">
          <div className="flex justify-center items-center h-64">
            <Loader className="h-8 w-8 animate-spin text-bakery-pink" />
          </div>
        </div>
      </MainLayout>
    );
  }

  if (error) {
    return (
      <MainLayout>
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md p-8 text-center">
            <h1 className="text-2xl font-heading font-bold mb-4">Order Not Found</h1>
            <p className="text-red-500 mb-6">{error}</p>
            <Button asChild variant="outline" className="flex items-center">
              <Link to="/orders">
                <ArrowLeft className="mr-2 h-4 w-4" /> Back to Orders
              </Link>
            </Button>
          </div>
        </div>
      </MainLayout>
    );
  }

  if (!orderDetails) {
    return (
      <MainLayout>
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md p-8 text-center">
            <h1 className="text-2xl font-heading font-bold mb-4">Order Not Found</h1>
            <p className="mb-6">Sorry, we couldn't find the order you're looking for.</p>
            <Button asChild variant="outline" className="flex items-center">
              <Link to="/orders">
                <ArrowLeft className="mr-2 h-4 w-4" /> Back to Orders
              </Link>
            </Button>
          </div>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-12">
        <div className="flex items-center mb-6">
          <Button asChild variant="outline" className="mr-4">
            <Link to="/orders">
              <ArrowLeft className="mr-2 h-4 w-4" /> Back to Orders
            </Link>
          </Button>
          <h1 className="text-3xl font-heading font-bold">Order Details</h1>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            {/* Order Header */}
            <div className="p-6 border-b">
              <div className="flex flex-wrap justify-between items-center">
                <div>
                  <p className="text-sm text-muted-foreground">Order ID</p>
                  <p className="font-medium">{orderDetails.order.id}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Order Date</p>
                  <p className="font-medium">{formatDate(orderDetails.order.created_at)}</p>
                </div>
                <div className="mt-2 sm:mt-0">
                  <p className="text-sm text-muted-foreground">Status</p>
                  <StatusBadge status={orderDetails.order.status} />
                </div>
              </div>
            </div>

            {/* Order Items */}
            <div className="p-6 border-b">
              <h2 className="text-xl font-heading font-semibold mb-4">Items</h2>
              <div className="space-y-6">
                {orderDetails.items.map((item) => (
                  <div key={item.id} className="flex flex-col sm:flex-row gap-4">
                    <div className="flex-shrink-0">
                      <div className="w-20 h-20 bg-gray-100 rounded">
                        {item.productImage ? (
                          <img
                            src={item.productImage}
                            alt={item.productName}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <ShoppingBag className="h-8 w-8 text-gray-300" />
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="flex-grow">
                      <p className="font-medium">{item.productName}</p>
                      <p className="text-sm text-muted-foreground">Quantity: {item.quantity}</p>
                      {item.selectedOptions && Object.keys(item.selectedOptions).length > 0 && (
                        <div className="text-sm text-muted-foreground mt-1">
                          {Object.entries(item.selectedOptions).map(([key, value]) => (
                            <div key={key}>{key}: {value}</div>
                          ))}
                        </div>
                      )}
                    </div>
                    <div className="text-right">
                      <p className="font-medium">{formatCurrency(item.price)}</p>
                      <p className="text-sm text-muted-foreground">
                        {formatCurrency(item.price)} × {item.quantity}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Order Summary */}
            <div className="p-6 border-b">
              <h2 className="text-xl font-heading font-semibold mb-4">Order Summary</h2>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>{formatCurrency(orderDetails.order.total_amount)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Delivery</span>
                  <span>Included</span>
                </div>
                <div className="flex justify-between font-bold text-lg pt-2 border-t mt-2">
                  <span>Total</span>
                  <span>{formatCurrency(orderDetails.order.total_amount)}</span>
                </div>
              </div>
            </div>

            {/* Customer Information */}
            <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h2 className="text-xl font-heading font-semibold mb-4">Customer Details</h2>
                <p className="font-medium">{orderDetails.order.recipient_name}</p>
                <p>{orderDetails.order.recipient_email}</p>
                <p>{orderDetails.order.recipient_phone}</p>
              </div>
              <div>
                <h2 className="text-xl font-heading font-semibold mb-4">Shipping Information</h2>
                <p>{orderDetails.order.delivery_method === 'pickup' ? 'Store Pickup' : 'Delivery'}</p>
                {orderDetails.order.delivery_method === 'delivery' && (
                  <>
                    <p>{orderDetails.order.delivery_address}</p>
                    <p>{orderDetails.order.delivery_city}, {orderDetails.order.delivery_state}</p>
                  </>
                )}
              </div>
              <div>
                <h2 className="text-xl font-heading font-semibold mb-4">Payment Method</h2>
                <p>
                  {orderDetails.order.payment_method === 'transfer' ? 'Bank Transfer' : 
                   orderDetails.order.payment_method === 'cash' ? 'Cash on Delivery' : 
                   'Credit/Debit Card'}
                </p>
              </div>
              {orderDetails.order.notes && (
                <div>
                  <h2 className="text-xl font-heading font-semibold mb-4">Order Notes</h2>
                  <p>{orderDetails.order.notes}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default OrderDetail;
