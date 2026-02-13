// Mock data para el dashboard de negocio

export interface BusinessSplit {
  id: string;
  totalAmount: number;
  currency: string;
  people: number;
  shareAmount: number;
  paidCount: number;
  totalPaid: number;
  status: 'pending' | 'partial' | 'completed';
  createdAt: string;
  description: string;
}

export interface ParticipantPayment {
  id: string;
  name: string;
  amount: number;
  currency: string;
  paid: boolean;
  paidAt?: string;
  txHash?: string;
  wallet?: string;
}

export const MOCK_BUSINESS_SPLITS: BusinessSplit[] = [
  {
    id: 'split-001',
    totalAmount: 15000,
    currency: 'USDC',
    people: 5,
    shareAmount: 3000,
    paidCount: 3,
    totalPaid: 9000,
    status: 'partial',
    createdAt: '2026-02-12T10:30:00',
    description: 'Cena corporativa - Equipo Marketing'
  },
  {
    id: 'split-002',
    totalAmount: 5000,
    currency: 'ARS',
    people: 3,
    shareAmount: 1666.67,
    paidCount: 1,
    totalPaid: 1666.67,
    status: 'partial',
    createdAt: '2026-02-12T14:20:00',
    description: 'Split SUBE - Transporte'
  },
  {
    id: 'split-003',
    totalAmount: 8500,
    currency: 'USDC',
    people: 4,
    shareAmount: 2125,
    paidCount: 4,
    totalPaid: 8500,
    status: 'completed',
    createdAt: '2026-02-11T18:45:00',
    description: 'Servicio de catering'
  },
  {
    id: 'split-004',
    totalAmount: 12000,
    currency: 'XLM',
    people: 6,
    shareAmount: 2000,
    paidCount: 0,
    totalPaid: 0,
    status: 'pending',
    createdAt: '2026-02-12T16:00:00',
    description: 'Renta mensual oficina'
  }
];

export const MOCK_SPLIT_DETAILS = {
  'split-001': {
    id: 'split-001',
    totalAmount: 15000,
    currency: 'USDC',
    people: 5,
    shareAmount: 3000,
    description: 'Cena corporativa - Equipo Marketing',
    merchant: 'Restaurant La Parrilla',
    merchantWallet: 'GABC...XYZ123',
    createdAt: '2026-02-12T10:30:00',
    participants: [
      {
        id: 'p1',
        name: 'María González',
        amount: 3000,
        currency: 'USDC',
        paid: true,
        paidAt: '2026-02-12T10:35:00',
        txHash: 'abc123...',
        wallet: 'GDEF...ABC456'
      },
      {
        id: 'p2',
        name: 'Juan Pérez',
        amount: 3000,
        currency: 'USDC',
        paid: true,
        paidAt: '2026-02-12T10:40:00',
        txHash: 'def456...',
        wallet: 'GHIJ...DEF789'
      },
      {
        id: 'p3',
        name: 'Ana Martínez',
        amount: 3000,
        currency: 'USDC',
        paid: true,
        paidAt: '2026-02-12T10:42:00',
        txHash: 'ghi789...',
        wallet: 'GKLM...GHI012'
      },
      {
        id: 'p4',
        name: 'Carlos López',
        amount: 3000,
        currency: 'USDC',
        paid: false
      },
      {
        id: 'p5',
        name: 'Laura Rodríguez',
        amount: 3000,
        currency: 'USDC',
        paid: false
      }
    ] as ParticipantPayment[]
  }
};

export function getSplitDetails(id: string) {
  return MOCK_SPLIT_DETAILS[id as keyof typeof MOCK_SPLIT_DETAILS] || null;
}