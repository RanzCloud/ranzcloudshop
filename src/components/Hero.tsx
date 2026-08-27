import React from 'react';
import {
  Server,
  Zap,
  Shield,
  CreditCard,
  Sparkles,
  ArrowRight,
  Code2,
  CheckCircle2,
  Lock,
  Cpu,
  Flame,
  Award
} from 'lucide-react';
import { ProductCategory } from '../types';

interface HeroProps {
  onSelectCategory: (cat: ProductCategory) => void;
  onExploreClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onSelectCategory, onExploreClick }) => {
  return (
    <section className="relative overflow-hidden pt-8 pb-16 lg:pt-14 lg:pb-20">
      {/* Dynamic Cyber Gradient Glow Background */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-gradient-to-tr from-cyan-500/20 via-blue-600/15 to-purple-600/20 blur-[130px] pointer-events-none -z-10" />
      <div className="absolute -top-10 right-10 w-72 h-72 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute -bottom-10 left-10 w-72 h-72 bg-purple-600/10 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Floating Badge */}
        <div className="flex justify-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900/90 border border-cyan-500/30 text-xs font-semibold text-cyan-300 shadow-lg shadow-cyan-500/10 backdrop-blur-md mb-6 hover:border-cyan-400/60 transition-all cursor-pointer">
            <span className="flex h-2 w-2 rounded-full bg-cyan-400 animate-ping" />
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>Platform Store Otomatis BuatQRIS & Pterodactyl Node v2025</span>
            <span className="text-slate-500">|</span>
            <span className="text-purple-300 font-bold">100% Instant Delivery</span>
          </div>
        </div>

        {/* Hero Title & Pitch */}
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight">
            Hosting <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400">SA:MP Pterodactyl</span>, Script Bot & Gamemode Terlengkap
          </h1>
          <p className="mt-5 text-sm sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Pusat penyedia server SA:MP otomatis dengan Pterodactyl Game Panel, Script Bot WhatsApp & Discord siap pakai, serta gamemode Roleplay/Gangwar full MySQL. Pembayaran instan via <span className="text-cyan-300 font-bold underline decoration-cyan-500">BuatQRIS</span> & Dana Bisnis 24 jam!
          </p>

          {/* CTAs */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3.5">
            <button
              onClick={() => onSelectCategory('hosting_samp')}
              className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 hover:from-cyan-400 hover:to-purple-500 text-slate-950 font-extrabold text-sm shadow-xl shadow-cyan-500/25 hover:shadow-cyan-500/40 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center gap-2"
            >
              <Server className="w-4 h-4 text-slate-950" />
              <span>Sewa Hosting SA:MP</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={onExploreClick}
              className="px-6 py-3.5 rounded-xl bg-slate-900/90 hover:bg-slate-800 border border-slate-700 hover:border-cyan-500/50 text-white font-bold text-sm shadow-md transition-all flex items-center gap-2"
            >
              <Code2 className="w-4 h-4 text-cyan-400" />
              <span>Lihat Semua Script & Gamemode</span>
            </button>
          </div>

          {/* Key Advantages pill tags */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-4 text-xs font-medium text-slate-400">
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Auto Create Server &lt; 10 Detik</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Shield className="w-4 h-4 text-cyan-400" />
              <span>Anti-DDoS Voxility 1000Gbps</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CreditCard className="w-4 h-4 text-purple-400" />
              <span>QRIS Semua Bank & E-Wallet</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Lock className="w-4 h-4 text-amber-400" />
              <span>Source Code Bersih & Bergaransi</span>
            </div>
          </div>
        </div>

        {/* Feature Highlights Grid */}
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          
          {/* Card 1: Hosting SA:MP */}
          <div
            onClick={() => onSelectCategory('hosting_samp')}
            className="group relative rounded-2xl bg-gradient-to-b from-slate-900/90 to-slate-950/90 border border-slate-800 hover:border-cyan-500/50 p-5 cursor-pointer shadow-lg hover:shadow-cyan-500/10 transition-all hover:-translate-y-1"
          >
            <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Server className="w-6 h-6" />
            </div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-cyan-400 bg-cyan-950/60 px-2 py-0.5 rounded border border-cyan-800/40">
              Pterodactyl Panel
            </span>
            <h3 className="mt-2 text-base font-bold text-white group-hover:text-cyan-300 transition-colors">
              Hosting SA:MP
            </h3>
            <p className="mt-1.5 text-xs text-slate-400 line-clamp-2">
              Server game anti-lag, auto restart crash, MySQL ready, SFTP access dan auto-provisioning instan.
            </p>
            <div className="mt-4 flex items-center justify-between pt-3 border-t border-slate-800/80">
              <span className="text-xs font-extrabold text-cyan-400">Mulai Rp 15.000/bln</span>
              <span className="text-xs text-slate-400 group-hover:text-white flex items-center gap-1">
                Order <ArrowRight className="w-3 h-3" />
              </span>
            </div>
          </div>

          {/* Card 2: Script Bot */}
          <div
            onClick={() => onSelectCategory('script_bot')}
            className="group relative rounded-2xl bg-gradient-to-b from-slate-900/90 to-slate-950/90 border border-slate-800 hover:border-purple-500/50 p-5 cursor-pointer shadow-lg hover:shadow-purple-500/10 transition-all hover:-translate-y-1"
          >
            <div className="w-12 h-12 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-400 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Zap className="w-6 h-6" />
            </div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-purple-400 bg-purple-950/60 px-2 py-0.5 rounded border border-purple-800/40">
              Discord & WhatsApp
            </span>
            <h3 className="mt-2 text-base font-bold text-white group-hover:text-purple-300 transition-colors">
              Script Bot Otomatis
            </h3>
            <p className="mt-1.5 text-xs text-slate-400 line-clamp-2">
              Bot Discord UCP SA:MP, Bot WA Store Otomatis BuatQRIS, dan Remote Control Pterodactyl via Telegram.
            </p>
            <div className="mt-4 flex items-center justify-between pt-3 border-t border-slate-800/80">
              <span className="text-xs font-extrabold text-purple-400">Mulai Rp 25.000</span>
              <span className="text-xs text-slate-400 group-hover:text-white flex items-center gap-1">
                Beli <ArrowRight className="w-3 h-3" />
              </span>
            </div>
          </div>

          {/* Card 3: Gamemode SA:MP */}
          <div
            onClick={() => onSelectCategory('gamemode_samp')}
            className="group relative rounded-2xl bg-gradient-to-b from-slate-900/90 to-slate-950/90 border border-slate-800 hover:border-amber-500/50 p-5 cursor-pointer shadow-lg hover:shadow-amber-500/10 transition-all hover:-translate-y-1"
          >
            <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Flame className="w-6 h-6" />
            </div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400 bg-amber-950/60 px-2 py-0.5 rounded border border-amber-800/40">
              MySQL R41-4 & Voice
            </span>
            <h3 className="mt-2 text-base font-bold text-white group-hover:text-amber-300 transition-colors">
              Gamemode SA:MP
            </h3>
            <p className="mt-1.5 text-xs text-slate-400 line-clamp-2">
              Roleplay V4 Voice RP, Gangwar TDM, Cops & Robbers, siap compile dengan .SQL database komplit.
            </p>
            <div className="mt-4 flex items-center justify-between pt-3 border-t border-slate-800/80">
              <span className="text-xs font-extrabold text-amber-400">Mulai Rp 40.000</span>
              <span className="text-xs text-slate-400 group-hover:text-white flex items-center gap-1">
                Download <ArrowRight className="w-3 h-3" />
              </span>
            </div>
          </div>

          {/* Card 4: Script Website */}
          <div
            onClick={() => onSelectCategory('script_website')}
            className="group relative rounded-2xl bg-gradient-to-b from-slate-900/90 to-slate-950/90 border border-slate-800 hover:border-emerald-500/50 p-5 cursor-pointer shadow-lg hover:shadow-emerald-500/10 transition-all hover:-translate-y-1"
          >
            <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Code2 className="w-6 h-6" />
            </div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800/40">
              Full Source Code
            </span>
            <h3 className="mt-2 text-base font-bold text-white group-hover:text-emerald-300 transition-colors">
              Script Website Digital
            </h3>
            <p className="mt-1.5 text-xs text-slate-400 line-clamp-2">
              Web Store BuatQRIS + Pterodactyl Auto Create, Web Topup Game, Web UCP SA:MP Roleplay.
            </p>
            <div className="mt-4 flex items-center justify-between pt-3 border-t border-slate-800/80">
              <span className="text-xs font-extrabold text-emerald-400">Mulai Rp 40.000</span>
              <span className="text-xs text-slate-400 group-hover:text-white flex items-center gap-1">
                Source <ArrowRight className="w-3 h-3" />
              </span>
            </div>
          </div>

        </div>

        {/* Live Metrics Ticker Bar */}
        <div className="mt-12 rounded-2xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-md p-4 sm:p-6 grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 text-center">
          <div>
            <div className="text-2xl sm:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">
              500+
            </div>
            <div className="text-xs text-slate-400 mt-1 font-medium">Server SA:MP Aktif</div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
              1,450+
            </div>
            <div className="text-xs text-slate-400 mt-1 font-medium">Script & Gamemode Terjual</div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-400">
              99.9%
            </div>
            <div className="text-xs text-slate-400 mt-1 font-medium">Server Uptime SLA</div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-400">
              &lt; 5 Detik
            </div>
            <div className="text-xs text-slate-400 mt-1 font-medium">Instant Auto Delivery</div>
          </div>
        </div>

      </div>
    </section>
  );
};
