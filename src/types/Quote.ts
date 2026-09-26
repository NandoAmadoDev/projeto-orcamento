export enum QuoteStatus {
  DRAFT = 'Rascunho',
  SENT = 'Enviado',
  APPROVED = 'Aprovado',
  REJECTED = 'Recusado',
}

export type Item = {
  id: string;
  description: string;
  qty: number;
  price: number;
};

export type QuoteDoc = {
  id: string;
  client: string;
  title: string;
  items: Item[];
  discountPct?: number;
  status: QuoteStatus;
  createdAt: string;
  updatedAt: string;
};