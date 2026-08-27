import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import {
  Product,
  CategoryInfo,
  CartItem,
  Voucher,
  Order,
  SampServerInstance,
  DeliveredScriptItem,
  PaymentSettings,
  PterodactylSettings,
  User,
  ProductCategory
} from '../types';
import {
  INITIAL_CATEGORIES,
  INITIAL_PRODUCTS,
  INITIAL_VOUCHERS,
  INITIAL_PAYMENT_SETTINGS,
  INITIAL_PTERODACTYL_SETTINGS,
  DEFAULT_ADMIN_USER
} from '../data/initialData';
import { provisionSampServer, deliverScriptItem } from '../utils/pterodactyl';

interface StoreContextType {
  // Products
  products: Product[];
  addProduct: (product: Omit<Product, 'id' | 'rating' | 'totalSales'>) => void;
  updateProduct: (id: string, updated: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
  getProductById: (id: string) => Product | undefined;

  // Categories
  categories: CategoryInfo[];
  addCategory: (category: CategoryInfo) => void;
  updateCategory: (id: ProductCategory, updated: Partial<CategoryInfo>) => void;
  deleteCategory: (id: ProductCategory) => void;

  // Vouchers
  vouchers: Voucher[];
  appliedVoucher: Voucher | null;
  applyVoucherCode: (code: string, subtotal: number) => { success: boolean; message: string; discount: number };
  removeAppliedVoucher: () => void;
  addVoucher: (voucher: Omit<Voucher, 'id' | 'usedCount'>) => void;
  updateVoucher: (id: string, updated: Partial<Voucher>) => void;
  deleteVoucher: (id: string) => void;

  // Cart
  cart: CartItem[];
  addToCart: (product: Product, quantity?: number, customServerName?: string) => void;
  removeFromCart: (productId: string) => void;
  updateCartQuantity: (productId: string, delta: number) => void;
  clearCart: () => void;
  cartCount: number;
  cartSubtotal: number;

  // Orders & Provisioning
  orders: Order[];
  activeOrder: Order | null;
  setActiveOrder: (order: Order | null) => void;
  createOrder: (
    customer: { name: string; email: string; phone: string; discord?: string },
    paymentMethod: 'BUATQRIS' | 'DANA_BISNIS' | 'SALDO_WALLET',
    qrisData?: Order['qrisData']
  ) => Order;
  processPaymentSuccess: (orderId: string) => Order | null;
  cancelOrder: (orderId: string) => void;
  getOrderById: (id: string) => Order | undefined;

  // Servers (Pterodactyl)
  servers: SampServerInstance[];
  controlServer: (serverId: string, action: 'START' | 'STOP' | 'RESTART') => void;
  deleteServer: (serverId: string) => void;

  // Settings
  paymentSettings: PaymentSettings;
  updatePaymentSettings: (settings: Partial<PaymentSettings>) => void;
  pterodactylSettings: PterodactylSettings;
  updatePterodactylSettings: (settings: Partial<PterodactylSettings>) => void;

  // Auth & Privacy
  currentUser: User | null;
  isAdmin: boolean;
  login: (identity: string, pass: string) => { success: boolean; message: string; isAdmin: boolean };
  logout: () => void;
  register: (name: string, email: string, phone: string, pass: string) => { success: boolean; message: string };

  // UI State
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  isAuthModalOpen: boolean;
  setIsAuthModalOpen: (open: boolean) => void;
  authModalMode: 'login' | 'register';
  setAuthModalMode: (mode: 'login' | 'register') => void;
  selectedProductForDetail: Product | null;
  setSelectedProductForDetail: (product: Product | null) => void;
  isCheckoutOpen: boolean;
  setIsCheckoutOpen: (open: boolean) => void;
  toastMessage: string | null;
  showToast: (msg: string) => void;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

const LOCAL_STORAGE_KEYS = {
  PRODUCTS: 'ranzcloud_products_v1',
  CATEGORIES: 'ranzcloud_categories_v1',
  VOUCHERS: 'ranzcloud_vouchers_v1',
  ORDERS: 'ranzcloud_orders_v1',
  SERVERS: 'ranzcloud_servers_v1',
  PAYMENT_SETTINGS: 'ranzcloud_payment_settings_v1',
  PTERO_SETTINGS: 'ranzcloud_ptero_settings_v1',
  USER: 'ranzcloud_current_user_v1',
  CART: 'ranzcloud_cart_v1',
};

export const StoreProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Load initial states from LocalStorage or defaults
  const [products, setProducts] = useState<Product[]>(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEYS.PRODUCTS);
    return saved ? JSON.parse(saved) : INITIAL_PRODUCTS;
  });

  const [categories, setCategories] = useState<CategoryInfo[]>(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEYS.CATEGORIES);
    return saved ? JSON.parse(saved) : INITIAL_CATEGORIES;
  });

  const [vouchers, setVouchers] = useState<Voucher[]>(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEYS.VOUCHERS);
    return saved ? JSON.parse(saved) : INITIAL_VOUCHERS;
  });

  const [orders, setOrders] = useState<Order[]>(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEYS.ORDERS);
    return saved ? JSON.parse(saved) : [];
  });

  const [servers, setServers] = useState<SampServerInstance[]>(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEYS.SERVERS);
    return saved ? JSON.parse(saved) : [];
  });

  const [paymentSettings, setPaymentSettings] = useState<PaymentSettings>(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEYS.PAYMENT_SETTINGS);
    return saved ? JSON.parse(saved) : INITIAL_PAYMENT_SETTINGS;
  });

  const [pterodactylSettings, setPterodactylSettings] = useState<PterodactylSettings>(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEYS.PTERO_SETTINGS);
    return saved ? JSON.parse(saved) : INITIAL_PTERODACTYL_SETTINGS;
  });

  const [currentUser, setCurrentUser] = useState<User | null>(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEYS.USER);
    return saved ? JSON.parse(saved) : null;
  });

  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEYS.CART);
    return saved ? JSON.parse(saved) : [];
  });

  // Ephemeral UI states
  const [appliedVoucher, setAppliedVoucher] = useState<Voucher | null>(null);
  const [activeOrder, setActiveOrder] = useState<Order | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalMode, setAuthModalMode] = useState<'login' | 'register'>('login');
  const [selectedProductForDetail, setSelectedProductForDetail] = useState<Product | null>(null);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Sync to LocalStorage on change
  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEYS.PRODUCTS, JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEYS.CATEGORIES, JSON.stringify(categories));
  }, [categories]);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEYS.VOUCHERS, JSON.stringify(vouchers));
  }, [vouchers]);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEYS.ORDERS, JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEYS.SERVERS, JSON.stringify(servers));
  }, [servers]);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEYS.PAYMENT_SETTINGS, JSON.stringify(paymentSettings));
  }, [paymentSettings]);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEYS.PTERO_SETTINGS, JSON.stringify(pterodactylSettings));
  }, [pterodactylSettings]);

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem(LOCAL_STORAGE_KEYS.USER, JSON.stringify(currentUser));
    } else {
      localStorage.removeItem(LOCAL_STORAGE_KEYS.USER);
    }
  }, [currentUser]);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEYS.CART, JSON.stringify(cart));
  }, [cart]);

  // Toast Helper
  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  // Products CRUD
  const addProduct = (newProdData: Omit<Product, 'id' | 'rating' | 'totalSales'>) => {
    const id = `prod-${Date.now().toString().slice(-6)}`;
    const newProduct: Product = {
      ...newProdData,
      id,
      rating: 5.0,
      totalSales: 0,
    };
    setProducts((prev) => [newProduct, ...prev]);
    showToast(`Produk "${newProduct.name}" berhasil ditambahkan!`);
  };

  const updateProduct = (id: string, updated: Partial<Product>) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, ...updated } : p))
    );
    showToast('Produk berhasil diperbarui!');
  };

  const deleteProduct = (id: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
    showToast('Produk telah dihapus.');
  };

  const getProductById = (id: string) => products.find((p) => p.id === id);

  // Categories CRUD
  const addCategory = (cat: CategoryInfo) => {
    setCategories((prev) => [...prev, cat]);
    showToast(`Kategori "${cat.name}" berhasil dibuat!`);
  };

  const updateCategory = (id: ProductCategory, updated: Partial<CategoryInfo>) => {
    setCategories((prev) =>
      prev.map((c) => (c.id === id ? { ...c, ...updated } : c))
    );
    showToast('Kategori diperbarui!');
  };

  const deleteCategory = (id: ProductCategory) => {
    setCategories((prev) => prev.filter((c) => c.id !== id));
    showToast('Kategori telah dihapus.');
  };

  // Cart Operations
  const addToCart = (product: Product, quantity = 1, customServerName?: string) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity, customServerName: customServerName || item.customServerName }
            : item
        );
      }
      return [...prev, { product, quantity, customServerName }];
    });
    showToast(`"${product.name}" masuk ke keranjang!`);
  };

  const removeFromCart = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const updateCartQuantity = (productId: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.product.id === productId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const clearCart = () => {
    setCart([]);
    setAppliedVoucher(null);
  };

  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);
  const cartSubtotal = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);

  // Voucher validation
  const applyVoucherCode = (code: string, subtotal: number) => {
    const cleanCode = code.trim().toUpperCase();
    const found = vouchers.find(
      (v) => v.code.toUpperCase() === cleanCode && v.isActive
    );

    if (!found) {
      return { success: false, message: 'Kode voucher tidak ditemukan atau tidak aktif.', discount: 0 };
    }

    if (found.minPurchase && subtotal < found.minPurchase) {
      return {
        success: false,
        message: `Minimal belanja untuk voucher ini adalah Rp ${found.minPurchase.toLocaleString('id-ID')}`,
        discount: 0
      };
    }

    let discount = 0;
    if (found.discountType === 'percentage') {
      discount = Math.floor((subtotal * found.discountValue) / 100);
    } else {
      discount = found.discountValue;
    }

    if (discount > subtotal) discount = subtotal;

    setAppliedVoucher(found);
    return {
      success: true,
      message: `Voucher ${found.code} berhasil dipasang! Hemat Rp ${discount.toLocaleString('id-ID')}`,
      discount
    };
  };

  const removeAppliedVoucher = () => {
    setAppliedVoucher(null);
  };

  const addVoucher = (v: Omit<Voucher, 'id' | 'usedCount'>) => {
    const newV: Voucher = {
      ...v,
      id: `v-${Date.now().toString().slice(-6)}`,
      usedCount: 0,
    };
    setVouchers((prev) => [newV, ...prev]);
    showToast(`Voucher ${newV.code} berhasil dibuat!`);
  };

  const updateVoucher = (id: string, updated: Partial<Voucher>) => {
    setVouchers((prev) =>
      prev.map((v) => (v.id === id ? { ...v, ...updated } : v))
    );
    showToast('Voucher diperbarui!');
  };

  const deleteVoucher = (id: string) => {
    setVouchers((prev) => prev.filter((v) => v.id !== id));
    showToast('Voucher dihapus.');
  };

  // Orders & Automated Delivery
  const createOrder = (
    customer: { name: string; email: string; phone: string; discord?: string },
    paymentMethod: 'BUATQRIS' | 'DANA_BISNIS' | 'SALDO_WALLET',
    qrisData?: Order['qrisData']
  ): Order => {
    const subtotal = cartSubtotal;
    let discount = 0;
    if (appliedVoucher) {
      if (appliedVoucher.discountType === 'percentage') {
        discount = Math.floor((subtotal * appliedVoucher.discountValue) / 100);
      } else {
        discount = appliedVoucher.discountValue;
      }
    }

    const uniqueCode = paymentSettings.useUniqueCode ? Math.floor(10 + Math.random() * 490) : 0;
    const totalAmount = subtotal - discount + uniqueCode;
    const orderId = qrisData?.transactionId || `RC-${new Date().toISOString().slice(2, 10).replace(/-/g, '')}-${Math.floor(1000 + Math.random() * 9000)}`;

    const newOrder: Order = {
      id: orderId,
      customerName: customer.name,
      customerEmail: customer.email,
      customerPhone: customer.phone,
      customerDiscord: customer.discord,
      items: [...cart],
      subtotal,
      discount,
      uniqueCode,
      totalAmount,
      paymentMethod,
      status: 'pending',
      qrisData,
      voucherCode: appliedVoucher?.code,
      createdAt: new Date().toISOString(),
    };

    setOrders((prev) => [newOrder, ...prev]);
    setActiveOrder(newOrder);
    return newOrder;
  };

  // Automated Post-Payment Delivery (Pterodactyl Hosting vs Script Downloads)
  const processPaymentSuccess = (orderId: string): Order | null => {
    const targetOrder = orders.find((o) => o.id === orderId) || activeOrder;
    if (!targetOrder) return null;

    const newServers: SampServerInstance[] = [];
    const newScripts: DeliveredScriptItem[] = [];

    targetOrder.items.forEach((item) => {
      if (item.product.category === 'hosting_samp') {
        // Quantity times create server instances
        for (let i = 0; i < item.quantity; i++) {
          const serverInst = provisionSampServer(
            item,
            targetOrder.id,
            targetOrder.customerName,
            pterodactylSettings
          );
          newServers.push(serverInst);
        }
      } else {
        // Script, Gamemode, Website -> generate license and download items
        const scriptInst = deliverScriptItem(item);
        newScripts.push(scriptInst);
      }
    });

    const updatedOrder: Order = {
      ...targetOrder,
      status: 'completed',
      paidAt: new Date().toISOString(),
      deliveredServers: newServers,
      deliveredScripts: newScripts,
    };

    // Save servers to state
    if (newServers.length > 0) {
      setServers((prev) => [...newServers, ...prev]);
    }

    // Update order in orders list
    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? updatedOrder : o))
    );

    // Update product sales
    setProducts((prev) =>
      prev.map((prod) => {
        const matchingItem = targetOrder.items.find((it) => it.product.id === prod.id);
        if (matchingItem) {
          return {
            ...prod,
            totalSales: prod.totalSales + matchingItem.quantity,
          };
        }
        return prod;
      })
    );

    // Update voucher use count if applied
    if (targetOrder.voucherCode) {
      setVouchers((prev) =>
        prev.map((v) =>
          v.code === targetOrder.voucherCode ? { ...v, usedCount: v.usedCount + 1 } : v
        )
      );
    }

    setActiveOrder(updatedOrder);
    clearCart();
    return updatedOrder;
  };

  const cancelOrder = (orderId: string) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, status: 'cancelled' } : o))
    );
    showToast(`Order #${orderId} telah dibatalkan.`);
  };

  const getOrderById = (id: string) => orders.find((o) => o.id === id);

  // Server management actions
  const controlServer = (serverId: string, action: 'START' | 'STOP' | 'RESTART') => {
    setServers((prev) =>
      prev.map((s) => {
        if (s.serverId === serverId) {
          let newStatus = s.status;
          if (action === 'START') newStatus = 'ONLINE';
          if (action === 'STOP') newStatus = 'OFFLINE';
          if (action === 'RESTART') newStatus = 'ONLINE';
          return { ...s, status: newStatus };
        }
        return s;
      })
    );
    showToast(`Server action [${action}] berhasil dikirim ke node Pterodactyl.`);
  };

  const deleteServer = (serverId: string) => {
    setServers((prev) => prev.filter((s) => s.serverId !== serverId));
    showToast('Server instance berhasil di-terminate.');
  };

  // Settings
  const updatePaymentSettings = (updated: Partial<PaymentSettings>) => {
    setPaymentSettings((prev) => ({ ...prev, ...updated }));
    showToast('Pengaturan Payment Gateway BuatQRIS & Dana Bisnis berhasil disimpan!');
  };

  const updatePterodactylSettings = (updated: Partial<PterodactylSettings>) => {
    setPterodactylSettings((prev) => ({ ...prev, ...updated }));
    showToast('Pengaturan API Pterodactyl Game Panel berhasil disimpan!');
  };

  // Unified Auth (Admin: RanzCode / Ranzcode12)
  const login = (identity: string, pass: string) => {
    const cleanId = identity.trim();
    
    // Check if admin credentials match prompt: RanzCode / Ranzcode12
    if (
      (cleanId.toLowerCase() === 'ranzcode' || cleanId.toLowerCase() === 'admin@ranzcloud.store' || cleanId.toLowerCase() === 'admin') &&
      pass === 'Ranzcode12'
    ) {
      const adminUser: User = {
        ...DEFAULT_ADMIN_USER,
        name: 'RanzCode',
        role: 'admin',
      };
      setCurrentUser(adminUser);
      setIsAuthModalOpen(false);
      showToast('Selamat datang kembali, Owner RanzCode (Akses Admin Terbuka)!');
      return { success: true, message: 'Berhasil login sebagai Admin', isAdmin: true };
    }

    // Otherwise regular user login
    if (pass.length >= 4) {
      const regularUser: User = {
        id: `usr_${Date.now().toString().slice(-6)}`,
        name: cleanId.includes('@') ? cleanId.split('@')[0] : cleanId,
        email: cleanId.includes('@') ? cleanId : `${cleanId.toLowerCase()}@gmail.com`,
        phone: '081234567890',
        role: 'user',
        balance: 25000,
        createdAt: new Date().toISOString(),
      };
      setCurrentUser(regularUser);
      setIsAuthModalOpen(false);
      showToast(`Login berhasil! Selamat datang, ${regularUser.name}`);
      return { success: true, message: 'Login user berhasil', isAdmin: false };
    }

    return { success: false, message: 'Password salah. Gunakan password minimal 4 karakter atau Ranzcode12 untuk Admin.', isAdmin: false };
  };

  const logout = () => {
    setCurrentUser(null);
    showToast('Anda telah logout dari akun.');
  };

  const register = (name: string, email: string, phone: string, pass: string) => {
    if (!name || !email || pass.length < 4) {
      return { success: false, message: 'Mohon isi semua data dengan benar (Password min 4 char).' };
    }

    // If registered name is RanzCode with exact admin password
    if (name.toLowerCase() === 'ranzcode' && pass === 'Ranzcode12') {
      const adminUser: User = {
        ...DEFAULT_ADMIN_USER,
        name: 'RanzCode',
        email,
        phone,
        role: 'admin',
      };
      setCurrentUser(adminUser);
      setIsAuthModalOpen(false);
      showToast('Akun Admin RanzCode berhasil dibuat dan login!');
      return { success: true, message: 'Pendaftaran Akun Admin Berhasil' };
    }

    const newUser: User = {
      id: `usr_${Date.now().toString().slice(-6)}`,
      name,
      email,
      phone: phone || '081234567890',
      role: 'user',
      balance: 10000, // Welcome bonus saldo
      createdAt: new Date().toISOString(),
    };
    setCurrentUser(newUser);
    setIsAuthModalOpen(false);
    showToast(`Pendaftaran berhasil! Selamat datang di RanzCloud, ${name} (+Bonus Saldo Rp 10.000)`);
    return { success: true, message: 'Pendaftaran Berhasil' };
  };

  const isAdmin = currentUser?.role === 'admin';

  return (
    <StoreContext.Provider
      value={{
        products,
        addProduct,
        updateProduct,
        deleteProduct,
        getProductById,
        categories,
        addCategory,
        updateCategory,
        deleteCategory,
        vouchers,
        appliedVoucher,
        applyVoucherCode,
        removeAppliedVoucher,
        addVoucher,
        updateVoucher,
        deleteVoucher,
        cart,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        clearCart,
        cartCount,
        cartSubtotal,
        orders,
        activeOrder,
        setActiveOrder,
        createOrder,
        processPaymentSuccess,
        cancelOrder,
        getOrderById,
        servers,
        controlServer,
        deleteServer,
        paymentSettings,
        updatePaymentSettings,
        pterodactylSettings,
        updatePterodactylSettings,
        currentUser,
        isAdmin,
        login,
        logout,
        register,
        isCartOpen,
        setIsCartOpen,
        isAuthModalOpen,
        setIsAuthModalOpen,
        authModalMode,
        setAuthModalMode,
        selectedProductForDetail,
        setSelectedProductForDetail,
        isCheckoutOpen,
        setIsCheckoutOpen,
        toastMessage,
        showToast,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
};
