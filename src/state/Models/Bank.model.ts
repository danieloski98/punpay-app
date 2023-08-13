import { createModel } from '@rematch/core'
import { RootModel } from '../RootModel'

export const Bank = createModel<RootModel>()({
    state: {
        userId: '',
        name: '',
        code: '',
        bankId: 0,
        accountNumber: '',
        accountName: '',
        isLinked: false,
        id: 0,
        createdAt: '',
        updatedAt: '',
    },
    reducers: {
        update(state, payload) {
            return {...state, ...payload};
        },
    },
});