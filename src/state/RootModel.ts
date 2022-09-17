import { Models } from '@rematch/core'
import { loggedIn } from './Models/LoggedIn.Model'
import { isDarkMode } from './Models/DarkMode.Model'

export interface RootModel extends Models<RootModel> {
    loggedIn: typeof loggedIn;
    isDarkMode: typeof isDarkMode;
}

export const models: RootModel = { loggedIn, isDarkMode }