import { createModel } from '@rematch/core'
import { RootModel } from '../RootModel'

export const User = createModel<RootModel>()({
    state: {
        firstName: '',
        lastName: '',
        email: '',
        id: '',
        KYCVerified: false,
        emailVerified: false,
        accountDisabled: false,
        phone: '',
    },
    reducers: {
        update(state, payload) {
            return {...state, ...payload};
        },
    },
});