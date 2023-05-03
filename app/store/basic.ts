import { create } from 'zustand'

interface ZustandStore {
    base_url: string,
}

export const basicStore = create<ZustandStore>(() => ({
    base_url: "https://pokedex.onrender.com:3004"
}))