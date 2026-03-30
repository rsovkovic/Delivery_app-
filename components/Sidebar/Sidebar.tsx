import { Shop } from '@/types/shop';

interface SidebarProps {
  shops: Shop[];
  activeShopId?: string;
  onShopSelect: (shop: Shop) => void;
  onRatingChange: (range: { min: number; max: number }) => void;
}

export const Sidebar = ({
  shops,
  activeShopId,
  onShopSelect,
  onRatingChange,
}: SidebarProps) => {
  return (
    <aside className="w-1/4 border bg-zinc-900 rounded-2xl border-zinc-800 p-6 flex flex-col gap-6">
      <h2 className="text-xl font-bold">Shops</h2>

      {/* Фільтр рейтингу з ТЗ */}
      <div className="flex flex-col gap-2">
        <label className="text-xs text-zinc-500 uppercase font-bold tracking-wider">
          Rating
        </label>
        <select
          onChange={(e) => {
            const [min, max] = e.target.value.split('-').map(Number);
            onRatingChange({ min, max });
          }}
          className="bg-zinc-800 border border-zinc-700 rounded-lg p-2 text-sm outline-none focus:border-orange-500"
        >
          <option value="0-5">All Ratings</option>
          <option value="4-5">4.0 — 5.0</option>
          <option value="3-4">3.0 — 4.0</option>
          <option value="2-3">2.0 — 3.0</option>
        </select>
      </div>

      {/* Список магазинів */}
      <div className="flex flex-col gap-2 overflow-y-auto">
        {shops.length === 0 ? (
          <p className="text-zinc-500 text-sm p-4 text-center">
            No stores found
          </p>
        ) : (
          shops.map((shop) => (
            <button
              key={shop._id}
              onClick={() => onShopSelect(shop)}
              className={`p-4 rounded-xl text-left transition-all border ${
                activeShopId === shop._id
                  ? 'bg-orange-600/5 border-orange-600 text-white shadow-lg shadow-orange-900/20'
                  : 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:border-zinc-600'
              }`}
            >
              <div className="flex justify-between items-center">
                <p className="font-medium">{shop.name}</p>
                <div className="flex items-center gap-1 mt-1">
                  <span className="text-yellow-400 text-xs">★</span>
                  <span
                    className={
                      activeShopId === shop._id ? 'text-white' : 'text-zinc-400'
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
    </aside>
  );
};
