import { IBank } from "../../../../models/bank";

export type State = {
    payoutAmount?: number;
    payoutCurrency?: string;
    transactionAmount?: number;
    transactionCurrency?: string;
    rate?: number;
    bank?: IBank;
    referenceCode: string;
    usd: string;
    transactionId: string;
    wallet: string;
    network?: string;
} 

type ACTION_TYPES = 'payout_amount' | 'payout_currency' | 'transaction_amount' | 'transaction_currency' | 'rate' | 'bank' | 'reference' | 'usd' | 'id' | 'wallet' | 'network';

export type Action = {
    type: ACTION_TYPES;
    payload: any;
}

export const state: State = {
    payoutAmount: 0,
    payoutCurrency: '',
    transactionAmount: 0,
    transactionCurrency: '',
    usd: '',
    rate: 0,
    referenceCode: '',
    transactionId: '',
    wallet: '',
    network: '',
}

export function reducer(state: State, action: Action) {
    switch(action.type) {
        case "payout_amount": {
            state = { ...state, payoutAmount: action.payload};
            break;
        }
        case "payout_currency": {
            state = { ...state, payoutCurrency: action.payload };
            break;
        }
        case "transaction_amount": {
            state = { ...state, transactionAmount: action.payload };
            break;
        }
        case "transaction_currency": {
            state = { ...state, transactionCurrency: action.payload };
            break;
        }
        case "rate": {
            state = { ...state, rate: action.payload };
            break;
        }
        case "reference": {
            state = { ...state, referenceCode: action.payload };
            break;
        }
        case "usd": {
            state = { ...state, usd: action.payload };
            break;
        }
        case "id": {
            state = { ...state, transactionId: action.payload };
            break;
        }
        case "wallet": {
            state = { ...state, wallet: action.payload };
            break;
        }
        case 'network': {
            state = { ...state, network: action.payload };
            break;
        }
    }

    return state;
}