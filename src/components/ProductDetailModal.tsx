import React, { useState } from 'react';
import {
  X,
  Server,
  Bot,
  Gamepad2,
  Globe,
  Star,
  CheckCircle2,
  Cpu,
  HardDrive,
  ShieldCheck,
  Zap,
  ShoppingCart,
  DownloadCloud,
  FileCode2,
  HelpCircle,
  ExternalLink,
  Lock,
  Layers,
  Sparkles,
  MessageSquare
} from 'lucide-react';
import { Product } from '../types';
import { useStore } from '../context/StoreContext';
import { formatRupiah } from '../utils/payment';

interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
  onInstantBuy: (product: Product, customServerName?: string) => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  onClose,
  onInstantBuy,
}) => {
  const { addToCart } = useStore();
  const [activeTab, setActiveTab] = useState<'overview' | 'specs' | 'guide' | 'faq'>('overview');
  const [customServerName, setCustomServerName] = useState('');

  if (!product) return null;

  const handleAddToCart = () => {
    addToCart(product, 1, customServerName);
    onClose();
  };

  const handleBuyNow = () => {
    onInstantBuy(product, customServerName);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-4xl max-h-[92vh] rounded-3xl bg-slate-900 border border-slate-700/80 shadow-2xl flex flex-col overflow-hidden text-slate-100 animate-in fade-in zoom-in-95 duration-200">
        
        {/* Modal Top Header Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-950/60">
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <span className="uppercase font-bold tracking-wider text-cyan-400">
              {product.category.replace('_', ' ')}
            </span>
            <span>•</span>
            <span className="text-slate-300 font-semibold">{product.name}</span>
          </div>
          
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 transition-all"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6">
          
          {/* Top Hero Grid */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            
            {/* Left Image / Banner */}
            <div className="md:col-span-5 relative rounded-2xl overflow-hidden bg-slate-950 border border-slate-800 h-56 md:h-auto">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent" />
              
              <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
                <div className="flex items-center gap-1.5 bg-slate-950/90 px-2.5 py-1 rounded-lg border border-slate-800 text-xs text-amber-400 font-bold backdrop-blur-md">
                  <Star className="w-4 h-4 fill-amber-400" />
                  <span>{product.rating}</span>
                  <span className="text-slate-400 font-normal">({product.totalSales} terjual)</span>
                </div>

                <div className="bg-cyan-950/90 text-cyan-300 text-xs px-2.5 py-1 rounded-lg border border-cyan-500/30 font-bold">
                  ⚡ Auto Deliver
                </div>
              </div>
            </div>

            {/* Right Info */}
            <div className="md:col-span-7 flex flex-col justify-between">
              <div>
                <h2 className="text-xl sm:text-2xl font-black text-white leading-snug">
                  {product.name}
                </h2>
                <p className="mt-2 text-sm text-slate-300 leading-relaxed">
                  {product.description}
                </p>

                {/* If Hosting SA:MP, custom server name input */}
                {product.category === 'hosting_samp' && (
                  <div className="mt-4 p-3 rounded-xl bg-slate-950/70 border border-cyan-500/30">
                    <label className="block text-xs font-bold text-cyan-300 mb-1">
                      Nama Server Anda (Opsional):
                    </label>
                    <input
                      type="text"
                      value={customServerName}
                      onChange={(e) => setCustomServerName(e.target.value)}
                      placeholder="Contoh: Nusantara Roleplay V2"
                      className="w-full px-3 py-1.5 bg-slate-900 border border-slate-700 rounded-lg text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
                    />
                  </div>
                )}
              </div>

              {/* Price Tag & Guarantees */}
              <div className="mt-4 pt-4 border-t border-slate-800 flex flex-wrap items-end justify-between gap-3">
                <div>
                  <div className="text-xs text-slate-400 font-medium">Harga Produk</div>
                  <div className="text-2xl sm:text-3xl font-black text-white">
                    {formatRupiah(product.price)}
                    {product.category === 'hosting_samp' && (
                      <span className="text-sm font-normal text-slate-400"> /bulan</span>
                    )}
                  </div>
                  {product.originalPrice && (
                    <div className="text-xs text-slate-500 line-through">
                      Normal: {formatRupiah(product.originalPrice)}
                    </div>
                  )}
                </div>

                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1 text-[11px] text-emerald-400 bg-emerald-950/40 px-2.5 py-1 rounded-lg border border-emerald-500/30">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>Garansi 100% Aktif</span>
                  </div>
                </div>
              </div>

            </div>

          </div>

          {/* Navigation Tabs */}
          <div className="border-b border-slate-800">
            <div className="flex items-center gap-2 overflow-x-auto pb-2">
              <button
                onClick={() => setActiveTab('overview')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  activeTab === 'overview'
                    ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                📋 Fitur & Keunggulan
              </button>

              <button
                onClick={() => setActiveTab('specs')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  activeTab === 'specs'
                    ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                ⚙️ Spesifikasi Teknis
              </button>

              <button
                onClick={() => setActiveTab('guide')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  activeTab === 'guide'
                    ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                📖 Panduan & Instalasi
              </button>

              <button
                onClick={() => setActiveTab('faq')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  activeTab === 'faq'
                    ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                ❓ FAQ & Garansi
              </button>
            </div>
          </div>

          {/* Tab Content */}
          <div className="py-2">
            
            {/* TAB 1: OVERVIEW */}
            {activeTab === 'overview' && (
              <div className="space-y-4">
                <h4 className="text-sm font-bold text-white flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-cyan-400" />
                  <span>Daftar Fitur Utama:</span>
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {product.features.map((feat, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-950/60 border border-slate-800 text-xs text-slate-200"
                    >
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>

                <div className="p-4 rounded-xl bg-cyan-950/30 border border-cyan-500/30 text-xs text-cyan-200 leading-relaxed">
                  <span className="font-bold">⚡ Otomatisasi Sistem:</span> Pesanan Anda akan langsung diproses seketika setelah pembayaran QRIS terverifikasi oleh BuatQRIS gateway. Akun Pterodactyl atau Link Download + Lisensi akan muncul langsung di layar Anda.
                </div>
              </div>
            )}

            {/* TAB 2: SPECS */}
            {activeTab === 'specs' && (
              <div className="space-y-4">
                {product.category === 'hosting_samp' && product.hostingSpecs ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                    <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800">
                      <div className="text-slate-400 text-xs">Alokasi RAM</div>
                      <div className="text-sm font-bold text-white mt-1">{product.hostingSpecs.ram}</div>
                    </div>
                    <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800">
                      <div className="text-slate-400 text-xs">Kapasitas CPU</div>
                      <div className="text-sm font-bold text-white mt-1">{product.hostingSpecs.cpu}</div>
                    </div>
                    <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800">
                      <div className="text-slate-400 text-xs">Penyimpanan Storage</div>
                      <div className="text-sm font-bold text-white mt-1">{product.hostingSpecs.disk}</div>
                    </div>
                    <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800">
                      <div className="text-slate-400 text-xs">Max Player Slots</div>
                      <div className="text-sm font-bold text-white mt-1">{product.hostingSpecs.slots}</div>
                    </div>
                    <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800">
                      <div className="text-slate-400 text-xs">Lokasi Datacenter</div>
                      <div className="text-sm font-bold text-white mt-1">{product.hostingSpecs.location}</div>
                    </div>
                    <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800">
                      <div className="text-slate-400 text-xs">Proteksi Anti-DDoS</div>
                      <div className="text-sm font-bold text-white mt-1">{product.hostingSpecs.antiDDoS}</div>
                    </div>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {product.scriptSpecs?.version && (
                      <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800">
                        <div className="text-slate-400 text-xs">Versi Script</div>
                        <div className="text-sm font-bold text-cyan-300 mt-1">{product.scriptSpecs.version}</div>
                      </div>
                    )}
                    {product.scriptSpecs?.framework && (
                      <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800">
                        <div className="text-slate-400 text-xs">Tech Stack / Framework</div>
                        <div className="text-sm font-bold text-purple-300 mt-1">{product.scriptSpecs.framework}</div>
                      </div>
                    )}
                    {product.scriptSpecs?.fileSize && (
                      <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800">
                        <div className="text-slate-400 text-xs">Ukuran File ZIP</div>
                        <div className="text-sm font-bold text-white mt-1">{product.scriptSpecs.fileSize}</div>
                      </div>
                    )}
                    {product.scriptSpecs?.licenseType && (
                      <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800">
                        <div className="text-slate-400 text-xs">Tipe Lisensi</div>
                        <div className="text-sm font-bold text-emerald-400 mt-1">{product.scriptSpecs.licenseType}</div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}

            {/* TAB 3: GUIDE */}
            {activeTab === 'guide' && (
              <div className="space-y-3">
                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 font-mono text-xs text-slate-300 whitespace-pre-wrap leading-relaxed">
                  {product.installGuide || '1. Lakukan pembayaran via QRIS BuatQRIS\n2. Dapatkan link download & lisensi otomatis\n3. Ekstrak file dan ikuti file README.txt'}
                </div>
              </div>
            )}

            {/* TAB 4: FAQ */}
            {activeTab === 'faq' && (
              <div className="space-y-3 text-xs">
                <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800">
                  <div className="font-bold text-white">Bagaimana jika pembayaran sudah transfer tapi belum terverifikasi?</div>
                  <div className="text-slate-400 mt-1">Sistem kami terhubung dengan webhook BuatQRIS realtime. Jika terjadi keterlambatan jaringan bank, Anda dapat menekan tombol "Cek Status Pembayaran" atau menghubungi CS WhatsApp kami dengan bukti transfer.</div>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800">
                  <div className="font-bold text-white">Apakah Hosting SA:MP mendapatkan akses Pterodactyl penuh?</div>
                  <div className="text-slate-400 mt-1">Ya, Anda mendapatkan akun Pterodactyl Panel dengan akses File Manager, Web Console, Startup Parameter, SFTP, dan pembuatan Database MySQL.</div>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800">
                  <div className="font-bold text-white">Apakah script bergaransi jika terjadi error/bug?</div>
                  <div className="text-slate-400 mt-1">Kami memberikan garansi perbaikan script dan bantuan instalasi melalui Discord Support & WhatsApp.</div>
                </div>
              </div>
            )}

          </div>

        </div>

        {/* Modal Bottom Actions */}
        <div className="px-6 py-4 border-t border-slate-800 bg-slate-950/90 flex flex-wrap items-center justify-between gap-3">
          <div className="text-xs text-slate-400">
            Kategori: <span className="text-white font-semibold">{product.category}</span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleAddToCart}
              className="px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 hover:border-cyan-500/50 text-slate-200 font-bold text-xs flex items-center gap-2 transition-all"
            >
              <ShoppingCart className="w-4 h-4 text-cyan-400" />
              <span>+ Masukkan Keranjang</span>
            </button>

            <button
              onClick={handleBuyNow}
              className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-extrabold text-xs shadow-lg shadow-cyan-500/20 flex items-center gap-2 transition-all active:scale-95"
            >
              <Zap className="w-4 h-4 text-slate-950" />
              <span>Beli Sekarang ({formatRupiah(product.price)})</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
