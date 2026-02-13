'use client';

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Store, User, Sparkles } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-50 flex flex-col items-center justify-center px-6 py-12">
      {/* Logo con animación */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="mb-12"
      >
        <Image
          src="/migo-logo.png"
          alt="Migo - Friends share, Migo cares"
          width={300}
          height={120}
          priority
          className="w-auto h-auto max-w-sm drop-shadow-lg"
        />
      </motion.div>

      {/* Título */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="text-center mb-8"
      >
        <h2 className="text-2xl font-bold text-gray-800 mb-2 flex items-center justify-center gap-2">
          <Sparkles className="w-6 h-6 text-[#FFB800]" />
          ¿Cómo querés usar Migo?
        </h2>
        <p className="text-sm text-gray-600">Elegí tu perfil para comenzar</p>
      </motion.div>

      {/* Selector de vista - Cards con animación */}
      <div className="w-full max-w-2xl grid md:grid-cols-2 gap-6 mb-8">
        {/* Vista Cliente */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <Link href="/client">
            <Card className="glass-card h-full border-2 hover:border-[#00D9FF] hover:shadow-xl transition-all cursor-pointer overflow-hidden group">
              <div className="absolute inset-0 gradient-primary opacity-0 group-hover:opacity-5 transition-opacity" />
              <CardContent className="p-8 flex flex-col items-center text-center h-full justify-center relative">
                <motion.div
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.5 }}
                  className="w-20 h-20 bg-gradient-to-br from-[#00D9FF] to-[#00B8DD] rounded-2xl flex items-center justify-center mb-4 shadow-lg"
                >
                  <User className="w-10 h-10 text-white" />
                </motion.div>
                <h3 className="text-2xl font-bold text-gray-800 mb-2">
                  Soy Cliente
                </h3>
                <p className="text-sm text-gray-600 mb-4">
                  Quiero pagar mi parte de un gasto compartido
                </p>
                <div className="mt-auto">
                  <span className="inline-flex items-center gap-2 px-4 py-2 bg-[#00D9FF] text-white rounded-full text-sm font-medium">
                    Escanear QR →
                  </span>
                </div>
              </CardContent>
            </Card>
          </Link>
        </motion.div>

        {/* Vista Negocio */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <Link href="/business">
            <Card className="glass-card h-full border-2 hover:border-[#006B7D] hover:shadow-xl transition-all cursor-pointer overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-br from-[#006B7D] to-[#005563] opacity-0 group-hover:opacity-5 transition-opacity" />
              <CardContent className="p-8 flex flex-col items-center text-center h-full justify-center relative">
                <motion.div
                  whileHover={{ rotate: -360 }}
                  transition={{ duration: 0.5 }}
                  className="w-20 h-20 bg-gradient-to-br from-[#006B7D] to-[#005563] rounded-2xl flex items-center justify-center mb-4 shadow-lg"
                >
                  <Store className="w-10 h-10 text-white" />
                </motion.div>
                <h3 className="text-2xl font-bold text-gray-800 mb-2">
                  Soy Negocio
                </h3>
                <p className="text-sm text-gray-600 mb-4">
                  Quiero crear y administrar pagos compartidos
                </p>
                <div className="mt-auto">
                  <span className="inline-flex items-center gap-2 px-4 py-2 bg-[#006B7D] text-white rounded-full text-sm font-medium">
                    Administrar →
                  </span>
                </div>
              </CardContent>
            </Card>
          </Link>
        </motion.div>
      </div>

      {/* Footer con animación */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="text-center"
      >
        <p className="text-xs text-gray-400 mb-2">
          Crypto o tradicional - tú eliges
        </p>
        <p className="text-xs text-gray-500">
          Powered by Stellar · Soroban Smart Contracts
        </p>
      </motion.div>
    </div>
  );
}