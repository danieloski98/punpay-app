export interface Transaction {
  id: string;

  userId: string;

  quidaxTransactionId: string;

  transactionType: number;

  bankId: string;

  transactionCurrency: string;

  transactionAmount: number;

  rate: number;

  currencyRate: number;

  payoutCurrency: string;

  hash: string;

  payoutAmount: number;

  images: string[];

  transactionReference: string;

  withdrawalAddress: string;

  status: number;

  createdAt: string;

  updatedAt: string;
}
