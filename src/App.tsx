import React, { useState, useMemo } from 'react';
import { StoreProvider, useStore } from './context/StoreContext';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ServerStatusBanner } from './components/ServerStatusBanner';
import { CategoryFilter } from './components/CategoryFilter';
import { ProductCard } from './components/ProductCard';
import { ProductDetailModal } from './components/ProductDetailModal';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { AuthModal } from './components/AuthModal';
import { UserDashboard } from './components/UserDashboard';
import { AdminDashboard } from './components/AdminDashboard';
import { SupportWidget } from './components/SupportWidget';
import { Footer } from './components/Footer';
import { ProductCategory, Product } from './types';
import {
  Server,
  Zap,
  ShieldCheck,
  CreditCard,
  Sparkles,
  HelpCircle,
  Star,
  CheckCircle2,
  Clock,
  ArrowRight,
  Bot,
  Gamepad2,
  Globe,
  Bell
} from 'lucide-react';

const StoreApp: React.FC = () => {
  const {
    products,
    paymentSettings,
    selectedProductForDetail,
    setSelectedProductForDetail,
    setIsCheckoutOpen,
    addToCart,
    setIsAuthModalOpen,
    setAuthModalMode,
    toastMessage,
    isAdmin,
  } = useStore();

  const [currentView, setCurrentView] = useState<'store' | 'user_dashboard' | 'admin_dashboard'>('store');
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'popular' | 'price_asc' | 'price_desc' | 'rating'>('popular');
  const [dashboardTab, setDashboardTab] = useState<string>('servers');
  const [adminTab, setAdminTab] = useState<string>('analytics');

  // Filter & Sort Products
  const filteredProducts = useMemo(() => {
    let list = [...products];

    // Filter by Category
    if (selectedCategory !== 'all') {
      list = list.filter((p) => p.category === selectedCategory);
    }

    // Filter by Search
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.shortDescription.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.features.some((f) => f.toLowerCase().includes(q))
      );
    }

    // Sort
    if (sortBy === 'popular') {
      list.sort((a, b) => b.totalSales - a.totalSales);
    } else if (sortBy === 'price_asc') {
      list.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price_desc') {
      list.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'rating') {
      list.sort((a, b) => b.rating - a.rating);
    }

    return list;
  }, [products, selectedCategory, searchQuery, sortBy]);

  // Quick action: Instant Buy opens Checkout immediately
  const handleInstantBuy = (product: Product, customServerName?: string) => {
    addToCart(product, 1, customServerName);
    setIsCheckoutOpen(true);
  };

  const handleOpenDashboard = (tab = 'servers') => {
    setDashboardTab(tab);
    setCurrentView('user_dashboard');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenAdmin = (tab = 'analytics') => {
    setAdminTab(tab);
    setCurrentView('admin_dashboard');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#060911] text-slate-100 flex flex-col selection:bg-cyan-500 selection:text-slate-950">
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-20 right-5 z-50 animate-in slide-in-from-top-5 duration-300">
          <div className="flex items-center gap-2.5 px-4 py-3 rounded-2xl bg-slate-900 border border-cyan-500/50 text-white text-xs font-bold shadow-2xl shadow-cyan-500/20 backdrop-blur-xl">
            <Sparkles className="w-4 h-4 text-cyan-400 shrink-0" />
            <span>{toastMessage}</span>
          </div>
        </div>
      )}

      {/* Main Navbar */}
      <Navbar
        onSelectCategory={(cat) => {
          setSelectedCategory(cat);
          setCurrentView('store');
        }}
        onOpenDashboard={handleOpenDashboard}
        onOpenAdmin={handleOpenAdmin}
        currentView={currentView}
        setCurrentView={setCurrentView}
        onSearchChange={setSearchQuery}
        searchQuery={searchQuery}
      />

      {/* VIEW: MAIN STORE */}
      {currentView === 'store' && (
        <main className="flex-1 space-y-12">
          
          {/* Hero Banner */}
          <Hero
            onSelectCategory={(cat) => {
              setSelectedCategory(cat);
              const element = document.getElementById('product-catalog');
              element?.scrollIntoView({ behavior: 'smooth' });
            }}
            onExploreClick={() => {
              setSelectedCategory('all');
              const element = document.getElementById('product-catalog');
              element?.scrollIntoView({ behavior: 'smooth' });
            }}
          />

          {/* Infrastructure Live Status Ticker */}
          <ServerStatusBanner />

          {/* Store Notice / Promo Banner */}
          {paymentSettings.storeNotice && (
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="p-4 rounded-2xl bg-gradient-to-r from-cyan-950/60 via-slate-900 to-purple-950/60 border border-cyan-500/30 text-xs text-cyan-200 flex items-center justify-between gap-3 shadow-lg">
                <div className="flex items-center gap-2.5">
                  <Bell className="w-4 h-4 text-cyan-400 shrink-0 animate-bounce" />
                  <span className="font-semibold">{paymentSettings.storeNotice}</span>
                </div>
                <span className="hidden md:inline text-[11px] font-mono text-cyan-400 bg-cyan-950 px-2.5 py-1 rounded-lg border border-cyan-800/40">
                  KODE: RANZCLOUD
                </span>
              </div>
            </div>
          )}

          {/* Product Catalog Section */}
          <section id="product-catalog" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 pt-4">
            
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-3">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-cyan-400">
                  KATALOG RESMI
                </span>
                <h2 className="text-2xl sm:text-3xl font-black text-white mt-1">
                  Pilih Produk Digital & Server SA:MP
                </h2>
              </div>
              <p className="text-xs text-slate-400 max-w-md">
                Server hosting Pterodactyl langsung aktif otomatis. Script & gamemode langsung dapat link download dan lisensi instan.
              </p>
            </div>

            {/* Category Filter Pills & Sort Selector */}
            <CategoryFilter
              selectedCategory={selectedCategory}
              onSelectCategory={setSelectedCategory}
              sortBy={sortBy}
              onSortChange={setSortBy}
            />

            {/* Search Query Feedback */}
            {searchQuery && (
              <div className="text-xs text-slate-400">
                Menampilkan hasil untuk pencarian: <span className="font-bold text-cyan-400">"{searchQuery}"</span> ({filteredProducts.length} produk ditemukan)
              </div>
            )}

            {/* Product Cards Grid */}
            {filteredProducts.length === 0 ? (
              <div className="py-20 text-center rounded-3xl bg-slate-900/40 border border-slate-800 space-y-3">
                <div className="w-16 h-16 mx-auto rounded-full bg-slate-950 flex items-center justify-center text-slate-600">
                  <Server className="w-8 h-8" />
                </div>
                <h3 className="text-base font-bold text-slate-200">Tidak ada produk ditemukan</h3>
                <p className="text-xs text-slate-500 max-w-sm mx-auto">
                  Coba ubah kata kunci pencarian Anda atau pilih kategori lain.
                </p>
                <button
                  onClick={() => {
                    setSelectedCategory('all');
                    setSearchQuery('');
                  }}
                  className="px-4 py-2 rounded-xl bg-cyan-500 text-slate-950 font-bold text-xs"
                >
                  Reset Filter
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onOpenDetail={setSelectedProductForDetail}
                    onInstantBuy={handleInstantBuy}
                  />
                ))}
              </div>
            )}

          </section>

          {/* Why Choose RanzCloud Store Section */}
          <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-b from-slate-900/90 to-slate-950 border border-slate-800 space-y-8">
              <div className="text-center max-w-2xl mx-auto">
                <span className="text-xs font-bold uppercase tracking-wider text-cyan-400">
                  KEUNGGULAN RANZCLOUD STORE
                </span>
                <h2 className="text-2xl sm:text-3xl font-black text-white mt-1">
                  Mengapa Ribuan Komunitas SA:MP Memilih Kami?
                </h2>
                <p className="text-xs text-slate-400 mt-2">
                  Infrastruktur mutakhir dan sistem otomatisasi yang membuat server Anda online seketika tanpa perlu menunggu konfirmasi admin.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="p-6 rounded-2xl bg-slate-950/80 border border-slate-800/80 space-y-3">
                  <div className="w-12 h-12 rounded-xl bg-cyan-500/10 text-cyan-400 flex items-center justify-center border border-cyan-500/20">
                    <Zap className="w-6 h-6" />
                  </div>
                  <h3 className="text-base font-bold text-white">Auto-Provisioning 5 Detik</h3>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Begitu QRIS Anda terbayar, sistem API Pterodactyl langsung membuatkan server SA:MP Anda lengkap dengan IP, Port, Username, Password, SFTP, dan MySQL database.
                  </p>
                </div>

                <div className="p-6 rounded-2xl bg-slate-950/80 border border-slate-800/80 space-y-3">
                  <div className="w-12 h-12 rounded-xl bg-purple-500/10 text-purple-400 flex items-center justify-center border border-purple-500/20">
                    <CreditCard className="w-6 h-6" />
                  </div>
                  <h3 className="text-base font-bold text-white">QRIS Otomatis BuatQRIS & Dana</h3>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Mendukung semua dompet digital (Dana, GoPay, OVO, ShopeePay) serta seluruh Bank di Indonesia (BCA, Mandiri, BRI, BNI). Verifikasi otomatis tanpa upload bukti transfer!
                  </p>
                </div>

                <div className="p-6 rounded-2xl bg-slate-950/80 border border-slate-800/80 space-y-3">
                  <div className="w-12 h-12 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center border border-emerald-500/20">
                    <ShieldCheck className="w-6 h-6" />
                  </div>
                  <h3 className="text-base font-bold text-white">Anti-DDoS Voxility 1000Gbps</h3>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Server SA:MP Anda dilindungi proteksi layer 4 dan layer 7 canggih. Bebas dari serangan DDoS attack yang sering mengganggu kenyamanan bermain player Anda.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Testimonial & Social Proof Section */}
          <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="text-center max-w-xl mx-auto mb-8">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
                ULASAN PELANGGAN
              </span>
              <h2 className="text-2xl font-black text-white mt-1">
                Apa Kata Pemilik Server SA:MP?
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4">
                <div className="flex items-center gap-1 text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400" />
                  ))}
                </div>
                <p className="text-xs text-slate-300 leading-relaxed italic">
                  "Sumpah cepat banget! Pas scan QRIS di app DANA, gak sampai 5 detik langsung dapet IP:Port sama akun Pterodactyl. Server SA:MP Roleplay saya 120 player stabil tanpa lag di SG Node."
                </p>
                <div className="flex items-center gap-3 pt-2 border-t border-slate-800">
                  <div className="w-9 h-9 rounded-full bg-cyan-500/20 text-cyan-400 flex items-center justify-center font-bold text-xs">
                    R
                  </div>
                  <div>
                    <div className="text-xs font-bold text-white">Rizky Pratama</div>
                    <div className="text-[10px] text-slate-400">Owner Nusantara Roleplay</div>
                  </div>
                </div>
              </div>

              <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4">
                <div className="flex items-center gap-1 text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400" />
                  ))}
                </div>
                <p className="text-xs text-slate-300 leading-relaxed italic">
                  "Script Bot Discord UCP-nya gampang banget disetup, ada tutorial PDF lengkap. Bot WA Store otomatisnya juga lancar jaya terintegrasi BuatQRIS. Recommended store!"
                </p>
                <div className="flex items-center gap-3 pt-2 border-t border-slate-800">
                  <div className="w-9 h-9 rounded-full bg-purple-500/20 text-purple-400 flex items-center justify-center font-bold text-xs">
                    A
                  </div>
                  <div>
                    <div className="text-xs font-bold text-white">Andika Developer</div>
                    <div className="text-[10px] text-slate-400">Staff Discord Indo SAMP</div>
                  </div>
                </div>
              </div>

              <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4">
                <div className="flex items-center gap-1 text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400" />
                  ))}
                </div>
                <p className="text-xs text-slate-300 leading-relaxed italic">
                  "Gamemode Roleplay V4-nya bersih banget codenya, gak ada error MySQL dan plugin voice ingamenya jernih. CS RanzCloud juga ramah banget bantu setup pas awal."
                </p>
                <div className="flex items-center gap-3 pt-2 border-t border-slate-800">
                  <div className="w-9 h-9 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold text-xs">
                    F
                  </div>
                  <div>
                    <div className="text-xs font-bold text-white">Fajar Hidayat</div>
                    <div className="text-[10px] text-slate-400">Scripter Pawn SA:MP</div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Quick FAQ Section */}
          <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-4">
            <div className="text-center">
              <span className="text-xs font-bold uppercase tracking-wider text-cyan-400">FAQ</span>
              <h2 className="text-2xl font-black text-white mt-1">Pertanyaan Umum (FAQ)</h2>
            </div>

            <div className="space-y-3 pt-4">
              <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800">
                <h3 className="text-xs font-bold text-white flex items-center gap-2">
                  <HelpCircle className="w-4 h-4 text-cyan-400" />
                  <span>Bagaimana cara kerja pembayaran otomatis BuatQRIS?</span>
                </h3>
                <p className="text-xs text-slate-400 mt-1.5 pl-6">
                  Sistem kami terhubung dengan API https://app.buatqris.site. Saat Anda melakukan pembayaran melalui QRIS, gateway BuatQRIS akan mendeteksi mutasi dalam hitungan detik dan mengirimkan webhook otomatis untuk mengeksekusi pembuatan server Pterodactyl atau pengiriman link download.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800">
                <h3 className="text-xs font-bold text-white flex items-center gap-2">
                  <HelpCircle className="w-4 h-4 text-cyan-400" />
                  <span>Apakah saya mendapatkan akses SFTP dan phpMyAdmin?</span>
                </h3>
                <p className="text-xs text-slate-400 mt-1.5 pl-6">
                  Tentu! Semua paket Hosting SA:MP kami menyertakan akses SFTP untuk upload gamemode/plugins via FileZilla / WinSCP, serta database MySQL gratis yang dapat diakses via phpMyAdmin.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800">
                <h3 className="text-xs font-bold text-white flex items-center gap-2">
                  <HelpCircle className="w-4 h-4 text-cyan-400" />
                  <span>Bagaimana jika saya membeli script bot atau gamemode?</span>
                </h3>
                <p className="text-xs text-slate-400 mt-1.5 pl-6">
                  Setelah status pembayaran sukses, Anda akan langsung disajikan tombol Download ZIP file source code lengkap beserta License Key resmi dan database .SQL dump siap pakai.
                </p>
              </div>
            </div>
          </section>

        </main>
      )}

      {/* VIEW: USER DASHBOARD */}
      {currentView === 'user_dashboard' && (
        <UserDashboard
          initialTab={dashboardTab}
          onBackToStore={() => setCurrentView('store')}
        />
      )}

      {/* VIEW: ADMIN DASHBOARD (RanzCode) */}
      {currentView === 'admin_dashboard' && (
        <AdminDashboard
          initialTab={adminTab}
          onBackToStore={() => setCurrentView('store')}
        />
      )}

      {/* Footer */}
      <Footer
        onSelectCategory={(cat) => {
          setSelectedCategory(cat);
          setCurrentView('store');
          const el = document.getElementById('product-catalog');
          el?.scrollIntoView({ behavior: 'smooth' });
        }}
        onOpenAuth={() => {
          setAuthModalMode('login');
          setIsAuthModalOpen(true);
        }}
      />

      {/* Modals & Slide-over Drawers */}
      <ProductDetailModal
        product={selectedProductForDetail}
        onClose={() => setSelectedProductForDetail(null)}
        onInstantBuy={handleInstantBuy}
      />

      <CartDrawer />

      <CheckoutModal />

      <AuthModal />

      <SupportWidget />

    </div>
  );
};

export function App() {
  return (
    <StoreProvider>
      <StoreApp />
    </StoreProvider>
  );
}

export default App;
