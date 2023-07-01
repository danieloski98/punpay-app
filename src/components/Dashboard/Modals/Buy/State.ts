import { IBank } from "../../../../models/bank";
import { create } from 'zustand'

export type State = {
    payoutAmount?: string;
    payoutCurrency?: string;
    transactionAmount?: string;
    transactionCurrency?: string;
    rate?: number;
    bank?: IBank;
    referenceCode: string;
    usd: string;
    transactionId: string;
    ngn: string;
    stage: number;
    setNgn: (payload: string) => void;
    setAmount: (string: string) => void;
    setAll: (payload: Partial<State>) => void;

} 

export const initialState = {
    payoutAmount: '',
    payoutCurrency: '',
    transactionAmount: '0',
    transactionCurrency: '',
    rate: 0,
    bank: {
        accountName: '',
        accountNumber: '',
        bankId: '',
        code: '',
        createdAt: '',
        id: 0,
        isAdminAccount: true,
        isLinked: true,
        name: '',
        updatedAt: '',
        userId: '',
    },
    referenceCode: '',
    transactionId: '',
    ngn: '0',
    usd: '0',
    stage: 1,
}

export const useBuyState = create<State>((set) => ({
    payoutAmount: '0',
    payoutCurrency: '',
    transactionAmount: '0',
    transactionCurrency: '',
    rate: 0,
    bank: {
        accountName: '',
        accountNumber: '',
        bankId: '',
        code: '',
        createdAt: '',
        id: 0,
        isAdminAccount: true,
        isLinked: true,
        name: '',
        updatedAt: '',
        userId: '',
    },
    referenceCode: '',
    transactionId: '',
    ngn: '0',
    usd: '0',
    stage: 1,
    setAmount: (payload: string) => { set((state) => ({ ...state, transactionAmount: payload }))},
    setNgn: (payload: string) => { set((state) => ({ ...state, ngn: payload }))}, 
    setAll:(payload: Partial<State>) => { set((state) => ({ ...state, ...payload }))},
  }))

// type ACTION_TYPES = 'payout_amount' | 'payout_currency' | 'transaction_amount' | 'transaction_currency' | 'rate' | 'bank' | 'reference' | 'usd' | 'id' | 'ngn';

// export type Action = {
//     type: ACTION_TYPES;
//     payload: any;
// }

// export const state: State = {
//     ngn: '0',
//     payoutAmount: 0,
//     payoutCurrency: '',
//     transactionAmount: 0,
//     transactionCurrency: '',
//     usd: '',
//     rate: 0,
//     bank: {
//         accountName: '',
//         accountNumber: '',
//         bankId: '',
//         code: '',
//         createdAt: '',
//         id: 0,
//         isAdminAccount: true,
//         isLinked: true,
//         name: '',
//         updatedAt: '',
//         userId: '',
//     },
//     referenceCode: '',
//     transactionId: '',
//     setAll: function (payload: Partial<State>): void {
//         throw new Error("Function not implemented.");
//     }
// }

// export function reducer(state: State, action: Action) {
//     switch(action.type) {
//         case "payout_amount": {
//             state = { ...state, payoutAmount: action.payload};
//             break;
//         }
//         case "payout_currency": {
//             state = { ...state, payoutCurrency: action.payload };
//             break;
//         }
//         case "transaction_amount": {
//             state = { ...state, transactionAmount: action.payload };
//             break;
//         }
//         case "transaction_currency": {
//             state = { ...state, transactionCurrency: action.payload };
//             break;
//         }
//         case "rate": {
//             state = { ...state, rate: action.payload };
//             break;
//         }
//         case "bank": {
//             state = { ...state, bank: action.payload };
//             break;
//         }
//         case "reference": {
//             state = { ...state, referenceCode: action.payload };
//             break;
//         }
//         case "usd": {
//             state = { ...state, usd: action.payload };
//             break;
//         }
//         case "id": {
//             state = { ...state, transactionId: action.payload };
//             break;
//         }
//         case "ngn": {
//             state = { ...state, ngn: action.payload };
//         }
//     }

//     return state;
// }