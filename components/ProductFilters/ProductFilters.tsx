interface ProductFiltersProps {
  categories: string[];
  selectedCategories: string[];
  onCategoryChange: (category: string) => void;
  onClearCategories: () => void;
  sortBy: string;
  onSortChange: (sort: string) => void;
}

export const ProductFilters = ({
  categories,
  selectedCategories,
  onCategoryChange,
  onClearCategories,
  sortBy,
  onSortChange,
}: ProductFiltersProps) => {
  return (
    <div className="flex flex-col gap-4 mb-6 p-4 bg-zinc-900/50 rounded-xl border border-zinc-800">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap gap-2 items-center">
          <span className="text-zinc-500 text-xs font-bold uppercase tracking-wider mr-2">
            filter:
          </span>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => onCategoryChange(cat)}
              className={`px-4 py-1.5 text-sm rounded-full border transition-all ${
                selectedCategories.includes(cat)
                  ? 'bg-orange-600/5 border-orange-600 text-white shadow-lg shadow-orange-900/20'
                  : 'border-zinc-700 text-zinc-400 hover:border-zinc-500 hover:text-zinc-200'
              }`}
            >
              {cat}
            </button>
          ))}

          {selectedCategories.length > 0 && (
            <button
              onClick={onClearCategories}
              className="text-xs text-zinc-500 hover:text-orange-500 underline ml-2 transition-colors"
            >
              Reset
            </button>
          )}
        </div>

        <div className="flex items-center gap-2">
          <span className="text-zinc-500 text-xs font-bold uppercase tracking-wider">
            sort
          </span>
          <select
            value={sortBy}
            onChange={(e) => onSortChange(e.target.value)}
            className="bg-zinc-900 border border-zinc-700 text-sm rounded-lg px-3 py-2 text-white outline-none focus:ring-2 focus:ring-orange-600 transition-all cursor-pointer"
          >
            <option value="default">By default</option>
            <option value="price-asc">Price: low</option>
            <option value="price-desc">Price: high</option>
            <option value="name-az">Name (A-Z)</option>
          </select>
        </div>
      </div>
    </div>
  );
};
