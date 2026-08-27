import React from 'react';
import { Activity, ShieldCheck, Cpu, HardDrive, CheckCircle2, Globe2 } from 'lucide-react';

export const ServerStatusBanner: React.FC = () => {
  return (
    <div className="py-4 border-y border-slate-800/80 bg-slate-950/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center justify-between gap-3 text-xs">
          
          <div className="flex items-center gap-2 text-slate-300 font-semibold">
            <Activity className="w-4 h-4 text-emerald-400 animate-pulse" />
            <span>Status Infrastruktur RanzCloud:</span>
          </div>

          <div className="flex flex-wrap items-center gap-4 text-slate-400">
            
            {/* Node 1 */}
            <div className="flex items-center gap-1.5 bg-slate-900/80 px-2.5 py-1 rounded-lg border border-slate-800">
              <span className="h-2 w-2 rounded-full bg-emerald-400" />
              <span className="font-medium text-slate-200">SG-Node01 (AMD EPYC):</span>
              <span className="text-emerald-400 font-bold">14ms Online</span>
            </div>

            {/* Node 2 */}
            <div className="flex items-center gap-1.5 bg-slate-900/80 px-2.5 py-1 rounded-lg border border-slate-800">
              <span className="h-2 w-2 rounded-full bg-emerald-400" />
              <span className="font-medium text-slate-200">JKT-CyberIDC:</span>
              <span className="text-emerald-400 font-bold">8ms Online</span>
            </div>

            {/* BuatQRIS API */}
            <div className="flex items-center gap-1.5 bg-slate-900/80 px-2.5 py-1 rounded-lg border border-slate-800">
              <span className="h-2 w-2 rounded-full bg-emerald-400" />
              <span className="font-medium text-slate-200">BuatQRIS API:</span>
              <span className="text-cyan-400 font-bold">Normal (100%)</span>
            </div>

            {/* Anti-DDoS */}
            <div className="hidden sm:flex items-center gap-1.5 bg-slate-900/80 px-2.5 py-1 rounded-lg border border-slate-800">
              <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
              <span className="font-medium text-slate-200">Voxility Anti-DDoS:</span>
              <span className="text-purple-400 font-bold">Protected</span>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
};
