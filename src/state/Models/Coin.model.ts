import { createModel } from '@rematch/core'
import { RootModel } from '../RootModel'

export const Coin = createModel<RootModel>()({
    state: '',
    reducers: {
        update(state, payload) {
            console.log("this is the payload", payload)
            state = payload;
            return state;
        },
    },
});