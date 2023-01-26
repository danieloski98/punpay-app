import { createModel } from '@rematch/core'
import { RootModel } from '../RootModel'

export const isDarkMode = createModel<RootModel>()({
    state: false,
    reducers: {
        change(state) {
            return !state;
        },
        on(state) {
            return true;
        },
        off(state){
            return false;
        }
    }
});