import { Models } from '@rematch/core'
import { loggedIn } from './Models/LoggedIn.Model'
import { isDarkMode } from './Models/DarkMode.Model'
import { User } from './Models/User.Model';
import { Bank } from './Models/Bank.model';

export interface RootModel extends Models<RootModel> {
    loggedIn: typeof loggedIn;
    isDarkMode: typeof isDarkMode;
    User: typeof User;
    Bank: typeof Bank;
}

export const models: RootModel = { loggedIn, isDarkMode, User, Bank }