import { Models } from '@rematch/core'
import { loggedIn } from './Models/LoggedIn.Model'
import { isDarkMode } from './Models/DarkMode.Model'
import { User } from './Models/User.Model';

export interface RootModel extends Models<RootModel> {
    loggedIn: typeof loggedIn;
    isDarkMode: typeof isDarkMode;
    User: typeof User;
}

export const models: RootModel = { loggedIn, isDarkMode, User }