import { create } from 'zustand';
import { User } from '../types/user';

interface UserState {
    users: User[];
    isLoading: boolean;
    error: string | null;
    searchBarInput: string;
    setSearchBarInput: (input: string) => void;
    fetchUsers: () => Promise<void>;
}

export const useUserStore = create<UserState>((set) => ({
    users: [],
    isLoading: false,
    error: null,
    searchBarInput: '',
    setSearchBarInput: (input) => set({ searchBarInput: input }),

    fetchUsers: async () => {
        set({ isLoading: true, error: null });

        try {
            const res = await fetch('https://jsonplaceholder.typicode.com/users');

            // const wait = () => new Promise((resolve) => setTimeout(resolve, 1000)); MOCK DELAY FOR LOADING STATUS CHECK
            // await wait();
            
            if (!res.ok) throw new Error('Failed to fetch users');
            const data: User[] = await res.json();
            set({ users: data, isLoading: false });
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Unknown error';
            set({ error: errorMessage, isLoading: false });
        }
    },
}));
