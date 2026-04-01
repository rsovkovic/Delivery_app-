'use client';

import { useEffect, useMemo, useState } from 'react';
import { Shop } from '@/types/shop';
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
    if (!activeShop || !activeShop.products) return [];

    let result = [...activeShop.products];

    if (selectedCategories.length > 0) {
      result = result.filter((product) =>
        selectedCategories.includes(product.category),
      );
    }

    result.sort((a, b) => {
      switch (sortBy) {
        case 'price-asc':
          return a.price - b.price;
        case 'price-desc':
          return b.price - a.price;
        case 'name-az':
          return a.name.localeCompare(b.name);
        default:
          return 0;
      }
    });

    return result;
  }, [activeShop, selectedCategories, sortBy]);

  useEffect(() => {
    const fetchShops = async () => {
      try {
        const response = await fetch('/api/shops');
        const data = await response.json();
        setShops(data);
        if (data.length > 0) setActiveShop(data[0]);
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
      {/*  */}
      <Sidebar
        shops={filteredShops}
        activeShopId={activeShop?._id}
        onShopSelect={setActiveShop}
        onRatingChange={setRatingRange}
      />

      {/*  */}
      <section className="flex-1 bg-zinc-900 rounded-2xl p-6 border border-zinc-800 overflow-y-auto max-h-[90vh]">
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
      </section>
    </main>
  );
}
