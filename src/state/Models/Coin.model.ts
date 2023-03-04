import { createModel } from '@rematch/core'
import { RootModel } from '../RootModel'

export const Coin = createModel<RootModel>()({
    state: '',
    reducers: {
        update(state, payload) {
            state = payload;
            return state;
        },
    },
});