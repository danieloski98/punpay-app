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
    },
    reducers: {
        update(state, payload) {
            console.log("this is the payload", payload)
            return {...state, ...payload};
        },
    },
});