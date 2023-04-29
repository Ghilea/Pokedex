import { create } from 'zustand'

interface ZustandStore {
    searchCriteria: string | number,
    searchHistory: Array<string | number>,
    updateSearchCriteria: any,

}

export const searchStore = create<ZustandStore>((set) => ({
    searchCriteria: "",
    searchHistory: [],
    updateSearchCriteria: (value: string | number) => {
        set((state) => ({
            searchCriteria: value,
            searchHistory: [...state.searchHistory, value]
        }))
    }
}))