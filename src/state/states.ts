import { atomWithStorage } from 'jotai/utils'

const DarkModeAtom = atomWithStorage('darkMode', true);
const LoggedInAtom = atomWithStorage("loggedIn", false);

export  { DarkModeAtom, LoggedInAtom };