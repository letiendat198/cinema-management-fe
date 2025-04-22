import { create } from 'zustand'

interface LoginState {
    loginOpened: boolean,
    force: boolean
    loginOpen: () => void,
    loginClose: () => void,
    setForce: (isForce: boolean) => void
}

export const useLoginState = create<LoginState>()(
    (set) => ({
        loginOpened: false,
        force: false,
        loginOpen: () => set({loginOpened: true}),
        loginClose: () => set({loginOpened: false}),
        setForce: (isForce: boolean) => set({force: isForce})
    })
)