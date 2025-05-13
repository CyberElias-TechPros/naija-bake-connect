
import MainLayout from "@/components/layout/MainLayout";

const About = () => {
  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-heading font-bold mb-6 text-bakery-black">
            About Fortune Cakes
          </h1>
          
          <div className="prose prose-lg max-w-none mb-8">
            <p>
              Welcome to Fortune Cakes, where we bring the rich flavors and traditions of 
              Nigerian baking directly to your doorstep. Our passion for authentic Nigerian baked goods 
              drives everything we do, from our careful selection of ingredients to our commitment to 
              exceptional customer service.
            </p>
            
            <h2>Our Story</h2>
            <p>
              Founded in 2020, Fortune Cakes began as a small home-based bakery in Lagos, 
              driven by a passion for preserving and sharing traditional Nigerian recipes. What 
              started as baking for family and friends quickly grew into a beloved local business, 
              and now we're excited to bring our products to a wider audience through our online platform.
            </p>
            
            <h2>Our Philosophy</h2>
            <p>
              At Fortune Cakes, we believe that every bite should tell a story. Our baked goods 
              celebrate Nigeria's rich culinary heritage while embracing innovation. We source our 
              ingredients locally whenever possible, supporting Nigerian farmers and producers while 
              ensuring the freshest, highest quality products for our customers.
            </p>
            
            <h2>Our Products</h2>
            <p>
              From traditional Agege bread to celebration cakes for special occasions, our diverse 
              range of products caters to all tastes and preferences. We take pride in offering both 
              classic Nigerian favorites and contemporary creations that blend traditional techniques 
              with modern flavors.
            </p>
            
            <h2>Our Commitment</h2>
            <p>
              Quality, authenticity, and customer satisfaction are at the heart of everything we do. 
              We're committed to delivering not just delicious baked goods, but an exceptional experience 
              from browsing our products to enjoying the last bite.
            </p>
            
            <p>
              We invite you to explore our products and taste the difference that passion, tradition, and 
              quality ingredients make. Thank you for choosing Fortune Cakes!
            </p>
          </div>
        </div>
        
        {/* Team Section */}
        <div className="max-w-4xl mx-auto mt-16">
          <h2 className="text-2xl md:text-3xl font-heading font-bold mb-6 text-center text-bakery-black">
            Meet Our Team
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                name: 'Sarah Adeyemi',
                role: 'Founder & Head Baker',
                bio: 'With over 15 years of baking experience, Sarah brings her grandmother\'s recipes and techniques to every creation.'
              },
              {
                name: 'Emmanuel Okonkwo',
                role: 'Operations Manager',
                bio: 'Emmanuel ensures our bakery runs smoothly, from ingredient sourcing to quality control and delivery logistics.'
              },
              {
                name: 'Blessing Nwosu',
                role: 'Customer Experience',
                bio: 'Blessing is dedicated to making sure every customer receives outstanding service and satisfaction.'
              }
            ].map((member, index) => (
              <div key={index} className="text-center">
                <div className="w-40 h-40 rounded-full bg-bakery-pink-light mx-auto mb-4 flex items-center justify-center">
                  <span className="text-4xl text-bakery-pink-dark">{member.name.charAt(0)}</span>
                </div>
                <h3 className="text-xl font-semibold text-bakery-black">{member.name}</h3>
                <p className="text-bakery-pink mb-2">{member.role}</p>
                <p className="text-muted-foreground">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default About;
