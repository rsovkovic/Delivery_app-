import Image from 'next/image';
import { Product } from '@/types/shop';
import { useCartStore } from '@/store/useCartStore';

interface ProductCardProps {
  product: Product;
  // onAddToCart: (product: IProduct) => void;
}

export const ProductCard = ({ product }: ProductCardProps) => {
  const addToCart = useCartStore((state) => state.addToCart);
  return (
    <div className="bg-zinc-800 rounded-xl overflow-hidden border border-zinc-700 hover:scale-[1.02] transition-transform">
      <div className="relative w-full h-48">
        <Image
          src={product.image}
          alt={product.name}
          fill
          priority
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover"
        />
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold">{product.name}</h3>
        <p className="text-zinc-400 mt-1">{product.price} UAH</p>
        <button
          onClick={() => addToCart(product)}
          className="w-full mt-4 bg-orange-600 hover:bg-orange-500 text-white py-2 rounded-lg font-medium transition-colors"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};
