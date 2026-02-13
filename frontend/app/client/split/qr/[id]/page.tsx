'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { ArrowLeft, Share2, Download, Copy, CheckCircle2, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { QRCodeCanvas } from 'qrcode.react';

interface Participant {
  id: string;
  name: string;
  amount: number;
  paid: boolean;
}

export default async function SplitQRPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const router = useRouter();
  const [copied, setCopied] = useState(false);
  
  // MOCK DATA - En producción vendría del backend
  const split = {
    id: id,
    totalAmount: 5000,
    currency: 'USDC',
    people: 3,
    shareAmount: 1666.67,
    participants: [
      { id: '1', name: 'Tú', amount: 1666.67, paid: true },
      { id: '2', name: 'Participante 2', amount: 1666.67, paid: false },
      { id: '3', name: 'Participante 3', amount: 1666.67, paid: false },
    ] as Participant[],
    qrData: `migo://split/${id}`,
    createdAt: new Date().toISOString(),
  };

  const paidCount = split.participants.filter(p => p.paid).length;
  const totalPaid = split.participants.filter(p => p.paid).reduce((acc, p) => acc + p.amount, 0);

  const copyLink = () => {
    navigator.clipboard.writeText(`https://migo.app/split/${split.id}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const shareLink = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Pago Compartido - Migo',
          text: `Te invito a pagar tu parte: ${split.shareAmount} ${split.currency}`,
          url: `https://migo.app/split/${split.id}`,
        });
      } catch (err) {
        console.log('Error sharing:', err);
      }
    } else {
      copyLink();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 text-white pb-8">
      {/* Header */}
      <div className="px-4 pt-6 pb-4 flex items-center gap-3 border-b border-slate-700/50">
        <button
          onClick={() => router.push('/client/dashboard')}
          className="p-2 rounded-lg hover:bg-slate-700/50 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div className="flex-1">
          <h1 className="text-xl font-bold">Split Generado</h1>
          <p className="text-xs text-slate-400">ID: {split.id}</p>
        </div>
        <button
          onClick={shareLink}
          className="p-2 rounded-lg hover:bg-slate-700/50 transition-colors"
        >
          <Share2 className="w-5 h-5" />
        </button>
      </div>

      <div className="px-4 py-6 space-y-6">
        {/* Progreso */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="glass-card p-6"
        >
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-sm text-slate-400">Total recaudado</p>
              <p className="text-3xl font-bold text-gradient">
                {totalPaid.toFixed(2)} / {split.totalAmount}
              </p>
              <p className="text-xs text-slate-400 mt-1">{split.currency}</p>
            </div>
            <div className="text-right">
              <div className="w-16 h-16 rounded-full bg-slate-800 flex items-center justify-center mb-2">
                <span className="text-2xl font-bold text-[#00D9FF]">
                  {paidCount}/{split.people}
                </span>
              </div>
              <p className="text-xs text-slate-400">pagaron</p>
            </div>
          </div>

          {/* Barra de progreso */}
          <div className="w-full h-2 bg-slate-700 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${(totalPaid / split.totalAmount) * 100}%` }}
              transition={{ duration: 1, ease: 'easeOut' }}
              className="h-full bg-gradient-to-r from-[#00D9FF] to-[#00B8DD]"
            />
          </div>
        </motion.div>

        {/* QR Code */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="glass-card p-8"
        >
          <div className="text-center mb-6">
            <h2 className="text-lg font-semibold mb-1">Compartir QR</h2>
            <p className="text-sm text-slate-400">
              Cada persona escanea para pagar su parte
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl mx-auto w-fit">
            <QRCodeCanvas
              value={split.qrData}
              size={220}
              level="H"
              includeMargin={false}
            />
          </div>

          <div className="mt-6 space-y-2">
            <Button
              onClick={copyLink}
              variant="outline"
              className="w-full border-slate-600 hover:bg-slate-700/50"
            >
              {copied ? (
                <>
                  <CheckCircle2 className="w-4 h-4 mr-2 text-green-400" />
                  ¡Copiado!
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 mr-2" />
                  Copiar Link
                </>
              )}
            </Button>

            <Button
              onClick={shareLink}
              className="w-full bg-gradient-to-r from-[#00D9FF] to-[#00B8DD]"
            >
              <Share2 className="w-4 h-4 mr-2" />
              Compartir
            </Button>
          </div>
        </motion.div>

        {/* Monto por persona */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="glass-card p-4 bg-[#00D9FF]/5 border-[#00D9FF]/20 text-center"
        >
          <p className="text-sm text-slate-400 mb-1">Cada persona paga</p>
          <p className="text-3xl font-bold text-[#00D9FF]">
            {split.shareAmount.toFixed(2)} {split.currency}
          </p>
        </motion.div>

        {/* Lista de Participantes */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-3">
            Participantes
          </h3>
          <div className="space-y-2">
            {split.participants.map((participant, i) => (
              <motion.div
                key={participant.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 + i * 0.05 }}
                className="glass-card p-4 flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    participant.paid 
                      ? 'bg-emerald-500/20 text-emerald-400' 
                      : 'bg-slate-700/50 text-slate-400'
                  }`}>
                    {participant.paid ? (
                      <CheckCircle2 className="w-5 h-5" />
                    ) : (
                      <Clock className="w-5 h-5" />
                    )}
                  </div>
                  <div>
                    <p className="font-medium text-sm">{participant.name}</p>
                    <p className="text-xs text-slate-400">
                      {participant.amount.toFixed(2)} {split.currency}
                    </p>
                  </div>
                </div>
                <span className={`text-xs px-3 py-1 rounded-full ${
                  participant.paid
                    ? 'bg-emerald-500/20 text-emerald-400'
                    : 'bg-amber-500/20 text-amber-400'
                }`}>
                  {participant.paid ? 'Pagado' : 'Pendiente'}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Botón de finalizar */}
        {paidCount === split.people && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="glass-card p-6 bg-emerald-500/10 border-emerald-500/20 text-center"
          >
            <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto mb-3" />
            <h3 className="text-lg font-bold text-emerald-400 mb-2">
              ¡Pago Completo!
            </h3>
            <p className="text-sm text-slate-300 mb-4">
              Todos los participantes han pagado
            </p>
            <Button
              onClick={() => router.push('/client/dashboard')}
              className="w-full bg-emerald-500 hover:bg-emerald-600"
            >
              Volver al Inicio
            </Button>
          </motion.div>
        )}
      </div>
    </div>
  );
}