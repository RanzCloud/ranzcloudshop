import React from 'react';
import {
  Server,
  ShieldCheck,
  CreditCard,
  Heart,
  Lock,
  ExternalLink,
  Bot,
  Gamepad2,
  Globe,
  Terminal
} from 'lucide-react';
import { ProductCategory } from '../types';

interface FooterProps {
  onSelectCategory: (cat: ProductCategory) => void;
  onOpenAuth: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onSelectCategory, onOpenAuth }) => {
  return (
    <footer className="border-t border-slate-800 bg-slate-950 text-slate-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          
          {/* Col 1 & 2: Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-cyan-500 to-purple-600 flex items-center justify-center text-slate-950 font-black">
                <Server className="w-4 h-4 text-slate-950" />
              </div>
              <span className="text-lg font-black text-white tracking-tight">
                Ranz<span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">Cloud</span> Store
              </span>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              Pusat penyedia Hosting SA:MP Pterodactyl performa tinggi dengan Anti-DDoS Voxility 1000Gbps, Script Bot WhatsApp & Discord otomatis, gamemode Roleplay/Gangwar full source, serta script website payment gateway BuatQRIS & Dana Bisnis 24 jam nonstop.
            </p>

            <div className="flex flex-wrap items-center gap-2 pt-1">
              <span className="px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-800 text-[11px] text-cyan-300 font-semibold flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
                <span>Pterodactyl Panel</span>
              </span>
              <span className="px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-800 text-[11px] text-purple-300 font-semibold flex items-center gap-1">
                <CreditCard className="w-3.5 h-3.5 text-purple-400" />
                <span>BuatQRIS Gateway</span>
              </span>
              <span className="px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-800 text-[11px] text-emerald-300 font-semibold flex items-center gap-1">
                <Lock className="w-3.5 h-3.5 text-emerald-400" />
                <span>Dana Bisnis Verified</span>
              </span>
            </div>
          </div>

          {/* Col 3: Produk & Layanan */}
          <div className="space-y-3">
            <h4 className="text-xs font-extrabold uppercase tracking-wider text-white">Kategori Produk</h4>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => onSelectCategory('hosting_samp')}
                  className="hover:text-cyan-400 transition-colors flex items-center gap-1.5"
                >
                  <Server className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Hosting SA:MP Pterodactyl</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectCategory('script_bot')}
                  className="hover:text-purple-400 transition-colors flex items-center gap-1.5"
                >
                  <Bot className="w-3.5 h-3.5 text-purple-400" />
                  <span>Script Bot WhatsApp & Discord</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectCategory('gamemode_samp')}
                  className="hover:text-amber-400 transition-colors flex items-center gap-1.5"
                >
                  <Gamepad2 className="w-3.5 h-3.5 text-amber-400" />
                  <span>Gamemode SA:MP Roleplay & DM</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectCategory('script_website')}
                  className="hover:text-emerald-400 transition-colors flex items-center gap-1.5"
                >
                  <Globe className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Script Website Store & UCP</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Keamanan & Sistem */}
          <div className="space-y-3">
            <h4 className="text-xs font-extrabold uppercase tracking-wider text-white">Infrastruktur</h4>
            <ul className="space-y-2 text-slate-400">
              <li className="flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                <span>Node Singapore SG-01 (AMD EPYC)</span>
              </li>
              <li className="flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                <span>Node Jakarta Cyber IDC IDC-02</span>
              </li>
              <li className="flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-cyan-400" />
                <span>Voxility Layer 4/7 Shield</span>
              </li>
              <li className="flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-purple-400" />
                <span>Auto Webhook BuatQRIS Sync</span>
              </li>
            </ul>
          </div>

          {/* Col 5: Akun & Privasi */}
          <div className="space-y-3">
            <h4 className="text-xs font-extrabold uppercase tracking-wider text-white">Akun & Portal</h4>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={onOpenAuth}
                  className="hover:text-cyan-400 transition-colors"
                >
                  Login
                </button>
              </li>
              <li>
                <span className="text-slate-500">Privasi Admin: RanzCode</span>
              </li>
              <li>
                <span className="text-slate-500">Garansi Refund 1x24 Jam</span>
              </li>
              <li>
                <a
                  href="https://app.buatqris.site"
                  target="_blank"
                  rel="noreferrer"
                  className="text-slate-400 hover:text-white flex items-center gap-1"
                >
                  <span>Gateway: BuatQRIS.site</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Payment Methods Badges Row */}
        <div className="pt-8 border-t border-slate-800/80 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-[11px] text-slate-400 mr-2 font-semibold">Metode Pembayaran Resmi:</span>
            {['QRIS NASIONAL', 'DANA BISNIS', 'GOPAY', 'OVO', 'SHOPEEPAY', 'BCA', 'MANDIRI', 'BRI', 'BNI'].map((pm) => (
              <span
                key={pm}
                className="px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-[10px] font-bold text-slate-300"
              >
                {pm}
              </span>
            ))}
          </div>

          <div className="text-slate-400 text-[11px] text-center md:text-right">
            © {new Date().getFullYear()} <strong className="text-white">RanzCloud Store</strong> by <span className="text-cyan-400 font-bold">RanzCode</span>. All rights reserved.
          </div>
        </div>

      </div>
    </footer>
  );
};
