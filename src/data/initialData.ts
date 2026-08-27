import { CategoryInfo, Product, Voucher, PaymentSettings, PterodactylSettings, User } from '../types';

export const INITIAL_CATEGORIES: CategoryInfo[] = [
  {
    id: 'hosting_samp',
    name: 'Hosting SA:MP',
    slug: 'hosting-samp',
    icon: 'Server',
    description: 'Server SA:MP performa tinggi dengan Pterodactyl Panel, Anti-DDoS Voxility, dan Garansi Uptime 99.9%.',
    badge: 'Auto Provisioning'
  },
  {
    id: 'script_bot',
    name: 'Script Bot',
    slug: 'script-bot',
    icon: 'Bot',
    description: 'Bot Discord, WhatsApp Store, dan Telegram otomatis untuk komunitas SA:MP dan toko digital.',
    badge: 'Instant Download'
  },
  {
    id: 'gamemode_samp',
    name: 'Gamemode SA:MP',
    slug: 'gamemode-samp',
    icon: 'Gamepad2',
    description: 'Source code gamemode Roleplay, Gangwar DM, dan Freeroam siap pakai dengan database MySQL & guide lengkap.',
    badge: 'Clean Code'
  },
  {
    id: 'script_website',
    name: 'Script Website',
    slug: 'script-website',
    icon: 'Globe',
    description: 'Source code web store otomatis, UCP SA:MP, portal topup, dan landing page modern terintegrasi QRIS.',
    badge: 'Full Source'
  }
];

