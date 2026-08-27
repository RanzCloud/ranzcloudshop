import React, { useState } from 'react';
import {
  Server,
  ShoppingCart,
  User as UserIcon,
  ShieldCheck,
  Search,
  Menu,
  X,
  KeyRound,
  Download,
  Terminal,
  Receipt,
  LogOut,
  ChevronDown,
  Sparkles,
  Layers,
  Bot,
  Gamepad2,
  Globe
} from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { ProductCategory } from '../types';

interface NavbarProps {
  onSelectCategory: (cat: ProductCategory | 'all') => void;
  onOpenDashboard: (tab?: string) => void;
  onOpenAdmin: (tab?: string) => void;
  currentView: 'store' | 'user_dashboard' | 'admin_dashboard';
  setCurrentView: (view: 'store' | 'user_dashboard' | 'admin_dashboard') => void;
  onSearchChange: (q: string) => void;
  searchQuery: string;
}

export const Navbar: React.FC<NavbarProps> = ({
  onSelectCategory,
  onOpenDashboard,
  onOpenAdmin,
  currentView,
  setCurrentView,
  onSearchChange,
  searchQuery,
}) => {
  const {
    cartCount,
    setIsCartOpen,
    currentUser,
    isAdmin,
    logout,
    setIsAuthModalOpen,
    setAuthModalMode,
    servers,
    orders
  } = useStore();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [categoryDropdownOpen, setCategoryDropdownOpen] = useState(false);

  // Count active servers & purchased scripts for badge
  const myServerCount = servers.length;
  const myOrderCount = orders.length;

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-800/80 bg-slate-950/80 backdrop-blur-xl transition-all">
      {/* Top micro announcement bar */}
      <div className="bg-gradient-to-r from-cyan-950 via-slate-900 to-purple-950 px-4 py-1.5 text-center text-xs font-medium text-cyan-300/90 border-b border-cyan-900/30 flex items-center justify-center gap-2">
        <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
        <span>⚡ Server Singapore SG-01 & Jakarta IDC Online (99.9% Uptime)</span>
        <span className="hidden md:inline text-slate-500">|</span>
        <span className="hidden md:inline text-slate-300">
          Pembayaran Otomatis BuatQRIS & Dana Bisnis Aktif 24 Jam Nonstop!
        </span>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          
          {/* Brand Logo */}
          <div
            onClick={() => {
              setCurrentView('store');
              onSelectCategory('all');
            }}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 via-blue-600 to-purple-600 p-[1.5px] shadow-lg shadow-cyan-500/20 group-hover:shadow-cyan-500/40 transition-all">
              <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                <Server className="w-5 h-5 text-cyan-400 group-hover:scale-110 transition-transform" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-xl font-extrabold tracking-tight text-white group-hover:text-cyan-300 transition-colors">
                  Ranz<span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">Cloud</span>
                </span>
                <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                  STORE
                </span>
              </div>
              <p className="text-[10px] text-slate-400 hidden sm:block">Hosting SA:MP & Script Otomatis</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            <button
              onClick={() => {
                setCurrentView('store');
                onSelectCategory('all');
              }}
              className={`px-3.5 py-2 rounded-lg text-sm font-semibold transition-all ${
                currentView === 'store'
                  ? 'text-cyan-400 bg-cyan-500/10 border border-cyan-500/20'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              Beranda
            </button>

            {/* Category Dropdown */}
            <div className="relative">
              <button
                onClick={() => setCategoryDropdownOpen(!categoryDropdownOpen)}
                onMouseEnter={() => setCategoryDropdownOpen(true)}
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-sm font-semibold text-slate-300 hover:text-white hover:bg-slate-800/60 transition-all"
              >
                <Layers className="w-4 h-4 text-cyan-400" />
                <span>Kategori Produk</span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
              </button>

              {categoryDropdownOpen && (
                <div
                  onMouseLeave={() => setCategoryDropdownOpen(false)}
                  className="absolute left-0 top-full mt-1 w-64 rounded-xl bg-slate-900 border border-slate-700/80 shadow-2xl shadow-black/80 p-2 z-50 backdrop-blur-2xl"
                >
                  <button
                    onClick={() => {
                      setCurrentView('store');
                      onSelectCategory('hosting_samp');
                      setCategoryDropdownOpen(false);
                    }}
                    className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left text-sm text-slate-200 hover:text-cyan-300 hover:bg-slate-800/90 transition-all group"
                  >
                    <div className="w-8 h-8 rounded-lg bg-cyan-500/10 text-cyan-400 flex items-center justify-center border border-cyan-500/20 group-hover:scale-105">
                      <Server className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="font-semibold text-xs text-white">Hosting SA:MP</div>
                      <div className="text-[11px] text-slate-400">Pterodactyl Panel & Voxility</div>
                    </div>
                  </button>

                  <button
                    onClick={() => {
                      setCurrentView('store');
                      onSelectCategory('script_bot');
                      setCategoryDropdownOpen(false);
                    }}
                    className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left text-sm text-slate-200 hover:text-cyan-300 hover:bg-slate-800/90 transition-all group"
                  >
                    <div className="w-8 h-8 rounded-lg bg-purple-500/10 text-purple-400 flex items-center justify-center border border-purple-500/20 group-hover:scale-105">
                      <Bot className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="font-semibold text-xs text-white">Script Bot</div>
                      <div className="text-[11px] text-slate-400">Discord UCP, WA Store & Tele</div>
                    </div>
                  </button>

                  <button
                    onClick={() => {
                      setCurrentView('store');
                      onSelectCategory('gamemode_samp');
                      setCategoryDropdownOpen(false);
                    }}
                    className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left text-sm text-slate-200 hover:text-cyan-300 hover:bg-slate-800/90 transition-all group"
                  >
                    <div className="w-8 h-8 rounded-lg bg-amber-500/10 text-amber-400 flex items-center justify-center border border-amber-500/20 group-hover:scale-105">
                      <Gamepad2 className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="font-semibold text-xs text-white">Gamemode SA:MP</div>
                      <div className="text-[11px] text-slate-400">Roleplay, Gangwar & CnR .SQL</div>
                    </div>
                  </button>

                  <button
                    onClick={() => {
                      setCurrentView('store');
                      onSelectCategory('script_website');
                      setCategoryDropdownOpen(false);
                    }}
                    className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left text-sm text-slate-200 hover:text-cyan-300 hover:bg-slate-800/90 transition-all group"
                  >
                    <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center border border-emerald-500/20 group-hover:scale-105">
                      <Globe className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="font-semibold text-xs text-white">Script Website</div>
                      <div className="text-[11px] text-slate-400">Web Store QRIS & UCP Portal</div>
                    </div>
                  </button>
                </div>
              )}
            </div>

            {/* Quick Link to Hosting SA:MP */}
            <button
              onClick={() => {
                setCurrentView('store');
                onSelectCategory('hosting_samp');
              }}
              className="px-3.5 py-2 rounded-lg text-sm font-semibold text-slate-300 hover:text-white hover:bg-slate-800/60 transition-all flex items-center gap-1.5"
            >
              <Server className="w-4 h-4 text-cyan-400" />
              <span>Hosting Pterodactyl</span>
            </button>
          </nav>

          {/* Search bar */}
          <div className="hidden md:flex flex-1 max-w-xs items-center relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => {
                onSearchChange(e.target.value);
                if (currentView !== 'store') setCurrentView('store');
              }}
              placeholder="Cari hosting, script bot, gamemode..."
              className="w-full pl-9 pr-3 py-1.5 bg-slate-900/90 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => onSearchChange('')}
                className="absolute right-2.5 text-xs text-slate-500 hover:text-slate-300"
              >
                ✕
              </button>
            )}
          </div>

          {/* Action buttons (Cart, Auth, Admin) */}
          <div className="flex items-center gap-2.5">
            
            {/* Cart Button */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-900/90 border border-slate-800 hover:border-cyan-500/50 hover:bg-slate-800 text-slate-200 transition-all shadow-sm group"
            >
              <ShoppingCart className="w-4 h-4 text-cyan-400 group-hover:scale-110 transition-transform" />
              <span className="text-xs font-semibold hidden sm:inline">Keranjang</span>
              {cartCount > 0 && (
                <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-cyan-500 px-1 text-[11px] font-bold text-slate-950 shadow-md shadow-cyan-500/30">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Admin Badge & Portal Access (Only if Admin logged in) */}
            {isAdmin && (
              <button
                onClick={() => onOpenAdmin('analytics')}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold transition-all shadow-md ${
                  currentView === 'admin_dashboard'
                    ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-purple-500/30 ring-2 ring-purple-400'
                    : 'bg-purple-950/60 border border-purple-500/40 text-purple-300 hover:bg-purple-900/80 hover:text-white'
                }`}
              >
                <ShieldCheck className="w-4 h-4 text-purple-400 animate-pulse" />
                <span className="hidden sm:inline">ADMIN PANEL</span>
                <span className="px-1 py-0.2 rounded bg-purple-500/30 text-[10px] text-purple-200">RanzCode</span>
              </button>
            )}

            {/* User Profile / Auth State */}
            {currentUser ? (
              <div className="relative">
                <button
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="flex items-center gap-2 px-3 py-2 rounded-xl bg-slate-900/90 border border-slate-800 hover:border-slate-700 text-slate-200 transition-all"
                >
                  <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center text-slate-950 font-bold text-xs">
                    {currentUser.name.charAt(0).toUpperCase()}
                  </div>
                  <div className="text-left hidden sm:block">
                    <div className="text-xs font-bold text-white flex items-center gap-1">
                      {currentUser.name}
                      {currentUser.role === 'admin' && (
                        <span className="text-[9px] bg-purple-500/20 text-purple-400 px-1 py-0.2 rounded border border-purple-500/30">
                          Owner
                        </span>
                      )}
                    </div>
                  </div>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                </button>

                {/* Dropdown Menu */}
                {userDropdownOpen && (
                  <div
                    onClick={() => setUserDropdownOpen(false)}
                    className="absolute right-0 top-full mt-2 w-56 rounded-xl bg-slate-900 border border-slate-700/80 shadow-2xl p-2 z-50 backdrop-blur-2xl"
                  >
                    <div className="px-3 py-2 border-b border-slate-800">
                      <p className="text-xs font-bold text-white">{currentUser.name}</p>
                      <p className="text-[11px] text-slate-400 truncate">{currentUser.email}</p>
                    </div>

                    <div className="py-1">
                      <button
                        onClick={() => onOpenDashboard('servers')}
                        className="w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs text-slate-200 hover:text-cyan-300 hover:bg-slate-800 transition-all"
                      >
                        <div className="flex items-center gap-2">
                          <Terminal className="w-4 h-4 text-cyan-400" />
                          <span>Server SA:MP Saya</span>
                        </div>
                        {myServerCount > 0 && (
                          <span className="bg-cyan-500/20 text-cyan-400 text-[10px] font-bold px-1.5 py-0.5 rounded">
                            {myServerCount}
                          </span>
                        )}
                      </button>

                      <button
                        onClick={() => onOpenDashboard('downloads')}
                        className="w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs text-slate-200 hover:text-cyan-300 hover:bg-slate-800 transition-all"
                      >
                        <div className="flex items-center gap-2">
                          <Download className="w-4 h-4 text-purple-400" />
                          <span>Script & Downloads</span>
                        </div>
                      </button>

                      <button
                        onClick={() => onOpenDashboard('orders')}
                        className="w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs text-slate-200 hover:text-cyan-300 hover:bg-slate-800 transition-all"
                      >
                        <div className="flex items-center gap-2">
                          <Receipt className="w-4 h-4 text-emerald-400" />
                          <span>Riwayat Transaksi</span>
                        </div>
                        {myOrderCount > 0 && (
                          <span className="bg-slate-800 text-slate-400 text-[10px] px-1.5 py-0.5 rounded">
                            {myOrderCount}
                          </span>
                        )}
                      </button>

                      {isAdmin && (
                        <button
                          onClick={() => onOpenAdmin('analytics')}
                          className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-xs text-purple-300 font-semibold hover:bg-purple-950/60 transition-all border-t border-slate-800 mt-1"
                        >
                          <ShieldCheck className="w-4 h-4 text-purple-400" />
                          <span>Dashboard Admin</span>
                        </button>
                      )}

                      <button
                        onClick={logout}
                        className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-xs text-red-400 hover:bg-red-950/40 transition-all border-t border-slate-800 mt-1"
                      >
                        <LogOut className="w-4 h-4" />
                        <span>Keluar (Logout)</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={() => {
                  setAuthModalMode('login');
                  setIsAuthModalOpen(true);
                }}
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-xs shadow-md shadow-cyan-500/20 hover:shadow-cyan-500/40 transition-all"
              >
                <KeyRound className="w-3.5 h-3.5" />
                <span>Login</span>
              </button>
            )}

            {/* Mobile menu toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-800 bg-slate-950 px-4 pt-3 pb-6 space-y-3">
          {/* Mobile search */}
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => {
                onSearchChange(e.target.value);
                if (currentView !== 'store') setCurrentView('store');
              }}
              placeholder="Cari hosting, script bot..."
              className="w-full pl-9 pr-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-2 pt-2">
            <button
              onClick={() => {
                setCurrentView('store');
                onSelectCategory('all');
                setMobileMenuOpen(false);
              }}
              className="px-3 py-2.5 rounded-lg text-xs font-semibold bg-slate-900 border border-slate-800 text-slate-200 text-left"
            >
              🏠 Semua Produk
            </button>

            <button
              onClick={() => {
                setCurrentView('store');
                onSelectCategory('hosting_samp');
                setMobileMenuOpen(false);
              }}
              className="px-3 py-2.5 rounded-lg text-xs font-semibold bg-cyan-950/40 border border-cyan-800/40 text-cyan-300 text-left"
            >
              🖥️ Hosting SA:MP
            </button>

            <button
              onClick={() => {
                setCurrentView('store');
                onSelectCategory('script_bot');
                setMobileMenuOpen(false);
              }}
              className="px-3 py-2.5 rounded-lg text-xs font-semibold bg-purple-950/40 border border-purple-800/40 text-purple-300 text-left"
            >
              🤖 Script Bot
            </button>

            <button
              onClick={() => {
                setCurrentView('store');
                onSelectCategory('gamemode_samp');
                setMobileMenuOpen(false);
              }}
              className="px-3 py-2.5 rounded-lg text-xs font-semibold bg-amber-950/40 border border-amber-800/40 text-amber-300 text-left"
            >
              🎮 Gamemode SA:MP
            </button>

            <button
              onClick={() => {
                setCurrentView('store');
                onSelectCategory('script_website');
                setMobileMenuOpen(false);
              }}
              className="px-3 py-2.5 rounded-lg text-xs font-semibold bg-emerald-950/40 border border-emerald-800/40 text-emerald-300 text-left"
            >
              🌐 Script Website
            </button>

            <button
              onClick={() => {
                onOpenDashboard('servers');
                setMobileMenuOpen(false);
              }}
              className="px-3 py-2.5 rounded-lg text-xs font-semibold bg-blue-950/40 border border-blue-800/40 text-blue-300 text-left"
            >
              💻 Server & Akun
            </button>
          </div>

          {isAdmin && (
            <button
              onClick={() => {
                onOpenAdmin('analytics');
                setMobileMenuOpen(false);
              }}
              className="w-full py-2.5 rounded-xl bg-purple-900/60 border border-purple-500/50 text-white font-bold text-xs flex items-center justify-center gap-2"
            >
              <ShieldCheck className="w-4 h-4 text-purple-300" />
              <span>Buka Admin Dashboard (RanzCode)</span>
            </button>
          )}
        </div>
      )}
    </header>
  );
};
