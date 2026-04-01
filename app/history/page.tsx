'use client';

import { useEffect, useState } from 'react';
import { useCartStore } from '@/store/useCartStore';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

interface OrderItem {
  _id: string;
  productId: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  category?: string;
}

interface Order {
  _id: string;
  createdAt: string | Date;
  totalPrice: number;
  shopId: string;
  items: OrderItem[];
}

export default function HistoryPage() {
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const replaceCart = useCartStore((state) => state.replaceCart);
  const router = useRouter();
  const fetchOrders = async () => {
    if (!email && !phone) return;

    setLoading(true);
    try {
      const query = new URLSearchParams();
      if (email) query.append('email', email);
      if (phone) query.append('phone', phone);

      const res = await fetch(`/api/orders?${query.toString()}`);
      if (!res.ok) throw new Error('Failed to fetch');

      const data = await res.json();
      setOrders(data);
    } catch (error) {
      console.error('Error fetching history:', error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    const savedEmail = localStorage.getItem('userEmail');
    const savedPhone = localStorage.getItem('userPhone');

    if (savedEmail) setEmail(savedEmail);
    if (savedPhone) setPhone(savedPhone);
  }, []);

  const handleRepeatOrder = (order: Order) => {
    const itemsToCart = order.items.map((item: OrderItem) => ({
      _id: item.productId,
      name: item.name,
      price: item.price,
      quantity: item.quantity,
      image: item.image,
      category: item.category || '',
    }));

    replaceCart(itemsToCart, order.shopId);

    router.push('/cart');
  };

  return (
    <div className="max-w-6xl mx-auto p-6 text-white">
      <h1 className="text-3xl font-bold mb-8">History</h1>
      <div className="bg-zinc-900 border border-zinc-800 p-8 rounded-3xl mb-10 flex flex-col items-center gap-6">
        <div className="w-full max-w-md">
          <label className="text-zinc-400 block mb-2 text-sm text-center">
            Email:
          </label>
          <input
            type="email"
            placeholder="example@mail.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full bg-zinc-950 border border-zinc-800 rounded-2xl p-3 text-center focus:border-orange-500 outline-none transition-all"
          />
        </div>

        <div className="w-full max-w-md">
          <label className="text-zinc-400 block mb-2 text-sm text-center">
            Phone:
          </label>
          <input
            type="tel"
            placeholder="+380..."
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full bg-zinc-950 border border-zinc-800 rounded-2xl p-3 text-center focus:border-orange-500 outline-none transition-all"
          />
        </div>

        <button
          onClick={fetchOrders}
          className="bg-orange-500 hover:bg-orange-600 px-10 py-3 rounded-2xl font-bold transition-all"
        >
          {loading ? 'Searching...' : 'Search History'}
        </button>
      </div>
      <div className="grid grid-cols-1 gap-6">
        {orders.length > 0 ? (
          orders.map((order) => (
            <div
              key={order._id}
              className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 grid grid-cols-1 md:grid-cols-2 gap-8 items-center"
            >
              <div className="space-y-4 max-h-62.5 overflow-y-auto pr-2 custom-scrollbar">
                {order.items.map((item: OrderItem) => (
                  <div
                    key={item._id}
                    className="flex items-center gap-4 bg-zinc-950 p-3 rounded-2xl border border-zinc-800"
                  >
                    <div className=" relative w-20 h-20 bg-zinc-800 rounded-xl shrink-0 overflow-hidden flex items-center justify-center">
                      {item.image ? (
                        <Image
                          src={item.image}
                          alt={item.name}
                          // width={400}
                          // height={300}
                          fill
                          className="object-cover"
                        />
                      ) : (
                        <span className="text-zinc-600 text-xs">No img</span>
                      )}
                    </div>

                    <div className="flex-1">
                      <h4 className="font-bold text-white text-lg">
                        {item.name}
                      </h4>
                      <p className="text-zinc-400">
                        Price:{' '}
                        <span className="text-white">{item.price} ₴</span>
                      </p>
                      <p className="text-zinc-500 text-sm">
                        Quantity: {item.quantity}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex flex-col items-center md:items-end justify-center text-center md:text-right border-t md:border-t-0 md:border-l border-zinc-800 pt-6 md:pt-0 md:pl-8">
                <div className="mb-4">
                  <p className="text-zinc-500 text-sm mb-1">
                    Ordered on: {new Date(order.createdAt).toLocaleDateString()}
                  </p>
                  <h3 className="text-3xl font-black text-white">
                    Total price:{' '}
                    <span className="text-orange-500">
                      {order.totalPrice} ₴
                    </span>
                  </h3>
                </div>

                <button
                  onClick={() => handleRepeatOrder(order)}
                  className="w-full md:w-auto px-8 py-3 bg-zinc-800 hover:bg-orange-500 text-white rounded-2xl font-bold transition-all transform active:scale-95"
                >
                  Repeat Order
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-zinc-500">
            No orders found. Enter your info above.
          </p>
        )}
      </div>
    </div>
  );
}
