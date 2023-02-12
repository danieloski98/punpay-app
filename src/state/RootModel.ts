import { Models } from '@rematch/core'
import { loggedIn } from './Models/LoggedIn.Model'
import { isDarkMode } from './Models/DarkMode.Model'
import { User } from './Models/User.Model';
import { Bank } from './Models/Bank.model';
import {Coin } from './Models/Coin.model';

export interface RootModel extends Models<RootModel> {
    loggedIn: typeof loggedIn;
    isDarkMode: typeof isDarkMode;
    User: typeof User;
    Bank: typeof Bank;
    Coin: typeof Coin;
}

export const models: RootModel = { loggedIn, isDarkMode, User, Bank, Coin }