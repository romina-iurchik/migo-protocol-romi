const BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

// ── helpers ──────────────────────────────────────────────
async function get<T>(path: string): Promise<T> {
  const res = await fetch(`${BASE}${path}`);
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}

async function post<T>(path: string, body: unknown): Promise<T> {
  const res = await fetch(`${BASE}${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}

// ── splits ───────────────────────────────────────────────
export const api = {
  splits: {
    create: (body: {
      totalAmount: number;
      mode: "FIXED" | "OPEN_POOL";
      settlementAsset: {
        network: string;
        type: string;
        code: string;
        issuer?: string;
      };
      webhookUrl?: string;
    }) => post<any>("/splits", body),

    getById:         (id: string) => get<any>(`/splits/${id}`),
    getIntent:       (id: string) => get<any>(`/splits/${id}/intent`),
    getSummary:      (id: string) => get<any>(`/splits/${id}/summary`),
    getQR:           (id: string) => get<any>(`/splits/${id}/qr`),
    getPayments:     (id: string) => get<any>(`/splits/${id}/payments`),
    cancel:          (id: string) => post<any>(`/splits/${id}/cancel`, {}),
  },

  payments: {
    register: (
      splitId: string,
      body: {
        payerId: string;
        method: "STELLAR" | "BANK_TRANSFER" | "MERCADO_PAGO" | "CARD";
        originalAsset: string;
        originalAmount: number;
      }
    ) => post<any>(`/splits/${splitId}/pay`, body),
  },
};

// mantener compatibilidad con el fetchSplit que ya usabas
export async function fetchSplit(id: string) {
  return api.splits.getById(id);
}