import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Header } from '@/components/Header';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CartDrawer } from '@/components/CartDrawer';
import { useToast } from '@/hooks/use-toast';

interface Product {
  id: string;
  name: string;
  price: number;
  images: string[];
  rating: number;
  reviewCount: number;
  discount?: number;
  badge?: string;
  description: string;
  features: string[];
  specifications: { [key: string]: string };
  inStock: boolean;
  stockCount: number;
}

interface CartItem {
  id: string;
  name: string;
  price: number;
  image: string;
  rating: number;
  reviewCount: number;
  discount?: number;
  badge?: string;
  quantity: number;
}

// Mock product data - in a real app, this would be fetched based on the ID
const mockProduct: Product = {
  id: '1',
  name: 'Wireless Bluetooth Headphones',
  price: 79.99,
  images: [
    'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&h=600&fit=crop',
    'https://images.unsplash.com/photo-1583394838336-acd977736f90?w=600&h=600&fit=crop',
    'https://images.unsplash.com/photo-1484704849700-f032a568e944?w=600&h=600&fit=crop'
  ],
  rating: 4.5,
  reviewCount: 128,
  discount: 20,
  badge: 'Best Seller',
  description: 'Experience premium sound quality with these wireless Bluetooth headphones. Featuring advanced noise cancellation technology and up to 30 hours of battery life, these headphones are perfect for music lovers and professionals alike.',
  features: [
    'Active Noise Cancellation',
    '30-hour battery life',
    'Quick charge: 5 minutes = 3 hours playback',
    'Premium comfort design',
    'High-resolution audio support',
    'Built-in microphone for calls'
  ],
  specifications: {
    'Driver Size': '40mm',
    'Frequency Response': '20Hz - 20kHz',
    'Impedance': '32 Ohm',
    'Battery Life': '30 hours',
    'Charging Time': '2 hours',
    'Bluetooth Version': '5.0',
    'Weight': '250g'
  },
  inStock: true,
  stockCount: 15
};

const reviews = [
  {
    id: 1,
    author: 'John D.',
    rating: 5,
    comment: 'Amazing sound quality and comfort. Worth every penny!',
    date: '2024-01-15'
  },
  {
    id: 2,
    author: 'Sarah M.',
    rating: 4,
    comment: 'Great headphones, but the case could be better.',
    date: '2024-01-10'
  },
  {
    id: 3,
    author: 'Mike R.',
    rating: 5,
    comment: 'Best purchase I\'ve made this year. Highly recommend!',
    date: '2024-01-05'
  }
];

