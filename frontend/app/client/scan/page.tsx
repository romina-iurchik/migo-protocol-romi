'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { QrCode, ArrowRight } from "lucide-react";

export default function ScanPage() {
  const router = useRouter();
  const [code, setCode] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simular que encontró el split
    router.push(`/client/pay/demo-123`);
  };

  const handleScanQR = () => {
    // En producción, abriría la cámara
    // Por ahora, simular que escaneó
    router.push(`/client/pay/demo-123`);
  };

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center px-6">
      {/* Back button */}
      <div className="w-full max-w-md mb-6">
        <Link href="/client" className="text-sm text-gray-600 hover:text-gray-800 flex items-center gap-1">
          ← Volver
        </Link>
      </div>

      <h1 className="text-2xl font-bold text-gray-800 mb-8">
        Pagar mi Parte
      </h1>

      <div className="w-full max-w-md space-y-6">
        {/* Opción 1: Escanear QR */}
        <Card className="border-2 border-[#00D9FF]">
          <CardContent className="p-6">
            <div className="text-center">
              <div className="w-32 h-32 bg-[#00D9FF]/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <QrCode className="w-20 h-20 text-[#00D9FF]" />
              </div>
              <h3 className="font-semibold mb-2">Escanear QR</h3>
              <p className="text-sm text-gray-600 mb-4">
                Usá la cámara de tu dispositivo
              </p>
              <Button 
                onClick={handleScanQR}
                className="w-full bg-[#00D9FF] hover:bg-[#00B8DD]"
              >
                Abrir Cámara
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Divisor */}
        <div className="flex items-center gap-4">
          <div className="flex-1 h-px bg-gray-300"></div>
          <span className="text-sm text-gray-500">O</span>
          <div className="flex-1 h-px bg-gray-300"></div>
        </div>

        {/* Opción 2: Ingresar código */}
        <form onSubmit={handleSubmit}>
          <Card className="border-2">
            <CardContent className="p-6">
              <h3 className="font-semibold mb-4">Ingresar Código</h3>
              <div className="flex gap-2">
                <Input
                  type="text"
                  placeholder="Ej: ABC-123-XYZ"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  className="flex-1 h-12 text-center text-lg tracking-wider uppercase"
                  required
                />
                <Button type="submit" size="icon" className="h-12 w-12 bg-[#006B7D]">
                  <ArrowRight className="w-5 h-5" />
                </Button>
              </div>
              <p className="text-xs text-gray-500 mt-2 text-center">
                Ingresá el código que te compartieron
              </p>
            </CardContent>
          </Card>
        </form>
      </div>
    </div>
  );
}