export const INITIAL_PRODUCTS: Product[] = [
  // --- HOSTING SA:MP ---
  {
    id: 'samp-starter',
    name: 'Hosting SA:MP Starter Node',
    category: 'hosting_samp',
    price: 15000,
    originalPrice: 25000,
    shortDescription: 'Cocok untuk server dev/testing atau komunitas awal dengan 50 slot stabil.',
    description: 'Paket Hosting SA:MP pemula dengan performa handal di Singapore Node. Dilengkapi Pterodactyl Game Panel terbaru, proteksi Anti-DDoS Voxility 1Tbps, auto reboot crash detector, dan akses SFTP langsung.',
    features: [
      '2 GB DDR4 RAM High-Speed',
      '100% CPU (1 vCore AMD EPYC)',
      '5 GB NVMe SSD Storage',
      '50 Max Player Slots',
      '1x Free MySQL Database',
      'Pterodactyl Panel Access',
      'Anti-DDoS Voxility 1000Gbps',
      'Instant Auto Provisioning (<10 Detik)'
    ],
    image: '/images/samp-hosting.jpg',
    stock: -1,
    isPopular: false,
    isNew: false,
    rating: 4.9,
    totalSales: 142,
    hostingSpecs: {
      ram: '2048 MB (2 GB)',
      cpu: '100% (1 vCore)',
      disk: '5120 MB (5 GB NVMe)',
      slots: '50 Slots',
      databases: 1,
      backups: 2,
      ports: 1,
      location: 'Singapore (SG-Equinix 01)',
      antiDDoS: 'Voxility Layer 4/7 1000Gbps',
      eggType: 'SA:MP 0.3.7 / open.mp'
    }
  },
  {
    id: 'samp-pro-rp',
    name: 'Hosting SA:MP Pro Roleplay Node',
    category: 'hosting_samp',
    price: 30000,
    originalPrice: 45000,
    shortDescription: 'Pilihan paling populer untuk server Roleplay Voice/Text ramai hingga 150 player.',
    description: 'Server SA:MP kelas Pro yang dirancang khusus untuk menangani gamemode berat seperti Roleplay dengan MySQL database intensif, custom mapping besar, dan voice plugin tanpa lag.',
    features: [
      '4 GB DDR4/DDR5 RAM Dedicated',
      '200% CPU (2 vCore AMD EPYC 9654)',
      '15 GB NVMe SSD High IOPS',
      '150 Max Player Slots',
      '2x MySQL Remote Database',
      'Pterodactyl Control Panel v1.11+',
      'SFTP + Web Console Real-Time',
      'Auto Daily Backup System'
    ],
    image: '/images/samp-hosting.jpg',
    stock: -1,
    isPopular: true,
    isBestSeller: true,
    rating: 5.0,
    totalSales: 389,
    hostingSpecs: {
      ram: '4096 MB (4 GB)',
      cpu: '200% (2 vCores)',
      disk: '15360 MB (15 GB NVMe)',
      slots: '150 Slots',
      databases: 2,
      backups: 4,
      ports: 2,
      location: 'Singapore (SG-Equinix 01)',
      antiDDoS: 'Voxility Layer 4/7 1000Gbps',
      eggType: 'SA:MP 0.3.7 / open.mp'
    }
  },
  {
    id: 'samp-ultimate',
    name: 'Hosting SA:MP Ultimate High-Traffic',
    category: 'hosting_samp',
    price: 60000,
    originalPrice: 85000,
    shortDescription: 'Kekuatan penuh 8 GB RAM untuk server mega Roleplay / Gangwar hingga 350+ player.',
    description: 'Hosting SA:MP kelas premium dengan alokasi resource jumbo dan prioritas bandwidth. Sangat stabil untuk server komunitas besar yang menyelenggarakan event ramai tanpa takut crash ataupun packet loss.',
    features: [
      '8 GB High-Speed RAM',
      '400% CPU (4 vCore AMD Ryzen 9 / EPYC)',
      '30 GB Gen4 NVMe SSD',
      '350 Max Player Slots',
      '3x MySQL Database + phpMyAdmin',
      'Custom Port Allocation (7777 Ready)',
      'Dedicated Voxility Shield Protection',
      'Garansi Uptime 99.9%'
    ],
    image: '/images/samp-hosting.jpg',
    stock: -1,
    isPopular: true,
    isNew: false,
    rating: 4.9,
    totalSales: 215,
    hostingSpecs: {
      ram: '8192 MB (8 GB)',
      cpu: '400% (4 vCores)',
      disk: '30720 MB (30 GB NVMe)',
      slots: '350 Slots',
      databases: 3,
      backups: 6,
      ports: 3,
      location: 'Jakarta Cyber IDC & Singapore',
      antiDDoS: 'Voxility Enterprise + Cloudflare Spectrum',
      eggType: 'SA:MP 0.3.7 / open.mp'
    }
  },
  {
    id: 'samp-enterprise',
    name: 'Hosting SA:MP Enterprise Dedicated Core',
    category: 'hosting_samp',
    price: 110000,
    originalPrice: 150000,
    shortDescription: '16 GB RAM Dedicated Beast untuk multi-server network atau event turnamen akbar.',
    description: 'Paket tier teratas untuk server SA:MP raksasa dengan alokasi RAM 16 GB, CPU 8 vCore, penyimpanan 60 GB NVMe, dan support prioritas VIP WhatsApp 24/7.',
    features: [
      '16 GB DDR5 RAM Extreme',
      '800% CPU (8 vCore Ultra Turbo)',
      '60 GB Enterprise NVMe SSD',
      '500+ Unlimited Player Slots',
      'Unlimited MySQL Remote Databases',
      'Free Subdomain (namaserver.ranzcloud.store)',
      'Priority 24/7 Emergency Support',
      'Custom Startup Flags & Environment'
    ],
    image: '/images/samp-hosting.jpg',
    stock: -1,
    isPopular: false,
    isNew: true,
    rating: 5.0,
    totalSales: 78,
    hostingSpecs: {
      ram: '16384 MB (16 GB)',
      cpu: '800% (8 vCores)',
      disk: '61440 MB (60 GB NVMe)',
      slots: '500+ Unlimited',
      databases: 5,
      backups: 10,
      ports: 5,
      location: 'Singapore SG-01 Dedicated Node',
      antiDDoS: 'Voxility 1Tbps Custom Rules',
      eggType: 'SA:MP 0.3.7 / open.mp'
    }
  },

  // --- SCRIPT BOT ---
  {
    id: 'bot-discord-ucp',
    name: 'Script Bot Discord SA:MP UCP & Server Monitor',
    category: 'script_bot',
    price: 35000,
    originalPrice: 50000,
    shortDescription: 'Bot Discord otomatis verifikasi UCP in-game, cek status server, dan integrasi MySQL.',
    description: 'Source code Bot Discord terlengkap berbasis Discord.js v14. Dilengkapi fitur verifikasi User Control Panel (UCP), kirim OTP ke ingame / email, cek status live server (IP, players online, gamemode), auto role verification, dan admin logs logging.',
    features: [
      'Discord.js v14 + Slash Commands (/)',
      'Auto Verifikasi UCP Roleplay SA:MP',
      'Live Server Status Banner with Auto-Refresh 30s',
      'Cek Statistik Karakter (Money, Level, Faction, Warn)',
      'Log Admin (Banned, Jail, Kick, Unban) to Discord Channel',
      'Kirim OTP Verifikasi Ingame Otomatis',
      'Easy Config (.env) & Full Tutorial PDF'
    ],
    image: '/images/bot-script.jpg',
    stock: -1,
    isPopular: true,
    isBestSeller: true,
    rating: 4.9,
    totalSales: 312,
    scriptSpecs: {
      version: 'v2.5.0 Stable',
      framework: 'Node.js v18+ / Discord.js v14 / MySQL2',
      databaseRequired: true,
      licenseType: 'Lifetime Multi-Server License',
      fileSize: '18.4 MB (Source + Modules)',
      previewUrl: 'https://discord.gg/ranzcloud'
    },
    downloadUrl: 'https://cdn.ranzcloud.store/downloads/bot-discord-samp-ucp-v2.5.zip',
    installGuide: '1. Ekstrak file zip\n2. Buka file config.json atau .env\n3. Masukkan BOT_TOKEN, DB_HOST, DB_USER, DB_PASS, DB_NAME\n4. Jalankan npm install lalu node index.js atau pm2 start index.js\n5. Bot siap berjalan 24 jam!'
  },
  {
    id: 'bot-wa-store',
    name: 'Script Bot WhatsApp Store Otomatis BuatQRIS',
    category: 'script_bot',
    price: 45000,
    originalPrice: 70000,
    shortDescription: 'Bot WhatsApp Store otomatis jualan produk digital dengan payment BuatQRIS & Dana.',
    description: 'Script Bot WhatsApp Store Multi-Device canggih menggunakan Baileys library. Pelanggan bisa order hosting, script, saldo, atau diamond game via WhatsApp dengan pembayaran QRIS otomatis langsung terverifikasi seketika.',
    features: [
      'Multi-Device Baileys MD Version (Anti-Disconnect)',
      'Otomatis Generate Dynamic QRIS via BuatQRIS API',
      'Auto-Check Pembayaran QRIS Masuk 5-10 Detik',
      'Auto Kirim Produk / File ZIP / Lisensi setelah Bayar',
      'Menu List Produk Interaktif (Button & List Menu)',
      'Dashboard Owner (Cek Omset, Broadcast Pesan, Restock)',
      'Notifikasi Otomatis ke Grup / Admin saat Order Berhasil'
    ],
    image: '/images/bot-script.jpg',
    stock: -1,
    isPopular: true,
    rating: 4.8,
    totalSales: 245,
    scriptSpecs: {
      version: 'v3.2 MD',
      framework: 'Node.js / Baileys MD / Express Server',
      databaseRequired: true,
      licenseType: 'Lifetime Unlimited Device',
      fileSize: '24.1 MB',
      previewUrl: 'https://wa.me/6289512345678'
    },
    downloadUrl: 'https://cdn.ranzcloud.store/downloads/bot-wa-store-buatqris-v3.2.zip',
    installGuide: '1. Install Node.js v18+\n2. Jalankan npm install\n3. Edit config.js (API BuatQRIS, Nomor Owner)\n4. Jalankan npm start dan scan QR pairing WhatsApp\n5. Bot siap menerima pesanan otomatis!'
  },
  {
    id: 'bot-telegram-ptero',
    name: 'Script Bot Telegram Pterodactyl Panel Remote',
    category: 'script_bot',
    price: 30000,
    originalPrice: 45000,
    shortDescription: 'Remote server Pterodactyl lewat Telegram (Start, Stop, Restart, Console, Status).',
    description: 'Bot Telegram praktis untuk mengontrol server Pterodactyl Anda dari mana saja melalui smartphone. Cek utilisasi CPU/RAM, restart server jika crash, dan kirim perintah RCON secara remote.',
    features: [
      'Telegraf.js / Python TeleBot Framework',
      'Kontrol Power: Start, Stop, Kill, Restart Server',
      'Live Resource Monitor (CPU, RAM, Disk, Status)',
      'Execute RCON Commands langsung dari chat',
      'Admin Auth White-list (Aman dari akses luar)',
      'Notifikasi jika server mati/offline tak terduga'
    ],
    image: '/images/bot-script.jpg',
    stock: -1,
    isPopular: false,
    rating: 4.8,
    totalSales: 168,
    scriptSpecs: {
      version: 'v1.4',
      framework: 'Node.js / Telegraf / Pterodactyl API',
      databaseRequired: false,
      licenseType: 'Lifetime License',
      fileSize: '8.2 MB'
    },
    downloadUrl: 'https://cdn.ranzcloud.store/downloads/bot-tele-ptero-remote-v1.4.zip',
    installGuide: '1. Buat bot via @BotFather di Telegram\n2. Buat API Key di panel Pterodactyl\n3. Masukkan ke file .env\n4. Jalankan node index.js'
  },

  // --- GAMEMODE SA:MP ---
  {
    id: 'gm-roleplay-premium',
    name: 'Gamemode SA:MP Roleplay Premium V4.5 (Voice Ready)',
    category: 'gamemode_samp',
    price: 75000,
    originalPrice: 120000,
    shortDescription: 'Gamemode Roleplay terlengkap modern dengan sistem Voice RP, 40+ Faction & Jobs, Dealership.',
    description: 'Source code Gamemode SA:MP Roleplay modern berbasis MySQL R41-4 dengan arsitektur kode modular, sangat teroptimasi tanpa crash. Memiliki fitur Voice In-Game 3D, Textdraw HD terkini, Dynamic Faction (SAPD, SAMD, SAGS, Gangs), Bisnis, Rumah, Flat, Rental, dan Anti-Cheat terintegrasi.',
    features: [
      'Pawn Scripting Clean Code + MySQL R41-4',
      'Voice In-Game 3D Proximity Plugin Support',
      'Dynamic Faction Creator Ingame (SAPD, EMS, Gov, Mafia)',
      'Modern UI Textdraw (Speedometer, HUD, Inventory, Dialogs)',
      'Sistem Bisnis, Workshop Modif, Rumah, dan Furnitur 3D',
      'Sistem Kendaraan Dinamis + Plate Custom + Trunk Storage',
      'Anti Cheat Ingame (Weapon Hack, Teleport, Fly, Speed)',
      'Termasuk File Database .SQL Dump Lengkap & Plugins Windows/Linux'
    ],
    image: '/images/gamemode-samp.jpg',
    stock: -1,
    isPopular: true,
    isBestSeller: true,
    rating: 5.0,
    totalSales: 480,
    scriptSpecs: {
      version: 'v4.5.2 (Latest 2025)',
      framework: 'Pawn 0.3.7 / open.mp / MySQL R41-4',
      databaseRequired: true,
      licenseType: 'Full Source Code + Resell Allowed',
      fileSize: '45.8 MB (Includes Plugins, Include & SQL)',
      previewUrl: 'samp://play.ranzcloud.store:7777'
    },
    downloadUrl: 'https://cdn.ranzcloud.store/downloads/gamemode-roleplay-v4.5-full.zip',
    installGuide: '1. Import file database_rp.sql ke phpMyAdmin Anda\n2. Buka pawno/includes dan server.cfg\n3. Sesuaikan koneksi database (host, user, password, dbname)\n4. Compile menggunakan Pawno compiler\n5. Upload ke hosting SA:MP Pterodactyl dan start server!',
    sqlDumpIncluded: true
  },
  {
    id: 'gm-gangwar-tdm',
    name: 'Gamemode SA:MP Gangwar & TDM Deathmatch Pro',
    category: 'gamemode_samp',
    price: 50000,
    originalPrice: 80000,
    shortDescription: 'Gamemode Gangwar kompetitif dengan Zone Capture, Top K/D, Arena 1v1, dan FPS Boost.',
    description: 'Gamemode Deathmatch dan Gangwar kompetitif untuk komunitas SA:MP penyuka aksi tembak-menembak. Dilengkapi sistem perebutan wilayah (Turf Wars), leaderboard K/D real-time, arena duel 1v1 dengan uang taruhan, dan custom skin selector.',
    features: [
      'Turf War / Zone Capture System otomatis di Los Santos',
      'Arena Duel 1v1 (Deagle, M4, Sniper, Shotgun)',
      'Leaderboard K/D, Killstreak & Top Killer Live Ingame',
      'Custom Killfeed HD & Hitmarker Sound System',
      'Optimized No-Lag Mapping & FPS Booster Code',
      'Clan / Gang Creation System & Base Territory',
      'Termasuk Script MySQL & Konfigurasi Siap Pakai'
    ],
    image: '/images/gamemode-samp.jpg',
    stock: -1,
    isPopular: true,
    rating: 4.9,
    totalSales: 210,
    scriptSpecs: {
      version: 'v2.8 Gangster Edition',
      framework: 'Pawn 0.3.7 / YSI Library / MySQL',
      databaseRequired: true,
      licenseType: 'Full Source Code',
      fileSize: '32.1 MB'
    },
    downloadUrl: 'https://cdn.ranzcloud.store/downloads/gamemode-gangwar-tdm-v2.8.zip',
    installGuide: '1. Import tdm_database.sql\n2. Edit server.cfg\n3. Start server via Pterodactyl panel.',
    sqlDumpIncluded: true
  },
  {
    id: 'gm-cnr-classic',
    name: 'Gamemode SA:MP Cops and Robbers (CnR) Indonesia',
    category: 'gamemode_samp',
    price: 40000,
    originalPrice: 65000,
    shortDescription: 'Gamemode Polisi vs Kriminal klasik dengan robbery bank, mafia drugs, dan sistem arrest.',
    description: 'Gamemode nostalgia Cops and Robbers yang digemari ribuan player. Jadilah Polisi pemburu buronan kriminal, atau jadilah Rampok legendaris pembobol Bank Federal dan produsen barang terlarang.',
    features: [
      'Sistem Bank Heist / Robbery dengan Minigame Lockpick',
      'Sistem Polisi (Tazer, Handcuff, Jail Time, Police Radar)',
      'Sistem Drugs Dealer, Kebun Rahasia, & Black Market',
      'Bounty Hunter System & Wanted Level Star',
      'Pawn Scripting ringan dan stabil untuk 200+ player'
    ],
    image: '/images/gamemode-samp.jpg',
    stock: -1,
    isPopular: false,
    rating: 4.7,
    totalSales: 135,
    scriptSpecs: {
      version: 'v1.9 Remastered',
      framework: 'Pawn 0.3.7 / SQLite or MySQL',
      databaseRequired: true,
      licenseType: 'Full Source Code',
      fileSize: '28.0 MB'
    },
    downloadUrl: 'https://cdn.ranzcloud.store/downloads/gamemode-cnr-indonesia-v1.9.zip',
    installGuide: '1. Ekstrak file dan jalankan server.exe atau upload ke hosting\n2. Database SQLite otomatis terbuat saat pertama kali jalan.',
    sqlDumpIncluded: true
  },

  // --- SCRIPT WEBSITE ---
  {
    id: 'web-store-qris-ptero',
    name: 'Script Webstore Digital BuatQRIS & Pterodactyl Auto-Buy',
    category: 'script_website',
    price: 85000,
    originalPrice: 150000,
    shortDescription: 'Source code toko online digital otomatis terintegrasi API BuatQRIS & Pterodactyl Panel.',
    description: 'Source code web store lengkap mirip RanzCloud Store! Dilengkapi sistem pembayaran otomatis QRIS via BuatQRIS & Dana Bisnis, sistem auto-create server hosting Pterodactyl saat lunas, download link instan untuk script/gamemode, admin dashboard lengkap, manajemen voucher, dan setting API key sendiri.',
    features: [
      'Frontend Modern React + Tailwind CSS + Framer Motion',
      'Auto Payment Gateway API BuatQRIS (https://app.buatqris.site)',
      'Pterodactyl API Auto-Provisioning Server Hosting SA:MP',
      'Full Admin Dashboard (Kelola Produk, Kategori, Order, Voucher, API Keys)',
      'Sistem Invoice Realtime + Auto Checking Payment Status',
      'Kupon Diskon & Promo Voucher System',
      'Responsive Mobile, Tablet & Desktop UI High-Tech',
      'Siap Deploy ke Vercel / VPS / Shared Hosting cPanel'
    ],
    image: '/images/website-script.jpg',
    stock: -1,
    isPopular: true,
    isBestSeller: true,
    rating: 5.0,
    totalSales: 520,
    scriptSpecs: {
      version: 'v5.0 Enterprise Source',
      framework: 'React 19 / TypeScript / Tailwind CSS / Express / Vite',
      databaseRequired: false,
      licenseType: 'Full Source Code + Lifetime Updates',
      fileSize: '15.6 MB',
      previewUrl: 'https://ranzcloud.store'
    },
    downloadUrl: 'https://cdn.ranzcloud.store/downloads/script-webstore-buatqris-ptero-v5.zip',
    installGuide: '1. Ekstrak source code ke direktori proyek\n2. Jalankan npm install\n3. Sesuaikan konfigurasi di file .env atau Admin Dashboard\n4. Jalankan npm run build atau deploy langsung ke Vercel / Netlify / cPanel!'
  },
  {
    id: 'web-ucp-portal-samp',
    name: 'Script Website UCP SA:MP & Ingame Web Portal',
    category: 'script_website',
    price: 55000,
    originalPrice: 85000,
    shortDescription: 'Website UCP resmi untuk server Roleplay: Pendaftaran Karakter, CS Request, Donation.',
    description: 'Portal Web UCP profesional untuk server SA:MP Roleplay. Player bisa mendaftar akun UCP, membuat karakter RP, mengirim formulir Character Story (CS), request refund, donasi saldo in-game otomatis, dan melihat profil kendaraan serta properti miliknya.',
    features: [
      'Pendaftaran Akun UCP + Integrasi Bot Discord Verifikasi',
      'Character Management (Create, View Stats, Inventory)',
      'Character Story (CS) Submission & Admin Review Portal',
      'Vehicle & Property Inspector via Web',
      'Sistem Donasi Koin / VIP Ingame otomatis QRIS',
      'Admin UCP Moderator Review Panel'
    ],
    image: '/images/website-script.jpg',
    stock: -1,
    isPopular: true,
    rating: 4.9,
    totalSales: 290,
    scriptSpecs: {
      version: 'v3.1 Pro RP',
      framework: 'PHP 8.2 / Laravel / Bootstrap 5 / MySQL',
      databaseRequired: true,
      licenseType: 'Full Source Code',
      fileSize: '22.3 MB'
    },
    downloadUrl: 'https://cdn.ranzcloud.store/downloads/script-ucp-portal-samp-v3.1.zip',
    installGuide: '1. Import ucp_schema.sql ke database SA:MP Anda\n2. Konfigurasi koneksi .env database\n3. Arahkan domain ke public folder web server.'
  },
  {
    id: 'web-topup-game',
    name: 'Script Website Topup Game & Voucher Otomatis',
    category: 'script_website',
    price: 90000,
    originalPrice: 160000,
    shortDescription: 'Website Topup Mobile Legends, Free Fire, PUBG otomatis dengan QRIS & API Provider.',
    description: 'Source code website topup game terpopuler di Indonesia. Terintegrasi API Digiflazz / VIP Reseller dan BuatQRIS payment gateway. Transaksi diproses dalam hitungan detik 24 jam nonstop tanpa campur tangan admin.',
    features: [
      'Integrasi Multi Provider API (Digiflazz, VIP Payment)',
      'Auto QRIS Payment Gateway BuatQRIS & Dana Bisnis',
      'Auto Cek ID & Nickname Akun Game (MLBB, FF, Genshin, dll)',
      'Admin Panel Keuntungan & Markup Harga Produk',
      'Sistem Member / Reseller VIP dengan Harga Khusus',
      'Export Laporan Transaksi Excel / PDF'
    ],
    image: '/images/website-script.jpg',
    stock: -1,
    isPopular: false,
    isNew: true,
    rating: 4.9,
    totalSales: 185,
    scriptSpecs: {
      version: 'v2.4 Auto API',
      framework: 'Next.js / Node.js / Tailwind / Prisma MySQL',
      databaseRequired: true,
      licenseType: 'Full Source Code',
      fileSize: '35.0 MB'
    },
    downloadUrl: 'https://cdn.ranzcloud.store/downloads/script-web-topup-game-v2.4.zip',
    installGuide: '1. npm install\n2. Masukkan API_KEY Digiflazz & BuatQRIS di .env\n3. npx prisma db push\n4. npm run start'
  }
];

