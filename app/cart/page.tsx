'use client';
import { useCartStore } from '@/store/useCartStore';
import { useHasHydrated } from '@/hooks/useHasHydrated';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { orderSchema, OrderFormData } from '@/utils/validationShemas';
import { CartList } from '@/components/CartList/CartList';
import { CartForm } from '@/components/CartForm/CartForm';

export default function CartPage() {
  const { items, getTotalPrice, clearCart } = useCartStore();
  const hasHydrated = useHasHydrated();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
  } = useForm<OrderFormData>({
    resolver: yupResolver(orderSchema),
    mode: 'onTouched',
  });

  const onSubmit = async (data: OrderFormData) => {
    try {
      const finalOrder = {
        customer: data,

        items: items.map((item) => ({
          productId: item._id,
          name: item.name,
          quantity: item.quantity,
          price: item.price,
          image: item.image,
        })),
        totalPrice: getTotalPrice(),
      };

      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(finalOrder),
      });
      const result = await response.json();
      if (response.ok) {
        alert('Order successfully created!');
        clearCart();
        reset();
      } else {
        throw new Error(result.error || 'Something is wrong');
      }
    } catch (error) {
      console.error('Order Error:', error);
      alert('Failed to send order');
    }
  };

  if (!hasHydrated) return null;

  return (
    <div className="container mx-auto p-8">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col lg:flex-row gap-12"
      >
        <CartForm register={register} errors={errors} />

        <div className="w-full lg:w-112.5 space-y-6">
          <CartList />

          <div className="bg-zinc-900 p-6 rounded-3xl border border-zinc-800 shadow-xl">
            <div className="flex justify-between items-center mb-6">
              <span className="text-zinc-400">Total:</span>
              <span className="text-3xl font-black text-white">
                {getTotalPrice()} UAH
              </span>
            </div>

            <button
              type="submit"
              disabled={!isValid || items.length === 0}
              className="w-full bg-orange-600 hover:bg-orange-500 disabled:bg-zinc-800 disabled:text-zinc-600 py-5 rounded-2xl font-bold text-xl transition-all"
            >
              Submit
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
