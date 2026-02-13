'use client';

import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { Plus, TrendingUp, Clock, CheckCircle2, Users, DollarSign } from 'lucide-react';
import { BusinessBottomNav } from '@/components/business/bottom-nav';
import { Button } from '@/components/ui/button';
import { MOCK_BUSINESS_SPLITS } from '@/lib/mock-business-data';

export default function BusinessDashboard() {
  const router = useRouter();

  // Calcular estadísticas
  const activeSplits = MOCK_BUSINESS_SPLITS.filter(s => s.status !== 'completed');
  const totalPending = activeSplits.reduce((acc, s) => acc + (s.totalAmount - s.totalPaid), 0);
  const totalCollected = MOCK_BUSINESS_SPLITS.reduce((acc, s) => acc + s.totalPaid, 0);
  const completedSplits = MOCK_BUSINESS_SPLITS.filter(s => s.status === 'completed').length;

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 text-white pb-24">
      {/* Header */}
      <div className="px-4 pt-6 pb-4">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold">Dashboard</h1>
            <p className="text-sm text-slate-400">Vista de Negocio</p>
          </div>
          <button className="p-2 rounded-lg hover:bg-slate-700/50 transition-colors">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-card p-4"
            style={{ background: 'rgba(0, 107, 125, 0.1)' }}
          >
            <div className="flex items-center gap-2 mb-2">
              <DollarSign className="w-4 h-4 text-[#006B7D]" />
              <span className="text-xs text-slate-400">Por cobrar</span>
            </div>
            <p className="text-2xl font-bold text-[#006B7D]">
              ${totalPending.toLocaleString()}
            </p>
            <p className="text-xs text-slate-500 mt-1">{activeSplits.length} splits activos</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="glass-card p-4"
            style={{ background: 'rgba(16, 185, 129, 0.1)' }}
          >
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="w-4 h-4 text-emerald-400" />
              <span className="text-xs text-slate-400">Recaudado</span>
            </div>
            <p className="text-2xl font-bold text-emerald-400">
              ${totalCollected.toLocaleString()}
            </p>
            <p className="text-xs text-slate-500 mt-1">{completedSplits} completados</p>
          </motion.div>
        </div>

        {/* Crear Nuevo Split */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Button
            onClick={() => router.push('/business/create')}
            className="w-full h-14 bg-gradient-to-r from-[#006B7D] to-[#005563] hover:opacity-90 text-white shadow-lg"
          >
            <Plus className="w-5 h-5 mr-2" />
            Crear Nuevo Split
          </Button>
        </motion.div>
      </div>

      {/* Splits Activos */}
      <div className="px-4 mb-6">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-sm font-semibold text-slate-400 uppercase tracking-wider">
            Splits Activos
          </h2>
          <span className="text-xs text-slate-500">{activeSplits.length} activos</span>
        </div>

        <div className="space-y-3">
          {activeSplits.length === 0 ? (
            <div className="glass-card p-8 text-center">
              <Clock className="w-12 h-12 text-slate-600 mx-auto mb-3" />
              <p className="text-slate-400 text-sm">No hay splits activos</p>
              <p className="text-slate-500 text-xs mt-1">Crea uno para empezar a cobrar</p>
            </div>
          ) : (
            activeSplits.map((split, i) => (
              <motion.div
                key={split.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                onClick={() => router.push(`/business/split/${split.id}`)}
                className="glass-card p-4 hover:border-[#006B7D]/50 transition-all cursor-pointer"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <h3 className="font-semibold text-sm mb-1">{split.description}</h3>
                    <p className="text-xs text-slate-400">ID: {split.id}</p>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    split.status === 'partial'
                      ? 'bg-amber-500/20 text-amber-400'
                      : 'bg-slate-700 text-slate-400'
                  }`}>
                    {split.paidCount}/{split.people} pagaron
                  </span>
                </div>

                <div className="flex items-center justify-between mb-2">
                  <div>
                    <p className="text-xs text-slate-400">Recaudado</p>
                    <p className="text-lg font-bold text-[#006B7D]">
                      ${split.totalPaid.toLocaleString()} {split.currency}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-slate-400">Total</p>
                    <p className="text-sm font-medium text-slate-300">
                      ${split.totalAmount.toLocaleString()} {split.currency}
                    </p>
                  </div>
                </div>

                {/* Progress bar */}
                <div className="w-full h-1.5 bg-slate-700 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-[#006B7D] to-[#00D9FF] transition-all duration-500"
                    style={{ width: `${(split.totalPaid / split.totalAmount) * 100}%` }}
                  />
                </div>
              </motion.div>
            ))
          )}
        </div>
      </div>

      {/* Completados Recientes */}
      <div className="px-4 mb-6">
        <h2 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-3">
          Completados Recientemente
        </h2>

        <div className="space-y-2">
          {MOCK_BUSINESS_SPLITS.filter(s => s.status === 'completed').map((split, i) => (
            <motion.div
              key={split.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 + i * 0.05 }}
              onClick={() => router.push(`/business/split/${split.id}`)}
              className="glass-card p-4 flex items-center justify-between hover:border-slate-600/50 transition-colors cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-emerald-500/20 flex items-center justify-center">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                </div>
                <div>
                  <p className="font-medium text-sm">{split.description}</p>
                  <p className="text-xs text-slate-400">
                    {new Date(split.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-bold text-sm text-emerald-400">
                  ${split.totalAmount.toLocaleString()}
                </p>
                <p className="text-xs text-slate-400">{split.currency}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Bottom Navigation */}
      <BusinessBottomNav />
    </div>
  );
}