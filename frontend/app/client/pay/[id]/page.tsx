'use client';

import { useRouter } from 'next/navigation';
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle2 } from "lucide-react";

export default function ClientPayPage({ params }: { params: { id: string } }) {
  const router = useRouter();

  // MOCK DATA
  const split = {
    id: params.id,
    myShare: 1667,
    currency: 'ARS',
    description: 'Cena con amigos',
  };

  const handlePay = () => {
    // Simular pago exitoso
    setTimeout(() => {
      router.push('/client/success');
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center px-6">
      {/* Back button */}
      <div className="w-full max-w-md mb-6">
        <Link href="/client/scan" className="text-sm text-gray-600 hover:text-gray-800 flex items-center gap-1">
          ← Volver
        </Link>
      </div>

      {/* Monto a pagar - Destacado */}
      <Card className="w-full max-w-md mb-6 bg-gradient-to-r from-[#00D9FF]/10 to-[#006B7D]/10 border-[#00D9FF]">
        <CardContent className="p-8 text-center">
          <p className="text-sm text-gray-600 mb-2">Tu parte es:</p>
          <p className="text-5xl font-bold text-[#006B7D] mb-1">
            ${split.myShare.toLocaleString()}
          </p>
          <p className="text-lg text-gray-500">{split.currency}</p>
          <p className="text-sm text-gray-500 mt-4">{split.description}</p>
        </CardContent>
      </Card>

      {/* Botón de pago simple */}
      <div className="w-full max-w-md space-y-3">
        <Button 
          onClick={handlePay}
          className="w-full h-16 bg-[#00D9FF] hover:bg-[#00B8DD] text-white text-xl font-semibold shadow-lg"
        >
          <CheckCircle2 className="w-6 h-6 mr-3" />
          Pagar Ahora
        </Button>

        <p className="text-xs text-center text-gray-500">
          Al confirmar, se abrirán las opciones de pago disponibles
        </p>
      </div>

      {/* Info del split */}
      <Card className="w-full max-w-md mt-8 bg-blue-50 border-blue-200">
        <CardContent className="p-4">
          <p className="text-xs text-blue-900">
            💡 Split ID: <span className="font-mono">{split.id}</span>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}