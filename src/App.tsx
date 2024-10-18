import React, { useState } from 'react';
import { ShoppingCart, Search, Menu, X, Star } from 'lucide-react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import CartPage from './components/CartPage';

const products = [
  { id: 1, name: 'Stylish Watch', price: 199.99, rating: 4.5, image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80' },
  { id: 2, name: 'Leather Bag', price: 149.99, rating: 4.2, image: 'https://images.unsplash.com/photo-1547949003-9792a18a2601?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80' },
  { id: 3, name: 'Sunglasses', price: 89.99, rating: 4.0, image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80' },
  { id: 4, name: 'Sneakers', price: 129.99, rating: 4.7, image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80' },
];

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [cartItems, setCartItems] = useState<typeof products>([]);
  const [filteredProducts, setFilteredProducts] = useState(products);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const filtered = products.filter(product =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredProducts(filtered);
    setIsSearchOpen(false);
  };

  const addToCart = (productId: number) => {
    const productToAdd = products.find(product => product.id === productId);
    if (productToAdd) {
      setCartItems([...cartItems, productToAdd]);
    }
  };

  const removeFromCart = (productId: number) => {
    setCartItems(cartItems.filter(item => item.id !== productId));
  };

  const Header = () => (
    <header className="bg-white shadow-md sticky top-0 z-10">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center">
          <Link to="/">
            <ShoppingCart className="h-8 w-8 text-indigo-600" />
            <span className="ml-2 text-xl font-bold text-gray-800">ShopEase</span>
          </Link>
        </div>
        <nav className="hidden md:flex space-x-6">
          <Link to="/" className="text-gray-600 hover:text-indigo-600 transition duration-300">Home</Link>
          <a href="#" className="text-gray-600 hover:text-indigo-600 transition duration-300">Products</a>
          <a href="#" className="text-gray-600 hover:text-indigo-600 transition duration-300">About</a>
          <a href="#" className="text-gray-600 hover:text-indigo-600 transition duration-300">Contact</a>
        </nav>
        <div className="flex items-center">
          <button
            onClick={() => setIsSearchOpen(!isSearchOpen)}
            className="text-gray-600 hover:text-indigo-600 mr-4 transition duration-300"
          >
            <Search className="h-6 w-6" />
          </button>
          <Link to="/cart" className="btn-primary flex items-center">
            <ShoppingCart className="h-5 w-5 mr-2" />
            <span>Cart ({cartItems.length})</span>
          </Link>
        </div>
        <button
          className="md:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>
      {isSearchOpen && (
        <div className="container mx-auto px-4 py-2">
          <form onSubmit={handleSearchSubmit} className="flex items-center">
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-grow px-4 py-2 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-indigo-600"
            />
            <button
              type="submit"
              className="bg-indigo-600 text-white px-6 py-2 rounded-r-lg hover:bg-indigo-700 transition duration-300"
            >
              Search
            </button>
          </form>
        </div>
      )}
    </header>
  );

  const HomePage = () => (
    <>
      {/* Hero Section */}
      <section className="bg-indigo-600 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Welcome to ShopEase</h1>
          <p className="text-xl mb-8">Discover amazing products at unbeatable prices</p>
          <a href="#featured-products" className="btn-primary bg-white text-indigo-600 hover:bg-gray-100">
            Shop Now
          </a>
        </div>
      </section>

      {/* Featured Products */}
      <section id="featured-products" className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Featured Products</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {filteredProducts.map((product) => (
              <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden transition duration-300 hover:shadow-lg">
                <img src={product.image} alt={product.name} className="w-full h-48 object-cover" />
                <div className="p-4">
                  <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
                  <div className="flex items-center mb-2">
                    <Star className="h-5 w-5 text-yellow-400 fill-current" />
                    <span className="ml-1 text-gray-600">{product.rating}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-bold text-indigo-600">${product.price}</span>
                    <button 
                      className="btn-primary text-sm"
                      onClick={() => addToCart(product.id)}
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-gray-100 py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to start shopping?</h2>
          <p className="text-xl mb-8">Join thousands of satisfied customers and experience the ease of ShopEase</p>
          <button className="btn-primary">Create an Account</button>
        </div>
      </section>
    </>
  );

  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Header />

        {isMenuOpen && (
          <div className="md:hidden bg-white shadow-md">
            <nav className="container mx-auto px-4 py-2 flex flex-col">
              <Link to="/" className="py-2 text-gray-600 hover:text-indigo-600 transition duration-300">Home</Link>
              <a href="#" className="py-2 text-gray-600 hover:text-indigo-600 transition duration-300">Products</a>
              <a href="#" className="py-2 text-gray-600 hover:text-indigo-600 transition duration-300">About</a>
              <a href="#" className="py-2 text-gray-600 hover:text-indigo-600 transition duration-300">Contact</a>
            </nav>
          </div>
        )}

        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/cart" element={<CartPage cartItems={cartItems} removeFromCart={removeFromCart} />} />
          </Routes>
        </main>

        <footer className="bg-gray-800 text-white py-8">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div>
                <h3 className="text-lg font-semibold mb-4">About ShopEase</h3>
                <p className="text-gray-400">ShopEase is your one-stop destination for all your shopping needs. We offer a wide range of high-quality products at competitive prices.</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
                <ul className="space-y-2">
                  <li><Link to="/" className="text-gray-400 hover:text-white transition duration-300">Home</Link></li>
                  <li><a href="#" className="text-gray-400 hover:text-white transition duration-300">Products</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-white transition duration-300">About Us</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-white transition duration-300">Contact</a></li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-4">Newsletter</h3>
                <p className="text-gray-400 mb-4">Subscribe to our newsletter for the latest updates and offers.</p>
                <form className="flex">
                  <input type="email" placeholder="Your email" className="flex-grow px-4 py-2 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-indigo-600" />
                  <button type="submit" className="bg-indigo-600 text-white px-4 py-2 rounded-r-lg hover:bg-indigo-700 transition duration-300">Subscribe</button>
                </form>
              </div>
            </div>
            <div className="mt-8 text-center text-gray-400">
              <p>&copy; 2023 ShopEase. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;