export const INITIAL_VOUCHERS: Voucher[] = [
  {
    id: 'v-ranzcloud',
    code: 'RANZCLOUD',
    discountType: 'percentage',
    discountValue: 15,
    minPurchase: 20000,
    maxUses: 500,
    usedCount: 84,
    expiresAt: '2026-12-31',
    isActive: true,
    description: 'Diskon 15% untuk semua produk RanzCloud Store!'
  },
  {
    id: 'v-samphemat',
    code: 'SAMPHEMAT',
    discountType: 'fixed',
    discountValue: 5000,
    minPurchase: 25000,
    maxUses: 200,
    usedCount: 42,
    expiresAt: '2026-12-31',
    isActive: true,
    description: 'Potongan langsung Rp 5.000 untuk Hosting & Gamemode SA:MP'
  },
  {
    id: 'v-newuser',
    code: 'NEWUSER',
    discountType: 'percentage',
    discountValue: 10,
    minPurchase: 15000,
    maxUses: 1000,
    usedCount: 193,
    expiresAt: '2026-12-31',
    isActive: true,
    description: 'Diskon selamat datang 10% untuk pengguna baru'
  }
];

export const INITIAL_PAYMENT_SETTINGS: PaymentSettings = {
  buatQrisApiKey: 'bq_live_ranzcloud_892348a7b9c1d2e3f4',
  buatQrisMerchantCode: 'RC_MERCHANT_881',
  buatQrisApiUrl: 'https://app.buatqris.site',
  danaBisnisQrisString: '00020101021226680016ID.DANA.WWW011893600918000000000002150895123456780303UMI51440014ID.CO.QRIS.WWW0215ID10200215891235204481253033605802ID5915RANZCLOUD STORE6013KOTA JAKARTA 61051234062070703A016304A89B',
  danaBisnisMerchantName: 'RANZCLOUD STORE DANA BISNIS',
  danaBisnisNumber: '0895-1234-5678',
  useUniqueCode: true,
  autoApproveSimulator: true,
  whatsappCs: '6289512345678',
  discordInvite: 'https://discord.gg/ranzcloud',
  storeNotice: '⚡ Promo Spesial: Gunakan voucher RANZCLOUD untuk diskon 15% semua produk! Server SA:MP Pterodactyl langsung aktif otomatis setelah pembayaran.'
};

export const INITIAL_PTERODACTYL_SETTINGS: PterodactylSettings = {
  panelUrl: 'https://panel.ranzcloud.store',
  apiKey: 'ptla_ranzcloud_prod_99a8b7c6d5e4f3a2b1c0',
  clientApiKey: 'ptlc_ranzclient_prod_11a22b33c44d55e66f',
  defaultNode: 'Singapore SG-Equinix-Node01 (AMD EPYC 9654)',
  defaultLocationId: 1,
  defaultNestId: 5,
  defaultEggId: 18,
  baseIp: '103.145.226.88',
  startPortRange: 7777,
  endPortRange: 7899,
  autoProvisionEnabled: true
};

export const DEFAULT_ADMIN_USER: User = {
  id: 'usr_admin_ranzcode',
  name: 'RanzCode',
  email: 'admin@ranzcloud.store',
  phone: '089512345678',
  role: 'admin',
  balance: 500000,
  createdAt: '2025-01-01'
};
