'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { ArrowLeft, Minus, Plus } from 'lucide-react';
import { BottomNav } from '@/components/client/bottom-nav';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const CURRENCIES = [
  { code: 'XLM', name: 'Stellar Lumens', color: 'from-blue-500 to-blue-600' },
  { code: 'USDC', name: 'USD Coin', color: 'from-[#00D9FF] to-[#00B8DD]' },
  { code: 'ARS', name: 'Pesos Argentinos', color: 'from-slate-600 to-slate-700' },
  { code: 'BTC', name: 'Bitcoin', color: 'from-orange-500 to-orange-600' },
  { code: 'ETH', name: 'Ethereum', color: 'from-purple-500 to-purple-600' },
];

export default function CreateSplitPage() {
  const router = useRouter();
  const [amount, setAmount] = useState('');
  const [selectedCurrency, setSelectedCurrency] = useState('USDC');
  const [people, setPeople] = useState(2);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!amount || parseFloat(amount) <= 0) {
      alert('Ingresa un monto válido');
      return;
    }

    // Simular generación de QR
    // Generar ID único simple
    const splitId = `split-${Date.now()}`;
    router.push(`/client/split/qr/${splitId}`);
  };

  const incrementPeople = () => {
    if (people < 10) setPeople(people + 1);
  };

  const decrementPeople = () => {
    if (people > 2) setPeople(people - 1);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 text-white pb-24">
      {/* Header */}
      <div className="px-4 pt-6 pb-4 flex items-center gap-3 border-b border-slate-700/50">
        <button
          onClick={() => router.back()}
          className="p-2 rounded-lg hover:bg-slate-700/50 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h1 className="text-xl font-bold">Dividir Pago</h1>
      </div>

      <form onSubmit={handleSubmit} className="px-4 py-6 space-y-6">
        {/* Monto Total */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-3"
        >
          <label className="text-sm font-medium text-slate-400 block">
            Monto total
          </label>
          <div className="relative">
            <Input
              type="number"
              placeholder="0"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="h-16 text-3xl font-bold bg-slate-800/50 border-slate-700 focus:border-[#00D9FF] text-white placeholder:text-slate-600 pr-20"
              step="0.01"
              required
            />
            <div className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 text-sm font-medium">
              {selectedCurrency}
            </div>
          </div>
        </motion.div>

        {/* Selector de Moneda */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="space-y-3"
        >
          <label className="text-sm font-medium text-slate-400 block">
            Moneda
          </label>
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
            {CURRENCIES.map((currency) => (
              <button
                key={currency.code}
                type="button"
                onClick={() => setSelectedCurrency(currency.code)}
                className={`
                  flex-shrink-0 px-5 py-3 rounded-xl font-semibold text-sm transition-all
                  ${selectedCurrency === currency.code
                    ? `bg-gradient-to-r ${currency.color} text-white scale-105 shadow-lg`
                    : 'bg-slate-800/50 text-slate-400 hover:bg-slate-700/50'
                  }
                `}
              >
                {currency.code}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Cantidad de Personas */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="space-y-3"
        >
          <label className="text-sm font-medium text-slate-400 flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            Cantidad de personas
          </label>
          <div className="glass-card p-6 flex items-center justify-center gap-8">
            <motion.button
              whileTap={{ scale: 0.9 }}
              type="button"
              onClick={decrementPeople}
              disabled={people <= 2}
              className={`
                w-12 h-12 rounded-full flex items-center justify-center transition-all
                ${people <= 2
                  ? 'bg-slate-800/50 text-slate-600 cursor-not-allowed'
                  : 'bg-slate-700 text-white hover:bg-slate-600 active:scale-95'
                }
              `}
            >
              <Minus className="w-5 h-5" />
            </motion.button>

            <div className="text-center min-w-[80px]">
              <motion.div
                key={people}
                initial={{ scale: 1.2, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="text-5xl font-bold text-gradient"
              >
                {people}
              </motion.div>
              <p className="text-xs text-slate-400 mt-1">personas</p>
            </div>

            <motion.button
              whileTap={{ scale: 0.9 }}
              type="button"
              onClick={incrementPeople}
              disabled={people >= 10}
              className={`
                w-12 h-12 rounded-full flex items-center justify-center transition-all
                ${people >= 10
                  ? 'bg-slate-800/50 text-slate-600 cursor-not-allowed'
                  : 'bg-gradient-to-r from-[#00D9FF] to-[#00B8DD] text-white hover:opacity-90 active:scale-95 shadow-lg shadow-[#00D9FF]/20'
                }
              `}
            >
              <Plus className="w-5 h-5" />
            </motion.button>
          </div>
        </motion.div>

        {/* Resumen */}
        {amount && parseFloat(amount) > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-card p-4 bg-[#00D9FF]/5 border-[#00D9FF]/20"
          >
            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-400">Cada persona paga:</span>
              <span className="text-xl font-bold text-[#00D9FF]">
                {(parseFloat(amount) / people).toFixed(2)} {selectedCurrency}
              </span>
            </div>
          </motion.div>
        )}

        {/* Botón Generar QR */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="pt-4"
        >
          <Button
            type="submit"
            className="w-full h-14 text-lg font-semibold bg-gradient-to-r from-[#00D9FF] to-[#00B8DD] hover:opacity-90 text-white shadow-lg shadow-[#00D9FF]/20"
          >
            Generar QR →
          </Button>
        </motion.div>

        {/* Info adicional */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-center"
        >
          <p className="text-xs text-slate-500">
            Se generará un QR único para cada participante
          </p>
        </motion.div>
      </form>

      {/* Bottom Navigation */}
      <BottomNav />
    </div>
  );
}