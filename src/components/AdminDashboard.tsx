import React, { useState } from 'react';
import {
  ShieldCheck,
  TrendingUp,
  Server,
  Layers,
  Tag,
  Receipt,
  Settings,
  Plus,
  Edit2,
  Trash2,
  CheckCircle2,
  AlertCircle,
  Eye,
  KeyRound,
  ExternalLink,
  Bot,
  Gamepad2,
  Globe,
  Database,
  Cpu,
  HardDrive,
  Sparkles,
  QrCode,
  DollarSign,
  Activity,
  Zap,
  Save,
  RotateCw,
  Power
} from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { formatRupiah } from '../utils/payment';
import { Product, ProductCategory, CategoryInfo, Voucher, Order, SampServerInstance } from '../types';

interface AdminDashboardProps {
  initialTab?: string;
  onBackToStore: () => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  initialTab = 'analytics',
  onBackToStore,
}) => {
  const {
    products,
    addProduct,
    updateProduct,
    deleteProduct,
    categories,
    addCategory,
    updateCategory,
    deleteCategory,
    vouchers,
    addVoucher,
    updateVoucher,
    deleteVoucher,
    orders,
    processPaymentSuccess,
    cancelOrder,
    servers,
    controlServer,
    deleteServer,
    paymentSettings,
    updatePaymentSettings,
    pterodactylSettings,
    updatePterodactylSettings,
    currentUser,
    isAdmin,
    showToast,
  } = useStore();

  const [activeTab, setActiveTab] = useState<
    'analytics' | 'products' | 'categories' | 'vouchers' | 'orders' | 'servers' | 'payment_settings' | 'ptero_settings'
  >((initialTab as any) || 'analytics');

  // Product Add / Edit Modal State
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [editingProductId, setEditingProductId] = useState<string | null>(null);
  const [prodForm, setProdForm] = useState<{
    name: string;
    category: ProductCategory;
    price: number;
    originalPrice: number;
    shortDescription: string;
    description: string;
    featuresText: string;
    image: string;
    stock: number;
    ram: string;
    cpu: string;
    disk: string;
    slots: string;
    version: string;
    framework: string;
    downloadUrl: string;
    installGuide: string;
    sqlDumpIncluded: boolean;
  }>({
    name: '',
    category: 'hosting_samp',
    price: 25000,
    originalPrice: 35000,
    shortDescription: '',
    description: '',
    featuresText: 'High Performance NVMe\nAnti-DDoS Protection\nAuto Provisioning',
    image: '/images/samp-hosting.jpg',
    stock: -1,
    ram: '4 GB RAM',
    cpu: '200% CPU',
    disk: '15 GB NVMe',
    slots: '100 Slots',
    version: 'v1.0.0',
    framework: 'Node.js / Pawn',
    downloadUrl: '',
    installGuide: '',
    sqlDumpIncluded: false,
  });

  // Category Add / Edit Modal State
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
  const [catForm, setCatForm] = useState<CategoryInfo>({
    id: 'hosting_samp',
    name: '',
    slug: '',
    icon: 'Server',
    description: '',
    badge: 'New',
  });

  // Voucher Add State
  const [isVoucherModalOpen, setIsVoucherModalOpen] = useState(false);
  const [voucherForm, setVoucherForm] = useState<Omit<Voucher, 'id' | 'usedCount'>>({
    code: '',
    discountType: 'percentage',
    discountValue: 10,
    minPurchase: 10000,
    maxUses: 100,
    expiresAt: '2026-12-31',
    isActive: true,
    description: 'Promo Spesial RanzCloud',
  });

  // Form Payment Settings state
  const [payForm, setPayForm] = useState(paymentSettings);
  // Form Pterodactyl Settings state
  const [pteroForm, setPteroForm] = useState(pterodactylSettings);

  // Financial Analytics Calculations
  const totalRevenue = orders
    .filter((o) => o.status === 'completed')
    .reduce((sum, o) => sum + o.totalAmount, 0);

  const totalCompletedOrders = orders.filter((o) => o.status === 'completed').length;
  const totalPendingOrders = orders.filter((o) => o.status === 'pending').length;

  // Open Edit Product Modal
  const handleOpenEditProduct = (prod: Product) => {
    setEditingProductId(prod.id);
    setProdForm({
      name: prod.name,
      category: prod.category,
      price: prod.price,
      originalPrice: prod.originalPrice || 0,
      shortDescription: prod.shortDescription,
      description: prod.description,
      featuresText: prod.features.join('\n'),
      image: prod.image,
      stock: prod.stock,
      ram: prod.hostingSpecs?.ram || '4 GB RAM',
      cpu: prod.hostingSpecs?.cpu || '200% CPU',
      disk: prod.hostingSpecs?.disk || '15 GB NVMe',
      slots: prod.hostingSpecs?.slots || '100 Slots',
      version: prod.scriptSpecs?.version || 'v1.0.0',
      framework: prod.scriptSpecs?.framework || 'Pawn / Node.js',
      downloadUrl: prod.downloadUrl || '',
      installGuide: prod.installGuide || '',
      sqlDumpIncluded: !!prod.sqlDumpIncluded,
    });
    setIsProductModalOpen(true);
  };

  const handleOpenAddProduct = () => {
    setEditingProductId(null);
    setProdForm({
      name: '',
      category: 'hosting_samp',
      price: 25000,
      originalPrice: 35000,
      shortDescription: 'Deskripsi singkat produk...',
      description: 'Deskripsi lengkap dan keunggulan produk...',
      featuresText: 'High Performance RAM\nAnti-DDoS Voxility\nAuto Instant Provisioning',
      image: '/images/samp-hosting.jpg',
      stock: -1,
      ram: '4 GB RAM',
      cpu: '200% CPU',
      disk: '15 GB NVMe',
      slots: '150 Slots',
      version: 'v1.0.0',
      framework: 'Pawn 0.3.7 / Node.js',
      downloadUrl: '',
      installGuide: '1. Download file\n2. Ekstrak\n3. Jalankan',
      sqlDumpIncluded: false,
    });
    setIsProductModalOpen(true);
  };

  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault();
    const features = prodForm.featuresText
      .split('\n')
      .map((f) => f.trim())
      .filter(Boolean);

    const productPayload: any = {
      name: prodForm.name,
      category: prodForm.category,
      price: Number(prodForm.price),
      originalPrice: Number(prodForm.originalPrice) || undefined,
      shortDescription: prodForm.shortDescription,
      description: prodForm.description,
      features,
      image: prodForm.image,
      stock: Number(prodForm.stock),
      downloadUrl: prodForm.downloadUrl,
      installGuide: prodForm.installGuide,
      sqlDumpIncluded: prodForm.sqlDumpIncluded,
    };

    if (prodForm.category === 'hosting_samp') {
      productPayload.hostingSpecs = {
        ram: prodForm.ram,
        cpu: prodForm.cpu,
        disk: prodForm.disk,
        slots: prodForm.slots,
        databases: 2,
        backups: 4,
        ports: 2,
        location: 'Singapore SG-Equinix 01',
        antiDDoS: 'Voxility 1000Gbps',
        eggType: 'SA:MP 0.3.7 / open.mp',
      };
    } else {
      productPayload.scriptSpecs = {
        version: prodForm.version,
        framework: prodForm.framework,
        licenseType: 'Lifetime License',
        fileSize: '25.0 MB',
      };
    }

    if (editingProductId) {
      updateProduct(editingProductId, productPayload);
    } else {
      addProduct(productPayload);
    }

    setIsProductModalOpen(false);
  };

  const handleSaveVoucher = (e: React.FormEvent) => {
    e.preventDefault();
    if (!voucherForm.code) return;
    addVoucher({
      ...voucherForm,
      code: voucherForm.code.toUpperCase(),
      discountValue: Number(voucherForm.discountValue),
      minPurchase: Number(voucherForm.minPurchase),
      maxUses: Number(voucherForm.maxUses),
    });
    setIsVoucherModalOpen(false);
  };

  const handleSavePaymentSettings = (e: React.FormEvent) => {
    e.preventDefault();
    updatePaymentSettings(payForm);
  };

  const handleSavePterodactylSettings = (e: React.FormEvent) => {
    e.preventDefault();
    updatePterodactylSettings(pteroForm);
  };

  return (
    <div className="min-h-screen py-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
      
      {/* Top Admin Crown Header */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-purple-950/80 via-slate-900 to-slate-950 border border-purple-500/40 shadow-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-purple-600 to-indigo-600 flex items-center justify-center text-white font-black text-2xl shadow-xl shadow-purple-500/30">
            <ShieldCheck className="w-8 h-8" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl sm:text-2xl font-black text-white">
                RanzCloud Store Admin Dashboard
              </h2>
              <span className="px-2.5 py-0.5 rounded-full bg-purple-500/20 text-purple-300 text-xs font-black border border-purple-500/40">
                OWNER: RanzCode
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-1">
              Pusat Manajemen Produk, Kategori, Voucher Diskon, Server Pterodactyl & Payment Gateway BuatQRIS
            </p>
          </div>
        </div>

        <button
          onClick={onBackToStore}
          className="px-4 py-2.5 rounded-2xl bg-slate-800 hover:bg-slate-700 text-xs font-bold text-slate-200 transition-all"
        >
          ← Kembali ke Toko
        </button>
      </div>

      {/* Admin Tabs Navigation */}
      <div className="flex items-center gap-2 border-b border-slate-800 overflow-x-auto pb-2 scrollbar-none">
        
        <button
          onClick={() => setActiveTab('analytics')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs font-bold transition-all whitespace-nowrap ${
            activeTab === 'analytics'
              ? 'bg-purple-600 text-white shadow-lg shadow-purple-500/30'
              : 'text-slate-400 hover:text-white bg-slate-900/60 border border-slate-800'
          }`}
        >
          <TrendingUp className="w-4 h-4" />
          <span>Analytics & Omset</span>
        </button>

        <button
          onClick={() => setActiveTab('products')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs font-bold transition-all whitespace-nowrap ${
            activeTab === 'products'
              ? 'bg-purple-600 text-white shadow-lg shadow-purple-500/30'
              : 'text-slate-400 hover:text-white bg-slate-900/60 border border-slate-800'
          }`}
        >
          <Layers className="w-4 h-4" />
          <span>Kelola Produk ({products.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('categories')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs font-bold transition-all whitespace-nowrap ${
            activeTab === 'categories'
              ? 'bg-purple-600 text-white shadow-lg shadow-purple-500/30'
              : 'text-slate-400 hover:text-white bg-slate-900/60 border border-slate-800'
          }`}
        >
          <Layers className="w-4 h-4" />
          <span>Kategori ({categories.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('vouchers')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs font-bold transition-all whitespace-nowrap ${
            activeTab === 'vouchers'
              ? 'bg-purple-600 text-white shadow-lg shadow-purple-500/30'
              : 'text-slate-400 hover:text-white bg-slate-900/60 border border-slate-800'
          }`}
        >
          <Tag className="w-4 h-4" />
          <span>Kupon Promo ({vouchers.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('orders')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs font-bold transition-all whitespace-nowrap ${
            activeTab === 'orders'
              ? 'bg-purple-600 text-white shadow-lg shadow-purple-500/30'
              : 'text-slate-400 hover:text-white bg-slate-900/60 border border-slate-800'
          }`}
        >
          <Receipt className="w-4 h-4" />
          <span>Transaksi / Orders ({orders.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('servers')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs font-bold transition-all whitespace-nowrap ${
            activeTab === 'servers'
              ? 'bg-purple-600 text-white shadow-lg shadow-purple-500/30'
              : 'text-slate-400 hover:text-white bg-slate-900/60 border border-slate-800'
          }`}
        >
          <Server className="w-4 h-4" />
          <span>Server Pterodactyl ({servers.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('payment_settings')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs font-bold transition-all whitespace-nowrap ${
            activeTab === 'payment_settings'
              ? 'bg-purple-600 text-white shadow-lg shadow-purple-500/30'
              : 'text-slate-400 hover:text-white bg-slate-900/60 border border-slate-800'
          }`}
        >
          <QrCode className="w-4 h-4" />
          <span>Setting BuatQRIS & Dana</span>
        </button>

        <button
          onClick={() => setActiveTab('ptero_settings')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs font-bold transition-all whitespace-nowrap ${
            activeTab === 'ptero_settings'
              ? 'bg-purple-600 text-white shadow-lg shadow-purple-500/30'
              : 'text-slate-400 hover:text-white bg-slate-900/60 border border-slate-800'
          }`}
        >
          <Settings className="w-4 h-4" />
          <span>Setting Pterodactyl API</span>
        </button>

      </div>

      {/* ======================================================== */}
      {/* TAB 1: ANALYTICS */}
      {/* ======================================================== */}
      {activeTab === 'analytics' && (
        <div className="space-y-6">
          {/* 4 Analytics Summary Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-5 rounded-3xl bg-slate-900 border border-slate-800 space-y-1">
              <div className="text-xs font-bold text-slate-400 uppercase">Total Omset Pendapatan</div>
              <div className="text-2xl font-black text-emerald-400">{formatRupiah(totalRevenue)}</div>
              <div className="text-[11px] text-slate-500">Dari {totalCompletedOrders} transaksi sukses</div>
            </div>

            <div className="p-5 rounded-3xl bg-slate-900 border border-slate-800 space-y-1">
              <div className="text-xs font-bold text-slate-400 uppercase">Total Pesanan Masuk</div>
              <div className="text-2xl font-black text-white">{orders.length} Transaksi</div>
              <div className="text-[11px] text-cyan-400">{totalPendingOrders} Menunggu bayar</div>
            </div>

            <div className="p-5 rounded-3xl bg-slate-900 border border-slate-800 space-y-1">
              <div className="text-xs font-bold text-slate-400 uppercase">Server SA:MP Terinstall</div>
              <div className="text-2xl font-black text-cyan-400">{servers.length} Instance</div>
              <div className="text-[11px] text-slate-500">Di Node Pterodactyl</div>
            </div>

            <div className="p-5 rounded-3xl bg-slate-900 border border-slate-800 space-y-1">
              <div className="text-xs font-bold text-slate-400 uppercase">Total Katalog Produk</div>
              <div className="text-2xl font-black text-purple-400">{products.length} Item</div>
              <div className="text-[11px] text-slate-500">4 Kategori Aktif</div>
            </div>
          </div>

          {/* Popular Products Table */}
          <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4">
            <h3 className="text-sm font-black text-white">Produk Terlaris & Penjualan Terbanyak</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-950/80 text-slate-400 border-b border-slate-800">
                  <tr>
                    <th className="p-3">Nama Produk</th>
                    <th className="p-3">Kategori</th>
                    <th className="p-3">Harga</th>
                    <th className="p-3">Total Terjual</th>
                    <th className="p-3">Rating</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800">
                  {products.slice(0, 5).map((p) => (
                    <tr key={p.id} className="hover:bg-slate-800/50">
                      <td className="p-3 font-bold text-white flex items-center gap-2">
                        <img src={p.image} className="w-7 h-7 rounded-lg object-cover" />
                        <span>{p.name}</span>
                      </td>
                      <td className="p-3 text-cyan-400 uppercase font-semibold">{p.category}</td>
                      <td className="p-3 font-mono font-bold text-slate-200">{formatRupiah(p.price)}</td>
                      <td className="p-3 font-bold text-emerald-400">{p.totalSales} Unit</td>
                      <td className="p-3 text-amber-400 font-bold">★ {p.rating}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* TAB 2: PRODUCT MANAGEMENT */}
      {/* ======================================================== */}
      {activeTab === 'products' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-black text-white">Daftar Semua Produk Katalog</h3>
            <button
              onClick={handleOpenAddProduct}
              className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs flex items-center gap-1.5 shadow-md transition-all"
            >
              <Plus className="w-4 h-4" />
              <span>+ Tambah Produk Baru</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {products.map((p) => (
              <div
                key={p.id}
                className="p-5 rounded-3xl bg-slate-900 border border-slate-800 flex flex-col justify-between space-y-3"
              >
                <div>
                  <div className="flex items-start justify-between gap-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-cyan-400 bg-cyan-950/60 px-2 py-0.5 rounded border border-cyan-800/40">
                      {p.category}
                    </span>
                    <span className="text-xs font-mono font-black text-white">{formatRupiah(p.price)}</span>
                  </div>

                  <h4 className="text-sm font-bold text-white mt-2 line-clamp-1">{p.name}</h4>
                  <p className="text-xs text-slate-400 mt-1 line-clamp-2">{p.shortDescription}</p>

                  <div className="mt-3 text-[11px] text-slate-500">
                    Terjual: <span className="text-emerald-400 font-bold">{p.totalSales}</span> • Rating: ★ {p.rating}
                  </div>
                </div>

                <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-800">
                  <button
                    onClick={() => handleOpenEditProduct(p)}
                    className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold flex items-center gap-1 transition-all"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                    <span>Edit</span>
                  </button>

                  <button
                    onClick={() => {
                      if (confirm(`Hapus produk "${p.name}"?`)) {
                        deleteProduct(p.id);
                      }
                    }}
                    className="p-2 rounded-xl bg-rose-950/60 hover:bg-rose-900 text-rose-300 border border-rose-500/30 text-xs font-bold transition-all"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* TAB 3: CATEGORIES */}
      {/* ======================================================== */}
      {activeTab === 'categories' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-black text-white">Kategori Produk Toko</h3>
            <button
              onClick={() => {
                setCatForm({
                  id: 'hosting_samp',
                  name: '',
                  slug: '',
                  icon: 'Server',
                  description: '',
                  badge: 'Baru',
                });
                setIsCategoryModalOpen(true);
              }}
              className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs flex items-center gap-1.5 shadow"
            >
              <Plus className="w-4 h-4" />
              <span>+ Tambah Kategori</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {categories.map((cat) => (
              <div key={cat.id} className="p-5 rounded-3xl bg-slate-900 border border-slate-800 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-8 h-8 rounded-xl bg-purple-500/20 text-purple-400 flex items-center justify-center font-bold text-xs">
                      {cat.name.charAt(0)}
                    </span>
                    <div>
                      <h4 className="text-sm font-bold text-white">{cat.name}</h4>
                      <p className="text-[11px] font-mono text-slate-500">ID: {cat.id}</p>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      if (confirm(`Hapus kategori "${cat.name}"?`)) {
                        deleteCategory(cat.id);
                      }
                    }}
                    className="text-slate-500 hover:text-rose-400 p-1"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
                <p className="text-xs text-slate-400">{cat.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* TAB 4: VOUCHERS & COUPONS */}
      {/* ======================================================== */}
      {activeTab === 'vouchers' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-black text-white">Kupon Promo & Voucher Diskon</h3>
            <button
              onClick={() => setIsVoucherModalOpen(true)}
              className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs flex items-center gap-1.5 shadow"
            >
              <Plus className="w-4 h-4" />
              <span>+ Buat Voucher Baru</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {vouchers.map((v) => (
              <div key={v.id} className="p-5 rounded-3xl bg-slate-900 border border-slate-800 space-y-3">
                <div className="flex items-start justify-between">
                  <div>
                    <span className="font-mono text-sm font-black text-cyan-400">{v.code}</span>
                    <p className="text-xs text-slate-400 mt-0.5">{v.description}</p>
                  </div>
                  <span className="text-[10px] font-bold bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded-full">
                    {v.discountType === 'percentage' ? `${v.discountValue}% OFF` : `Potongan ${formatRupiah(v.discountValue)}`}
                  </span>
                </div>

                <div className="text-xs text-slate-500 space-y-1 pt-2 border-t border-slate-800">
                  <div>Min. Belanja: {formatRupiah(v.minPurchase)}</div>
                  <div>Terpakai: {v.usedCount} / {v.maxUses} Kali</div>
                  <div>Kedaluwarsa: {v.expiresAt}</div>
                </div>

                <div className="flex justify-end pt-2">
                  <button
                    onClick={() => deleteVoucher(v.id)}
                    className="p-1.5 text-xs text-rose-400 hover:bg-rose-950/40 rounded-lg transition-all"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* TAB 5: ORDERS & TRANSACTIONS */}
      {/* ======================================================== */}
      {activeTab === 'orders' && (
        <div className="space-y-4">
          <h3 className="text-sm font-black text-white">Daftar Semua Pesanan Transaksi</h3>

          <div className="space-y-3">
            {orders.map((ord) => (
              <div
                key={ord.id}
                className="p-5 rounded-3xl bg-slate-900 border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-black text-cyan-400">{ord.id}</span>
                    <span
                      className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full ${
                        ord.status === 'completed'
                          ? 'bg-emerald-500/20 text-emerald-400'
                          : ord.status === 'pending'
                          ? 'bg-amber-500/20 text-amber-400'
                          : 'bg-rose-500/20 text-rose-400'
                      }`}
                    >
                      {ord.status.toUpperCase()}
                    </span>
                    <span className="text-[11px] text-slate-500 font-mono">({ord.paymentMethod})</span>
                  </div>

                  <div className="text-xs font-bold text-white">
                    {ord.customerName} ({ord.customerPhone}) • {ord.customerEmail}
                  </div>
                  <div className="text-xs text-slate-400">
                    {ord.items.map((it) => `${it.quantity}x ${it.product.name}`).join(', ')}
                  </div>
                </div>

                <div className="flex items-center justify-between md:justify-end gap-3 border-t md:border-t-0 border-slate-800 pt-3 md:pt-0">
                  <div className="text-right">
                    <div className="text-xs text-slate-400">Total Nominal</div>
                    <div className="text-sm font-black text-white">{formatRupiah(ord.totalAmount)}</div>
                  </div>

                  {ord.status === 'pending' && (
                    <button
                      onClick={() => {
                        processPaymentSuccess(ord.id);
                        showToast(`Order #${ord.id} berhasil disetujui & otomatis dibuatkan server!`);
                      }}
                      className="px-3 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs shadow transition-all"
                    >
                      ⚡ Approve & Auto-Create
                    </button>
                  )}

                  {ord.status === 'pending' && (
                    <button
                      onClick={() => cancelOrder(ord.id)}
                      className="px-3 py-2 rounded-xl bg-rose-950/60 hover:bg-rose-900 text-rose-300 text-xs font-bold transition-all"
                    >
                      Batalkan
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* TAB 6: PTERODACTYL SERVER FLEET */}
      {/* ======================================================== */}
      {activeTab === 'servers' && (
        <div className="space-y-4">
          <h3 className="text-sm font-black text-white">Semua Server Client di Pterodactyl Fleet</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {servers.map((srv) => (
              <div key={srv.serverId} className="p-5 rounded-3xl bg-slate-900 border border-slate-800 space-y-3">
                <div className="flex items-start justify-between border-b border-slate-800 pb-2">
                  <div>
                    <h4 className="text-sm font-bold text-white">{srv.serverName}</h4>
                    <p className="text-[11px] text-slate-400">{srv.node} • Order #{srv.orderId}</p>
                  </div>
                  <span className="text-xs font-mono font-bold text-cyan-400 bg-cyan-950/80 px-2 py-0.5 rounded">
                    {srv.fullAddress}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs font-mono">
                  <div className="p-2 rounded-xl bg-slate-950">
                    <span className="text-slate-500">User:</span> {srv.username}
                  </div>
                  <div className="p-2 rounded-xl bg-slate-950">
                    <span className="text-slate-500">Pass:</span> {srv.password}
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2">
                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => controlServer(srv.serverId, 'START')}
                      className="p-1.5 bg-emerald-950 border border-emerald-500/40 text-emerald-400 rounded-lg text-xs"
                    >
                      Start
                    </button>
                    <button
                      onClick={() => controlServer(srv.serverId, 'STOP')}
                      className="p-1.5 bg-rose-950 border border-rose-500/40 text-rose-400 rounded-lg text-xs"
                    >
                      Stop
                    </button>
                  </div>

                  <button
                    onClick={() => {
                      if (confirm(`Terminate & hapus server ${srv.serverName}?`)) {
                        deleteServer(srv.serverId);
                      }
                    }}
                    className="p-1.5 text-rose-400 hover:bg-rose-950/40 rounded-lg text-xs flex items-center gap-1"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Terminate</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* TAB 7: PAYMENT SETTINGS (BUATQRIS & DANA BISNIS) */}
      {/* ======================================================== */}
      {activeTab === 'payment_settings' && (
        <form onSubmit={handleSavePaymentSettings} className="space-y-6 max-w-3xl">
          <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4">
            <h3 className="text-sm font-black text-cyan-400 flex items-center gap-2">
              <QrCode className="w-4 h-4" />
              <span>Pengaturan API BuatQRIS (https://app.buatqris.site)</span>
            </h3>

            <div className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">
                  BuatQRIS API Key (Live / Sandbox)
                </label>
                <input
                  type="text"
                  value={payForm.buatQrisApiKey}
                  onChange={(e) => setPayForm({ ...payForm, buatQrisApiKey: e.target.value })}
                  placeholder="bq_live_..."
                  className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl font-mono text-xs text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">
                  BuatQRIS Merchant ID / Code
                </label>
                <input
                  type="text"
                  value={payForm.buatQrisMerchantCode}
                  onChange={(e) => setPayForm({ ...payForm, buatQrisMerchantCode: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl font-mono text-xs text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">
                  Webhook Callback URL Store (Untuk Dipasang di BuatQRIS):
                </label>
                <input
                  type="text"
                  readOnly
                  value="https://ranzcloud.store/api/webhook/buatqris"
                  className="w-full px-3.5 py-2.5 bg-slate-950/60 border border-slate-800 rounded-xl font-mono text-xs text-slate-400"
                />
              </div>
            </div>
          </div>

          <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4">
            <h3 className="text-sm font-black text-blue-400 flex items-center gap-2">
              <DollarSign className="w-4 h-4" />
              <span>Pengaturan QRIS Dana Bisnis Milik Sendiri</span>
            </h3>

            <div className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">
                  Nama Merchant Dana Bisnis
                </label>
                <input
                  type="text"
                  value={payForm.danaBisnisMerchantName}
                  onChange={(e) => setPayForm({ ...payForm, danaBisnisMerchantName: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">
                  String Payload QRIS Dana Bisnis (EMVCo String / Static QRIS):
                </label>
                <textarea
                  rows={3}
                  value={payForm.danaBisnisQrisString}
                  onChange={(e) => setPayForm({ ...payForm, danaBisnisQrisString: e.target.value })}
                  className="w-full px-3.5 py-2 bg-slate-950 border border-slate-800 rounded-xl font-mono text-xs text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">
                  No. WhatsApp Admin CS
                </label>
                <input
                  type="text"
                  value={payForm.whatsappCs}
                  onChange={(e) => setPayForm({ ...payForm, whatsappCs: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white"
                />
              </div>
            </div>
          </div>

          <button
            type="submit"
            className="px-6 py-3 rounded-2xl bg-purple-600 hover:bg-purple-500 text-white font-extrabold text-xs shadow-lg shadow-purple-500/20 flex items-center gap-2"
          >
            <Save className="w-4 h-4" />
            <span>Simpan Semua Pengaturan Payment Gateway</span>
          </button>
        </form>
      )}

      {/* ======================================================== */}
      {/* TAB 8: PTERODACTYL API SETTINGS */}
      {/* ======================================================== */}
      {activeTab === 'ptero_settings' && (
        <form onSubmit={handleSavePterodactylSettings} className="space-y-6 max-w-3xl">
          <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4">
            <h3 className="text-sm font-black text-cyan-400 flex items-center gap-2">
              <Server className="w-4 h-4" />
              <span>Konfigurasi Pterodactyl Application API</span>
            </h3>

            <div className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">
                  URL Panel Pterodactyl
                </label>
                <input
                  type="text"
                  value={pteroForm.panelUrl}
                  onChange={(e) => setPteroForm({ ...pteroForm, panelUrl: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl font-mono text-xs text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">
                  Pterodactyl Application API Key (`ptla_...`)
                </label>
                <input
                  type="text"
                  value={pteroForm.apiKey}
                  onChange={(e) => setPteroForm({ ...pteroForm, apiKey: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl font-mono text-xs text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">
                  Nama Node Default
                </label>
                <input
                  type="text"
                  value={pteroForm.defaultNode}
                  onChange={(e) => setPteroForm({ ...pteroForm, defaultNode: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">
                    Port Range Awal
                  </label>
                  <input
                    type="number"
                    value={pteroForm.startPortRange}
                    onChange={(e) => setPteroForm({ ...pteroForm, startPortRange: Number(e.target.value) })}
                    className="w-full px-3.5 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">
                    Port Range Akhir
                  </label>
                  <input
                    type="number"
                    value={pteroForm.endPortRange}
                    onChange={(e) => setPteroForm({ ...pteroForm, endPortRange: Number(e.target.value) })}
                    className="w-full px-3.5 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white"
                  />
                </div>
              </div>
            </div>
          </div>

          <button
            type="submit"
            className="px-6 py-3 rounded-2xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black text-xs shadow-lg shadow-cyan-500/20 flex items-center gap-2"
          >
            <Save className="w-4 h-4" />
            <span>Simpan Pengaturan Pterodactyl</span>
          </button>
        </form>
      )}

      {/* ======================================================== */}
      {/* MODAL: ADD / EDIT PRODUCT */}
      {/* ======================================================== */}
      {isProductModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
          <div className="relative w-full max-w-2xl max-h-[90vh] rounded-3xl bg-slate-900 border border-slate-700 p-6 overflow-y-auto space-y-4">
            <div className="flex justify-between items-center border-b border-slate-800 pb-3">
              <h4 className="text-base font-black text-white">
                {editingProductId ? 'Edit Data Produk' : 'Tambah Produk Baru'}
              </h4>
              <button
                onClick={() => setIsProductModalOpen(false)}
                className="p-1 rounded-lg bg-slate-800 text-slate-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveProduct} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-slate-300 mb-1">Nama Produk</label>
                <input
                  type="text"
                  required
                  value={prodForm.name}
                  onChange={(e) => setProdForm({ ...prodForm, name: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-300 mb-1">Kategori</label>
                  <select
                    value={prodForm.category}
                    onChange={(e) => setProdForm({ ...prodForm, category: e.target.value as ProductCategory })}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white"
                  >
                    <option value="hosting_samp">Hosting SA:MP (Pterodactyl)</option>
                    <option value="script_bot">Script Bot (Discord/WA/Tele)</option>
                    <option value="gamemode_samp">Gamemode SA:MP</option>
                    <option value="script_website">Script Website</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-300 mb-1">Harga (IDR)</label>
                  <input
                    type="number"
                    required
                    value={prodForm.price}
                    onChange={(e) => setProdForm({ ...prodForm, price: Number(e.target.value) })}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-300 mb-1">Deskripsi Singkat</label>
                <input
                  type="text"
                  value={prodForm.shortDescription}
                  onChange={(e) => setProdForm({ ...prodForm, shortDescription: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-300 mb-1">Deskripsi Lengkap</label>
                <textarea
                  rows={3}
                  value={prodForm.description}
                  onChange={(e) => setProdForm({ ...prodForm, description: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-300 mb-1">Fitur (Pisahkan Tiap Baris)</label>
                <textarea
                  rows={3}
                  value={prodForm.featuresText}
                  onChange={(e) => setProdForm({ ...prodForm, featuresText: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white"
                />
              </div>

              {/* Specific inputs */}
              {prodForm.category === 'hosting_samp' ? (
                <div className="p-3 rounded-2xl bg-slate-950 border border-cyan-500/30 space-y-3">
                  <div className="font-bold text-cyan-400">Spesifikasi Server Pterodactyl:</div>
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="text"
                      placeholder="RAM (e.g. 4 GB RAM)"
                      value={prodForm.ram}
                      onChange={(e) => setProdForm({ ...prodForm, ram: e.target.value })}
                      className="px-2.5 py-1.5 bg-slate-900 border border-slate-800 rounded-lg text-white"
                    />
                    <input
                      type="text"
                      placeholder="CPU (e.g. 200% CPU)"
                      value={prodForm.cpu}
                      onChange={(e) => setProdForm({ ...prodForm, cpu: e.target.value })}
                      className="px-2.5 py-1.5 bg-slate-900 border border-slate-800 rounded-lg text-white"
                    />
                    <input
                      type="text"
                      placeholder="Storage (e.g. 15 GB NVMe)"
                      value={prodForm.disk}
                      onChange={(e) => setProdForm({ ...prodForm, disk: e.target.value })}
                      className="px-2.5 py-1.5 bg-slate-900 border border-slate-800 rounded-lg text-white"
                    />
                    <input
                      type="text"
                      placeholder="Max Slots (e.g. 150 Slots)"
                      value={prodForm.slots}
                      onChange={(e) => setProdForm({ ...prodForm, slots: e.target.value })}
                      className="px-2.5 py-1.5 bg-slate-900 border border-slate-800 rounded-lg text-white"
                    />
                  </div>
                </div>
              ) : (
                <div className="p-3 rounded-2xl bg-slate-950 border border-purple-500/30 space-y-3">
                  <div className="font-bold text-purple-400">Link Download & File Script:</div>
                  <input
                    type="text"
                    placeholder="Direct Download URL ZIP (e.g. https://cdn.ranzcloud.store/...)"
                    value={prodForm.downloadUrl}
                    onChange={(e) => setProdForm({ ...prodForm, downloadUrl: e.target.value })}
                    className="w-full px-2.5 py-1.5 bg-slate-900 border border-slate-800 rounded-lg text-white font-mono"
                  />
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      id="sqlDump"
                      checked={prodForm.sqlDumpIncluded}
                      onChange={(e) => setProdForm({ ...prodForm, sqlDumpIncluded: e.target.checked })}
                    />
                    <label htmlFor="sqlDump" className="text-slate-300">Termasuk Database .SQL Dump</label>
                  </div>
                </div>
              )}

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs"
              >
                {editingProductId ? 'Simpan Perubahan Produk' : 'Terbitkan Produk Baru'}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* MODAL: ADD VOUCHER */}
      {/* ======================================================== */}
      {isVoucherModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
          <div className="relative w-full max-w-md rounded-3xl bg-slate-900 border border-slate-700 p-6 space-y-4 text-xs">
            <div className="flex justify-between items-center border-b border-slate-800 pb-3">
              <h4 className="text-sm font-black text-white">Buat Kupon Voucher Baru</h4>
              <button onClick={() => setIsVoucherModalOpen(false)} className="text-slate-400">✕</button>
            </div>

            <form onSubmit={handleSaveVoucher} className="space-y-3">
              <div>
                <label className="block font-bold text-slate-300 mb-1">Kode Voucher (Kapital)</label>
                <input
                  type="text"
                  required
                  placeholder="Contoh: PROMO50"
                  value={voucherForm.code}
                  onChange={(e) => setVoucherForm({ ...voucherForm, code: e.target.value.toUpperCase() })}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white uppercase font-mono"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block font-bold text-slate-300 mb-1">Tipe Diskon</label>
                  <select
                    value={voucherForm.discountType}
                    onChange={(e) => setVoucherForm({ ...voucherForm, discountType: e.target.value as any })}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white"
                  >
                    <option value="percentage">Persentase (%)</option>
                    <option value="fixed">Nominal Tetap (Rp)</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-300 mb-1">Nilai Potongan</label>
                  <input
                    type="number"
                    required
                    value={voucherForm.discountValue}
                    onChange={(e) => setVoucherForm({ ...voucherForm, discountValue: Number(e.target.value) })}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-300 mb-1">Min. Belanja (Rp)</label>
                <input
                  type="number"
                  value={voucherForm.minPurchase}
                  onChange={(e) => setVoucherForm({ ...voucherForm, minPurchase: Number(e.target.value) })}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 rounded-xl bg-purple-600 text-white font-bold"
              >
                Simpan Voucher
              </button>
            </form>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* MODAL: ADD / EDIT CATEGORY */}
      {/* ======================================================== */}
      {isCategoryModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
          <div className="relative w-full max-w-md rounded-3xl bg-slate-900 border border-slate-700 p-6 space-y-4 text-xs">
            <div className="flex justify-between items-center border-b border-slate-800 pb-3">
              <h4 className="text-sm font-black text-white">Tambah Kategori Produk</h4>
              <button onClick={() => setIsCategoryModalOpen(false)} className="text-slate-400">✕</button>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (!catForm.name) return;
                const newCat: CategoryInfo = {
                  ...catForm,
                  slug: catForm.name.toLowerCase().replace(/\s+/g, '-'),
                };
                addCategory(newCat);
                setIsCategoryModalOpen(false);
              }}
              className="space-y-3"
            >
              <div>
                <label className="block font-bold text-slate-300 mb-1">ID Kategori</label>
                <select
                  value={catForm.id}
                  onChange={(e) => setCatForm({ ...catForm, id: e.target.value as ProductCategory })}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white font-mono"
                >
                  <option value="hosting_samp">hosting_samp (Hosting SA:MP)</option>
                  <option value="script_bot">script_bot (Script Bot)</option>
                  <option value="gamemode_samp">gamemode_samp (Gamemode SA:MP)</option>
                  <option value="script_website">script_website (Script Website)</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-slate-300 mb-1">Nama Kategori</label>
                <input
                  type="text"
                  required
                  placeholder="Contoh: Hosting SA:MP Ultra"
                  value={catForm.name}
                  onChange={(e) => setCatForm({ ...catForm, name: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-300 mb-1">Deskripsi Kategori</label>
                <textarea
                  rows={3}
                  placeholder="Deskripsi singkat..."
                  value={catForm.description}
                  onChange={(e) => setCatForm({ ...catForm, description: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-300 mb-1">Badge / Tag Label</label>
                <input
                  type="text"
                  placeholder="Contoh: Auto Provisioning / Instant"
                  value={catForm.badge || ''}
                  onChange={(e) => setCatForm({ ...catForm, badge: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold"
              >
                Simpan Kategori Baru
              </button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
