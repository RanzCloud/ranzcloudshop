import React from 'react';
import {
  Server,
  Bot,
  Gamepad2,
  Globe,
  Star,
  Zap,
  ShoppingCart,
  ArrowRight,
  ShieldCheck,
  DownloadCloud,
  Layers,
  Sparkles,
  Database,
  Cpu,
  HardDrive
} from 'lucide-react';
import { Product, ProductCategory } from '../types';
import { useStore } from '../context/StoreContext';
import { formatRupiah } from '../utils/payment';

interface ProductCardProps {
  product: Product;
  onOpenDetail: (product: Product) => void;
  onInstantBuy: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onOpenDetail,
  onInstantBuy,
}) => {
  const { addToCart } = useStore();

  // Helper for Category styling
  const getCategoryBadge = (cat: ProductCategory) => {
    switch (cat) {
      case 'hosting_samp':
        return {
          label: 'HOSTING SA:MP',
          icon: Server,
          bg: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/30',
          accent: 'from-cyan-500 to-blue-600',
        };
      case 'script_bot':
        return {
          label: 'SCRIPT BOT',
          icon: Bot,
          bg: 'bg-purple-500/10 text-purple-400 border-purple-500/30',
          accent: 'from-purple-500 to-indigo-600',
        };
      case 'gamemode_samp':
        return {
          label: 'GAMEMODE SA:MP',
          icon: Gamepad2,
          bg: 'bg-amber-500/10 text-amber-400 border-amber-500/30',
          accent: 'from-amber-500 to-orange-600',
        };
      case 'script_website':
        return {
          label: 'SCRIPT WEBSITE',
          icon: Globe,
          bg: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30',
          accent: 'from-emerald-500 to-teal-600',
        };
    }
  };

  const badgeInfo = getCategoryBadge(product.category);
  const CategoryIcon = badgeInfo.icon;

  // Calculate discount percentage
  const discountPercent = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <div className="group relative flex flex-col justify-between rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-cyan-500/40 shadow-lg hover:shadow-cyan-500/10 transition-all duration-300 hover:-translate-y-1.5 overflow-hidden">
      
      {/* Top Banner / Image Area */}
      <div
        onClick={() => onOpenDetail(product)}
        className="relative h-44 w-full overflow-hidden cursor-pointer bg-slate-950"
      >
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500 opacity-80 group-hover:opacity-100"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent" />

        {/* Category Pill Tag */}
        <div className="absolute top-3 left-3 flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[10px] font-extrabold uppercase tracking-wider backdrop-blur-md border border-slate-700/60 shadow-md bg-slate-950/80 text-white">
          <CategoryIcon className="w-3.5 h-3.5 text-cyan-400" />
          <span>{badgeInfo.label}</span>
        </div>

        {/* Promo / Bestseller Badges */}
        <div className="absolute top-3 right-3 flex flex-col gap-1 items-end">
          {product.isBestSeller && (
            <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 shadow-md">
              ★ BESTSELLER
            </span>
          )}
          {discountPercent > 0 && (
            <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-rose-500 text-white shadow-md">
              HEMAT {discountPercent}%
            </span>
          )}
          {product.category === 'hosting_samp' && (
            <span className="px-2 py-0.5 rounded-full text-[9px] font-bold bg-cyan-950/90 text-cyan-300 border border-cyan-500/40 shadow">
              ⚡ PTERODACTYL
            </span>
          )}
        </div>

        {/* Sales & Rating Floating Tag */}
        <div className="absolute bottom-2.5 left-3 right-3 flex items-center justify-between text-xs text-slate-300">
          <div className="flex items-center gap-1 bg-slate-950/80 px-2 py-0.5 rounded-md border border-slate-800 backdrop-blur-sm">
            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
            <span className="font-bold text-white text-[11px]">{product.rating}</span>
            <span className="text-[10px] text-slate-400">({product.totalSales} terjual)</span>
          </div>

          <span className="text-[10px] text-slate-300 bg-slate-950/80 px-2 py-0.5 rounded-md border border-slate-800">
            {product.category === 'hosting_samp' ? 'Auto-Create Server' : 'Download Instan'}
          </span>
        </div>
      </div>

      {/* Product Content Body */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
        <div>
          <h3
            onClick={() => onOpenDetail(product)}
            className="text-base font-bold text-white group-hover:text-cyan-300 transition-colors line-clamp-1 cursor-pointer"
            title={product.name}
          >
            {product.name}
          </h3>

          <p className="mt-1.5 text-xs text-slate-400 line-clamp-2 leading-relaxed">
            {product.shortDescription}
          </p>

          {/* Quick Specs Snippets */}
          <div className="mt-3.5 pt-3 border-t border-slate-800/80">
            {product.category === 'hosting_samp' && product.hostingSpecs && (
              <div className="grid grid-cols-2 gap-1.5 text-[11px] text-slate-300 font-medium">
                <div className="flex items-center gap-1.5 bg-slate-950/60 p-1.5 rounded-lg border border-slate-800/80">
                  <Cpu className="w-3.5 h-3.5 text-cyan-400" />
                  <span className="truncate">{product.hostingSpecs.ram}</span>
                </div>
                <div className="flex items-center gap-1.5 bg-slate-950/60 p-1.5 rounded-lg border border-slate-800/80">
                  <HardDrive className="w-3.5 h-3.5 text-purple-400" />
                  <span className="truncate">{product.hostingSpecs.disk}</span>
                </div>
              </div>
            )}

            {product.category !== 'hosting_samp' && (
              <div className="flex flex-wrap gap-1.5 text-[10px] text-slate-300 font-medium">
                {product.scriptSpecs?.version && (
                  <span className="bg-slate-950/80 px-2 py-1 rounded-md border border-slate-800 text-cyan-300">
                    🏷️ {product.scriptSpecs.version}
                  </span>
                )}
                {product.scriptSpecs?.fileSize && (
                  <span className="bg-slate-950/80 px-2 py-1 rounded-md border border-slate-800 text-purple-300">
                    📦 {product.scriptSpecs.fileSize}
                  </span>
                )}
                {product.sqlDumpIncluded && (
                  <span className="bg-slate-950/80 px-2 py-1 rounded-md border border-slate-800 text-amber-300 flex items-center gap-1">
                    <Database className="w-3 h-3" /> +SQL
                  </span>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Pricing & Actions */}
        <div className="mt-5 pt-3 border-t border-slate-800/80 flex flex-col gap-3">
          
          {/* Price display */}
          <div className="flex items-baseline justify-between">
            <div>
              <div className="text-lg sm:text-xl font-extrabold text-white">
                {formatRupiah(product.price)}
                {product.category === 'hosting_samp' && (
                  <span className="text-xs text-slate-400 font-normal"> /bln</span>
                )}
              </div>
              {product.originalPrice && (
                <div className="text-[11px] text-slate-500 line-through">
                  {formatRupiah(product.originalPrice)}
                </div>
              )}
            </div>

            <button
              onClick={() => onOpenDetail(product)}
              className="text-xs text-slate-400 hover:text-cyan-300 flex items-center gap-1 transition-colors"
            >
              <span>Detail</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => addToCart(product, 1)}
              className="py-2.5 px-3 rounded-xl bg-slate-950 hover:bg-slate-800 border border-slate-700 hover:border-cyan-500/50 text-slate-200 font-bold text-xs transition-all flex items-center justify-center gap-1.5 shadow-sm active:scale-95"
            >
              <ShoppingCart className="w-3.5 h-3.5 text-cyan-400" />
              <span>+ Keranjang</span>
            </button>

            <button
              onClick={() => onInstantBuy(product)}
              className="py-2.5 px-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-extrabold text-xs transition-all flex items-center justify-center gap-1.5 shadow-md shadow-cyan-500/20 active:scale-95"
            >
              <Zap className="w-3.5 h-3.5 text-slate-950" />
              <span>Beli Sekarang</span>
            </button>
          </div>

        </div>

      </div>

    </div>
  );
};
