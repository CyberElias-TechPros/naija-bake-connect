import { supabase } from "@/integrations/supabase/client";
import { Category, Product } from "@/types";

// Categories
export const fetchCategories = async (): Promise<Category[]> => {
  try {
    const { data, error } = await supabase
      .from('categories')
      .select('*');
      
    if (error) throw error;
    
    return data.map((category: any) => ({
      id: category.id,
      name: category.name,
      slug: category.slug,
      image: category.image_url || ''
    }));
  } catch (error) {
    console.error('Error fetching categories:', error);
    throw error;
  }
};

// Featured Products
export const fetchFeaturedProducts = async (): Promise<Product[]> => {
  try {
    const { data, error } = await supabase
      .from('products')
      .select(`
        *,
        category:categories(slug)
      `)
      .eq('featured', true)
      .eq('available', true);
      
    if (error) throw error;
    
    const products = [];
    for (const product of data) {
      products.push({
        id: product.id,
        name: product.name,
        description: product.description,
        price: product.price,
        category: product.category?.slug || '',
        image: product.image_url || '',
        featured: product.featured,
        customizable: product.customizable,
        options: await fetchProductOptions(product.id)
      });
    }
    
    return products;
  } catch (error) {
    console.error('Error fetching featured products:', error);
    throw error;
  }
};

// Products
export const fetchAllProducts = async (): Promise<Product[]> => {
  try {
    const { data, error } = await supabase
      .from('products')
      .select(`
        *,
        category:categories(slug)
      `)
      .eq('available', true);
      
    if (error) throw error;
    
    const products = [];
    for (const product of data) {
      products.push({
        id: product.id,
        name: product.name,
        description: product.description,
        price: product.price,
        category: product.category?.slug || '',
        image: product.image_url || '',
        featured: product.featured,
        customizable: product.customizable,
        options: await fetchProductOptions(product.id)
      });
    }
    
    return products;
  } catch (error) {
    console.error('Error fetching all products:', error);
    throw error;
  }
};

// Products by Category
export const fetchProductsByCategory = async (categorySlug: string): Promise<Product[]> => {
  try {
    const { data: categoryData, error: categoryError } = await supabase
      .from('categories')
      .select('id')
      .eq('slug', categorySlug)
      .single();
      
    if (categoryError) throw categoryError;
    
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('category_id', categoryData.id)
      .eq('available', true);
      
    if (error) throw error;
    
    const products = [];
    for (const product of data) {
      products.push({
        id: product.id,
        name: product.name,
        description: product.description,
        price: product.price,
        category: categorySlug,
        image: product.image_url || '',
        featured: product.featured,
        customizable: product.customizable,
        options: await fetchProductOptions(product.id)
      });
    }
    
    return products;
  } catch (error) {
    console.error(`Error fetching products for category ${categorySlug}:`, error);
    throw error;
  }
};

// Product by ID
export const fetchProductById = async (productId: string): Promise<Product | undefined> => {
  try {
    const { data, error } = await supabase
      .from('products')
      .select(`
        *,
        category:categories(slug)
      `)
      .eq('id', productId)
      .single();
      
    if (error) throw error;
    
    if (!data) return undefined;
    
    return {
      id: data.id,
      name: data.name,
      description: data.description,
      price: data.price,
      category: data.category?.slug || '',
      image: data.image_url || '',
      featured: data.featured,
      customizable: data.customizable,
      options: await fetchProductOptions(data.id)
    };
  } catch (error) {
    console.error(`Error fetching product ${productId}:`, error);
    if ((error as any).code === 'PGRST116') {
      return undefined;
    }
    throw error;
  }
};

// Product Options
export const fetchProductOptions = async (productId: string) => {
  try {
    const { data: optionsData, error: optionsError } = await supabase
      .from('product_options')
      .select('*')
      .eq('product_id', productId);
      
    if (optionsError) throw optionsError;
    
    const options = [];
    
    for (const option of optionsData) {
      const { data: choicesData, error: choicesError } = await supabase
        .from('product_option_choices')
        .select('*')
        .eq('option_id', option.id);
        
      if (choicesError) throw choicesError;
      
      options.push({
        name: option.name,
        choices: choicesData.map((choice: any) => ({
          id: choice.id,
          name: choice.name,
          priceAdjustment: choice.price_adjustment
        }))
      });
    }
    
    return options;
  } catch (error) {
    console.error(`Error fetching options for product ${productId}:`, error);
    return [];
  }
};

// User Authentication
export const registerUser = async (email: string, password: string) => {
  try {
    const { data, error } = await supabase.auth.signUp({
      email,
      password
    });
    
    if (error) throw error;
    
    return data;
  } catch (error) {
    console.error('Error registering user:', error);
    throw error;
  }
};

