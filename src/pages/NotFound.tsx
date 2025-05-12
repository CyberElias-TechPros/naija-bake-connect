
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import MainLayout from "@/components/layout/MainLayout";

const NotFound = () => {
  return (
    <MainLayout>
      <div className="min-h-[calc(100vh-300px)] flex items-center justify-center px-4 py-12">
        <div className="text-center">
          <h1 className="text-6xl font-heading font-bold text-bakery-brown mb-4">404</h1>
          <h2 className="text-2xl font-medium mb-4">Page Not Found</h2>
          <p className="text-muted-foreground mb-8 max-w-md mx-auto">
            We're sorry, the page you requested could not be found. Please check the URL or return to our homepage.
          </p>
          <Link to="/">
            <Button className="bg-bakery-brown hover:bg-bakery-brown-light text-white">
              Return Home
            </Button>
          </Link>
        </div>
      </div>
    </MainLayout>
  );
};

export default NotFound;
