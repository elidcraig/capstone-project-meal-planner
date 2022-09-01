import { atom } from 'jotai';

const currentUserAtom = atom({})
currentUserAtom.debugLabel = 'currentUser'

export default currentUserAtom