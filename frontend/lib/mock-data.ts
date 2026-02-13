// Mock data para el dashboard del cliente

export interface Asset {
  symbol: string;
  name: string;
  icon: string;
  balance: number;
  rate: number; // Tasa de conversión a USD
}

export interface Transaction {
  id: string;
  description: string;
  amount: number;
  currency: string;
  type: 'received' | 'sent';
  status: 'completed' | 'pending' | 'failed';
  date: string;
  paid?: number;
  participants?: number;
}

export const MOCK_ASSETS: Asset[] = [
  {
    symbol: 'XLM',
    name: 'Stellar Lumens',
    icon: '💎',
    balance: 2450.5,
    rate: 0.0855 // ~$0.0855 por XLM
  },
  {
    symbol: 'USDC',
    name: 'USDC',
    icon: '💵',
    balance: 1200,
    rate: 1.0 // $1 por USDC
  },
  {
    symbol: 'ARS',
    name: 'Argentine Peso',
    icon: '🇦🇷',
    balance: 850000,
    rate: 0.00085 // ~$0.00085 por ARS
  },
  {
    symbol: 'BTC',
    name: 'Bitcoin',
    icon: '₿',
    balance: 0.026,
    rate: 64900 // ~$64,900 por BTC
  },
  {
    symbol: 'ETH',
    name: 'Ethereum',
    icon: 'Ξ',
    balance: 0.8,
    rate: 3200 // ~$3,200 por ETH
  }
];

export const MOCK_TRANSACTIONS: Transaction[] = [
  {
    id: '1',
    description: 'Cena en La Parrilla',
    amount: 45000,
    currency: 'ARS',
    type: 'received',
    status: 'completed',
    date: '2026-02-12',
    paid: 3,
    participants: 3
  },
  {
    id: '2',
    description: 'Uber compartido',
    amount: 12.6,
    currency: 'USDC',
    type: 'sent',
    status: 'completed',
    date: '2026-02-11'
  },
  {
    id: '3',
    description: 'Café Specialty',
    amount: 8500,
    currency: 'ARS',
    type: 'sent',
    status: 'completed',
    date: '2026-02-10'
  },
  {
    id: '4',
    description: 'Split SUBE',
    amount: 1500,
    currency: 'ARS',
    type: 'sent',
    status: 'pending',
    date: '2026-02-09',
    paid: 2,
    participants: 4
  },
  {
    id: '5',
    description: 'Supermercado',
    amount: 25.5,
    currency: 'USDC',
    type: 'sent',
    status: 'completed',
    date: '2026-02-08'
  }
];