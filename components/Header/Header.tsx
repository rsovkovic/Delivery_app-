'use client';
import Link from 'next/link';
import { useCartStore } from '@/store/useCartStore';
import { useHasHydrated } from '@/hooks/useHasHydrated';

export default function Header() {
  const hydrated = useHasHydrated();
  const totalItems = useCartStore((state) => state.getTotalItems());

  return (
    <header className="h-16 border-b border-zinc-800 flex items-center justify-between px-8 bg-black sticky top-0 z-40">
      <nav className="flex gap-6">
        <Link
          href="/"
          className="text-zinc-400 hover:text-white transition-colors"
        >
          Shop
        </Link>
        <div className="w-px h-6 bg-zinc-800" />
        <Link
          href="/cart"
          className="text-zinc-400 hover:text-white transition-colors flex items-center gap-2"
        >
          Shopping Cart
          {hydrated && totalItems > 0 && (
            <span className="bg-orange-600/75 text-white text-[10px] px-2 py-0.5 rounded-full">
              {totalItems}
            </span>
          )}
        </Link>
        <Link
          href="/history"
          className="text-zinc-400 hover:text-white transition-colors"
        >
          History
        </Link>
      </nav>

      <div className="text-orange-600 font-bold tracking-tighter text-xl">
        Delivery App
      </div>
    </header>
  );
}
