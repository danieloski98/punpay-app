import { IBank } from "../../../../models/bank";

export type State = {
    payoutAmount?: number;
    payoutCurrency?: string;
    transactionAmount?: number;
    transactionCurrency?: string;
    referenceCode: string;
} 

type ACTION_TYPES = 'payout_amount' | 'payout_currency' | 'transaction_amount' | 'transaction_currency' | 'reference';

export type Action = {
    type: ACTION_TYPES;
    payload: any;
}

export const state: State = {
    payoutAmount: 0,
    payoutCurrency: '',
    transactionAmount: 0,
    transactionCurrency: '',
    referenceCode: '',
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
        case "reference": {
            state = { ...state, referenceCode: action.payload };
            break;
        }
    }

    return state;
}