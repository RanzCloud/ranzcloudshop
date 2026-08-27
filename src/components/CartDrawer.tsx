import React, { useState } from 'react';
import {
  X,
  Trash2,
  Plus,
  Minus,
  ShoppingCart,
  ArrowRight,
  Tag,
  CheckCircle2,
  AlertCircle,
  Server,
  Sparkles
} from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { formatRupiah } from '../utils/payment';

export const CartDrawer: React.FC = () => {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    removeFromCart,
    updateCartQuantity,
    clearCart,
    cartSubtotal,
    appliedVoucher,
    applyVoucherCode,
    removeAppliedVoucher,
    setIsCheckoutOpen,
  } = useStore();

  const [voucherInput, setVoucherInput] = useState('');
  const [voucherError, setVoucherError] = useState<string | null>(null);
  const [voucherSuccess, setVoucherSuccess] = useState<string | null>(null);

  if (!isCartOpen) return null;

  // Calculate discount
  let discountAmount = 0;
  if (appliedVoucher) {
    if (appliedVoucher.discountType === 'percentage') {
      discountAmount = Math.floor((cartSubtotal * appliedVoucher.discountValue) / 100);
    } else {
      discountAmount = appliedVoucher.discountValue;
    }
    if (discountAmount > cartSubtotal) discountAmount = cartSubtotal;
  }

  const grandTotal = Math.max(0, cartSubtotal - discountAmount);

  const handleApplyVoucher = (e: React.FormEvent) => {
    e.preventDefault();
    if (!voucherInput.trim()) return;

    setVoucherError(null);
    setVoucherSuccess(null);

    const res = applyVoucherCode(voucherInput, cartSubtotal);
    if (res.success) {
      setVoucherSuccess(res.message);
      setVoucherInput('');
    } else {
      setVoucherError(res.message);
    }
  };

  const handleProceedToCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={() => setIsCartOpen(false)}
        className="absolute inset-0 bg-black/70 backdrop-blur-sm transition-opacity"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-slate-900 border-l border-slate-800 shadow-2xl flex flex-col justify-between animate-in slide-in-from-right duration-300">
          
          {/* Drawer Header */}
          <div className="p-5 border-b border-slate-800 flex items-center justify-between bg-slate-950/60">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-cyan-500/10 text-cyan-400 flex items-center justify-center border border-cyan-500/20">
                <ShoppingCart className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-white">Keranjang Belanja</h3>
                <p className="text-[11px] text-slate-400">{cart.length} item dipilih</p>
              </div>
            </div>

            <button
              onClick={() => setIsCartOpen(false)}
              className="p-1.5 rounded-xl bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 transition-all"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Drawer Items Body */}
          <div className="p-5 overflow-y-auto flex-1 space-y-3">
            {cart.length === 0 ? (
              <div className="py-16 text-center text-slate-400 space-y-3">
                <div className="w-16 h-16 mx-auto rounded-full bg-slate-950 flex items-center justify-center text-slate-600 border border-slate-800">
                  <ShoppingCart className="w-8 h-8" />
                </div>
                <p className="text-sm font-bold text-slate-300">Keranjang masih kosong</p>
                <p className="text-xs text-slate-500 max-w-xs mx-auto">
                  Silakan pilih paket Hosting SA:MP, Script Bot, atau Gamemode impian Anda.
                </p>
              </div>
            ) : (
              cart.map((item) => (
                <div
                  key={item.product.id}
                  className="p-3.5 rounded-2xl bg-slate-950/80 border border-slate-800 flex gap-3 relative group"
                >
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-16 h-16 rounded-xl object-cover bg-slate-900 shrink-0 border border-slate-800"
                  />

                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-1">
                      <h4 className="text-xs font-bold text-white line-clamp-1">
                        {item.product.name}
                      </h4>
                      <button
                        onClick={() => removeFromCart(item.product.id)}
                        className="text-slate-500 hover:text-red-400 p-0.5 transition-colors"
                        title="Hapus"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <p className="text-[11px] text-cyan-400 font-bold mt-0.5">
                      {formatRupiah(item.product.price)}
                    </p>

                    {item.customServerName && (
                      <div className="text-[10px] text-slate-400 truncate mt-0.5 flex items-center gap-1">
                        <Server className="w-3 h-3 text-cyan-400" />
                        <span>Nama: {item.customServerName}</span>
                      </div>
                    )}

                    {/* Quantity controls */}
                    <div className="mt-2.5 flex items-center justify-between">
                      <div className="flex items-center gap-2 bg-slate-900 border border-slate-700/80 rounded-lg p-0.5">
                        <button
                          onClick={() => updateCartQuantity(item.product.id, -1)}
                          className="p-1 text-slate-400 hover:text-white rounded hover:bg-slate-800 transition-colors"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="text-xs font-bold text-white px-1.5">{item.quantity}</span>
                        <button
                          onClick={() => updateCartQuantity(item.product.id, 1)}
                          className="p-1 text-slate-400 hover:text-white rounded hover:bg-slate-800 transition-colors"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <span className="text-xs font-extrabold text-white">
                        {formatRupiah(item.product.price * item.quantity)}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}

            {/* Voucher Section */}
            {cart.length > 0 && (
              <div className="pt-2">
                <div className="p-3.5 rounded-2xl bg-slate-950/60 border border-slate-800 space-y-2">
                  <div className="flex items-center justify-between text-xs font-bold text-slate-300">
                    <div className="flex items-center gap-1.5">
                      <Tag className="w-3.5 h-3.5 text-cyan-400" />
                      <span>Kupon Promo / Voucher Diskon</span>
                    </div>
                    {appliedVoucher && (
                      <button
                        onClick={removeAppliedVoucher}
                        className="text-[11px] text-red-400 hover:underline"
                      >
                        Hapus
                      </button>
                    )}
                  </div>

                  {appliedVoucher ? (
                    <div className="flex items-center justify-between p-2 rounded-xl bg-cyan-950/40 border border-cyan-500/30 text-xs">
                      <div className="flex items-center gap-2 text-cyan-300">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                        <span className="font-bold">{appliedVoucher.code}</span>
                        <span className="text-[11px] text-slate-400">
                          ({appliedVoucher.discountType === 'percentage' ? `${appliedVoucher.discountValue}%` : formatRupiah(appliedVoucher.discountValue)})
                        </span>
                      </div>
                      <span className="font-bold text-emerald-400">
                        -{formatRupiah(discountAmount)}
                      </span>
                    </div>
                  ) : (
                    <form onSubmit={handleApplyVoucher} className="flex gap-2">
                      <input
                        type="text"
                        value={voucherInput}
                        onChange={(e) => setVoucherInput(e.target.value.toUpperCase())}
                        placeholder="Contoh: RANZCLOUD"
                        className="flex-1 px-3 py-1.5 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white placeholder-slate-500 uppercase focus:outline-none focus:border-cyan-500"
                      />
                      <button
                        type="submit"
                        className="px-3 py-1.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs transition-all"
                      >
                        Pasang
                      </button>
                    </form>
                  )}

                  {voucherSuccess && (
                    <div className="text-[11px] text-emerald-400 flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>{voucherSuccess}</span>
                    </div>
                  )}
                  {voucherError && (
                    <div className="text-[11px] text-rose-400 flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5" />
                      <span>{voucherError}</span>
                    </div>
                  )}

                  <div className="text-[10px] text-slate-400">
                    Masukkan kode voucher promo resmi untuk mendapatkan potongan harga.
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Drawer Footer & Checkout */}
          {cart.length > 0 && (
            <div className="p-5 border-t border-slate-800 bg-slate-950/90 space-y-3">
              <div className="space-y-1.5 text-xs">
                <div className="flex justify-between text-slate-400">
                  <span>Subtotal</span>
                  <span>{formatRupiah(cartSubtotal)}</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-emerald-400 font-semibold">
                    <span>Diskon Voucher</span>
                    <span>-{formatRupiah(discountAmount)}</span>
                  </div>
                )}
                <div className="flex justify-between text-sm font-black text-white pt-2 border-t border-slate-800">
                  <span>Total Pembayaran</span>
                  <span className="text-cyan-400">{formatRupiah(grandTotal)}</span>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2">
                <button
                  onClick={clearCart}
                  className="py-2.5 rounded-xl bg-slate-900 border border-slate-800 hover:bg-slate-800 text-slate-400 hover:text-white text-xs font-semibold"
                >
                  Kosongkan
                </button>

                <button
                  onClick={handleProceedToCheckout}
                  className="col-span-2 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-extrabold text-xs flex items-center justify-center gap-2 shadow-lg shadow-cyan-500/20 active:scale-95 transition-all"
                >
                  <span>Lanjut Checkout QRIS</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              <div className="text-center">
                <span className="text-[10px] text-slate-500">
                  ⚡ Otomatis diproses oleh Payment Gateway BuatQRIS & Dana Bisnis
                </span>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