export const loginUser = async (email: string, password: string) => {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    });
    
    if (error) throw error;
    
    return data;
  } catch (error) {
    console.error('Error logging in:', error);
    throw error;
  }
};

export const logoutUser = async () => {
  try {
    const { error } = await supabase.auth.signOut();
    
    if (error) throw error;
    
  } catch (error) {
    console.error('Error logging out:', error);
    throw error;
  }
};

export const getUserProfile = async () => {
  try {
    const { data: sessionData, error: sessionError } = await supabase.auth.getSession();
    
    if (sessionError) throw sessionError;
    
    if (!sessionData.session) return null;
    
    const { data: profileData, error: profileError } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', sessionData.session.user.id)
      .single();
      
    if (profileError) throw profileError;
    
    return {
      id: profileData.id,
      firstName: profileData.first_name,
      lastName: profileData.last_name,
      phone: profileData.phone,
      address: profileData.address,
      city: profileData.city,
      state: profileData.state
    };
  } catch (error) {
    console.error('Error getting user profile:', error);
    return null;
  }
};

export const updateUserProfile = async (profile: any) => {
  try {
    const { data: sessionData, error: sessionError } = await supabase.auth.getSession();
    
    if (sessionError) throw sessionError;
    
    if (!sessionData.session) throw new Error('No active session');
    
    const { error } = await supabase
      .from('profiles')
      .update({
        first_name: profile.firstName,
        last_name: profile.lastName,
        phone: profile.phone,
        address: profile.address,
        city: profile.city,
        state: profile.state
      })
      .eq('id', sessionData.session.user.id);
      
    if (error) throw error;
    
  } catch (error) {
    console.error('Error updating user profile:', error);
    throw error;
  }
};

// Orders
export const createOrder = async (orderData: any) => {
  try {
    const { data: sessionData, error: sessionError } = await supabase.auth.getSession();
    
    if (sessionError) throw sessionError;
    
    const userId = sessionData.session?.user.id;
    
    const { data: orderResult, error: orderError } = await supabase
      .from('orders')
      .insert({
        user_id: userId,
        total_amount: orderData.totalAmount,
        recipient_name: orderData.recipientName,
        recipient_email: orderData.recipientEmail,
        recipient_phone: orderData.recipientPhone,
        delivery_address: orderData.deliveryAddress,
        delivery_city: orderData.deliveryCity,
        delivery_state: orderData.deliveryState,
        payment_method: orderData.paymentMethod,
        delivery_method: orderData.deliveryMethod,
        notes: orderData.notes
      })
      .select()
      .single();
      
    if (orderError) throw orderError;
    
    // Insert order items
    const orderItems = orderData.items.map((item: any) => ({
      order_id: orderResult.id,
      product_id: item.productId,
      quantity: item.quantity,
      price: item.price,
      selected_options: item.selectedOptions
    }));
    
    const { error: itemsError } = await supabase
      .from('order_items')
      .insert(orderItems);
      
    if (itemsError) throw itemsError;
    
    return orderResult.id;
  } catch (error) {
    console.error('Error creating order:', error);
    throw error;
  }
};

export const fetchUserOrders = async () => {
  try {
    const { data: sessionData, error: sessionError } = await supabase.auth.getSession();
    
    if (sessionError) throw sessionError;
    
    if (!sessionData.session) return [];
    
    const { data: orders, error: ordersError } = await supabase
      .from('orders')
      .select('*')
      .eq('user_id', sessionData.session.user.id)
      .order('created_at', { ascending: false });
      
    if (ordersError) throw ordersError;
    
    return orders;
  } catch (error) {
    console.error('Error fetching user orders:', error);
    return [];
  }
};

export const fetchOrderDetails = async (orderId: string) => {
  try {
    const { data: sessionData, error: sessionError } = await supabase.auth.getSession();
    
    if (sessionError) throw sessionError;
    
    if (!sessionData.session) throw new Error('No active session');
    
    // Get order
    const { data: orderData, error: orderError } = await supabase
      .from('orders')
      .select('*')
      .eq('id', orderId)
      .eq('user_id', sessionData.session.user.id)
      .single();
      
    if (orderError) throw orderError;
    
    // Get order items
    const { data: itemsData, error: itemsError } = await supabase
      .from('order_items')
      .select(`
        *,
        product:products(name, image_url)
      `)
      .eq('order_id', orderId);
      
    if (itemsError) throw itemsError;
    
    return {
      order: orderData,
      items: itemsData.map((item: any) => ({
        id: item.id,
        productId: item.product_id,
        productName: item.product?.name || 'Product not available',
        productImage: item.product?.image_url || '',
        quantity: item.quantity,
        price: item.price,
        selectedOptions: item.selected_options
      }))
    };
  } catch (error) {
    console.error(`Error fetching order details for ${orderId}:`, error);
    throw error;
  }
};
