import { useCartStore } from '@/store/useCartStore';
import { CartItem } from '@/components/CartItem/CartItem';

export const CartList = () => {
  const { items } = useCartStore();

  if (items.length === 0) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center p-10 border-2 border-dashed border-zinc-800 rounded-3xl">
        <p className="text-zinc-500 text-lg">Your cart is empty</p>
      </div>
    );
  }

  return (
    <div className="flex-1 space-y-4 overflow-y-auto max-h-150 pr-2 custom-scrollbar">
      {items.map((item) => (
        <CartItem key={item._id} item={item} />
      ))}
    </div>
  );
};
