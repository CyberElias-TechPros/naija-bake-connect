
import { useState, useEffect } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { MapPin, Phone, Mail, Clock, MessageCircle, Send } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    document.title = 'Contact Fortune Cakes - Nigerian Bakery in Port Harcourt | Get in Touch';
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Contact Fortune Cakes in Port Harcourt for custom cake orders, catering services, and bakery inquiries. Visit us on NTA-Rumuokwuta Road or call us today.');
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Simulate form submission - in production, this would connect to a backend service
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "Message sent successfully!",
        description: "Thank you for contacting Fortune Cakes. We'll get back to you within 24 hours.",
      });
      
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
      });
    } catch (error) {
      toast({
        title: "Error sending message",
        description: "Please try again or call us directly.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: MapPin,
      title: 'Our Location',
      content: [
        'NTA-Rumuokwuta Road',
        'Port Harcourt, Rivers State',
        'Nigeria'
      ],
      action: {
        text: 'Get Directions',
        href: 'https://maps.google.com/?q=NTA+Rumuokwuta+Road+Port+Harcourt'
      }
    },
    {
      icon: Phone,
      title: 'Phone Numbers',
      content: [
        '+234 (0) 803 123 4567',
        '+234 (0) 901 234 5678'
      ],
      action: {
        text: 'Call Now',
        href: 'tel:+2348031234567'
      }
    },
    {
      icon: Mail,
      title: 'Email Address',
      content: [
        'orders@fortunecakes.ng',
        'info@fortunecakes.ng'
      ],
      action: {
        text: 'Send Email',
        href: 'mailto:orders@fortunecakes.ng'
      }
    },
    {
      icon: Clock,
      title: 'Business Hours',
      content: [
        'Mon - Sat: 7:00 AM - 8:00 PM',
        'Sunday: 10:00 AM - 6:00 PM',
        '24/7 Online Orders'
      ],
      action: {
        text: 'Order Online',
        href: '/products'
      }
    }
  ];

  const serviceAreas = [
    'Port Harcourt City',
    'Old GRA & New GRA',
    'Trans-Amadi Industrial Layout',
    'Rumuola & Rumuokwuta',
    'D-Line & Mile 1-4',
    'Elekahia & Woji',
    'Ada George & Oyigbo',
    'Obio-Akpor LGA',
    'Eleme & Ikwerre',
    'Other Rivers State Areas'
  ];

  return (
    <MainLayout>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-bakery-pink to-bakery-pink-dark text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-heading font-bold mb-4">
            Contact Fortune Cakes
          </h1>
          <p className="text-xl max-w-2xl mx-auto">
            We'd love to hear from you! Get in touch for custom orders, catering services, 
            or any questions about our delicious Nigerian baked goods.
          </p>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {contactInfo.map((info, index) => {
              const IconComponent = info.icon;
              return (
                <div key={index} className="bg-white p-6 rounded-lg shadow-md text-center hover:shadow-lg transition-shadow">
                  <div className="bg-bakery-pink/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <IconComponent className="text-bakery-pink" size={24} />
                  </div>
                  <h3 className="text-lg font-heading font-semibold mb-3 text-bakery-black">
                    {info.title}
                  </h3>
                  <div className="text-gray-600 space-y-1 mb-4">
                    {info.content.map((line, idx) => (
                      <p key={idx}>{line}</p>
                    ))}
                  </div>
                  <a 
                    href={info.action.href}
                    className="text-bakery-pink hover:text-bakery-pink-dark font-medium transition-colors"
                    {...(info.action.href.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                  >
                    {info.action.text}
                  </a>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Contact Form & Service Areas */}
      <section className="py-16 bg-bakery-white-cream">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            
            {/* Contact Form */}
            <div className="bg-white p-8 rounded-lg shadow-md">
              <div className="flex items-center mb-6">
                <MessageCircle className="text-bakery-pink mr-3" size={28} />
                <h2 className="text-2xl font-heading font-bold text-bakery-black">
                  Send Us a Message
                </h2>
              </div>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block text-gray-700 font-medium mb-2">
                      Full Name *
                    </label>
                    <Input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      placeholder="Enter your full name"
                      className="focus:ring-bakery-pink focus:border-bakery-pink"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="phone" className="block text-gray-700 font-medium mb-2">
                      Phone Number *
                    </label>
                    <Input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      placeholder="+234 XXX XXX XXXX"
                      className="focus:ring-bakery-pink focus:border-bakery-pink"
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
                    Email Address *
                  </label>
                  <Input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="your@email.com"
                    className="focus:ring-bakery-pink focus:border-bakery-pink"
                  />
                </div>
                
                <div>
                  <label htmlFor="subject" className="block text-gray-700 font-medium mb-2">
                    Subject *
                  </label>
                  <Input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    placeholder="What's this about?"
                    className="focus:ring-bakery-pink focus:border-bakery-pink"
                  />
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-gray-700 font-medium mb-2">
                    Message *
                  </label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    placeholder="Tell us about your order, event, or question..."
                    className="focus:ring-bakery-pink focus:border-bakery-pink"
                  />
                </div>
                
                <Button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="w-full bg-bakery-pink hover:bg-bakery-pink-dark text-white py-3 flex items-center justify-center"
                >
                  {isSubmitting ? (
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  ) : (
                    <Send size={18} className="mr-2" />
                  )}
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </Button>
              </form>
            </div>

            {/* Service Areas & Additional Info */}
            <div className="space-y-8">
              
              {/* Service Areas */}
              <div className="bg-white p-8 rounded-lg shadow-md">
                <h3 className="text-2xl font-heading font-bold mb-6 text-bakery-black">
                  Delivery Areas
                </h3>
                <p className="text-gray-700 mb-4">
                  We proudly deliver fresh baked goods across Port Harcourt and Rivers State:
                </p>
                <div className="grid grid-cols-2 gap-2">
                  {serviceAreas.map((area, index) => (
                    <div key={index} className="flex items-center">
                      <div className="w-2 h-2 bg-bakery-pink rounded-full mr-2 flex-shrink-0"></div>
                      <span className="text-sm text-gray-700">{area}</span>
                    </div>
                  ))}
                </div>
                <p className="text-sm text-gray-600 mt-4">
                  Don't see your area? Contact us - we may have special delivery options available!
                </p>
              </div>

              {/* Quick Order Info */}
              <div className="bg-bakery-pink/5 p-8 rounded-lg border-l-4 border-bakery-pink">
                <h3 className="text-xl font-heading font-bold mb-4 text-bakery-black">
                  Need to Order Quickly?
                </h3>
                <div className="space-y-3 text-gray-700">
                  <p className="flex items-center">
                    <Phone size={16} className="text-bakery-pink mr-2" />
                    <strong>Call:</strong> +234 (0) 803 123 4567
                  </p>
                  <p className="flex items-center">
                    <MessageCircle size={16} className="text-bakery-pink mr-2" />
                    <strong>WhatsApp:</strong> +234 (0) 803 123 4567
                  </p>
                  <p className="flex items-center">
                    <Mail size={16} className="text-bakery-pink mr-2" />
                    <strong>Email:</strong> orders@fortunecakes.ng
                  </p>
                </div>
                <p className="text-sm text-gray-600 mt-4">
                  For urgent orders, calling is fastest. We typically respond to emails and WhatsApp within 2 hours during business hours.
                </p>
              </div>

              {/* Business Hours Highlight */}
              <div className="bg-bakery-black text-white p-8 rounded-lg">
                <h3 className="text-xl font-heading font-bold mb-4">
                  Visit Our Bakery
                </h3>
                <p className="mb-4">
                  Experience the aroma and warmth of fresh baking at our Port Harcourt location.
                </p>
                <div className="space-y-2 text-sm">
                  <p><strong>Address:</strong> NTA-Rumuokwuta Road, Port Harcourt</p>
                  <p><strong>Hours:</strong> Mon-Sat 7AM-8PM, Sun 10AM-6PM</p>
                  <p><strong>Parking:</strong> Available on-site</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section Placeholder */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-heading font-bold text-center mb-8 text-bakery-black">
            Find Us in Port Harcourt
          </h2>
          <div className="bg-gray-200 h-64 rounded-lg flex items-center justify-center">
            <div className="text-center text-gray-600">
              <MapPin size={48} className="mx-auto mb-4 text-bakery-pink" />
              <p className="text-lg font-medium">Interactive Map Coming Soon</p>
              <p className="text-sm">NTA-Rumuokwuta Road, Port Harcourt, Rivers State</p>
              <a 
                href="https://maps.google.com/?q=NTA+Rumuokwuta+Road+Port+Harcourt"
                target="_blank"
                rel="noopener noreferrer"
                className="text-bakery-pink hover:text-bakery-pink-dark font-medium mt-2 inline-block"
              >
                View on Google Maps →
              </a>
            </div>
          </div>
        </div>
      </section>
    </MainLayout>
  );
};

export default Contact;
