'use client';

import { use, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { ArrowLeft, Share2, Download, Copy, CheckCircle2, Clock, Users, QrCode, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { QRCodeCanvas } from 'qrcode.react';
import { getSplitDetails } from '@/lib/mock-business-data';

export default function BusinessSplitDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const router = useRouter();
  const [copied, setCopied] = useState(false);
  const [selectedParticipant, setSelectedParticipant] = useState<string | null>(null);

  // Obtener datos del split
  const splitData = getSplitDetails(resolvedParams.id);

  // Si no existe, mostrar datos de ejemplo
  const split = splitData || {
    id: resolvedParams.id,
    totalAmount: 5000,
    currency: 'USDC',
    people: 3,
    shareAmount: 1666.67,
    description: 'Split de ejemplo',
    merchant: 'Mi Negocio',
    merchantWallet: 'GABC...XYZ123',
    createdAt: new Date().toISOString(),
    participants: [
      { id: 'p1', name: 'Participante 1', amount: 1666.67, currency: 'USDC', paid: false },
      { id: 'p2', name: 'Participante 2', amount: 1666.67, currency: 'USDC', paid: false },
      { id: 'p3', name: 'Participante 3', amount: 1666.67, currency: 'USDC', paid: false },
    ]
  };

  const paidCount = split.participants.filter(p => p.paid).length;
  const totalPaid = split.participants.filter(p => p.paid).reduce((acc, p) => acc + p.amount, 0);
  const isCompleted = paidCount === split.people;

  const copyLink = (participantId?: string) => {
    const link = participantId 
      ? `https://migo.app/pay/${split.id}/${participantId}`
      : `https://migo.app/pay/${split.id}`;
    
    navigator.clipboard.writeText(link);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const shareLink = async (participantId?: string) => {
    const link = participantId 
      ? `https://migo.app/pay/${split.id}/${participantId}`
      : `https://migo.app/pay/${split.id}`;

    if (navigator.share) {
      try {
        await navigator.share({
          title: `Pago Compartido - ${split.description}`,
          text: `Pagar tu parte: ${split.shareAmount} ${split.currency}`,
          url: link,
        });
      } catch (err) {
        console.log('Error sharing:', err);
      }
    } else {
      copyLink(participantId);
    }
  };

  const downloadQR = () => {
    const canvas = document.querySelector('canvas');
    if (canvas) {
      const url = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.download = `migo-qr-${split.id}.png`;
      link.href = url;
      link.click();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 text-white pb-8">
      {/* Header */}
      <div className="px-4 pt-6 pb-4 border-b border-slate-700/50 sticky top-0 bg-slate-900/95 backdrop-blur-lg z-40">
        <div className="flex items-center gap-3">
          <button
            onClick={() => router.push('/business/dashboard')}
            className="p-2 rounded-lg hover:bg-slate-700/50 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div className="flex-1">
            <h1 className="text-xl font-bold">{split.description}</h1>
            <p className="text-xs text-slate-400">ID: {split.id}</p>
          </div>
          <button
            onClick={() => shareLink()}
            className="p-2 rounded-lg hover:bg-slate-700/50 transition-colors"
          >
            <Share2 className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="px-4 py-6 space-y-6">
        {/* Status Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className={`glass-card p-6 ${
            isCompleted 
              ? 'bg-emerald-500/10 border-emerald-500/30' 
              : 'bg-[#006B7D]/10 border-[#006B7D]/30'
          }`}
        >
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-sm text-slate-400 mb-1">Total recaudado</p>
              <p className="text-4xl font-bold text-gradient">
                ${totalPaid.toFixed(2)}
              </p>
              <p className="text-sm text-slate-400 mt-1">
                de ${split.totalAmount.toLocaleString()} {split.currency}
              </p>
            </div>
            <div className="text-center">
              <div className={`w-20 h-20 rounded-full flex items-center justify-center mb-2 ${
                isCompleted ? 'bg-emerald-500/20' : 'bg-[#006B7D]/20'
              }`}>
                {isCompleted ? (
                  <CheckCircle2 className="w-10 h-10 text-emerald-400" />
                ) : (
                  <span className="text-2xl font-bold text-[#006B7D]">
                    {paidCount}/{split.people}
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-400">
                {isCompleted ? 'Completado' : 'Pagaron'}
              </p>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="w-full h-3 bg-slate-700 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${(totalPaid / split.totalAmount) * 100}%` }}
              transition={{ duration: 1, ease: 'easeOut' }}
              className={`h-full ${
                isCompleted 
                  ? 'bg-gradient-to-r from-emerald-400 to-emerald-500' 
                  : 'bg-gradient-to-r from-[#006B7D] to-[#00D9FF]'
              }`}
            />
          </div>

          {/* Merchant Info */}
          <div className="mt-4 pt-4 border-t border-slate-700/50">
            <p className="text-xs text-slate-500">Merchant:</p>
            <p className="text-sm font-medium text-slate-300">{split.merchant}</p>
            <p className="text-xs text-slate-500 font-mono mt-1">{split.merchantWallet}</p>
          </div>
        </motion.div>

        {/* QR Principal */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="glass-card p-6"
        >
          <div className="flex items-center gap-2 mb-4">
            <QrCode className="w-5 h-5 text-[#006B7D]" />
            <h2 className="text-lg font-semibold">QR Principal</h2>
          </div>
          
          <p className="text-sm text-slate-400 mb-4">
            Compartí este QR para que todos puedan acceder al split
          </p>

          <div className="bg-white p-6 rounded-2xl mx-auto w-fit mb-4">
            <QRCodeCanvas
              value={`migo://split/${split.id}`}
              size={200}
              level="H"
              includeMargin={false}
            />
          </div>

          <div className="grid grid-cols-3 gap-2">
            <Button
              onClick={() => copyLink()}
              variant="outline"
              className="border-slate-600 hover:bg-slate-700/50 text-xs"
              size="sm"
            >
              <Copy className="w-3 h-3 mr-1" />
              {copied ? '¡Copiado!' : 'Copiar'}
            </Button>
            <Button
              onClick={() => shareLink()}
              className="bg-[#006B7D] hover:bg-[#005563] text-xs"
              size="sm"
            >
              <Share2 className="w-3 h-3 mr-1" />
              Compartir
            </Button>
            <Button
              onClick={downloadQR}
              variant="outline"
              className="border-slate-600 hover:bg-slate-700/50 text-xs"
              size="sm"
            >
              <Download className="w-3 h-3 mr-1" />
              Guardar
            </Button>
          </div>
        </motion.div>

        {/* Monto por persona */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="glass-card p-4 bg-[#006B7D]/5 border-[#006B7D]/20 text-center"
        >
          <p className="text-sm text-slate-400 mb-1">Cada persona paga</p>
          <p className="text-3xl font-bold text-[#006B7D]">
            {split.shareAmount.toFixed(2)} {split.currency}
          </p>
        </motion.div>

        {/* Participantes */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="flex items-center gap-2 mb-4">
            <Users className="w-5 h-5 text-slate-400" />
            <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider">
              Participantes ({split.people})
            </h3>
          </div>

          <div className="space-y-3">
            {split.participants.map((participant, i) => (
              <motion.div
                key={participant.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 + i * 0.05 }}
                className="glass-card overflow-hidden"
              >
                {/* Participant Header */}
                <div 
                  className="p-4 cursor-pointer hover:bg-slate-800/30 transition-colors"
                  onClick={() => setSelectedParticipant(
                    selectedParticipant === participant.id ? null : participant.id
                  )}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        participant.paid 
                          ? 'bg-emerald-500/20 text-emerald-400' 
                          : 'bg-amber-500/20 text-amber-400'
                      }`}>
                        {participant.paid ? (
                          <CheckCircle2 className="w-5 h-5" />
                        ) : (
                          <Clock className="w-5 h-5" />
                        )}
                      </div>
                      <div>
                        <p className="font-semibold text-sm">{participant.name}</p>
                        <p className="text-xs text-slate-400">
                          {participant.amount.toFixed(2)} {participant.currency}
                        </p>
                        {participant.paid && participant.paidAt && (
                          <p className="text-xs text-emerald-400 mt-1">
                            Pagado: {new Date(participant.paidAt).toLocaleTimeString()}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="text-right">
                      <span className={`inline-block text-xs px-3 py-1 rounded-full ${
                        participant.paid
                          ? 'bg-emerald-500/20 text-emerald-400'
                          : 'bg-amber-500/20 text-amber-400'
                      }`}>
                        {participant.paid ? '✓ Pagado' : 'Pendiente'}
                      </span>
                      {participant.txHash && (
                        <p className="text-xs text-slate-500 mt-1 font-mono">
                          {participant.txHash.substring(0, 8)}...
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                {/* QR Individual (Expandible) */}
                {selectedParticipant === participant.id && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="border-t border-slate-700/50 p-4 bg-slate-800/30"
                  >
                    <p className="text-xs text-slate-400 mb-3 text-center">
                      QR individual para {participant.name}
                    </p>
                    <div className="bg-white p-4 rounded-xl mx-auto w-fit mb-3">
                      <QRCodeCanvas
                        value={`migo://pay/${split.id}/${participant.id}`}
                        size={150}
                        level="H"
                        includeMargin={false}
                      />
                    </div>
                    <div className="flex gap-2">
                      <Button
                        onClick={() => copyLink(participant.id)}
                        variant="outline"
                        className="flex-1 border-slate-600 hover:bg-slate-700/50 text-xs"
                        size="sm"
                      >
                        <Copy className="w-3 h-3 mr-1" />
                        Copiar Link
                      </Button>
                      <Button
                        onClick={() => shareLink(participant.id)}
                        className="flex-1 bg-[#006B7D] hover:bg-[#005563] text-xs"
                        size="sm"
                      >
                        <Share2 className="w-3 h-3 mr-1" />
                        Enviar
                      </Button>
                    </div>
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Completado */}
        {isCompleted && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="glass-card p-6 bg-emerald-500/10 border-emerald-500/20 text-center"
          >
            <CheckCircle2 className="w-16 h-16 text-emerald-400 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-emerald-400 mb-2">
              ¡Split Completado!
            </h3>
            <p className="text-sm text-slate-300 mb-4">
              Todos los participantes han pagado su parte
            </p>
            <div className="flex gap-3">
              <Button
                onClick={() => router.push('/business/dashboard')}
                className="flex-1 bg-emerald-500 hover:bg-emerald-600"
              >
                Volver al Dashboard
              </Button>
              <Button
                variant="outline"
                className="flex-1 border-emerald-500 text-emerald-400 hover:bg-emerald-500/10"
              >
                <ExternalLink className="w-4 h-4 mr-2" />
                Ver en Stellar
              </Button>
            </div>
          </motion.div>
        )}

        {/* Info adicional */}
        <div className="glass-card p-4 text-xs text-slate-500 space-y-2">
          <p>
            <strong>Creado:</strong> {new Date(split.createdAt).toLocaleString()}
          </p>
          <p>
            <strong>Split ID:</strong> {split.id}
          </p>
          <p>
            <strong>Network:</strong> Stellar Testnet
          </p>
        </div>
      </div>
    </div>
  );
}