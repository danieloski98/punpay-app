import { createModel } from '@rematch/core'
import { RootModel } from '../RootModel'

export const loggedIn = createModel<RootModel>()({
    state: false,
    reducers: {
        login(state) {
            return true;
        },
        logout(state) {
            return false;
        }
    },
    effects: (dispatch) => ({
        // changeAsync() {
        //     dispatch.loggedIn.change();
        // }
    })
});