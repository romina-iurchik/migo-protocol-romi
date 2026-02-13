import Link from "next/link";
import { Button } from "@/components/ui/button";
import { CheckCircle2 } from "lucide-react";

export default function ClientSuccessPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white flex flex-col items-center justify-center px-6">
      {/* Animación éxito */}
      <div className="mb-8">
        <div className="w-32 h-32 bg-green-100 rounded-full flex items-center justify-center animate-bounce">
          <CheckCircle2 className="w-20 h-20 text-green-600" />
        </div>
      </div>

      {/* Mensaje */}
      <h1 className="text-4xl font-bold text-gray-800 mb-4">
        ¡Listo!
      </h1>
      <p className="text-lg text-gray-600 text-center mb-12 max-w-md">
        Tu pago fue procesado correctamente
      </p>

      {/* Botón volver */}
      <Link href="/client" className="w-full max-w-xs">
        <Button className="w-full bg-[#00D9FF] hover:bg-[#00B8DD] h-14 text-lg">
          Hacer otro Pago
        </Button>
      </Link>

      <p className="text-xs text-gray-400 mt-8">
        Gracias por usar Migo
      </p>
    </div>
  );
}