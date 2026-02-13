'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowUpRight, ArrowDownLeft, Filter } from 'lucide-react';
import { BottomNav } from '@/components/client/bottom-nav';
import { MOCK_TRANSACTIONS } from '@/lib/mock-data';

export default function HistoryPage() {
  const router = useRouter();
  const [filter, setFilter] = useState<'all' | 'sent' | 'received'>('all');

  const filteredTransactions = MOCK_TRANSACTIONS.filter(tx => {
    if (filter === 'all') return true;
    return tx.type === filter;
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 text-white pb-24">
      {/* Header */}
      <div className="px-4 pt-6 pb-4 border-b border-slate-700/50">
        <div className="flex items-center gap-3 mb-4">
          <button
            onClick={() => router.back()}
            className="p-2 rounded-lg hover:bg-slate-700/50 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="text-xl font-bold">Historial</h1>
        </div>

        {/* Filtros */}
        <div className="flex gap-2">
          <button
            onClick={() => setFilter('all')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              filter === 'all'
                ? 'bg-[#00D9FF] text-white'
                : 'bg-slate-800/50 text-slate-400 hover:bg-slate-700/50'
            }`}
          >
            Todas
          </button>
          <button
            onClick={() => setFilter('received')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              filter === 'received'
                ? 'bg-[#00D9FF] text-white'
                : 'bg-slate-800/50 text-slate-400 hover:bg-slate-700/50'
            }`}
          >
            Recibidas
          </button>
          <button
            onClick={() => setFilter('sent')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              filter === 'sent'
                ? 'bg-[#00D9FF] text-white'
                : 'bg-slate-800/50 text-slate-400 hover:bg-slate-700/50'
            }`}
          >
            Enviadas
          </button>
        </div>
      </div>

      {/* Lista de Transacciones */}
      <div className="px-4 py-6 space-y-2">
        {filteredTransactions.length === 0 ? (
          <div className="text-center py-12">
            <Filter className="w-12 h-12 text-slate-600 mx-auto mb-3" />
            <p className="text-slate-400">No hay transacciones {filter === 'sent' ? 'enviadas' : filter === 'received' ? 'recibidas' : ''}</p>
          </div>
        ) : (
          filteredTransactions.map((tx, i) => (
            <motion.div
              key={tx.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.05 }}
              className="glass-card p-4 flex items-center justify-between hover:border-slate-600/50 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                  tx.type === 'received' 
                    ? 'bg-[#00D9FF]/20' 
                    : 'bg-slate-700/50'
                }`}>
                  {tx.type === 'received' ? (
                    <ArrowDownLeft className="w-6 h-6 text-[#00D9FF]" />
                  ) : (
                    <ArrowUpRight className="w-6 h-6 text-slate-400" />
                  )}
                </div>
                <div>
                  <p className="font-semibold text-sm">{tx.description}</p>
                  <p className="text-xs text-slate-400">{tx.date}</p>
                  {tx.status === 'pending' && tx.paid && tx.participants && (
                    <p className="text-xs text-amber-400 mt-1">
                      {tx.paid}/{tx.participants} pagaron
                    </p>
                  )}
                </div>
              </div>
              <div className="text-right">
                <p className={`font-bold text-base ${tx.type === 'received' ? 'text-[#00D9FF]' : 'text-white'}`}>
                  {tx.type === 'received' ? '+' : '-'}{tx.amount.toLocaleString()} {tx.currency}
                </p>
                <span className={`inline-block text-xs px-2 py-1 rounded-full mt-1 ${
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
          ))
        )}
      </div>

      {/* Bottom Navigation */}
      <BottomNav />
    </div>
  );
}