import { create } from 'zustand'

export type State = {
    openModal: boolean;
    openBuy: boolean
    openSell: boolean;
    openSwap: boolean;
    openDeposit: boolean
    setOpenModal: (payload: boolean) => void;
    setAll: (payload: Partial<State>) => void;
} 

export const initialState = {
    openModal: false,
}

export const useModalState = create<State>((set) => ({
    openModal: false,
    openBuy: false,
    openDeposit: false,
    openSell: false,
    openSwap: false,
    setOpenModal: (payload: boolean) => { set((state) => ({ ...state, openModal: payload }))}, 
    setAll:(payload: Partial<State>) => { console.log(payload); set((state) => ({ ...state, ...payload }))},
  }))

