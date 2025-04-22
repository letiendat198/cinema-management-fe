import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { User } from '../types/User'

interface UserState {
    user: User | undefined,
    setUser: (userData: User) => void
    revokeUser: () => void
}

export const useUserStore = create<UserState>()(
    persist(
        (set) => ({
            user: undefined,
            setUser: (userData) => set(state => ({user: userData})),
            revokeUser: () => set(state => ({user: undefined}))
        }),
        {
            name: 'user-storage',
        }
    )
)