////////////////////////////////////////////////////////////////////////

'use client';

import { useEffect, useMemo, useState } from 'react';
import { Shop } from '@/types/shop';
// import Image from 'next/image';
import { Sidebar } from '@/components/Sidebar/Sidebar';
import { ProductFilters } from '@/components/ProductFilters/ProductFilters';
import { ProductGrid } from '@/components/ProductList/ProductList';

export default function Home() {
  const [shops, setShops] = useState<Shop[]>([]);
  const [activeShop, setActiveShop] = useState<Shop | null>(null);
  const [loading, setLoading] = useState(true);
  const [ratingRange, setRatingRange] = useState<{ min: number; max: number }>({
    min: 0,
    max: 5,
  });

  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<string>('default');

  // Фільтруємо список магазинів перед виводом у сайдбар
  const filteredShops = useMemo(() => {
    return shops.filter(
      (shop) =>
        shop.rating >= ratingRange.min && shop.rating <= ratingRange.max,
    );
  }, [shops, ratingRange]);

  // const allCategories = useMemo(() => {
  //   if (!activeShop || !activeShop.products) return [];
  //   const rawCategories = activeShop.products.map((p) => p.category);
  //   return Array.from(new Set(rawCategories));
  // }, [activeShop]);

  const allCategories = useMemo(() => {
    if (!activeShop || !activeShop.products) return [];
    return Array.from(new Set(activeShop.products.map((p) => p.category)));
  }, [activeShop]);

  const displayedProducts = useMemo(() => {
    // 1. Якщо магазин не обраний, показувати нічого
    if (!activeShop || !activeShop.products) return [];

    // 2. Робимо копію масиву товарів, щоб не псувати оригінал
    let result = [...activeShop.products];

    // 3. ФІЛЬТРАЦІЯ за категоріями (Мультиселект)
    if (selectedCategories.length > 0) {
      result = result.filter((product) =>
        selectedCategories.includes(product.category),
      );
    }

    // 4. СОРТУВАННЯ
    result.sort((a, b) => {
      switch (sortBy) {
        case 'price-asc':
          return a.price - b.price;
        case 'price-desc':
          return b.price - a.price;
        case 'name-az':
          return a.name.localeCompare(b.name);
        default:
          return 0; // За замовчуванням залишаємо як є
      }
    });

    return result;
  }, [activeShop, selectedCategories, sortBy]); // 👈 Стежимо за всіма змінами

  useEffect(() => {
    const fetchShops = async () => {
      try {
        const response = await fetch('/api/shops');
        const data = await response.json();
        setShops(data);
        if (data.length > 0) setActiveShop(data[0]); // Ставимо перший магазин активним
      } catch (error) {
        console.error('Error fetching shops:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchShops();
  }, []);

  if (loading)
    return <div className="p-10 text-center text-white">Loading...</div>;

  return (
    <main className="flex min-h-screen bg-zinc-950 text-zinc-100 p-6 gap-6">
      {/* ЛІВА ЧАСТИНА: Список магазинів */}
      <Sidebar
        shops={filteredShops}
        activeShopId={activeShop?._id}
        onShopSelect={setActiveShop}
        onRatingChange={setRatingRange}
      />
      {/* <aside className="w-1/4 bg-zinc-900 rounded-2xl p-6 border border-zinc-800">
        <div className="mb-4 px-4">
          <label className="text-xs text-zinc-500 uppercase font-bold tracking-wider">
            Rating
          </label>
          <select
            onChange={(e) => {
              const [min, max] = e.target.value.split('-').map(Number);
              setRatingRange({ min, max });
            }}
            className="w-full bg-zinc-800 border border-zinc-700 rounded-lg p-2 text-sm mt-1 text-white outline-none focus:border-orange-500"
          >
            <option value="0-5">All shops</option>
            <option value="4-5">4.0 — 5.0 (Perfectly)</option>
            <option value="3-4">3.0 — 4.0 (Good)</option>
            <option value="2-3">2.0 — 3.0 (Average)</option>
          </select>
        </div>
        <h2 className="text-xl font-bold mb-6 text-orange-500">Shops:</h2>
        <div className="flex flex-col gap-3">
          {filteredShops.length === 0 ? (
            <p className="text-zinc-500 text-sm p-4 text-center">
              No stores found
            </p>
          ) : (
            filteredShops.map((shop) => (
              <button
                key={shop._id}
                onClick={() => setActiveShop(shop)}
                className={`p-4 rounded-xl transition-all border ${
                  activeShop?._id === shop._id
                    ? 'bg-orange-600 border-orange-400 text-white shadow-lg shadow-orange-900/20'
                    : 'bg-zinc-800 border-zinc-700 hover:border-zinc-500 text-zinc-400'
                }`}
              >
                <div className="flex justify-between items-center">
                  <span className="font-medium">{shop.name}</span>
                  <div className="flex items-center gap-1 text-xs">
                    <span className="text-yellow-400">★</span>
                    <span
                      className={
                        activeShop?._id === shop._id
                          ? 'text-white'
                          : 'text-zinc-300'
                      }
                    >
                      {shop.rating.toFixed(1)}
                    </span>
                  </div>
                </div>
              </button>
            ))
          )}
        </div>
      </aside> */}

      {/* ПРАВА ЧАСТИНА: Товари обраного магазину */}
      <section className="flex-1 bg-zinc-900 rounded-2xl p-6 border border-zinc-800 overflow-y-auto max-h-[90vh]">
        {/* fslter  */}
        <ProductFilters
          categories={allCategories}
          selectedCategories={selectedCategories}
          onCategoryChange={(cat) => {
            setSelectedCategories((prev) =>
              prev.includes(cat)
                ? prev.filter((c) => c !== cat)
                : [...prev, cat],
            );
          }}
          onClearCategories={() => setSelectedCategories([])}
          sortBy={sortBy}
          onSortChange={setSortBy}
        />
        <ProductGrid products={displayedProducts} />
        {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayedProducts.map((product) => (
            <div
              key={product._id}
              className="bg-zinc-800 rounded-xl overflow-hidden border border-zinc-700 hover:scale-[1.02] transition-transform"
            >
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
                <button className="w-full mt-4 bg-orange-600 hover:bg-orange-500 text-white py-2 rounded-lg font-medium transition-colors">
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div> */}
      </section>
    </main>
  );
}
