import Image from 'next/image';
import { useCartStore } from '@/store/useCartStore';

interface CartItemProps {
  item: {
    _id: string;
    name: string;
    price: number;
    image?: string;
    quantity: number;
  };
}

export const CartItem = ({ item }: CartItemProps) => {
  const { updateQuantity, removeFromCart } = useCartStore();

  return (
    <div className="flex gap-4 bg-zinc-800/50 p-4 rounded-2xl border border-zinc-700/50 hover:border-orange-600/30 transition-all group">
      <div className="relative w-24 h-24 shrink-0 overflow-hidden rounded-xl bg-zinc-900">
        <Image
          src={item.image || '/placeholder-food.png'}
          alt={item.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />
      </div>

      <div className="flex flex-col justify-between flex-1">
        <div className="flex justify-between items-start">
          <h3 className="font-bold text-white text-lg leading-tight">
            {item.name}
          </h3>

          <button
            onClick={() => removeFromCart(item._id)}
            className="text-zinc-500 hover:text-red-500 p-1 transition-colors"
            title="Remove item"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M3 6h18m-2 0v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6m3 0V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
            </svg>
          </button>
        </div>

        <div className="flex justify-between items-end mt-2">
          <p className="text-orange-500 font-black text-xl">
            {item.price * item.quantity} <span className="text-xs">UAH</span>
          </p>

          {/*кількість */}
          <div className="flex items-center bg-zinc-900 rounded-lg p-1 border border-zinc-700">
            <button
              type="button"
              onClick={() => updateQuantity(item._id, -1)}
              className="w-8 h-8 flex items-center justify-center text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-md transition-all"
            >
              -
            </button>

            <span className="w-10 text-center font-bold text-white text-sm">
              {item.quantity}
            </span>

            <button
              type="button"
              onClick={() => updateQuantity(item._id, 1)}
              className="w-8 h-8 flex items-center justify-center text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-md transition-all"
            >
              +
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
