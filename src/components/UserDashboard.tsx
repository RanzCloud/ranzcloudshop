import React, { useState } from 'react';
import {
  Server,
  Download,
  Receipt,
  User as UserIcon,
  Play,
  Square,
  RotateCw,
  Copy,
  ExternalLink,
  Terminal,
  Database,
  KeyRound,
  ShieldCheck,
  HardDrive,
  Cpu,
  Clock,
  Sparkles,
  Search,
  CheckCircle2,
  Send,
  HelpCircle
} from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { formatRupiah } from '../utils/payment';
import { Order, SampServerInstance } from '../types';

interface UserDashboardProps {
  initialTab?: string;
  onBackToStore: () => void;
}

export const UserDashboard: React.FC<UserDashboardProps> = ({
  initialTab = 'servers',
  onBackToStore,
}) => {
  const {
    currentUser,
    servers,
    orders,
    controlServer,
    showToast,
    setIsCartOpen,
  } = useStore();

  const [activeTab, setActiveTab] = useState<'servers' | 'downloads' | 'orders' | 'profile'>(
    (initialTab as any) || 'servers'
  );

  const [selectedServerForConsole, setSelectedServerForConsole] = useState<SampServerInstance | null>(
    servers.length > 0 ? servers[0] : null
  );

  const [consoleCommand, setConsoleCommand] = useState('');
  const [consoleLogs, setConsoleLogs] = useState<string[]>([
    '[SYSTEM] SA-MP Dedicated Server v0.3.7-R2 Linux x86_64 loaded.',
    '[SYSTEM] [Pterodactyl Daemon]: Server container started on SG-Node01.',
    '[Pawn] Loading gamemode: Grand Theft Auto San Andreas Multiplayer...',
    '[MySQL] Connecting to remote database: Connection established successfully (Ping: 1.2ms).',
    '[Pawn] 42 Factions, 150 Vehicles, 320 Dynamic Houses loaded into memory.',
    '[SYSTEM] Server is now listening on 0.0.0.0:7777 - Ready for players!',
  ]);

  const [selectedInvoice, setSelectedInvoice] = useState<Order | null>(null);

  // Copy helper
  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    showToast(`${label} disalin ke clipboard!`);
  };

  // Handle console commands in simulator
  const handleSendConsole = (e: React.FormEvent) => {
    e.preventDefault();
    if (!consoleCommand.trim()) return;

    const cmd = consoleCommand.trim();
    const newLogs = [...consoleLogs, `> ${cmd}`];

    if (cmd.startsWith('say')) {
      newLogs.push(`[ADMIN BROADCAST]: ${cmd.replace('say', '').trim()}`);
    } else if (cmd === 'players') {
      newLogs.push('Players Online: 0/150 - Waiting for incoming connections.');
    } else if (cmd === 'gmx') {
      newLogs.push('[SYSTEM] GameMode restart initiated. Reloading plugins and scripts...');
      newLogs.push('[SYSTEM] Gamemode reloaded successfully.');
    } else if (cmd === 'help') {
      newLogs.push('Available commands: say <text>, players, gmx, weather <id>, time <hour>, status');
    } else {
      newLogs.push(`[RCON] Command '${cmd}' executed on server instance.`);
    }

    setConsoleLogs(newLogs);
    setConsoleCommand('');
  };

  // Collect all purchased scripts from orders
  const allDeliveredScripts = orders
    .filter((o) => o.status === 'completed' && o.deliveredScripts)
    .flatMap((o) => o.deliveredScripts || []);

  return (
    <div className="min-h-screen py-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
      
      {/* Top Banner & User Profile Ribbon */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-slate-900 via-slate-900 to-cyan-950/50 border border-slate-800 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center text-slate-950 font-black text-xl shadow-lg shadow-cyan-500/20">
            {currentUser?.name.charAt(0).toUpperCase() || 'U'}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-extrabold text-white">
                Client Area: {currentUser?.name || 'Pelanggan RanzCloud'}
              </h2>
              {currentUser?.role === 'admin' && (
                <span className="px-2 py-0.5 rounded bg-purple-500/20 text-purple-300 text-[10px] font-extrabold border border-purple-500/30">
                  👑 OWNER ADMIN
                </span>
              )}
            </div>
            <p className="text-xs text-slate-400 mt-1">
              Email: {currentUser?.email || 'user@ranzcloud.store'} • Terdaftar sejak 2025
            </p>
          </div>
        </div>

        {/* Quick Stats / Back button */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="p-3 rounded-2xl bg-slate-950/80 border border-slate-800 text-center min-w-[100px]">
            <div className="text-[10px] text-slate-400 uppercase font-bold">Server SA:MP</div>
            <div className="text-base font-black text-cyan-400">{servers.length} Aktif</div>
          </div>

          <div className="p-3 rounded-2xl bg-slate-950/80 border border-slate-800 text-center min-w-[100px]">
            <div className="text-[10px] text-slate-400 uppercase font-bold">Script / GM</div>
            <div className="text-base font-black text-purple-400">{allDeliveredScripts.length} File</div>
          </div>

          <button
            onClick={onBackToStore}
            className="px-4 py-3 rounded-2xl bg-slate-800 hover:bg-slate-700 text-xs font-bold text-slate-200 transition-all"
          >
            ← Kembali ke Store
          </button>
        </div>
      </div>

      {/* Main Tabs Navigation */}
      <div className="flex items-center gap-2 border-b border-slate-800 overflow-x-auto pb-2">
        <button
          onClick={() => setActiveTab('servers')}
          className={`flex items-center gap-2 px-5 py-3 rounded-2xl text-xs font-bold transition-all whitespace-nowrap ${
            activeTab === 'servers'
              ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 shadow-lg shadow-cyan-500/20'
              : 'text-slate-400 hover:text-white hover:bg-slate-900 bg-slate-950/40 border border-slate-800/80'
          }`}
        >
          <Server className="w-4 h-4" />
          <span>Server SA:MP Saya ({servers.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('downloads')}
          className={`flex items-center gap-2 px-5 py-3 rounded-2xl text-xs font-bold transition-all whitespace-nowrap ${
            activeTab === 'downloads'
              ? 'bg-gradient-to-r from-purple-500 to-indigo-600 text-white shadow-lg shadow-purple-500/20'
              : 'text-slate-400 hover:text-white hover:bg-slate-900 bg-slate-950/40 border border-slate-800/80'
          }`}
        >
          <Download className="w-4 h-4" />
          <span>Script & Downloads ({allDeliveredScripts.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('orders')}
          className={`flex items-center gap-2 px-5 py-3 rounded-2xl text-xs font-bold transition-all whitespace-nowrap ${
            activeTab === 'orders'
              ? 'bg-gradient-to-r from-emerald-500 to-teal-600 text-slate-950 shadow-lg shadow-emerald-500/20'
              : 'text-slate-400 hover:text-white hover:bg-slate-900 bg-slate-950/40 border border-slate-800/80'
          }`}
        >
          <Receipt className="w-4 h-4" />
          <span>Riwayat Transaksi & Invoices ({orders.length})</span>
        </button>
      </div>

      {/* TAB CONTENT 1: SERVERS & PTERODACTYL CONSOLE */}
      {activeTab === 'servers' && (
        <div className="space-y-6">
          {servers.length === 0 ? (
            <div className="p-12 text-center rounded-3xl bg-slate-900/60 border border-slate-800 space-y-4">
              <div className="w-16 h-16 mx-auto rounded-2xl bg-cyan-500/10 text-cyan-400 flex items-center justify-center border border-cyan-500/20">
                <Server className="w-8 h-8" />
              </div>
              <h3 className="text-base font-bold text-white">Belum Ada Server SA:MP Aktif</h3>
              <p className="text-xs text-slate-400 max-w-md mx-auto">
                Anda belum memiliki server hosting SA:MP aktif. Silakan pilih paket hosting di katalog toko, server akan otomatis dibuat dalam 5 detik setelah pembayaran.
              </p>
              <button
                onClick={onBackToStore}
                className="px-5 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-extrabold text-xs shadow-md shadow-cyan-500/20"
              >
                + Beli Hosting SA:MP Sekarang
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              
              {/* Left Column: Server Cards List */}
              <div className="lg:col-span-6 space-y-4">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Daftar Server Pterodactyl Anda:
                </h3>

                {servers.map((srv) => (
                  <div
                    key={srv.serverId}
                    onClick={() => setSelectedServerForConsole(srv)}
                    className={`p-5 rounded-3xl border transition-all cursor-pointer ${
                      selectedServerForConsole?.serverId === srv.serverId
                        ? 'bg-slate-900 border-cyan-500 shadow-xl shadow-cyan-500/10 ring-2 ring-cyan-500/20'
                        : 'bg-slate-900/70 border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    {/* Top title */}
                    <div className="flex items-start justify-between border-b border-slate-800/80 pb-3">
                      <div>
                        <div className="flex items-center gap-2">
                          <span
                            className={`h-2.5 w-2.5 rounded-full ${
                              srv.status === 'ONLINE' ? 'bg-emerald-400 animate-pulse' : 'bg-red-500'
                            }`}
                          />
                          <h4 className="text-sm font-extrabold text-white">{srv.serverName}</h4>
                        </div>
                        <p className="text-[11px] text-slate-400 mt-0.5">{srv.node}</p>
                      </div>

                      <span
                        className={`text-[10px] font-extrabold px-2.5 py-1 rounded-full ${
                          srv.status === 'ONLINE'
                            ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                            : 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                        }`}
                      >
                        {srv.status}
                      </span>
                    </div>

                    {/* Quick Specs */}
                    <div className="grid grid-cols-3 gap-2 py-3 text-xs">
                      <div className="p-2 rounded-xl bg-slate-950/60 border border-slate-800">
                        <div className="text-[10px] text-slate-400">IP & Port</div>
                        <div className="text-cyan-300 font-mono font-bold truncate text-[11px] mt-0.5">
                          {srv.fullAddress}
                        </div>
                      </div>

                      <div className="p-2 rounded-xl bg-slate-950/60 border border-slate-800">
                        <div className="text-[10px] text-slate-400">RAM / CPU</div>
                        <div className="text-white font-bold text-[11px] mt-0.5">
                          {srv.ram}
                        </div>
                      </div>

                      <div className="p-2 rounded-xl bg-slate-950/60 border border-slate-800">
                        <div className="text-[10px] text-slate-400">Kedaluwarsa</div>
                        <div className="text-amber-400 font-bold text-[11px] mt-0.5">
                          30 Hari
                        </div>
                      </div>
                    </div>

                    {/* Power Controls */}
                    <div className="flex items-center justify-between pt-2 border-t border-slate-800/80">
                      <div className="flex items-center gap-1.5">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            controlServer(srv.serverId, 'START');
                          }}
                          className="p-2 rounded-xl bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 hover:bg-emerald-900 text-xs font-bold flex items-center gap-1 transition-all"
                          title="Start Server"
                        >
                          <Play className="w-3.5 h-3.5" />
                          <span>Start</span>
                        </button>

                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            controlServer(srv.serverId, 'RESTART');
                          }}
                          className="p-2 rounded-xl bg-amber-950/60 border border-amber-500/40 text-amber-300 hover:bg-amber-900 text-xs font-bold flex items-center gap-1 transition-all"
                          title="Restart Server"
                        >
                          <RotateCw className="w-3.5 h-3.5" />
                          <span>Restart</span>
                        </button>

                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            controlServer(srv.serverId, 'STOP');
                          }}
                          className="p-2 rounded-xl bg-rose-950/60 border border-rose-500/40 text-rose-300 hover:bg-rose-900 text-xs font-bold flex items-center gap-1 transition-all"
                          title="Stop Server"
                        >
                          <Square className="w-3.5 h-3.5" />
                          <span>Stop</span>
                        </button>
                      </div>

                      <a
                        href={srv.panelUrl}
                        target="_blank"
                        rel="noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="px-3 py-1.5 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 hover:bg-cyan-500 hover:text-slate-950 text-xs font-bold flex items-center gap-1 transition-all"
                      >
                        <span>Panel</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  </div>
                ))}
              </div>

              {/* Right Column: Live Web Console Simulator & Credentials */}
              <div className="lg:col-span-6 space-y-4">
                {selectedServerForConsole ? (
                  <div className="space-y-4">
                    {/* Server Credentials Box */}
                    <div className="p-4 rounded-3xl bg-slate-900 border border-slate-800 space-y-3">
                      <div className="flex items-center justify-between text-xs font-bold text-slate-300">
                        <span className="flex items-center gap-1.5 text-cyan-400">
                          <KeyRound className="w-4 h-4" />
                          Kredensial Login Pterodactyl & SFTP
                        </span>
                        <button
                          onClick={() => {
                            const details = `Panel: ${selectedServerForConsole.panelUrl}\nUser: ${selectedServerForConsole.username}\nPass: ${selectedServerForConsole.password}\nIP: ${selectedServerForConsole.fullAddress}\nSFTP: ${selectedServerForConsole.sftpHost}:${selectedServerForConsole.sftpPort}`;
                            handleCopy(details, 'Semua Kredensial');
                          }}
                          className="text-[11px] text-cyan-400 hover:underline flex items-center gap-1"
                        >
                          <Copy className="w-3 h-3" />
                          <span>Salin Semua</span>
                        </button>
                      </div>

                      <div className="grid grid-cols-2 gap-2 text-xs font-mono">
                        <div className="p-2 rounded-xl bg-slate-950 border border-slate-800">
                          <div className="text-[10px] text-slate-500">Username Panel</div>
                          <div className="text-white font-bold truncate">{selectedServerForConsole.username}</div>
                        </div>

                        <div className="p-2 rounded-xl bg-slate-950 border border-slate-800">
                          <div className="text-[10px] text-slate-500">Password Panel</div>
                          <div className="text-amber-300 font-bold truncate">{selectedServerForConsole.password}</div>
                        </div>

                        <div className="p-2 rounded-xl bg-slate-950 border border-slate-800">
                          <div className="text-[10px] text-slate-500">SFTP Host:Port</div>
                          <div className="text-purple-300 font-bold truncate">
                            {selectedServerForConsole.sftpHost}:{selectedServerForConsole.sftpPort}
                          </div>
                        </div>

                        <div className="p-2 rounded-xl bg-slate-950 border border-slate-800">
                          <div className="text-[10px] text-slate-500">MySQL Database</div>
                          <div className="text-emerald-300 font-bold truncate">
                            {selectedServerForConsole.mysqlDbName || 's_db_active'}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Interactive Web Console */}
                    <div className="rounded-3xl bg-slate-950 border border-slate-800 overflow-hidden shadow-2xl flex flex-col h-[340px]">
                      <div className="px-4 py-2.5 bg-slate-900/90 border-b border-slate-800 flex items-center justify-between text-xs">
                        <div className="flex items-center gap-2 text-slate-300 font-mono">
                          <Terminal className="w-4 h-4 text-cyan-400" />
                          <span>Live Console: {selectedServerForConsole.serverName}</span>
                        </div>
                        <span className="text-[10px] text-emerald-400 font-mono">CONNECTED</span>
                      </div>

                      {/* Log Screen */}
                      <div className="p-4 overflow-y-auto flex-1 font-mono text-[11px] space-y-1.5 text-slate-300">
                        {consoleLogs.map((log, idx) => (
                          <div
                            key={idx}
                            className={
                              log.startsWith('>')
                                ? 'text-cyan-400 font-bold'
                                : log.includes('error') || log.includes('fail')
                                ? 'text-rose-400'
                                : log.includes('success') || log.includes('Ready')
                                ? 'text-emerald-400'
                                : 'text-slate-300'
                            }
                          >
                            {log}
                          </div>
                        ))}
                      </div>

                      {/* Command Input */}
                      <form onSubmit={handleSendConsole} className="p-2 bg-slate-900 border-t border-slate-800 flex gap-2">
                        <input
                          type="text"
                          value={consoleCommand}
                          onChange={(e) => setConsoleCommand(e.target.value)}
                          placeholder="Ketik command (contoh: say Halo SA:MP, players, gmx)..."
                          className="flex-1 px-3 py-1.5 bg-slate-950 border border-slate-700 rounded-xl font-mono text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
                        />
                        <button
                          type="submit"
                          className="px-3 py-1.5 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs rounded-xl flex items-center gap-1 transition-all"
                        >
                          <Send className="w-3.5 h-3.5" />
                        </button>
                      </form>
                    </div>
                  </div>
                ) : (
                  <div className="p-8 text-center text-slate-400 border border-slate-800 rounded-3xl">
                    Pilih salah satu server di sebelah kiri untuk membuka web console.
                  </div>
                )}
              </div>

            </div>
          )}
        </div>
      )}

      {/* TAB CONTENT 2: SCRIPT & DOWNLOADS */}
      {activeTab === 'downloads' && (
        <div className="space-y-4">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
            Daftar File Script & Gamemode Terlisensi Anda:
          </h3>

          {allDeliveredScripts.length === 0 ? (
            <div className="p-12 text-center rounded-3xl bg-slate-900/60 border border-slate-800 space-y-4">
              <div className="w-16 h-16 mx-auto rounded-2xl bg-purple-500/10 text-purple-400 flex items-center justify-center border border-purple-500/20">
                <Download className="w-8 h-8" />
              </div>
              <h3 className="text-base font-bold text-white">Belum Ada Script Dibeli</h3>
              <p className="text-xs text-slate-400 max-w-md mx-auto">
                Setelah Anda membeli Script Bot, Gamemode SA:MP, atau Script Website, link download dan lisensi otomatis akan tersimpan permanen di sini.
              </p>
              <button
                onClick={onBackToStore}
                className="px-5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-extrabold text-xs shadow-md shadow-purple-500/20"
              >
                Jelajahi Katalog Script
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {allDeliveredScripts.map((scr, idx) => (
                <div
                  key={idx}
                  className="p-5 rounded-3xl bg-slate-900 border border-slate-800 hover:border-purple-500/40 transition-all space-y-3"
                >
                  <div className="flex items-start justify-between border-b border-slate-800 pb-2.5">
                    <div>
                      <h4 className="text-sm font-extrabold text-white">{scr.productName}</h4>
                      <p className="text-[11px] text-slate-400">Versi {scr.version} • {scr.fileSize}</p>
                    </div>
                    <span className="text-[10px] font-bold bg-purple-500/20 text-purple-300 px-2 py-0.5 rounded-full">
                      LIFETIME
                    </span>
                  </div>

                  <div className="p-3 rounded-2xl bg-slate-950 border border-slate-800 font-mono text-xs space-y-1">
                    <div className="flex justify-between text-slate-400 text-[11px]">
                      <span>License Key:</span>
                      <button
                        onClick={() => handleCopy(scr.licenseKey, 'Lisensi')}
                        className="text-cyan-400 hover:underline"
                      >
                        Salin
                      </button>
                    </div>
                    <div className="text-white font-bold break-all">{scr.licenseKey}</div>
                  </div>

                  <div className="grid grid-cols-2 gap-2 pt-1">
                    <a
                      href={scr.downloadUrl}
                      target="_blank"
                      rel="noreferrer"
                      download
                      className="py-2.5 px-3 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 text-white font-extrabold text-xs flex items-center justify-center gap-1.5 shadow"
                    >
                      <Download className="w-4 h-4" />
                      <span>Download ZIP</span>
                    </a>

                    {scr.sqlDownloadUrl && (
                      <a
                        href={scr.sqlDownloadUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="py-2.5 px-3 rounded-xl bg-slate-950 border border-slate-700 hover:bg-slate-800 text-amber-300 font-bold text-xs flex items-center justify-center gap-1.5"
                      >
                        <Database className="w-4 h-4 text-amber-400" />
                        <span>Database .SQL</span>
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* TAB CONTENT 3: ORDERS & INVOICES */}
      {activeTab === 'orders' && (
        <div className="space-y-4">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
            Riwayat Semua Transaksi Anda:
          </h3>

          {orders.length === 0 ? (
            <div className="p-12 text-center rounded-3xl bg-slate-900/60 border border-slate-800 space-y-3">
              <p className="text-xs text-slate-400">Belum ada transaksi pembelian.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {orders.map((ord) => (
                <div
                  key={ord.id}
                  className="p-4 sm:p-5 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
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
                    </div>

                    <div className="text-xs text-slate-300 font-medium">
                      {ord.items.map((it) => `${it.quantity}x ${it.product.name}`).join(', ')}
                    </div>
                    <div className="text-[11px] text-slate-500">
                      Waktu: {new Date(ord.createdAt).toLocaleString('id-ID')} • Metode: {ord.paymentMethod}
                    </div>
                  </div>

                  <div className="flex items-center justify-between sm:justify-end gap-4 border-t sm:border-t-0 border-slate-800 pt-3 sm:pt-0">
                    <div className="text-right">
                      <div className="text-xs text-slate-400">Total Nominal</div>
                      <div className="text-sm font-black text-white">{formatRupiah(ord.totalAmount)}</div>
                    </div>

                    <button
                      onClick={() => setSelectedInvoice(ord)}
                      className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-bold text-slate-200 transition-all"
                    >
                      Lihat Invoice
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Invoice Detail Modal Popup */}
      {selectedInvoice && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
          <div className="relative w-full max-w-md rounded-3xl bg-slate-900 border border-slate-700 p-6 space-y-4 animate-in zoom-in-95 duration-200">
            <div className="flex justify-between items-center border-b border-slate-800 pb-3">
              <div>
                <h4 className="text-sm font-black text-white">Invoice Transaksi</h4>
                <p className="text-[11px] font-mono text-cyan-400">{selectedInvoice.id}</p>
              </div>
              <button
                onClick={() => setSelectedInvoice(null)}
                className="p-1 rounded-lg bg-slate-800 text-slate-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            <div className="space-y-2 text-xs">
              <div className="flex justify-between text-slate-400">
                <span>Pelanggan:</span>
                <span className="text-white font-semibold">{selectedInvoice.customerName}</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>WhatsApp:</span>
                <span className="text-white font-semibold">{selectedInvoice.customerPhone}</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Status Pembayaran:</span>
                <span className="text-emerald-400 font-bold uppercase">{selectedInvoice.status}</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Metode:</span>
                <span className="text-white">{selectedInvoice.paymentMethod}</span>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1.5 text-xs">
              <div className="font-bold text-slate-300 pb-1 border-b border-slate-800">Detail Produk:</div>
              {selectedInvoice.items.map((it) => (
                <div key={it.product.id} className="flex justify-between text-slate-300">
                  <span>{it.quantity}x {it.product.name}</span>
                  <span className="font-bold">{formatRupiah(it.product.price * it.quantity)}</span>
                </div>
              ))}
              {selectedInvoice.discount > 0 && (
                <div className="flex justify-between text-emerald-400 pt-1">
                  <span>Diskon:</span>
                  <span>-{formatRupiah(selectedInvoice.discount)}</span>
                </div>
              )}
              {selectedInvoice.uniqueCode > 0 && (
                <div className="flex justify-between text-cyan-400">
                  <span>Kode Unik:</span>
                  <span>+{formatRupiah(selectedInvoice.uniqueCode)}</span>
                </div>
              )}
              <div className="flex justify-between text-sm font-black text-white pt-2 border-t border-slate-800">
                <span>Total Bayar:</span>
                <span className="text-cyan-400">{formatRupiah(selectedInvoice.totalAmount)}</span>
              </div>
            </div>

            <button
              onClick={() => setSelectedInvoice(null)}
              className="w-full py-2.5 rounded-xl bg-cyan-500 text-slate-950 font-bold text-xs"
            >
              Tutup Invoice
            </button>
          </div>
        </div>
      )}

    </div>
  );
};
