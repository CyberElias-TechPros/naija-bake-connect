
import { useState } from "react";
import MainLayout from "@/components/layout/MainLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";

const Account = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginForm, setLoginForm] = useState({ email: "", password: "" });
  const [signupForm, setSignupForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleLoginChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoginForm({
      ...loginForm,
      [e.target.name]: e.target.value,
    });
  };

  const handleSignupChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSignupForm({
      ...signupForm,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate login
    setIsLoggedIn(true);
    toast({
      title: "Logged in successfully",
      description: "Welcome back to NaijaBakeConnect!",
    });
  };

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    // Validation
    if (signupForm.password !== signupForm.confirmPassword) {
      toast({
        title: "Password mismatch",
        description: "Passwords do not match. Please try again.",
        variant: "destructive",
      });
      return;
    }
    
    // Simulate signup
    setIsLoggedIn(true);
    toast({
      title: "Account created successfully",
      description: "Welcome to NaijaBakeConnect!",
    });
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    toast({
      title: "Logged out successfully",
      description: "You have been logged out of your account.",
    });
  };

  if (isLoggedIn) {
    return (
      <MainLayout>
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-3xl font-heading font-bold mb-6">My Account</h1>
            
            <div className="bg-white rounded-lg shadow-md p-6 mb-8">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-xl font-semibold">Account Information</h2>
                  <p className="text-muted-foreground">Manage your personal information</p>
                </div>
                <Button variant="outline" onClick={handleLogout}>
                  Log Out
                </Button>
              </div>
              
              <div className="divide-y">
                <div className="py-4">
                  <p className="text-sm text-muted-foreground">Name</p>
                  <p className="font-medium">John Doe</p>
                </div>
                <div className="py-4">
                  <p className="text-sm text-muted-foreground">Email</p>
                  <p className="font-medium">johndoe@example.com</p>
                </div>
                <div className="py-4">
                  <p className="text-sm text-muted-foreground">Phone</p>
                  <p className="font-medium">+234 123 456 7890</p>
                </div>
                <div className="py-4">
                  <p className="text-sm text-muted-foreground">Default Address</p>
                  <p className="font-medium">123 Main Street, Lagos, Nigeria</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold mb-4">Recent Orders</h2>
              
              <div className="divide-y">
                {[1, 2, 3].map((order) => (
                  <div key={order} className="py-4 flex flex-col md:flex-row md:items-center md:justify-between">
                    <div>
                      <p className="font-medium">Order #{order}12345</p>
                      <p className="text-sm text-muted-foreground">Placed on May {order + 5}, 2023</p>
                      <p className="text-sm">3 items - ₦12,{order}00</p>
                    </div>
                    <div className="mt-2 md:mt-0">
                      <span className="inline-block px-2 py-1 text-xs rounded-full bg-green-100 text-green-800">
                        {order === 1 ? 'Delivered' : order === 2 ? 'Processing' : 'Pending'}
                      </span>
                      <Button variant="link" className="text-bakery-brown p-0 h-auto ml-2">
                        View Details
                      </Button>
                    </div>
                  </div>
                ))}
                
                {/* No orders state */}
                {false && (
                  <div className="py-8 text-center">
                    <p className="text-muted-foreground">You haven't placed any orders yet.</p>
                    <Button variant="link" className="text-bakery-brown mt-2">
                      Start Shopping
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-md mx-auto">
          <h1 className="text-3xl font-heading font-bold mb-6 text-center">Account Access</h1>
          
          <div className="bg-white rounded-lg shadow-md p-6">
            <Tabs defaultValue="login">
              <TabsList className="grid grid-cols-2 mb-6">
                <TabsTrigger value="login">Login</TabsTrigger>
                <TabsTrigger value="signup">Sign Up</TabsTrigger>
              </TabsList>
              
              <TabsContent value="login">
                <form onSubmit={handleLogin} className="space-y-4">
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium mb-1">
                      Email Address
                    </label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={loginForm.email}
                      onChange={handleLoginChange}
                      placeholder="Enter your email"
                      required
                    />
                  </div>
                  
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <label htmlFor="password" className="block text-sm font-medium">
                        Password
                      </label>
                      <a href="#" className="text-xs text-bakery-brown hover:underline">
                        Forgot Password?
                      </a>
                    </div>
                    <Input
                      id="password"
                      name="password"
                      type="password"
                      value={loginForm.password}
                      onChange={handleLoginChange}
                      placeholder="Enter your password"
                      required
                    />
                  </div>
                  
                  <Button 
                    type="submit" 
                    className="w-full bg-bakery-brown hover:bg-bakery-brown-light text-white"
                  >
                    Login
                  </Button>
                </form>
              </TabsContent>
              
              <TabsContent value="signup">
                <form onSubmit={handleSignup} className="space-y-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium mb-1">
                      Full Name
                    </label>
                    <Input
                      id="name"
                      name="name"
                      value={signupForm.name}
                      onChange={handleSignupChange}
                      placeholder="Enter your full name"
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="signup-email" className="block text-sm font-medium mb-1">
                      Email Address
                    </label>
                    <Input
                      id="signup-email"
                      name="email"
                      type="email"
                      value={signupForm.email}
                      onChange={handleSignupChange}
                      placeholder="Enter your email"
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="signup-password" className="block text-sm font-medium mb-1">
                      Password
                    </label>
                    <Input
                      id="signup-password"
                      name="password"
                      type="password"
                      value={signupForm.password}
                      onChange={handleSignupChange}
                      placeholder="Create a password"
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="confirm-password" className="block text-sm font-medium mb-1">
                      Confirm Password
                    </label>
                    <Input
                      id="confirm-password"
                      name="confirmPassword"
                      type="password"
                      value={signupForm.confirmPassword}
                      onChange={handleSignupChange}
                      placeholder="Confirm your password"
                      required
                    />
                  </div>
                  
                  <Button 
                    type="submit" 
                    className="w-full bg-bakery-brown hover:bg-bakery-brown-light text-white"
                  >
                    Create Account
                  </Button>
                </form>
              </TabsContent>
            </Tabs>
            
            <div className="mt-6 pt-6 border-t text-sm text-center text-muted-foreground">
              <p>By logging in or creating an account, you agree to our</p>
              <div className="flex justify-center gap-2 mt-1">
                <a href="#" className="text-bakery-brown hover:underline">Terms of Service</a>
                <span>&</span>
                <a href="#" className="text-bakery-brown hover:underline">Privacy Policy</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Account;
