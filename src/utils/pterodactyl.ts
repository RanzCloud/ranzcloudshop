import { CartItem, DeliveredScriptItem, PterodactylSettings, SampServerInstance } from '../types';

// Helper to generate a random string
const generateRandomString = (length: number, characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'): string => {
  let result = '';
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
};

// Generate random secure password
export const generateSecurePassword = (): string => {
  const letters = generateRandomString(4, 'abcdefghjkmnpqrstuvwxyz');
  const caps = generateRandomString(3, 'ABCDEFGHJKLMNPQRSTUVWXYZ');
  const nums = generateRandomString(3, '23456789');
  const special = '!@#$%'[Math.floor(Math.random() * 5)];
  return `Rz#${caps}${nums}${letters}${special}`;
};

// Generate License Key for scripts
export const generateLicenseKey = (productCategory: string): string => {
  const prefix = productCategory.toUpperCase().slice(0, 3);
  const part1 = generateRandomString(4, 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789');
  const part2 = generateRandomString(4, 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789');
  const part3 = generateRandomString(4, 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789');
  return `RC-${prefix}-${part1}-${part2}-${part3}`;
};

// Provision SA:MP Hosting Server via Pterodactyl Simulator or API
export const provisionSampServer = (
  item: CartItem,
  orderId: string,
  customerName: string,
  settings: PterodactylSettings
): SampServerInstance => {
  const cleanCustomer = customerName.toLowerCase().replace(/[^a-z0-9]/g, '').slice(0, 8) || 'client';
  const randomSuffix = Math.floor(100 + Math.random() * 900);
  const serverId = `srv-${generateRandomString(8).toLowerCase()}`;
  const username = `u_${cleanCustomer}_${randomSuffix}`;
  const password = generateSecurePassword();
  const rconPassword = `rc_rcon_${generateRandomString(6)}`;
  
  // Choose port between start and end
  const port = Math.floor(
    settings.startPortRange + Math.random() * (settings.endPortRange - settings.startPortRange)
  );

  const specs = item.product.hostingSpecs;
  const now = new Date();
  const expiry = new Date(now);
  expiry.setDate(expiry.getDate() + 30); // 30 days active

  const customName = item.customServerName || `Server SA:MP - ${item.product.name.replace('Hosting SA:MP ', '')}`;

  return {
    serverId,
    orderId,
    serverName: customName,
    ip: settings.baseIp || '103.145.226.88',
    port,
    fullAddress: `${settings.baseIp || '103.145.226.88'}:${port}`,
    panelUrl: settings.panelUrl || 'https://panel.ranzcloud.store',
    username,
    password,
    sftpHost: settings.baseIp || '103.145.226.88',
    sftpPort: 2022,
    ram: specs?.ram || '4096 MB',
    cpu: specs?.cpu || '200%',
    disk: specs?.disk || '15 GB NVMe',
    slots: specs?.slots || '150 Slots',
    status: 'ONLINE',
    node: settings.defaultNode || 'Singapore SG-Equinix 01',
    createdAt: now.toISOString(),
    expiresAt: expiry.toISOString(),
    autoRenew: true,
    rconPassword,
    mysqlDbName: `s_${username}_db`,
    mysqlUser: `u_${username}`,
    mysqlHost: `${settings.baseIp || '103.145.226.88'}:3306`,
    playersOnline: 0,
    maxPlayers: parseInt(specs?.slots || '100') || 100,
  };
};

// Deliver Script / Gamemode / Website details
export const deliverScriptItem = (
  item: CartItem
): DeliveredScriptItem => {
  const prod = item.product;
  const licenseKey = generateLicenseKey(prod.category);
  const downloadUrl = prod.downloadUrl || `https://cdn.ranzcloud.store/downloads/${prod.id}-v1.0.zip`;
  
  return {
    productId: prod.id,
    productName: prod.name,
    category: prod.category,
    downloadUrl,
    backupDownloadUrl: `https://backup-drive.ranzcloud.store/files/${prod.id}-latest.zip`,
    licenseKey,
    fileSize: prod.scriptSpecs?.fileSize || '25.0 MB',
    version: prod.scriptSpecs?.version || 'v1.0.0 Stable',
    sqlDownloadUrl: prod.sqlDumpIncluded ? `https://cdn.ranzcloud.store/database/${prod.id}-schema.sql` : undefined,
    guideText: prod.installGuide || '1. Ekstrak file ZIP yang telah diunduh\n2. Baca README.txt di dalam folder\n3. Masukkan License Key pada file config\n4. Jalankan aplikasi!',
  };
};
