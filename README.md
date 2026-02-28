# migo-protocol

Infraestructura de pagos divididos sobre Stellar. Un solo QR interoperable — cada persona paga con su wallet y moneda, el negocio recibe siempre su moneda configurada.

Construido en el **ImpactaBootcamp** por Beverly, Araceli, Tamara y Romina.

---

## ¿Qué problema resuelve?

Dividir una cuenta en 2026 sigue siendo un caos:
- Cada uno usa una app distinta
- No todos tienen la misma moneda
- El comercio no quiere integrar 5 sistemas distintos
- Los pagos grupales son fricción pura

Migo resuelve esto con una sola capa de orquestación.

---

## Cómo funciona

```
Negocio genera QR → cada persona escanea con su wallet
       ↓
Migo recibe pagos en XLM, ARS, USDC, tarjeta...
       ↓
Convierte todo al settlementAsset del negocio
       ↓
Settlement automático on-chain via Stellar
       ↓
Negocio recibe siempre su moneda configurada
```

---

## Demo en vivo

Transacción real en Stellar testnet:
[aef8601e08f9961ec4e0d3981c62c208bc93c73661aaac2d98c49fdd06af9313](https://stellar.expert/explorer/testnet/tx/aef8601e08f9961ec4e0d3981c62c208bc93c73661aaac2d98c49fdd06af9313)

---

## Stack técnico

| Capa | Tecnología |
|------|-----------|
| Frontend | Next.js 16 + React 19 + Framer Motion |
| Backend | Express + TypeScript |
| Blockchain | Stellar SDK + Horizon Testnet |
| Wallets | Freighter, xBull, Albedo, LOBSTR |
| Pagos fiat | MercadoPago, Pomelo |
| Escrow | Trustless Work (Soroban) — próximo paso |
| Estado | In-memory (→ PostgreSQL) |

---

## Estructura del proyecto

```
migo-project/
├── api/                          # Backend Express + TypeScript
│   ├── src/
│   │   ├── controllers/          # splits, payments, qr
│   │   ├── services/             # splits, payment, stellar, conversion, webhook
│   │   ├── types/                # split, payment, asset, payment-intent
│   │   └── routes/
│   └── .env                      # variables de entorno (no se commitea)
│
└── frontend/                     # Next.js
    ├── app/
    │   ├── pos/                  # Pantalla del negocio — genera QR
    │   ├── pay/[id]/             # Pantalla del pagador — elige wallet y moneda
    │   └── pay/[id]/success/     # Confirmación con link a Stellar Expert
    └── lib/
        ├── api.ts                # Cliente HTTP para el backend
        └── wallets.ts            # Integración Freighter, xBull, Albedo, LOBSTR
```

---

## Correr el proyecto

**Requisitos:** Node.js 18+, npm

```bash
# Clonar
git clone https://github.com/tu-usuario/migo-protocol
cd migo-protocol

# Backend
cd api
cp .env.example .env      # completar con claves Stellar testnet
npm install
npm run dev               # http://localhost:3001

# Frontend (nueva terminal)
cd frontend
npm install
npm run dev               # http://localhost:3000
```

### Variables de entorno (api/.env)

```env
MIGO_SECRET=tu_secret_key_stellar
MERCHANT_PUBLIC=public_key_del_negocio
STELLAR_NETWORK=testnet
```

---

## Máquina de estados

```
PENDING → PARTIAL → READY_FOR_SETTLEMENT → SETTLED
PENDING → CANCELLED
```

Cuando `totalPaid >= totalAmount` el settlement se dispara automáticamente via `stellar.service.ts`.

---

## API endpoints principales

```
POST /splits                    crear un split
GET  /splits/:id                obtener estado
GET  /splits/:id/intent         monto restante y datos para pagar
POST /splits/:id/pay            registrar un pago
POST /splits/:id/release        disparar settlement manual
GET  /splits/:id/qr             QR interoperable SEP-7
```

---

## Métodos de pago soportados

- 🔷 Stellar wallets — Freighter, xBull, Albedo, LOBSTR
- 📱 MercadoPago — ARS, BRL
- 💳 Pomelo — tarjeta ARS/USD
- 🏦 Transferencia bancaria

---

## Próximos pasos

- [ ] Path Payment real via Stellar DEX (Horizon `/paths/strict-receive`)
- [ ] Trustless Work escrow — fondos en contrato Soroban hasta aprobación
- [ ] Persistencia con PostgreSQL
- [ ] Webhook con HMAC signature verification
- [ ] Rate limiting y sanitización de inputs

---

## Equipo

Beverly · Araceli · Tamara · Romina

**ImpactaBootcamp 2026** — construido sobre Stellar