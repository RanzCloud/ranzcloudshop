import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import {
  X,
  CreditCard,
  QrCode,
  ShieldCheck,
  CheckCircle2,
  Clock,
  Copy,
  ExternalLink,
  Download,
  Server,
  Zap,
  Terminal,
  AlertCircle,
  FileCode2,
  Database,
  KeyRound,
  ArrowRight,
  Wallet,
  Sparkles,
  RefreshCw,
  PhoneCall
} from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { formatRupiah, createQrisPayment, GeneratedQris } from '../utils/payment';
import { Order } from '../types';

export const CheckoutModal: React.FC = () => {
  const {
    cart,
    cartSubtotal,
    appliedVoucher,
    isCheckoutOpen,
    setIsCheckoutOpen,
    paymentSettings,
    currentUser,
    createOrder,
    processPaymentSuccess,
    showToast,
  } = useStore();

  const [step, setStep] = useState<'details' | 'payment' | 'success'>('details');
  const [customerName, setCustomerName] = useState(currentUser?.name || '');
  const [customerEmail, setCustomerEmail] = useState(currentUser?.email || '');
  const [customerPhone, setCustomerPhone] = useState(currentUser?.phone || '');
  const [customerDiscord, setCustomerDiscord] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'BUATQRIS' | 'DANA_BISNIS' | 'SALDO_WALLET'>('BUATQRIS');

  const [generatedQris, setGeneratedQris] = useState<GeneratedQris | null>(null);
  const [currentOrder, setCurrentOrder] = useState<Order | null>(null);
  const [timeLeft, setTimeLeft] = useState(900); // 15 minutes
  const [isCheckingPayment, setIsCheckingPayment] = useState(false);
  const [copiedText, setCopiedText] = useState<string | null>(null);

  // Sync user info if available
  useEffect(() => {
    if (currentUser) {
      if (!customerName) setCustomerName(currentUser.name);
      if (!customerEmail) setCustomerEmail(currentUser.email);
      if (!customerPhone) setCustomerPhone(currentUser.phone);
    }
  }, [currentUser]);

  // Timer countdown when on payment step
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (step === 'payment' && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [step, timeLeft]);

  if (!isCheckoutOpen) return null;

  // Calculate discounts
  let discountAmount = 0;
  if (appliedVoucher) {
    if (appliedVoucher.discountType === 'percentage') {
      discountAmount = Math.floor((cartSubtotal * appliedVoucher.discountValue) / 100);
    } else {
      discountAmount = appliedVoucher.discountValue;
    }
    if (discountAmount > cartSubtotal) discountAmount = cartSubtotal;
  }

  const baseTotal = Math.max(0, cartSubtotal - discountAmount);

  // Copy helper
  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(label);
    showToast(`${label} disalin ke clipboard!`);
    setTimeout(() => setCopiedText(null), 2500);
  };

  // Step 1 -> Step 2: Generate Order & QRIS
  const handleProceedToPayment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName || !customerEmail || !customerPhone) {
      showToast('Harap lengkapi formulir pembeli!');
      return;
    }

    // Generate dynamic QRIS
    const qrisData = await createQrisPayment(
      baseTotal,
      paymentSettings.useUniqueCode,
      paymentSettings,
      customerName
    );
    setGeneratedQris(qrisData);

    // Create pending order
    const newOrder = createOrder(
      {
        name: customerName,
        email: customerEmail,
        phone: customerPhone,
        discord: customerDiscord,
      },
      paymentMethod,
      {
        qrString: qrisData.qrString,
        qrImageUrl: qrisData.qrDataUrl,
        transactionId: qrisData.transactionId,
        expiredAt: qrisData.expiredAt,
        merchantName: qrisData.merchantName,
      }
    );

    setCurrentOrder(newOrder);
    setTimeLeft(900);
    setStep('payment');
  };

  // Trigger Instant Success (Simulate BuatQRIS Webhook / Auto Verification)
  const handlePaymentSuccess = () => {
    if (!currentOrder) return;
    setIsCheckingPayment(true);

    setTimeout(() => {
      const completedOrder = processPaymentSuccess(currentOrder.id);
      setIsCheckingPayment(false);
      setCurrentOrder(completedOrder);
      setStep('success');

      // Trigger Celebration Confetti
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
      });
      showToast('⚡ Pembayaran Berhasil! Server / Script siap digunakan.');
    }, 1200);
  };

  const formatTimer = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-2xl max-h-[94vh] rounded-3xl bg-slate-900 border border-slate-700 shadow-2xl flex flex-col overflow-hidden text-slate-100 animate-in zoom-in-95 duration-200">
        
        {/* Checkout Header */}
        <div className="px-6 py-4 border-b border-slate-800 bg-slate-950/80 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-cyan-500/10 text-cyan-400 flex items-center justify-center border border-cyan-500/20">
              {step === 'success' ? <Sparkles className="w-4 h-4 text-emerald-400" /> : <CreditCard className="w-4 h-4" />}
            </div>
            <div>
              <h3 className="text-sm font-bold text-white">
                {step === 'details' && '1. Informasi Pelanggan & Metode Bayar'}
                {step === 'payment' && '2. Pembayaran QRIS Otomatis (BuatQRIS)'}
                {step === 'success' && '3. Pembayaran Berhasil - Delivery Instan!'}
              </h3>
              <p className="text-[11px] text-slate-400">
                {step === 'details' && 'Lengkapi data untuk pengiriman akun server / link script'}
                {step === 'payment' && 'Scan QRIS dengan aplikasi Bank atau E-Wallet apapun'}
                {step === 'success' && 'Server SA:MP Pterodactyl & File Script langsung aktif'}
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsCheckoutOpen(false)}
            className="p-1.5 rounded-xl bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 transition-all"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto flex-1">
          
          {/* STEP 1: CUSTOMER DETAILS */}
          {step === 'details' && (
            <form onSubmit={handleProceedToPayment} className="space-y-5">
              
              {/* Order Summary Pill */}
              <div className="p-3.5 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-2">
                <div className="text-xs font-bold text-cyan-300 flex items-center justify-between">
                  <span>Ringkasan Item ({cart.length} Produk)</span>
                  <span className="text-white font-extrabold">{formatRupiah(baseTotal)}</span>
                </div>
                <div className="text-[11px] text-slate-400 max-h-20 overflow-y-auto space-y-1">
                  {cart.map((it) => (
                    <div key={it.product.id} className="flex justify-between">
                      <span className="truncate max-w-[280px]">
                        {it.quantity}x {it.product.name}
                      </span>
                      <span className="text-slate-300 font-medium">
                        {formatRupiah(it.product.price * it.quantity)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Form fields */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1.5">
                    Nama Lengkap / Username <span className="text-rose-400">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    placeholder="Contoh: Budi Santoso"
                    className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1.5">
                    No. WhatsApp Aktif <span className="text-rose-400">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    placeholder="Contoh: 081234567890"
                    className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1.5">
                    Alamat Email <span className="text-rose-400">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    value={customerEmail}
                    onChange={(e) => setCustomerEmail(e.target.value)}
                    placeholder="Contoh: budi@gmail.com"
                    className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1.5">
                    Username Discord (Opsional)
                  </label>
                  <input
                    type="text"
                    value={customerDiscord}
                    onChange={(e) => setCustomerDiscord(e.target.value)}
                    placeholder="Contoh: budi#1234"
                    className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
                  />
                </div>
              </div>

              {/* Payment Gateway Options */}
              <div className="space-y-2.5 pt-2">
                <label className="block text-xs font-bold text-slate-300">
                  Pilih Saluran Pembayaran Otomatis:
                </label>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  
                  {/* Option 1: BuatQRIS */}
                  <div
                    onClick={() => setPaymentMethod('BUATQRIS')}
                    className={`p-3.5 rounded-2xl border cursor-pointer transition-all ${
                      paymentMethod === 'BUATQRIS'
                        ? 'bg-cyan-950/40 border-cyan-500 ring-2 ring-cyan-500/20'
                        : 'bg-slate-950/60 border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <QrCode className="w-5 h-5 text-cyan-400" />
                        <span className="text-xs font-bold text-white">QRIS Otomatis (BuatQRIS)</span>
                      </div>
                      <span className="px-1.5 py-0.5 rounded bg-emerald-500/20 text-[9px] font-extrabold text-emerald-400">
                        INSTANT
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-400 mt-2 leading-relaxed">
                      Scan via BCA, Mandiri, BRI, BNI, Dana, GoPay, OVO, ShopeePay, LinkAja. Otomatis cek 5 detik.
                    </p>
                  </div>

                  {/* Option 2: Dana Bisnis */}
                  <div
                    onClick={() => setPaymentMethod('DANA_BISNIS')}
                    className={`p-3.5 rounded-2xl border cursor-pointer transition-all ${
                      paymentMethod === 'DANA_BISNIS'
                        ? 'bg-blue-950/40 border-blue-500 ring-2 ring-blue-500/20'
                        : 'bg-slate-950/60 border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Wallet className="w-5 h-5 text-blue-400" />
                        <span className="text-xs font-bold text-white">Dana Bisnis QRIS</span>
                      </div>
                      <span className="px-1.5 py-0.5 rounded bg-blue-500/20 text-[9px] font-extrabold text-blue-400">
                        OFFICIAL
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-400 mt-2 leading-relaxed">
                      Merchant resmi DANA Bisnis {paymentSettings.danaBisnisMerchantName}. Bebas biaya admin!
                    </p>
                  </div>

                </div>
              </div>

              {/* Submit CTA */}
              <div className="pt-3">
                <button
                  type="submit"
                  className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-extrabold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-xl shadow-cyan-500/25 active:scale-98 transition-all"
                >
                  <Zap className="w-4 h-4 text-slate-950" />
                  <span>Generate QRIS & Lanjutkan ({formatRupiah(baseTotal)})</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

            </form>
          )}

          {/* STEP 2: DYNAMIC QRIS PAYMENT & AUTO VERIFIER */}
          {step === 'payment' && generatedQris && (
            <div className="space-y-6 text-center">
              
              {/* Countdown & Status Header */}
              <div className="flex items-center justify-between bg-slate-950/80 p-3 rounded-2xl border border-slate-800">
                <div className="flex items-center gap-2 text-xs text-slate-300">
                  <Clock className="w-4 h-4 text-amber-400 animate-spin" />
                  <span>Sisa Waktu Bayar:</span>
                  <span className="font-mono font-black text-amber-400 text-sm">
                    {formatTimer(timeLeft)}
                  </span>
                </div>

                <div className="flex items-center gap-1.5 text-xs text-cyan-400">
                  <span className="h-2 w-2 rounded-full bg-cyan-400 animate-ping" />
                  <span className="font-semibold text-[11px]">Auto Checking (app.buatqris.site)</span>
                </div>
              </div>

              {/* QR Code Presentation Box */}
              <div className="max-w-xs mx-auto p-5 rounded-3xl bg-white text-slate-950 shadow-2xl space-y-3">
                <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                  <span className="text-xs font-black tracking-widest text-slate-800">QRIS STANDAR NASIONAL</span>
                  <span className="text-[10px] font-bold bg-slate-100 px-1.5 py-0.5 rounded text-slate-600">GPN</span>
                </div>

                <div className="relative flex justify-center py-1">
                  <img
                    src={generatedQris.qrDataUrl}
                    alt="QRIS BuatQRIS Payment"
                    className="w-56 h-56 rounded-xl border border-slate-300 shadow-inner"
                  />
                </div>

                <div className="text-center pt-1 border-t border-slate-200">
                  <div className="text-[10px] uppercase font-bold text-slate-500">
                    {generatedQris.merchantName}
                  </div>
                  <div className="text-xs text-slate-400 font-mono">
                    NMID: ID1020021589123
                  </div>
                </div>
              </div>

              {/* Total Nominal with Unique Code & Copy Button */}
              <div className="p-4 rounded-2xl bg-cyan-950/40 border border-cyan-500/40 max-w-md mx-auto space-y-2">
                <div className="text-xs text-slate-400">Total Nominal Pembayaran (Wajib Sesuai):</div>
                <div className="flex items-center justify-center gap-3">
                  <div className="text-2xl sm:text-3xl font-black text-cyan-300 font-mono">
                    {formatRupiah(generatedQris.totalAmount)}
                  </div>
                  <button
                    onClick={() => handleCopy(generatedQris.totalAmount.toString(), 'Nominal')}
                    className="p-2 rounded-xl bg-cyan-500 text-slate-950 hover:bg-cyan-400 font-bold text-xs flex items-center gap-1 shadow transition-all active:scale-95"
                    title="Salin Nominal"
                  >
                    <Copy className="w-3.5 h-3.5" />
                    <span>Salin</span>
                  </button>
                </div>
                {generatedQris.uniqueCode > 0 && (
                  <div className="text-[11px] text-cyan-200/90">
                    Termasuk kode unik unik <span className="font-bold text-white">Rp {generatedQris.uniqueCode}</span> untuk verifikasi otomatis 5 detik.
                  </div>
                )}
              </div>

              {/* Transaction ID */}
              <div className="text-xs text-slate-400 flex items-center justify-center gap-2">
                <span>Invoice ID:</span>
                <span className="font-mono font-bold text-slate-200">{generatedQris.transactionId}</span>
                <button
                  onClick={() => handleCopy(generatedQris.transactionId, 'Invoice ID')}
                  className="text-cyan-400 hover:underline text-[11px]"
                >
                  (Salin)
                </button>
              </div>

              {/* Verification Action */}
              <div className="space-y-3 pt-2 max-w-md mx-auto">
                <button
                  type="button"
                  onClick={handlePaymentSuccess}
                  disabled={isCheckingPayment}
                  className="w-full py-3.5 px-4 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-extrabold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg shadow-cyan-500/20 active:scale-98 transition-all"
                >
                  <RefreshCw className={`w-4 h-4 text-slate-950 ${isCheckingPayment ? 'animate-spin' : ''}`} />
                  <span>{isCheckingPayment ? 'Memverifikasi Pembayaran...' : 'Cek Status Pembayaran (Sudah Bayar)'}</span>
                </button>

                <p className="text-[11px] text-slate-400">
                  Pembayaran otomatis dicek setiap 5 detik oleh gateway <span className="text-cyan-400 font-semibold">BuatQRIS</span>. Begitu terdeteksi, server / script langsung siap digunakan.
                </p>
              </div>

            </div>
          )}

          {/* STEP 3: INSTANT DELIVERY POST-PURCHASE */}
          {step === 'success' && currentOrder && (
            <div className="space-y-6">
              
              {/* Success Banner */}
              <div className="p-4 rounded-2xl bg-gradient-to-r from-emerald-950/60 to-slate-900 border border-emerald-500/40 text-center space-y-1">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 mb-2 border border-emerald-500/30">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h4 className="text-lg font-black text-white">
                  Pembayaran Berhasil Diverifikasi!
                </h4>
                <p className="text-xs text-emerald-300">
                  Invoice <span className="font-mono font-bold">{currentOrder.id}</span> • Total {formatRupiah(currentOrder.totalAmount)}
                </p>
              </div>

              {/* HOSTING SA:MP INSTANCES (IF ANY) */}
              {currentOrder.deliveredServers && currentOrder.deliveredServers.length > 0 && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h5 className="text-xs font-extrabold uppercase tracking-wider text-cyan-400 flex items-center gap-2">
                      <Server className="w-4 h-4" />
                      <span>Akun Server Hosting SA:MP (Pterodactyl Ready)</span>
                    </h5>
                    <span className="text-[11px] bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded-full font-bold">
                      STATUS: ONLINE
                    </span>
                  </div>

                  {currentOrder.deliveredServers.map((srv, idx) => (
                    <div
                      key={srv.serverId}
                      className="p-4 rounded-2xl bg-slate-950 border border-cyan-500/40 shadow-lg space-y-3"
                    >
                      <div className="flex items-start justify-between border-b border-slate-800 pb-2.5">
                        <div>
                          <div className="text-xs font-bold text-white">{srv.serverName}</div>
                          <div className="text-[11px] text-slate-400">{srv.node}</div>
                        </div>
                        <span className="text-xs font-mono font-bold text-cyan-400 bg-cyan-950/80 px-2.5 py-1 rounded-lg border border-cyan-800/40">
                          {srv.fullAddress}
                        </span>
                      </div>

                      {/* Credentials Grid */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-mono">
                        <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 flex justify-between items-center">
                          <span className="text-slate-400">Panel URL:</span>
                          <a
                            href={srv.panelUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="text-cyan-400 hover:underline flex items-center gap-1 truncate max-w-[150px]"
                          >
                            <span>{srv.panelUrl}</span>
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        </div>

                        <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 flex justify-between items-center">
                          <span className="text-slate-400">Username:</span>
                          <span className="text-white font-bold">{srv.username}</span>
                        </div>

                        <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 flex justify-between items-center">
                          <span className="text-slate-400">Password:</span>
                          <span className="text-amber-300 font-bold">{srv.password}</span>
                        </div>

                        <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 flex justify-between items-center">
                          <span className="text-slate-400">SFTP Port:</span>
                          <span className="text-purple-300 font-bold">{srv.sftpPort}</span>
                        </div>
                      </div>

                      {/* Action buttons */}
                      <div className="flex flex-wrap items-center justify-between gap-2 pt-1">
                        <button
                          onClick={() => {
                            const details = `[RANZCLOUD STORE - HOSTING SA:MP]\nServer: ${srv.serverName}\nIP:Port: ${srv.fullAddress}\nPanel: ${srv.panelUrl}\nUser: ${srv.username}\nPass: ${srv.password}\nSFTP: ${srv.sftpHost}:${srv.sftpPort}\nMySQL: ${srv.mysqlDbName}`;
                            handleCopy(details, 'Detail Server SA:MP');
                          }}
                          className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-bold text-slate-200 flex items-center gap-1.5 transition-all"
                        >
                          <Copy className="w-3.5 h-3.5 text-cyan-400" />
                          <span>Salin Detail Server</span>
                        </button>

                        <a
                          href={srv.panelUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="px-4 py-1.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-xs font-extrabold flex items-center gap-1.5 transition-all"
                        >
                          <Terminal className="w-3.5 h-3.5" />
                          <span>Buka Panel Pterodactyl</span>
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* SCRIPT / GAMEMODE / WEBSITE DOWNLOADS (IF ANY) */}
              {currentOrder.deliveredScripts && currentOrder.deliveredScripts.length > 0 && (
                <div className="space-y-4">
                  <h5 className="text-xs font-extrabold uppercase tracking-wider text-purple-400 flex items-center gap-2">
                    <Download className="w-4 h-4" />
                    <span>Link Download Script & Lisensi Instan</span>
                  </h5>

                  {currentOrder.deliveredScripts.map((scr) => (
                    <div
                      key={scr.productId}
                      className="p-4 rounded-2xl bg-slate-950 border border-purple-500/40 shadow-lg space-y-3"
                    >
                      <div className="flex items-start justify-between border-b border-slate-800 pb-2.5">
                        <div>
                          <div className="text-xs font-bold text-white">{scr.productName}</div>
                          <div className="text-[11px] text-slate-400">Versi {scr.version} • {scr.fileSize}</div>
                        </div>
                        <span className="text-[11px] bg-purple-500/20 text-purple-300 px-2 py-0.5 rounded font-mono font-bold">
                          {scr.licenseKey}
                        </span>
                      </div>

                      {/* Download CTAs */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        <a
                          href={scr.downloadUrl}
                          target="_blank"
                          rel="noreferrer"
                          download
                          className="py-2.5 px-3 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-extrabold text-xs flex items-center justify-center gap-1.5 shadow-md shadow-purple-500/20"
                        >
                          <Download className="w-4 h-4" />
                          <span>Download File ZIP ({scr.fileSize})</span>
                        </a>

                        {scr.sqlDownloadUrl && (
                          <a
                            href={scr.sqlDownloadUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="py-2.5 px-3 rounded-xl bg-slate-900 border border-slate-700 hover:bg-slate-800 text-amber-300 font-bold text-xs flex items-center justify-center gap-1.5"
                          >
                            <Database className="w-4 h-4 text-amber-400" />
                            <span>Download Database .SQL</span>
                          </a>
                        )}
                      </div>

                      {/* License copy & quick guide */}
                      <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-xs font-mono space-y-1">
                        <div className="flex items-center justify-between text-slate-400">
                          <span>License Key:</span>
                          <button
                            onClick={() => handleCopy(scr.licenseKey, 'License Key')}
                            className="text-cyan-400 hover:underline flex items-center gap-1"
                          >
                            <Copy className="w-3 h-3" />
                            <span>Salin Lisensi</span>
                          </button>
                        </div>
                        <div className="text-white font-bold text-xs break-all">{scr.licenseKey}</div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Close Button */}
              <div className="pt-2">
                <button
                  onClick={() => setIsCheckoutOpen(false)}
                  className="w-full py-3 rounded-2xl bg-slate-900 border border-slate-700 hover:bg-slate-800 text-white font-bold text-xs transition-all"
                >
                  Selesai & Tutup
                </button>
              </div>

            </div>
          )}

        </div>

      </div>
    </div>
  );
};
