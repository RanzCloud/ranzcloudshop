import React from 'react';
import {
  Layers,
  Server,
  Bot,
  Gamepad2,
  Globe,
  SlidersHorizontal,
  Sparkles,
  ArrowUpDown
} from 'lucide-react';
import { ProductCategory } from '../types';
import { useStore } from '../context/StoreContext';

interface CategoryFilterProps {
  selectedCategory: ProductCategory | 'all';
  onSelectCategory: (cat: ProductCategory | 'all') => void;
  sortBy: 'popular' | 'price_asc' | 'price_desc' | 'rating';
  onSortChange: (sort: 'popular' | 'price_asc' | 'price_desc' | 'rating') => void;
}

export const CategoryFilter: React.FC<CategoryFilterProps> = ({
  selectedCategory,
  onSelectCategory,
  sortBy,
  onSortChange,
}) => {
  const { products } = useStore();

  const getCount = (cat: ProductCategory | 'all') => {
    if (cat === 'all') return products.length;
    return products.filter((p) => p.category === cat).length;
  };

  const categoriesConfig = [
    { id: 'all', name: 'Semua Produk', icon: Layers, color: 'text-slate-300' },
    { id: 'hosting_samp', name: 'Hosting SA:MP', icon: Server, color: 'text-cyan-400' },
    { id: 'script_bot', name: 'Script Bot', icon: Bot, color: 'text-purple-400' },
    { id: 'gamemode_samp', name: 'Gamemode SA:MP', icon: Gamepad2, color: 'text-amber-400' },
    { id: 'script_website', name: 'Script Website', icon: Globe, color: 'text-emerald-400' },
  ];

  return (
    <div className="space-y-4">
      {/* Category Tabs & Sort row */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-2 border-b border-slate-800">
        
        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-none">
          {categoriesConfig.map((cat) => {
            const Icon = cat.icon;
            const isSelected = selectedCategory === cat.id;
            const count = getCount(cat.id as ProductCategory | 'all');

            return (
              <button
                key={cat.id}
                onClick={() => onSelectCategory(cat.id as ProductCategory | 'all')}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all shadow-sm ${
                  isSelected
                    ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 shadow-cyan-500/25 ring-2 ring-cyan-400/40'
                    : 'bg-slate-900/90 text-slate-300 hover:text-white hover:bg-slate-800 border border-slate-800'
                }`}
              >
                <Icon className={`w-4 h-4 ${isSelected ? 'text-slate-950' : cat.color}`} />
                <span>{cat.name}</span>
                <span
                  className={`px-1.5 py-0.2 rounded-full text-[10px] font-extrabold ${
                    isSelected ? 'bg-slate-950/20 text-slate-950' : 'bg-slate-800 text-slate-400'
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Sort Filter Dropdown */}
        <div className="flex items-center gap-2 self-end md:self-auto">
          <ArrowUpDown className="w-4 h-4 text-slate-400" />
          <select
            value={sortBy}
            onChange={(e) =>
              onSortChange(e.target.value as 'popular' | 'price_asc' | 'price_desc' | 'rating')
            }
            aria-label="Urutkan produk berdasarkan"
            className="bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs font-semibold text-slate-200 focus:outline-none focus:border-cyan-500 transition-all cursor-pointer"
          >
            <option value="popular">🔥 Terpopuler & Terlaris</option>
            <option value="price_asc">💵 Harga: Termurah ke Termahal</option>
            <option value="price_desc">💎 Harga: Termahal ke Termurah</option>
            <option value="rating">⭐ Rating Tertinggi</option>
          </select>
        </div>

      </div>
    </div>
  );
};
