
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { fetchAllProducts, fetchProductsByCategory, fetchCategories } from '@/services/supabaseService';
import { Product, Category } from '@/types';
import ProductCard from '@/components/products/ProductCard';
import MainLayout from '@/components/layout/MainLayout';
import { Filter, Search, SlidersHorizontal, Grid, List } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const Products = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState('name');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [priceRange, setPriceRange] = useState('all');

  const categoryParam = searchParams.get('category');

  useEffect(() => {
    // Set page title and meta description for SEO
    const categoryName = categories.find(c => c.slug === categoryParam)?.name;
    const title = categoryParam 
      ? `${categoryName || 'Products'} - Fortune Cakes Port Harcourt | Nigerian Bakery`
      : 'All Products - Fortune Cakes Port Harcourt | Fresh Nigerian Baked Goods';
    
    document.title = title;
    
    const metaDescription = document.querySelector('meta[name="description"]');
    const description = categoryParam 
      ? `Shop ${categoryName?.toLowerCase() || 'products'} from Fortune Cakes in Port Harcourt. Fresh Nigerian baked goods delivered across Rivers State.`
      : 'Browse all products from Fortune Cakes - Port Harcourt\'s premier bakery. Wedding cakes, birthday cakes, chin chin, meat pies, pastries and more with delivery across Rivers State.';
    
    if (metaDescription) {
      metaDescription.setAttribute('content', description);
    }
  }, [categoryParam, categories]);

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      try {
        const categoriesData = await fetchCategories();
        setCategories(categoriesData);

        let productsData: Product[];
        if (categoryParam) {
          productsData = await fetchProductsByCategory(categoryParam);
        } else {
          productsData = await fetchAllProducts();
        }
        setProducts(productsData);
      } catch (error) {
        console.error('Error loading products:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, [categoryParam]);

  const handleCategoryFilter = (slug: string) => {
    if (slug === 'all') {
      searchParams.delete('category');
    } else {
      searchParams.set('category', slug);
    }
    setSearchParams(searchParams);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleSortChange = (value: string) => {
    setSortBy(value);
  };

  const handlePriceRangeChange = (value: string) => {
    setPriceRange(value);
  };

  const filteredAndSortedProducts = products
    .filter((product) =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .filter((product) => {
      if (priceRange === 'all') return true;
      const price = product.price;
      switch (priceRange) {
        case 'under-2000':
          return price < 2000;
        case '2000-5000':
          return price >= 2000 && price <= 5000;
        case '5000-10000':
          return price >= 5000 && price <= 10000;
        case 'over-10000':
          return price > 10000;
        default:
          return true;
      }
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'name':
          return a.name.localeCompare(b.name);
        case 'featured':
          return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
        default:
          return 0;
      }
    });

  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };

  const categoryName = categories.find(c => c.slug === categoryParam)?.name;

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8">
        
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-heading font-bold mb-2">
            {categoryParam 
              ? `${categoryName || 'Products'}`
              : 'All Products'
            }
          </h1>
          <p className="text-muted-foreground">
            {categoryParam 
              ? `Discover our freshly baked ${categoryName?.toLowerCase() || 'products'} delivered across Port Harcourt`
              : 'Discover our freshly baked Nigerian delicacies delivered across Port Harcourt and Rivers State'
            }
          </p>
          {!isLoading && (
            <p className="text-sm text-gray-600 mt-2">
              Showing {filteredAndSortedProducts.length} of {products.length} products
            </p>
          )}
        </div>

        {/* Search and Filter Controls */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row gap-4 mb-4">
            
            {/* Search */}
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <Input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={handleSearchChange}
                className="pl-10 focus:ring-bakery-pink focus:border-bakery-pink"
              />
            </div>
            
            {/* Sort */}
            <Select value={sortBy} onValueChange={handleSortChange}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="name">Name (A-Z)</SelectItem>
                <SelectItem value="price-low">Price (Low to High)</SelectItem>
                <SelectItem value="price-high">Price (High to Low)</SelectItem>
                <SelectItem value="featured">Featured First</SelectItem>
              </SelectContent>
            </Select>
            
            {/* View Mode */}
            <div className="flex bg-gray-100 rounded-lg p-1">
              <Button
                variant={viewMode === 'grid' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('grid')}
                className={viewMode === 'grid' ? 'bg-bakery-pink text-white' : ''}
              >
                <Grid size={16} />
              </Button>
              <Button
                variant={viewMode === 'list' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('list')}
                className={viewMode === 'list' ? 'bg-bakery-pink text-white' : ''}
              >
                <List size={16} />
              </Button>
            </div>
            
            {/* Filter Toggle */}
            <Button 
              onClick={toggleFilters}
              variant="outline"
              className="md:w-auto flex items-center gap-2"
            >
              <SlidersHorizontal size={18} />
              <span>Filters</span>
            </Button>
          </div>

          {/* Filter Panel */}
          {(showFilters || window.innerWidth >= 768) && (
            <div className="bg-white border rounded-lg p-4 space-y-4">
              
              {/* Categories */}
              <div>
                <h3 className="font-medium mb-3">Categories</h3>
                <div className="flex flex-wrap gap-2">
                  <Button
                    variant={!categoryParam ? "default" : "outline"}
                    size="sm"
                    onClick={() => handleCategoryFilter('all')}
                    className={!categoryParam ? "bg-bakery-pink text-white" : ""}
                  >
                    All
                  </Button>
                  {categories.map((category) => (
                    <Button
                      key={category.id}
                      variant={categoryParam === category.slug ? "default" : "outline"}
                      size="sm"
                      onClick={() => handleCategoryFilter(category.slug)}
                      className={categoryParam === category.slug ? "bg-bakery-pink text-white" : ""}
                    >
                      {category.name}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Price Range */}
              <div>
                <h3 className="font-medium mb-3">Price Range</h3>
                <Select value={priceRange} onValueChange={handlePriceRangeChange}>
                  <SelectTrigger className="w-full md:w-48">
                    <SelectValue placeholder="All Prices" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Prices</SelectItem>
                    <SelectItem value="under-2000">Under ₦2,000</SelectItem>
                    <SelectItem value="2000-5000">₦2,000 - ₦5,000</SelectItem>
                    <SelectItem value="5000-10000">₦5,000 - ₦10,000</SelectItem>
                    <SelectItem value="over-10000">Over ₦10,000</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}
        </div>

        {/* Products Grid/List */}
        {isLoading ? (
          <div className={`grid ${viewMode === 'grid' 
            ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' 
            : 'grid-cols-1'
          } gap-6`}>
            {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
              <div key={item} className="animate-pulse">
                <div className="bg-gray-200 aspect-square rounded-lg"></div>
                <div className="mt-2 h-4 bg-gray-200 rounded w-2/3"></div>
                <div className="mt-2 h-4 bg-gray-200 rounded w-1/3"></div>
              </div>
            ))}
          </div>
        ) : filteredAndSortedProducts.length > 0 ? (
          <div className={`grid ${viewMode === 'grid' 
            ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' 
            : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-1'
          } gap-6`}>
            {filteredAndSortedProducts.map((product) => (
              <ProductCard 
                key={product.id} 
                product={product} 
                viewMode={viewMode}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="max-w-md mx-auto">
              <div className="bg-gray-100 rounded-full p-8 w-24 h-24 mx-auto mb-4 flex items-center justify-center">
                <Search className="text-gray-400" size={32} />
              </div>
              <h3 className="text-xl font-medium mb-2">No products found</h3>
              <p className="text-muted-foreground mb-4">
                Try adjusting your search or filters to find what you're looking for.
              </p>
              <div className="flex flex-wrap justify-center gap-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => setSearchQuery('')}
                  className="hover:bg-bakery-pink/10"
                >
                  Clear Search
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => {
                    setPriceRange('all');
                    handleCategoryFilter('all');
                  }}
                  className="hover:bg-bakery-pink/10"
                >
                  Clear Filters
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Featured Categories CTA */}
        {!categoryParam && !searchQuery && (
          <section className="mt-16 bg-bakery-white-cream rounded-lg p-8">
            <div className="text-center">
              <h2 className="text-2xl font-heading font-bold mb-4 text-bakery-black">
                Looking for Something Specific?
              </h2>
              <p className="text-gray-700 mb-6">
                Browse our specialized categories to find exactly what you need for your occasion.
              </p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {categories.slice(0, 4).map((category) => (
                  <Button
                    key={category.id}
                    variant="outline"
                    onClick={() => handleCategoryFilter(category.slug)}
                    className="h-20 flex flex-col items-center justify-center hover:bg-bakery-pink hover:text-white transition-all duration-300"
                  >
                    <span className="font-medium">{category.name}</span>
                  </Button>
                ))}
              </div>
            </div>
          </section>
        )}
      </div>
    </MainLayout>
  );
};

export default Products;
