'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, QrCode, History, Settings } from 'lucide-react';

export function BusinessBottomNav() {
  const pathname = usePathname();

  const navItems = [
    {
      label: 'Dashboard',
      icon: LayoutDashboard,
      href: '/business/dashboard',
      active: pathname === '/business/dashboard'
    },
    {
      label: 'Crear Split',
      icon: QrCode,
      href: '/business/create',
      active: pathname === '/business/create'
    },
    {
      label: 'Historial',
      icon: History,
      href: '/business/history',
      active: pathname === '/business/history'
    },
    {
      label: 'Config',
      icon: Settings,
      href: '/business/settings',
      active: pathname === '/business/settings'
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
                  ? 'text-[#006B7D]'
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