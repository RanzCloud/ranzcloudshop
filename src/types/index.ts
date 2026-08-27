export type ProductCategory = 'hosting_samp' | 'script_bot' | 'gamemode_samp' | 'script_website';

export interface CategoryInfo {
  id: ProductCategory;
  name: string;
  slug: string;
  icon: string;
  description: string;
  badge?: string;
}

export interface HostingSpecs {
  ram: string; // e.g. "2 GB RAM"
  cpu: string; // e.g. "100% CPU (1 Core)"
  disk: string; // e.g. "5 GB NVMe SSD"
  slots: string; // e.g. "50 - 100 Slots"
  databases: number;
  backups: number;
  ports: number;
  location: string; // e.g. "Singapore Datacenter (SG-01)"
  antiDDoS: string; // e.g. "Voxility Anti-DDoS 1000Gbps"
  eggType?: string; // "SA:MP 0.3.7 / open.mp"
}

export interface ScriptSpecs {
  version: string;
  framework?: string; // "NodeJS / Discord.js", "Pawn 0.3.7 / MySQL R41-4", "React + Vite + Tailwind"
  databaseRequired?: boolean;
  licenseType: string; // "Lifetime Multi-Server"
  fileSize: string; // "24.5 MB"
  previewUrl?: string;
  previewImages?: string[];
}

export interface Product {
  id: string;
  name: string;
  category: ProductCategory;
  price: number; // in IDR
  originalPrice?: number; // for discount strike-through
  shortDescription: string;
  description: string;
  features: string[];
  image: string;
  stock: number; // -1 for unlimited
  isPopular?: boolean;
  isNew?: boolean;
  isBestSeller?: boolean;
  rating: number; // 4.8 - 5.0
  totalSales: number;
  
  // Specific to Hosting SA:MP
  hostingSpecs?: HostingSpecs;
  
  // Specific to Scripts / Gamemodes / Websites
  scriptSpecs?: ScriptSpecs;
  downloadUrl?: string;
  installGuide?: string;
  sqlDumpIncluded?: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedPlanPeriod?: '1_month' | '3_months' | '6_months' | '1_year';
  customServerName?: string;
}

export interface Voucher {
  id: string;
  code: string;
  discountType: 'percentage' | 'fixed';
  discountValue: number; // e.g. 20 for 20% or 10000 for Rp 10.000
  minPurchase: number;
  maxUses: number;
  usedCount: number;
  expiresAt: string;
  isActive: boolean;
  description: string;
}

export type OrderStatus = 'pending' | 'paid' | 'provisioning' | 'completed' | 'cancelled' | 'expired';

export interface SampServerInstance {
  serverId: string;
  orderId: string;
  serverName: string;
  ip: string;
  port: number;
  fullAddress: string; // e.g. "103.145.226.88:7777"
  panelUrl: string;
  username: string;
  password: string;
  sftpHost: string;
  sftpPort: number;
  ram: string;
  cpu: string;
  disk: string;
  slots: string;
  status: 'ONLINE' | 'OFFLINE' | 'STARTING' | 'RESTARTING';
  node: string;
  createdAt: string;
  expiresAt: string;
  autoRenew: boolean;
  rconPassword?: string;
  mysqlDbName?: string;
  mysqlUser?: string;
  mysqlHost?: string;
  playersOnline?: number;
  maxPlayers?: number;
}

export interface DeliveredScriptItem {
  productId: string;
  productName: string;
  category: ProductCategory;
  downloadUrl: string;
  backupDownloadUrl?: string;
  licenseKey: string;
  fileSize: string;
  version: string;
  sqlDownloadUrl?: string;
  guideText: string;
}

export interface Order {
  id: string; // e.g. "RC-202505-8921"
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  customerDiscord?: string;
  items: CartItem[];
  subtotal: number;
  discount: number;
  uniqueCode: number; // e.g. 147
  totalAmount: number; // subtotal - discount + uniqueCode
  paymentMethod: 'BUATQRIS' | 'DANA_BISNIS' | 'SALDO_WALLET';
  status: OrderStatus;
  qrisData?: {
    qrString: string;
    qrImageUrl?: string;
    transactionId: string;
    expiredAt: string;
    merchantName: string;
  };
  voucherCode?: string;
  createdAt: string;
  paidAt?: string;
  
  // Provisioning Results
  deliveredServers?: SampServerInstance[];
  deliveredScripts?: DeliveredScriptItem[];
}

export interface PaymentSettings {
  buatQrisApiKey: string;
  buatQrisMerchantCode: string;
  buatQrisApiUrl: string;
  danaBisnisQrisString: string;
  danaBisnisMerchantName: string;
  danaBisnisNumber: string;
  useUniqueCode: boolean;
  autoApproveSimulator: boolean;
  whatsappCs: string;
  discordInvite: string;
  storeNotice: string;
}

export interface PterodactylSettings {
  panelUrl: string;
  apiKey: string;
  clientApiKey: string;
  defaultNode: string;
  defaultLocationId: number;
  defaultNestId: number;
  defaultEggId: number;
  baseIp: string;
  startPortRange: number;
  endPortRange: number;
  autoProvisionEnabled: boolean;
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: 'admin' | 'user';
  balance: number; // Saldo wallet
  createdAt: string;
}