export default function ProductDetail() {
  const { id } = useParams();
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const { toast } = useToast();

  const product = mockProduct; // In a real app, fetch product by id

  const handleAddToCart = () => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === product.id);
      if (existingItem) {
        return prevItems.map(item =>
          item.id === product.id 
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prevItems, { 
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.images[0],
        rating: product.rating,
        reviewCount: product.reviewCount,
        discount: product.discount,
        badge: product.badge,
        quantity 
      }];
    });
    
    toast({
      title: "Added to cart",
      description: `${quantity} ${product.name} added to your cart.`,
    });
  };

  const handleUpdateQuantity = (id: string, newQuantity: number) => {
    if (newQuantity === 0) {
      setCartItems(prevItems => prevItems.filter(item => item.id !== id));
    } else {
      setCartItems(prevItems =>
        prevItems.map(item =>
          item.id === id ? { ...item, quantity: newQuantity } : item
        )
      );
    }
  };

  const handleRemoveItem = (id: string) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== id));
  };

  const cartItemsCount = cartItems.reduce((total, item) => total + item.quantity, 0);
  const discountedPrice = product.discount ? product.price * (1 - product.discount / 100) : product.price;

  const renderStars = (rating: number) => {
    return '★★★★★'.slice(0, Math.floor(rating)) + '☆☆☆☆☆'.slice(Math.floor(rating));
  };

  return (
    <div className="min-h-screen bg-background">
      <Header cartItemsCount={cartItemsCount} onCartClick={() => setIsCartOpen(true)} />
      
      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="aspect-square rounded-lg overflow-hidden bg-muted">
              <img
                src={product.images[selectedImage]}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="grid grid-cols-3 gap-2">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`aspect-square rounded-lg overflow-hidden border-2 ${
                    selectedImage === index ? 'border-primary' : 'border-border'
                  }`}
                >
                  <img
                    src={image}
                    alt={`${product.name} view ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              {product.badge && (
                <Badge className="mb-2">{product.badge}</Badge>
              )}
              <h1 className="text-3xl font-bold text-foreground">{product.name}</h1>
              <div className="flex items-center gap-2 mt-2">
                <span className="text-yellow-500">{renderStars(product.rating)}</span>
                <span className="text-sm text-muted-foreground">
                  {product.rating} ({product.reviewCount} reviews)
                </span>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-3">
                {product.discount && (
                  <span className="text-2xl font-bold text-destructive line-through">
                    ${product.price.toFixed(2)}
                  </span>
                )}
                <span className="text-3xl font-bold text-foreground">
                  ${discountedPrice.toFixed(2)}
                </span>
                {product.discount && (
                  <Badge variant="destructive">{product.discount}% OFF</Badge>
                )}
              </div>
              <p className="text-muted-foreground">{product.description}</p>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <label htmlFor="quantity" className="font-medium">
                  Quantity:
                </label>
                <div className="flex items-center border border-border rounded-md">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-3 py-1 hover:bg-muted"
                  >
                    -
                  </button>
                  <span className="px-4 py-1 border-x border-border">{quantity}</span>
                  <button
                    onClick={() => setQuantity(Math.min(product.stockCount, quantity + 1))}
                    className="px-3 py-1 hover:bg-muted"
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className={`w-2 h-2 rounded-full ${product.inStock ? 'bg-green-500' : 'bg-red-500'}`}></span>
                <span className="text-sm">
                  {product.inStock ? `In Stock (${product.stockCount} available)` : 'Out of Stock'}
                </span>
              </div>

              <div className="flex gap-4">
                <Button 
                  onClick={handleAddToCart} 
                  disabled={!product.inStock}
                  className="flex-1"
                >
                  Add to Cart
                </Button>
                <Button variant="outline" className="px-8">
                  Buy Now
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Product Details Tabs */}
        <Tabs defaultValue="features" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="features">Features</TabsTrigger>
            <TabsTrigger value="specifications">Specifications</TabsTrigger>
            <TabsTrigger value="reviews">Reviews</TabsTrigger>
          </TabsList>
          
          <TabsContent value="features" className="mt-8">
            <Card>
              <CardHeader>
                <CardTitle>Product Features</CardTitle>
                <CardDescription>Key features and benefits of this product</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {product.features.map((feature, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <span className="text-primary">✓</span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="specifications" className="mt-8">
            <Card>
              <CardHeader>
                <CardTitle>Technical Specifications</CardTitle>
                <CardDescription>Detailed technical information</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {Object.entries(product.specifications).map(([key, value]) => (
                    <div key={key} className="flex justify-between p-3 bg-muted rounded-lg">
                      <span className="font-medium">{key}:</span>
                      <span>{value}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="reviews" className="mt-8">
            <Card>
              <CardHeader>
                <CardTitle>Customer Reviews</CardTitle>
                <CardDescription>See what our customers are saying</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {reviews.map((review) => (
                    <div key={review.id} className="border-b border-border pb-4 last:border-b-0">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <span className="font-medium">{review.author}</span>
                          <span className="text-yellow-500">{renderStars(review.rating)}</span>
                        </div>
                        <span className="text-sm text-muted-foreground">{review.date}</span>
                      </div>
                      <p className="text-muted-foreground">{review.comment}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
      />
    </div>
  );
}