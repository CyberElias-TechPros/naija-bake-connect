
import { useState } from "react";
import MainLayout from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Phone, Mail, MapPin, Clock } from "lucide-react";
import { toast } from "@/components/ui/use-toast";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      toast({
        title: "Message sent!",
        description: "Thank you for your message. We'll get back to you shortly.",
      });
      
      setFormData({
        name: "",
        email: "",
        phone: "",
        message: "",
      });
      
      setIsSubmitting(false);
    }, 1500);
  };

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-3xl md:text-4xl font-heading font-bold mb-2 text-center">
          Contact Us
        </h1>
        <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
          Have a question about our products, need help with an order, or want to place a custom order?
          We're here to help!
        </p>

        <div className="flex flex-col lg:flex-row gap-12">
          {/* Contact Form */}
          <div className="lg:w-1/2">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-2xl font-heading font-semibold mb-6">
                Send Us a Message
              </h2>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-1">
                    Your Name
                  </label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter your full name"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-1">
                    Email Address
                  </label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter your email address"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium mb-1">
                    Phone Number
                  </label>
                  <Input
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Enter your phone number"
                  />
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium mb-1">
                    Your Message
                  </label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="How can we help you?"
                    rows={5}
                    required
                  />
                </div>
                
                <Button 
                  type="submit" 
                  disabled={isSubmitting} 
                  className="w-full bg-bakery-brown hover:bg-bakery-brown-light text-white"
                >
                  {isSubmitting ? "Sending..." : "Send Message"}
                </Button>
              </form>
            </div>
          </div>
          
          {/* Contact Information */}
          <div className="lg:w-1/2">
            <div className="bg-bakery-cream p-6 rounded-lg shadow-md h-full">
              <h2 className="text-2xl font-heading font-semibold mb-6 text-bakery-brown">
                Contact Information
              </h2>
              
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="bg-white p-3 rounded-full mr-4">
                    <MapPin className="text-bakery-brown" />
                  </div>
                  <div>
                    <h3 className="font-medium mb-1">Our Location</h3>
                    <p className="text-muted-foreground">
                      123 Bakery Street<br />
                      Victoria Island, Lagos<br />
                      Nigeria
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-white p-3 rounded-full mr-4">
                    <Phone className="text-bakery-brown" />
                  </div>
                  <div>
                    <h3 className="font-medium mb-1">Phone Number</h3>
                    <p className="text-muted-foreground">
                      <a href="tel:+2341234567890" className="hover:text-bakery-brown transition-colors">
                        +234 123 456 7890
                      </a>
                    </p>
                    <p className="text-muted-foreground">
                      <a href="tel:+2349876543210" className="hover:text-bakery-brown transition-colors">
                        +234 987 654 3210
                      </a>
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-white p-3 rounded-full mr-4">
                    <Mail className="text-bakery-brown" />
                  </div>
                  <div>
                    <h3 className="font-medium mb-1">Email Address</h3>
                    <p className="text-muted-foreground">
                      <a href="mailto:info@naijabakeconnect.com" className="hover:text-bakery-brown transition-colors">
                        info@naijabakeconnect.com
                      </a>
                    </p>
                    <p className="text-muted-foreground">
                      <a href="mailto:orders@naijabakeconnect.com" className="hover:text-bakery-brown transition-colors">
                        orders@naijabakeconnect.com
                      </a>
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-white p-3 rounded-full mr-4">
                    <Clock className="text-bakery-brown" />
                  </div>
                  <div>
                    <h3 className="font-medium mb-1">Business Hours</h3>
                    <p className="text-muted-foreground">
                      Monday - Friday: 8:00 AM - 8:00 PM<br />
                      Saturday: 9:00 AM - 6:00 PM<br />
                      Sunday: 9:00 AM - 4:00 PM
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="mt-8">
                <h3 className="font-medium mb-2">Follow Us</h3>
                <div className="flex space-x-4">
                  {['facebook', 'instagram', 'twitter'].map(social => (
                    <a 
                      key={social} 
                      href={`#${social}`}
                      className="bg-white w-10 h-10 rounded-full flex items-center justify-center hover:bg-bakery-orange hover:text-white transition-colors"
                    >
                      <span className="sr-only">{social}</span>
                      <i className={`bi bi-${social}`}></i>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Map (Placeholder) */}
        <div className="mt-12">
          <h2 className="text-2xl font-heading font-semibold mb-6">
            Find Us
          </h2>
          <div className="h-96 bg-gray-200 rounded-lg flex items-center justify-center">
            <p className="text-muted-foreground">Map will be displayed here</p>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Contact;
