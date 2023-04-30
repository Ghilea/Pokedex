import { create } from 'zustand'

interface ZustandStore {
    searchCriteria: string | number,
    searchHistory: Array<string | number>,
    sort: string,
    order: string,
    updateSearchCriteria: any,
    updateSort: any,
    updateOrder: any
}

export const searchStore = create<ZustandStore>((set) => ({
    searchCriteria: "",
    searchHistory: [],
    sort: 'name',
    order: 'asc',
    updateSearchCriteria: (value: string | number) => {
        set((state) => ({
            searchCriteria: value,
            searchHistory: [...state.searchHistory, value]
        }))
    },
    updateSort: (value: string) => {
        set(() => ({
            sort: value
        }))
    },
    updateOrder: (value: string) => {
        set(() => ({
            order: value
        }))
    }
}))