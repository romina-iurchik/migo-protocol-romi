'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, QrCode, History } from 'lucide-react';

export function BottomNav() {
  const pathname = usePathname();

  const navItems = [
    {
      label: 'Inicio',
      icon: Home,
      href: '/client/dashboard',
      active: pathname === '/client/dashboard'
    },
    {
      label: 'Dividir',
      icon: QrCode,
      href: '/client/split/create',
      active: pathname === '/client/split/create'
    },
    {
      label: 'Historial',
      icon: History,
      href: '/client/history',
      active: pathname === '/client/history'
    }
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-slate-900/95 backdrop-blur-lg border-t border-slate-700/50 safe-area-bottom z-50">
      <div className="flex items-center justify-around h-16 max-w-2xl mx-auto px-4">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center gap-1 px-4 py-2 rounded-lg transition-all ${
                item.active
                  ? 'text-[#00D9FF]'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Icon className={`w-5 h-5 ${item.active ? 'scale-110' : ''}`} />
              <span className="text-xs font-medium">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}