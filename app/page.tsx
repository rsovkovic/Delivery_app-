'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import { Product, Shop } from '@/types/shop';
import { Sidebar } from '@/components/Sidebar/Sidebar';
import { ProductFilters } from '@/components/ProductFilters/ProductFilters';
import { ProductGrid } from '@/components/ProductList/ProductList';

export default function Home() {
  const [shops, setShops] = useState<Shop[]>([]);
  const [activeShop, setActiveShop] = useState<Shop | null>(null);
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState<Product[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(false);
  const [isItemsLoading, setIsItemsLoading] = useState(false);

  const fetchProducts = useCallback(
    async (shopId: string, pageNum: number, append: boolean = false) => {
      setIsItemsLoading(true);
      try {
        const response = await fetch(
          `/api/shops?shopId=${shopId}&page=${pageNum}&limit=3`,
        );
        const data = await response.json();

        if (append) {
          setProducts((prev) => [...prev, ...data.products]);
        } else {
          setProducts(data.products);
        }
        setHasMore(data.hasMore);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setIsItemsLoading(false);
      }
    },
    [],
  );

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

  const allCategories = useMemo(() => {
    if (!products) return [];
    return Array.from(new Set(products.map((p) => p.category)));
  }, [products]);

  const displayedProducts = useMemo(() => {
    if (!products) return [];

    let result = [...products];

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
  }, [products, selectedCategories, sortBy]);

  useEffect(() => {
    const fetchShops = async () => {
      try {
        const response = await fetch('/api/shops');
        const data = await response.json();
        setShops(data);
        if (data.length > 0) {
          setActiveShop(data[0]);
          fetchProducts(data[0]._id, 1);
        }
      } catch (error) {
        console.error('Error fetching shops:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchShops();
  }, [fetchProducts]);

  const handleShopChange = (shop: Shop) => {
    setActiveShop(shop);
    setPage(1);
    setSelectedCategories([]);
    fetchProducts(shop._id, 1);
  };
  const handleLoadMore = () => {
    if (!activeShop) return;
    const nextPage = page + 1;
    setPage(nextPage);
    fetchProducts(activeShop._id, nextPage, true);
  };

  if (loading)
    return <div className="p-10 text-center text-white">Loading...</div>;

  return (
    <main className="flex min-h-screen bg-zinc-950 text-zinc-100 p-6 gap-6 overflow-hidden">
      {/*  */}
      <Sidebar
        shops={filteredShops}
        activeShopId={activeShop?._id}
        onShopSelect={handleShopChange}
        onRatingChange={setRatingRange}
      />

      {/*  */}
      <section className="flex-1 bg-zinc-900 rounded-2xl p-6 border border-zinc-800 overflow-y-auto ">
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
        {hasMore && (
          <button
            onClick={handleLoadMore}
            disabled={isItemsLoading}
            className="mt-4 px-6 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 disabled:bg-gray-400"
          >
            {isItemsLoading ? 'loading...' : 'Load more'}
          </button>
        )}
      </section>
    </main>
  );
}
