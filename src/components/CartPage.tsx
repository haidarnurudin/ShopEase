import React from 'react';
import { Trash2 } from 'lucide-react';

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
}

interface CartPageProps {
  cartItems: Product[];
  removeFromCart: (productId: number) => void;
}

const CartPage: React.FC<CartPageProps> = ({ cartItems, removeFromCart }) => {
  const totalPrice = cartItems.reduce((total, item) => total + item.price, 0);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Your Cart</h1>
      {cartItems.length === 0 ? (
        <p className="text-xl text-gray-600">Your cart is empty.</p>
      ) : (
        <>
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            {cartItems.map((item) => (
              <div key={item.id} className="flex items-center border-b border-gray-200 py-4 px-6">
                <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded" />
                <div className="flex-grow ml-4">
                  <h2 className="text-lg font-semibold">{item.name}</h2>
                  <p className="text-gray-600">${item.price.toFixed(2)}</p>
                </div>
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="text-red-500 hover:text-red-700 transition duration-300"
                  aria-label="Remove item"
                >
                  <Trash2 className="h-6 w-6" />
                </button>
              </div>
            ))}
          </div>
          <div className="mt-8 flex justify-between items-center">
            <p className="text-xl font-semibold">Total: ${totalPrice.toFixed(2)}</p>
            <button className="btn-primary">Proceed to Checkout</button>
          </div>
        </>
      )}
    </div>
  );
};

export default CartPage;