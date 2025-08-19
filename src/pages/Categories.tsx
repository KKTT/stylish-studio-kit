import { Header } from '@/components/Header';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useState } from 'react';
import { CartDrawer } from '@/components/CartDrawer';

interface Category {
  id: string;
  name: string;
  description: string;
  image: string;
  productCount: number;
  trending?: boolean;
}

const categories: Category[] = [
  {
    id: '1',
    name: 'Electronics',
    description: 'Latest gadgets and electronic devices',
    image: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?w=400&h=300&fit=crop',
    productCount: 156,
    trending: true
  },
  {
    id: '2',
    name: 'Clothing & Fashion',
    description: 'Trendy apparel and accessories',
    image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&h=300&fit=crop',
    productCount: 234
  },
  {
    id: '3',
    name: 'Home & Garden',
    description: 'Everything for your home and outdoor space',
    image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop',
    productCount: 189,
    trending: true
  },
  {
    id: '4',
    name: 'Sports & Outdoors',
    description: 'Gear for active lifestyle and adventures',
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop',
    productCount: 98
  },
  {
    id: '5',
    name: 'Books & Media',
    description: 'Books, movies, music and educational content',
    image: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=300&fit=crop',
    productCount: 67
  },
  {
    id: '6',
    name: 'Beauty & Health',
    description: 'Personal care and wellness products',
    image: 'https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?w=400&h=300&fit=crop',
    productCount: 145
  }
];

export default function Categories() {
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <Header cartItemsCount={0} onCartClick={() => setIsCartOpen(true)} />
      
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-4">Product Categories</h1>
          <p className="text-muted-foreground text-lg">Browse our organized product categories to find exactly what you need</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) => (
            <Card key={category.id} className="group hover:shadow-lg transition-all duration-300 cursor-pointer">
              <div className="relative overflow-hidden rounded-t-lg">
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                {category.trending && (
                  <Badge className="absolute top-3 right-3 bg-destructive text-destructive-foreground">
                    Trending
                  </Badge>
                )}
              </div>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-xl">{category.name}</CardTitle>
                  <Badge variant="secondary">
                    {category.productCount} items
                  </Badge>
                </div>
                <CardDescription>{category.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">
                    {category.productCount} products available
                  </span>
                  <button className="text-primary hover:text-primary/80 font-medium text-sm">
                    Browse →
                  </button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Featured Categories Section */}
        <section className="mt-16">
          <h2 className="text-2xl font-bold text-foreground mb-6">Featured Collections</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="relative rounded-lg overflow-hidden bg-gradient-to-r from-primary/10 to-secondary/10 p-8">
              <div className="relative z-10">
                <h3 className="text-2xl font-bold text-foreground mb-2">New Arrivals</h3>
                <p className="text-muted-foreground mb-4">Discover the latest products across all categories</p>
                <button className="bg-primary text-primary-foreground px-6 py-2 rounded-md hover:bg-primary/90 transition-colors">
                  Explore New Items
                </button>
              </div>
            </div>
            
            <div className="relative rounded-lg overflow-hidden bg-gradient-to-r from-accent/10 to-primary/10 p-8">
              <div className="relative z-10">
                <h3 className="text-2xl font-bold text-foreground mb-2">Best Sellers</h3>
                <p className="text-muted-foreground mb-4">Shop our most popular products loved by customers</p>
                <button className="bg-accent text-accent-foreground px-6 py-2 rounded-md hover:bg-accent/90 transition-colors">
                  View Best Sellers
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={() => {}}
        onRemoveItem={() => {}}
      />
    </div>
  );
}