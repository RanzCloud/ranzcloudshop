import React, { useState } from 'react';
import { MessageCircle, X, Send, HelpCircle, Sparkles, ExternalLink } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const SupportWidget: React.FC = () => {
  const { paymentSettings } = useStore();
  const [isOpen, setIsOpen] = useState(false);

  const cleanPhone = paymentSettings.whatsappCs.replace(/[^0-9]/g, '') || '6289512345678';
  const whatsappUrl = `https://wa.me/${cleanPhone}?text=Halo%20Admin%20RanzCloud%2C%20saya%20butuh%20bantuan%20terkait%20order%20Hosting%20SA%3AMP%20%2F%20Script.`;
  const discordUrl = paymentSettings.discordInvite || 'https://discord.gg/ranzcloud';

  return (
    <div className="fixed bottom-6 right-6 z-40">
      {isOpen ? (
        <div className="relative w-80 rounded-3xl bg-slate-900 border border-slate-700 shadow-2xl p-5 space-y-4 animate-in slide-in-from-bottom-5 duration-200">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold">
                <MessageCircle className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-white">Bantuan Customer Support</h4>
                <p className="text-[10px] text-emerald-400 font-semibold">● Online 24/7 Respon Cepat</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 rounded-lg bg-slate-800 text-slate-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <p className="text-xs text-slate-300 leading-relaxed">
            Butuh bantuan instalasi script, aktivasi server SA:MP Pterodactyl, atau kendala pembayaran QRIS?
          </p>

          <div className="space-y-2">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noreferrer"
              className="w-full py-2.5 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-between transition-all shadow-md shadow-emerald-600/20"
            >
              <div className="flex items-center gap-2">
                <MessageCircle className="w-4 h-4" />
                <span>Chat WhatsApp Admin</span>
              </div>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>

            <a
              href={discordUrl}
              target="_blank"
              rel="noreferrer"
              className="w-full py-2.5 px-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs flex items-center justify-between transition-all shadow-md shadow-indigo-600/20"
            >
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4" />
                <span>Join Komunitas Discord</span>
              </div>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

          <div className="text-[10px] text-slate-500 text-center">
            RanzCloud Store • Support Team
          </div>
        </div>
      ) : (
        <button
          onClick={() => setIsOpen(true)}
          className="flex items-center gap-2 px-4 py-3 rounded-full bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-slate-950 font-extrabold text-xs shadow-xl shadow-emerald-500/25 hover:scale-105 active:scale-95 transition-all group"
        >
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-slate-950 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-slate-950"></span>
          </span>
          <MessageCircle className="w-4 h-4" />
          <span className="hidden sm:inline">Bantuan CS 24/7</span>
        </button>
      )}
    </div>
  );
};
