interface Bank {
    id: number;
    name: string;
    slug: string;
    code: string;
    longcode: string;
    gateway: string;
    pay_with_bank: boolean;
    active: boolean
    country: string;
    currency: string;
    type: string;
    is_deleted: boolean;
    createdAt: string;
    updatedAt: string;
}

export interface IBank {
    id: number;
    userId: string;
    bankId: string;
    name: string;
    code: string;
    accountNumber: string;
    accountName: string;
    isLinked: boolean;
    isAdminAccount: boolean;
    createdAt: string;
    updatedAt: string;
}