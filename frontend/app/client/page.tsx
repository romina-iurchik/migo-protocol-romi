'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function ClientPage() {
  const router = useRouter();

  useEffect(() => {
    // Redirigir automáticamente al dashboard
    router.push('/client/dashboard');
  }, [router]);

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center">
      <div className="text-white">Redirigiendo...</div>
    </div>
  );
}