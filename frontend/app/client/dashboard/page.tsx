'use client';

import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { QrCode, Wallet, ArrowUpRight, ArrowDownLeft } from 'lucide-react';
import { BottomNav } from '@/components/client/bottom-nav';
import { MOCK_ASSETS, MOCK_TRANSACTIONS } from '@/lib/mock-data';

export default function ClientDashboard() {
  const router = useRouter();
  
  // Calcular balance total en USD
  const totalUSD = MOCK_ASSETS.reduce((acc, asset) => acc + (asset.balance * asset.rate), 0);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 text-white pb-24">
      {/* Header */}
      <div className="px-4 pt-6 pb-4">
        <div className="flex items-center justify-between mb-2">
          <p className="text-sm text-slate-400 font-medium">Balance total</p>
          <div className="flex gap-2">
            <button className="p-2 rounded-lg hover:bg-slate-700/50 transition-colors">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
            </button>
            <button className="p-2 rounded-lg hover:bg-slate-700/50 transition-colors">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </button>
          </div>
        </div>

        {/* Balance Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="glass-card p-6 relative overflow-hidden"
          style={{ 
            background: 'linear-gradient(135deg, rgba(0, 217, 255, 0.1) 0%, rgba(0, 107, 125, 0.1) 100%)',
            border: '1px solid rgba(0, 217, 255, 0.2)'
          }}
        >
          <div className="relative z-10">
            <h2 className="text-5xl font-bold text-gradient mb-1">
              ${totalUSD.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </h2>
            <p className="text-sm text-slate-400">USD equivalente</p>
          </div>
        </motion.div>
      </div>

      {/* Quick Actions */}
      <div className="px-4 mb-6">
        <div className="grid grid-cols-2 gap-3">
          <motion.button
            whileTap={{ scale: 0.97 }}
            onClick={() => router.push('/client/split/create')}
            className="glass-card p-4 flex flex-col items-center gap-2 hover:border-[#00D9FF]/50 transition-all"
            style={{ background: 'rgba(0, 217, 255, 0.05)' }}
          >
            <div className="w-12 h-12 rounded-full gradient-primary flex items-center justify-center">
              <QrCode className="w-6 h-6 text-white" />
            </div>
            <span className="text-sm font-medium">Dividir pago</span>
          </motion.button>

          <motion.button
            whileTap={{ scale: 0.97 }}
            onClick={() => router.push('/client/scan')}
            className="glass-card p-4 flex flex-col items-center gap-2 hover:border-slate-500/50 transition-all"
            style={{ background: 'rgba(148, 163, 184, 0.05)' }}
          >
            <div className="w-12 h-12 rounded-full bg-slate-700 flex items-center justify-center">
              <Wallet className="w-6 h-6 text-slate-200" />
            </div>
            <span className="text-sm font-medium">Escanear QR</span>
          </motion.button>
        </div>
      </div>

      {/* Assets */}
      <div className="px-4 mb-6">
        <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-3">
          Mis Activos
        </h3>
        <div className="space-y-2">
          {MOCK_ASSETS.map((asset, i) => (
            <motion.div
              key={asset.symbol}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.05 }}
              className="glass-card p-4 flex items-center justify-between hover:border-slate-600/50 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-slate-700/50 flex items-center justify-center text-lg">
                  {asset.icon}
                </div>
                <div>
                  <p className="font-medium text-sm">{asset.symbol}</p>
                  <p className="text-xs text-slate-400">{asset.name}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-medium text-sm">{asset.balance.toLocaleString()}</p>
                <p className="text-xs text-slate-400">
                  ≈ ${(asset.balance * asset.rate).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Recent Transactions */}
      <div className="px-4 mb-6">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider">
            Recientes
          </h3>
          <button
            onClick={() => router.push('/client/history')}
            className="text-xs text-[#00D9FF] font-medium hover:underline"
          >
            Ver todo →
          </button>
        </div>
        <div className="space-y-2">
          {MOCK_TRANSACTIONS.slice(0, 3).map((tx, i) => (
            <motion.div
              key={tx.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 + i * 0.05 }}
              className="glass-card p-4 flex items-center justify-between"
            >
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  tx.type === 'received' 
                    ? 'bg-[#00D9FF]/20' 
                    : 'bg-slate-700/50'
                }`}>
                  {tx.type === 'received' ? (
                    <ArrowDownLeft className="w-5 h-5 text-[#00D9FF]" />
                  ) : (
                    <ArrowUpRight className="w-5 h-5 text-slate-400" />
                  )}
                </div>
                <div>
                  <p className="font-medium text-sm">{tx.description}</p>
                  <p className="text-xs text-slate-400">
                    {tx.status === 'pending' && tx.paid && tx.participants
                      ? `${tx.paid}/${tx.participants} pagaron`
                      : tx.date
                    }
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className={`font-medium text-sm ${tx.type === 'received' ? 'text-[#00D9FF]' : 'text-white'}`}>
                  {tx.type === 'received' ? '+' : '-'}{tx.amount.toLocaleString()} {tx.currency}
                </p>
                <span className={`text-xs px-2 py-0.5 rounded-full ${
                  tx.status === 'completed' 
                    ? 'bg-emerald-500/20 text-emerald-400' 
                    : tx.status === 'pending'
                    ? 'bg-amber-500/20 text-amber-400'
                    : 'bg-red-500/20 text-red-400'
                }`}>
                  {tx.status === 'completed' ? 'Completado' : tx.status === 'pending' ? 'Pendiente' : 'Fallido'}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Bottom Navigation */}
      <BottomNav />
    </div>
  );
}